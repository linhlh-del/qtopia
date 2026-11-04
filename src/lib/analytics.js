/* Đo lường GA4 qua GTM (checklist v2 mục 9).
   - Mọi sự kiện đi qua window.dataLayer; GTM nạp bằng script động (không inline script trong HTML).
   - KHÔNG đẩy tên / số điện thoại / email vào dataLayer — chỉ tham số tối thiểu.
   Sự kiện: page_view (đổi route) · generate_lead · click_call · click_zalo · click_cta · scroll_depth · section_view · view_floorplan */

const GTM_ID = import.meta.env?.VITE_GTM_ID || ''

export function track(event, params = {}) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}

/* Nạp GTM sau khi trang rảnh để không chặn render (checklist 13: tải GTM không chặn render) */
export function loadGtm() {
  if (typeof window === 'undefined' || !GTM_ID || document.getElementById('gtm-loader')) return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
  const run = () => {
    const s = document.createElement('script')
    s.id = 'gtm-loader'
    s.async = true
    s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`
    document.head.appendChild(s)
  }
  if ('requestIdleCallback' in window) window.requestIdleCallback(run, { timeout: 3000 })
  else window.setTimeout(run, 1500)
}

/* Một listener cho mọi CTA: gắn data-cta-name / data-cta-location / data-cta-target; tel: và Zalo tự nhận diện */
export function initDelegatedTracking() {
  const onClick = (e) => {
    const el = e.target.closest?.('a, button')
    if (!el) return
    const loc = el.dataset.ctaLocation || ''
    const href = el.getAttribute('href') || ''
    if (href.startsWith('tel:')) return track('click_call', { cta_location: loc })
    if (/zalo\.me/i.test(href)) return track('click_zalo', { cta_location: loc })
    if (el.dataset.ctaName) {
      track('click_cta', {
        cta_name: el.dataset.ctaName,
        cta_location: loc,
        cta_target: el.dataset.ctaTarget || href || '',
      })
    }
  }
  document.addEventListener('click', onClick)
  return () => document.removeEventListener('click', onClick)
}

/* scroll_depth 25/50/75/90% — mỗi mốc một lần cho mỗi lần xem trang */
export function trackScrollDepth() {
  const marks = [25, 50, 75, 90]
  const fired = new Set()
  let frame = 0
  const check = () => {
    frame = 0
    const doc = document.documentElement
    const max = doc.scrollHeight - window.innerHeight
    if (max <= 0) return
    const pct = (window.scrollY / max) * 100
    marks.forEach((m) => {
      if (pct >= m && !fired.has(m)) {
        fired.add(m)
        track('scroll_depth', { percent: m })
      }
    })
  }
  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(check)
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  return () => {
    window.removeEventListener('scroll', onScroll)
    cancelAnimationFrame(frame)
  }
}

/* section_view khi section chính vào khung nhìn (mỗi section một lần) */
export function trackSectionViews() {
  if (!('IntersectionObserver' in window)) return () => {}
  const seen = new Set()
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting && !seen.has(en.target.id)) {
          seen.add(en.target.id)
          track('section_view', { section_id: en.target.id })
        }
      })
    },
    { threshold: 0.35 },
  )
  document.querySelectorAll('main section[id]').forEach((s) => io.observe(s))
  return () => io.disconnect()
}
