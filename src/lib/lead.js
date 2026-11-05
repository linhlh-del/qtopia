// Gửi lead. Chỉ báo "thành công" khi backend xác nhận (không giả lập thành công).
// Chưa có VITE_LEAD_ENDPOINT → throw lỗi rõ ràng (form đang ở chế độ demo, chưa lưu lead thật).
import { getFirstTouch } from './utm'
import { cmsLeadEndpoint } from '../cms/content'

export async function submitLead({ name, phone, formLocation }) {
  const endpoint = import.meta.env.VITE_LEAD_ENDPOINT || cmsLeadEndpoint

  if (!endpoint) {
    throw new Error('Chưa cấu hình VITE_LEAD_ENDPOINT — form đang ở chế độ demo, chưa gửi lead thật.')
  }

  const payload = {
    name: name.trim(),
    phone: phone.replace(/[\s.-]/g, ''),
    source: 'qtopia-landing',
    form_location: formLocation,
    page: window.location.pathname,
    submitted_at: new Date().toISOString(),
    ...getFirstTouch(),
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Gửi thông tin thất bại (${res.status}). Vui lòng thử lại.`)
  return res.json().catch(() => ({}))
}
