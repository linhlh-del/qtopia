// Chuẩn hoá & kiểm tra lead trước khi ghi Google Sheet.
// Schema khớp Apps Script (apps-script/Code.gs): mọi dự án dùng chung, nên nhân bản Worker không phải sửa file này.

// Trường được nhận từ frontend → độ dài tối đa. Trường lạ bị bỏ (không cho frontend tự thêm cột rác vào Sheet).
export const FIELDS = {
	name: 100,
	phone: 20,
	email: 120,
	apartment_types: 200,
	message: 1000,
	form_type: 50, // popup / register / quote / floating_price…
	source_url: 500, // URL trang đích lần đầu khách vào site (first-touch)
	page_url: 500, // URL trang lúc gửi form
	referrer: 200,
	utm_source: 150,
	utm_medium: 150,
	utm_campaign: 150,
	utm_content: 150,
	utm_term: 150,
	gclid: 200,
	fbclid: 200,
	ttclid: 200,
	lt_utm_source: 150, // nguồn gần nhất (last non-direct touch)
	lt_utm_medium: 150,
	lt_utm_campaign: 150,
	submitted_at: 40, // giờ client lúc bấm gửi
};

// Ô honeypot ẩn trong form: người thật để trống, bot tự điền
export const HONEYPOT = 'website';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Số di động/cố định Việt Nam → dạng 0xxxxxxxxx; trả null nếu không hợp lệ */
export function normalizePhone(raw) {
	let d = String(raw || '').replace(/[^\d+]/g, '');
	if (d.startsWith('+84')) d = '0' + d.slice(3);
	else if (d.startsWith('84') && d.length === 11) d = '0' + d.slice(2);
	d = d.replace(/\D/g, '');
	return /^0\d{9,10}$/.test(d) ? d : null;
}

/* Chặn "formula injection": ô bắt đầu bằng = + - @ sẽ bị Google Sheets hiểu là công thức */
function sheetSafe(v) {
	return /^[=+\-@\t\r]/.test(v) ? "'" + v : v;
}

function clean(v, max) {
	if (v === undefined || v === null) return '';
	return sheetSafe(
		String(v)
			.replace(/[\u0000-\u001f\u007f]/g, ' ')
			.replace(/\s+/g, ' ')
			.trim()
			.slice(0, max),
	);
}

/**
 * @returns {{ lead?: object, error?: string, spam?: boolean }}
 */
export function parseLead(data) {
	if (!data || typeof data !== 'object' || Array.isArray(data)) return { error: 'Dữ liệu không hợp lệ' };
	if (data[HONEYPOT]) return { spam: true };

	const lead = {};
	for (const [key, max] of Object.entries(FIELDS)) lead[key] = clean(data[key], max);

	if (!lead.name) return { error: 'Vui lòng nhập họ và tên' };
	const phone = normalizePhone(data.phone);
	if (!phone) return { error: 'Số điện thoại không hợp lệ' };
	lead.phone = phone;
	if (lead.email && !EMAIL_RE.test(lead.email)) return { error: 'Email không hợp lệ' };

	return { lead };
}
