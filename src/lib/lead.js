// Gửi lead. Chỉ báo "thành công" khi backend xác nhận (không giả lập thành công).
// Chưa có VITE_LEAD_ENDPOINT → throw lỗi rõ ràng (form đang ở chế độ demo, chưa lưu lead thật).
import { getFirstTouch } from './utm'
import { cmsLeadEndpoint } from '../cms/content'
import { cmsTrack } from '../cms/tracker'

export async function submitLead({ name, phone, formLocation }) {
  const endpoint = import.meta.env.VITE_LEAD_ENDPOINT || cmsLeadEndpoint

  if (!endpoint) {
    throw new Error('Chưa cấu hình VITE_LEAD_ENDPOINT — form đang ở chế độ demo, chưa gửi lead thật.')
  }

  const ft = getFirstTouch()
  // Trường khớp schema của lead-worker (lead-worker/src/lead.js); trường lạ Worker tự bỏ qua.
  const payload = {
    name: name.trim(),
    phone: phone.replace(/[\s.-]/g, ''),
    form_type: formLocation,
    page_url: window.location.href,
    source_url: ft.landing_path ? window.location.origin + ft.landing_path : '',
    referrer: ft.referrer || '',
    utm_source: ft.utm_source,
    utm_medium: ft.utm_medium,
    utm_campaign: ft.utm_campaign,
    utm_content: ft.utm_content,
    utm_term: ft.utm_term,
    submitted_at: new Date().toISOString(),
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || data.success === false) {
    throw new Error(data.error || `Gửi thông tin thất bại (${res.status}). Vui lòng thử lại.`)
  }
  try {
    cmsTrack('lead', formLocation) // dashboard CMS: chỉ ghi vị trí form, không gửi tên/SĐT
  } catch {
    /* bỏ qua */
  }
  return data
}
