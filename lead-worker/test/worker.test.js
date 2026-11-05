// Chạy: npm test (node:test có sẵn trong Node ≥ 20, không cần cài thêm)
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/index.js';
import { normalizePhone, parseLead } from '../src/lead.js';

const ORIGIN = 'https://qtopia.rever.io.vn';
const env = {
	GOOGLE_SHEET_URL: 'https://script.google.com/macros/s/TEST/exec',
	PROJECT_NAME: 'QTOPIA',
	ALLOWED_ORIGINS: ORIGIN,
	ALLOW_LOCALHOST: 'false',
	RATE_LIMIT_PER_MINUTE: '100',
};

let sent;
let sheetReply;
beforeEach(() => {
	sent = [];
	sheetReply = () => new Response(JSON.stringify({ success: true }), { status: 200 });
	globalThis.fetch = async (url, init) => {
		sent.push({ url, body: JSON.parse(init.body) });
		return sheetReply();
	};
});

let n = 0;
const uniquePhone = () => `09${String(10000000 + n++).padStart(8, '0')}`;
const post = (body, { origin = ORIGIN, ip = '1.1.1.1' } = {}) =>
	worker.fetch(
		new Request('https://lead.example.workers.dev/lead', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Origin: origin, 'CF-Connecting-IP': ip },
			body: typeof body === 'string' ? body : JSON.stringify(body),
		}),
		env,
	);

test('chuẩn hoá số điện thoại VN', () => {
	assert.equal(normalizePhone('+84 938 609 023'), '0938609023');
	assert.equal(normalizePhone('84938609023'), '0938609023');
	assert.equal(normalizePhone('093.860.90.23'), '0938609023');
	assert.equal(normalizePhone('12345'), null);
});

test('chặn công thức Google Sheets và bỏ trường lạ', () => {
	const { lead } = parseLead({ name: '=HYPERLINK("x")', phone: '0938609023', admin: true });
	assert.equal(lead.name, '\'=HYPERLINK("x")');
	assert.equal('admin' in lead, false);
});

test('lead hợp lệ → ghi Sheet kèm project, trả 200 và CORS đúng origin', async () => {
	const phone = uniquePhone();
	const res = await post({ name: 'Nguyễn Văn A', phone, form_type: 'popup', utm_source: 'google' });
	assert.equal(res.status, 200);
	assert.equal(res.headers.get('Access-Control-Allow-Origin'), ORIGIN);
	assert.deepEqual(await res.json(), { success: true });
	assert.equal(sent.length, 1);
	assert.equal(sent[0].url, env.GOOGLE_SHEET_URL);
	assert.equal(sent[0].body.project, 'QTOPIA');
	assert.equal(sent[0].body.phone, phone);
	assert.equal(sent[0].body.utm_source, 'google');
});

test('origin lạ → 403, không gọi Sheet', async () => {
	const res = await post({ name: 'A', phone: uniquePhone() }, { origin: 'https://evil.example' });
	assert.equal(res.status, 403);
	assert.equal(sent.length, 0);
});

test('thiếu tên / SĐT sai → 400', async () => {
	assert.equal((await post({ phone: uniquePhone() })).status, 400);
	assert.equal((await post({ name: 'A', phone: '123' })).status, 400);
	assert.equal((await post('not json')).status, 400);
	assert.equal(sent.length, 0);
});

test('honeypot → trả thành công giả, không ghi Sheet', async () => {
	const res = await post({ name: 'Bot', phone: uniquePhone(), website: 'http://spam' });
	assert.equal(res.status, 200);
	assert.equal(sent.length, 0);
});

test('Apps Script báo lỗi → thử lại 1 lần rồi trả 502', async () => {
	sheetReply = () => new Response(JSON.stringify({ success: false, error: 'Sheet không tồn tại' }), { status: 200 });
	const res = await post({ name: 'A', phone: uniquePhone() });
	assert.equal(res.status, 502);
	assert.equal(sent.length, 2);
});

test('gửi trùng SĐT liền nhau → chỉ ghi 1 dòng', async () => {
	const phone = uniquePhone();
	await post({ name: 'A', phone });
	const res = await post({ name: 'A', phone });
	assert.equal(res.status, 200);
	assert.equal(sent.length, 1);
});

test('vượt giới hạn tần suất → 429', async () => {
	const strict = { ...env, RATE_LIMIT_PER_MINUTE: '2' };
	const call = () =>
		worker.fetch(
			new Request('https://x/lead', {
				method: 'POST',
				headers: { Origin: ORIGIN, 'CF-Connecting-IP': '9.9.9.9' },
				body: JSON.stringify({ name: 'A', phone: uniquePhone() }),
			}),
			strict,
		);
	await call();
	await call();
	assert.equal((await call()).status, 429);
});

test('preflight + health', async () => {
	const pre = await worker.fetch(new Request('https://x/lead', { method: 'OPTIONS', headers: { Origin: ORIGIN } }), env);
	assert.equal(pre.status, 204);
	assert.equal(pre.headers.get('Access-Control-Allow-Origin'), ORIGIN);
	const h = await worker.fetch(new Request('https://x/health'), env);
	assert.deepEqual(await h.json(), { ok: true, project: 'QTOPIA', sheetConfigured: true, cmsConfigured: false });
});

test('đã cấu hình CMS → ghi thêm lead vào Supabase (sau khi Sheet thành công)', async () => {
	const phone = uniquePhone();
	const cmsEnv = { ...env, PROJECT_ID: 'qtopia', SUPABASE_URL: 'https://abc.supabase.co', SUPABASE_SERVICE_ROLE_KEY: 'service' };
	const res = await worker.fetch(
		new Request('https://lead.example.workers.dev/lead', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Origin: ORIGIN, 'CF-Connecting-IP': '9.9.9.9' },
			body: JSON.stringify({ name: 'Trần B', phone, form_type: 'register', utm_source: 'facebook', utm_medium: 'cpc', utm_campaign: 'thang11' }),
		}),
		cmsEnv,
	);
	assert.equal(res.status, 200);
	assert.equal(sent.length, 2);
	assert.equal(sent[1].url, 'https://abc.supabase.co/rest/v1/cms_leads');
	assert.equal(sent[1].body.project_id, 'qtopia');
	assert.equal(sent[1].body.phone, phone);
	assert.equal(sent[1].body.channel, 'paid');
	assert.equal(sent[1].body.status, 'new');
});
