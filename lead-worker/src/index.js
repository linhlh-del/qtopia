// Cloudflare Worker nhận lead từ landing page → ghi Google Sheet qua Apps Script webhook.
// Giấu URL Apps Script thật, kiểm soát origin, chặn spam, chuẩn hoá dữ liệu, xác nhận Sheet đã ghi.
//
// NHÂN BẢN CHO DỰ ÁN MỚI: chỉ đổi trong wrangler.jsonc (name, PROJECT_NAME, ALLOWED_ORIGINS)
// và đặt secret GOOGLE_SHEET_URL = URL /exec của Apps Script dự án đó. Xem readme.md.
//
// Route:
//   POST /lead   (hoặc POST /)  → ghi lead
//   GET  /health                → kiểm tra Worker + cấu hình
//   OPTIONS                     → preflight CORS

import { saveToSupabase } from './supabase.js';
import { parseLead } from './lead.js';

const MAX_BODY_BYTES = 16 * 1024;
const SHEET_TIMEOUT_MS = 10_000;

// ─── Rate limit / chống gửi trùng (bộ nhớ isolate, best-effort; muốn chặt hơn dùng Rate Limiting rule ở Cloudflare) ───
const hits = new Map(); // ip -> { start, count }
const recentPhones = new Map(); // phone -> ts
const RATE_WINDOW_MS = 60_000;
const DUPLICATE_WINDOW_MS = 2 * 60_000;

function rateLimited(ip, max) {
	const now = Date.now();
	if (hits.size > 5000) for (const [k, v] of hits) if (now - v.start > RATE_WINDOW_MS) hits.delete(k);
	const e = hits.get(ip);
	if (!e || now - e.start > RATE_WINDOW_MS) {
		hits.set(ip, { start: now, count: 1 });
		return false;
	}
	e.count += 1;
	return e.count > max;
}

function isDuplicate(phone) {
	const now = Date.now();
	if (recentPhones.size > 5000) for (const [k, t] of recentPhones) if (now - t > DUPLICATE_WINDOW_MS) recentPhones.delete(k);
	const last = recentPhones.get(phone);
	return last !== undefined && now - last < DUPLICATE_WINDOW_MS;
}

// ─── CORS: chỉ trả lại origin nằm trong ALLOWED_ORIGINS ("*" = mọi origin, chỉ nên dùng khi test) ───
function allowedOrigins(env) {
	return String(env.ALLOWED_ORIGINS || '')
		.split(',')
		.map((s) => s.trim().replace(/\/+$/, ''))
		.filter(Boolean);
}

function originAllowed(origin, env) {
	if (!origin) return false;
	const list = allowedOrigins(env);
	if (list.includes('*') || list.includes(origin)) return true;
	return env.ALLOW_LOCALHOST === 'true' && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
}

function corsHeaders(request, env) {
	const origin = request.headers.get('Origin');
	const h = { Vary: 'Origin' };
	if (originAllowed(origin, env)) {
		h['Access-Control-Allow-Origin'] = origin;
		h['Access-Control-Allow-Methods'] = 'POST, OPTIONS';
		h['Access-Control-Allow-Headers'] = 'Content-Type';
		h['Access-Control-Max-Age'] = '86400';
	}
	return h;
}

function json(body, status, cors) {
	return new Response(JSON.stringify(body), {
		status,
		headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...cors },
	});
}

async function readBody(request) {
	const text = await request.text();
	if (text.length > MAX_BODY_BYTES) return { tooLarge: true };
	try {
		return { data: JSON.parse(text) };
	} catch {
		return { data: null };
	}
}

// ─── Gửi sang Apps Script, đọc lại phản hồi để chắc chắn Sheet đã ghi ───
async function sendToSheet(env, row) {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), SHEET_TIMEOUT_MS);
	try {
		// Apps Script trả 302 sang googleusercontent.com rồi mới có JSON — fetch tự theo redirect.
		const res = await fetch(env.GOOGLE_SHEET_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(row),
			redirect: 'follow',
			signal: controller.signal,
		});
		const text = await res.text();
		let out = null;
		try {
			out = JSON.parse(text);
		} catch {
			/* Apps Script lỗi thường trả trang HTML */
		}
		if (!res.ok || !out || out.success !== true) {
			return { ok: false, detail: out?.error || `HTTP ${res.status}: ${text.slice(0, 200)}` };
		}
		return { ok: true };
	} catch (err) {
		return { ok: false, detail: err.name === 'AbortError' ? 'timeout' : String(err) };
	} finally {
		clearTimeout(timer);
	}
}

async function handleLead(request, env, ctx) {
	const cors = corsHeaders(request, env);
	const origin = request.headers.get('Origin');

	// Trình duyệt luôn gửi Origin với fetch POST; thiếu hoặc lạ → không phải form của site
	if (!originAllowed(origin, env)) return json({ success: false, error: 'Origin không được phép' }, 403, cors);

	if (!env.GOOGLE_SHEET_URL) {
		console.error('Thiếu secret GOOGLE_SHEET_URL');
		return json({ success: false, error: 'Hệ thống chưa sẵn sàng, vui lòng gọi hotline' }, 500, cors);
	}

	const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
	if (rateLimited(ip, Number(env.RATE_LIMIT_PER_MINUTE || 5))) {
		return json({ success: false, error: 'Bạn gửi quá nhanh, vui lòng thử lại sau ít phút' }, 429, cors);
	}

	const { data, tooLarge } = await readBody(request);
	if (tooLarge) return json({ success: false, error: 'Dữ liệu quá lớn' }, 413, cors);

	const { lead, error, spam } = parseLead(data);
	if (spam) return json({ success: true }, 200, cors); // giả vờ thành công để bot không dò ra
	if (error) return json({ success: false, error }, 400, cors);

	// cùng số điện thoại vừa gửi (bấm 2 lần / 2 form liên tiếp) → coi như đã nhận, không ghi trùng
	if (isDuplicate(lead.phone)) return json({ success: true, duplicate: true }, 200, cors);

	const row = {
		...lead,
		project: env.PROJECT_NAME || '',
		origin,
		country: request.cf?.country || '',
		received_at: new Date().toISOString(),
	};

	let result = await sendToSheet(env, row);
	if (!result.ok) result = await sendToSheet(env, row); // thử lại 1 lần (Apps Script đôi khi chập chờn)
	if (!result.ok) {
		console.error('Ghi Sheet thất bại', { project: row.project, detail: result.detail });
		return json({ success: false, error: 'Chưa gửi được thông tin, vui lòng thử lại hoặc gọi hotline' }, 502, cors);
	}

	recentPhones.set(lead.phone, Date.now());
	/* đồng bộ sang CMS (Supabase) ở nền — không làm chậm phản hồi cho khách */
	const sync = saveToSupabase(env, row);
	if (ctx?.waitUntil) ctx.waitUntil(sync);
	else await sync;
	return json({ success: true }, 200, cors);
}

export default {
	async fetch(request, env, ctx) {
		const { pathname } = new URL(request.url);
		const path = pathname.replace(/\/+$/, '') || '/';

		if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders(request, env) });

		if (path === '/health' && request.method === 'GET') {
			return json({ ok: true, project: env.PROJECT_NAME || '', sheetConfigured: Boolean(env.GOOGLE_SHEET_URL), cmsConfigured: Boolean(env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY && env.PROJECT_ID) }, 200, {});
		}

		if ((path === '/lead' || path === '/') && request.method === 'POST') return handleLead(request, env, ctx);

		return json({ success: false, error: 'Not found' }, 404, corsHeaders(request, env));
	},
};
