/* Lưu UTM LẦN ĐẦU của khách (first-touch) và gửi kèm lead để biết lead đến từ nguồn nào.
   Quy ước UTM: viết thường, không dấu (utm_source/medium/campaign/content/term). Không gắn UTM vào link nội bộ. */
const KEY = 'qtopia_first_touch'
const FIELDS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']

export function captureFirstTouch() {
  try {
    if (localStorage.getItem(KEY)) return
    const q = new URLSearchParams(window.location.search)
    const utm = {}
    FIELDS.forEach((f) => {
      const v = q.get(f)
      if (v) utm[f] = v.slice(0, 100)
    })
    const data = {
      ...utm,
      landing_path: window.location.pathname,
      referrer: document.referrer ? new URL(document.referrer).hostname : '',
      captured_at: new Date().toISOString(),
    }
    localStorage.setItem(KEY, JSON.stringify(data))
  } catch {
    /* storage bị chặn → bỏ qua */
  }
}

export function getFirstTouch() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}')
  } catch {
    return {}
  }
}
