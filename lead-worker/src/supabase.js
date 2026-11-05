// Ghi thêm lead vào Supabase (bảng public.cms_leads) để hiện trong CMS — chạy nền sau khi Sheet đã ghi thành công.
// Lỗi ở đây chỉ ghi log, không ảnh hưởng phản hồi cho khách (Google Sheet vẫn là bản lưu chính).
// Cấu hình: vars PROJECT_ID ("qtopia"), SUPABASE_URL; secret SUPABASE_SERVICE_ROLE_KEY.

/** Kênh truy cập từ UTM / click id / referrer — cùng quy ước với tracker trên website */
export function channelOf(row) {
	const medium = (row.utm_medium || '').toLowerCase();
	const source = (row.utm_source || '').toLowerCase();
	const ref = (row.referrer || '').toLowerCase();
	if (row.gclid || row.fbclid || row.ttclid || /cpc|ppc|paid|ads?$|display/.test(medium)) return 'paid';
	if (/email|newsletter/.test(medium)) return 'email';
	if (/zalo/.test(source) || /zalo\./.test(ref)) return 'zalo';
	if (/social/.test(medium) || /facebook|fb|instagram|tiktok|youtube|linkedin|twitter/.test(source)) return 'social';
	if (/organic/.test(medium) || /google\.|bing\.|coccoc\./.test(ref)) return 'organic';
	if ((source && source !== '(direct)') || ref) return 'referral';
	return 'direct';
}

export async function saveToSupabase(env, row) {
	if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY || !env.PROJECT_ID) return;
	const body = {
		project_id: env.PROJECT_ID,
		name: row.name,
		phone: row.phone,
		email: row.email || null,
		apartment_type: row.apartment_types || null,
		message: row.message || null,
		form_type: row.form_type || null,
		page_url: row.page_url || null,
		channel: channelOf(row),
		utm_source: row.utm_source || null,
		utm_medium: row.utm_medium || null,
		utm_campaign: row.utm_campaign || null,
		referrer: row.referrer || null,
		/* lead thử gửi từ CMS → đánh dấu spam để không lẫn vào số liệu */
		status: row.form_type === 'cms_test' ? 'spam' : 'new',
	};
	try {
		const res = await fetch(`${env.SUPABASE_URL.replace(/\/+$/, '')}/rest/v1/cms_leads`, {
			method: 'POST',
			headers: {
				apikey: env.SUPABASE_SERVICE_ROLE_KEY,
				Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
				'Content-Type': 'application/json',
				Prefer: 'return=minimal',
			},
			body: JSON.stringify(body),
		});
		if (!res.ok) console.error('Ghi Supabase thất bại', res.status, await res.text());
	} catch (e) {
		console.error('Không kết nối được Supabase', e.message);
	}
}
