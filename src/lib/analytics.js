/* Đo lường GA4 qua GTM (checklist v2 mục 9).
   - Mọi sự kiện đi qua window.dataLayer; GTM nạp bằng script động (không inline script trong HTML).
   - KHÔNG đẩy tên / số điện thoại / email vào dataLayer — chỉ tham số tối thiểu.
   Sự kiện: page_view (đổi route) · generate_lead · click_call · click_zalo · click_cta · scroll_depth · section_view · view_floorplan */

const GTM_ID = import.meta.env?.VITE_GTM_ID || ''

export function track(event, params = {}) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  if (!GTM_ID && window.gtag) window.gtag('event', event, params)
  else window.dataLayer.push({ event, ...params })
}

/* Nạp GTM sau khi trang rảnh để không chặn render (checklist 13: tải GTM không chặn render) */
export function loadGtm() {
  if (typeof window === 'undefined' || window.__qtopiaAnalytics) return
  window.__qtopiaAnalytics = true
  window.dataLayer = window.dataLayer || []
  if (!GTM_ID) {
    window.gtag = function () { window.dataLayer.push(arguments) }
    window.gtag('js', new Date())
    window.gtag('config', 'G-6LEMBK6FTP', { send_page_view: false })
  }
  let loaded = false
  const run = () => {
    if (loaded) return
    loaded = true
    for (const event of ['pointerdown', 'keydown', 'scroll']) window.removeEventListener(event, run)
    const s = document.createElement('script')
    s.id = 'gtm-loader'
    s.async = true
    if (GTM_ID) window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
    s.src = GTM_ID
      ? `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`
      : 'https://www.googletagmanager.com/gtag/js?id=G-6LEMBK6FTP'
    document.head.appendChild(s)
  }
  for (const event of ['pointerdown', 'keydown', 'scroll']) window.addEventListener(event, run, { once: true, passive: true })
  // Sự kiện xếp hàng ngay trong dataLayer; script GA/GTM (~180 KB) chỉ tải khi người dùng tương tác
  // hoặc sau 10 giây kể từ khi trang tải xong — không tranh băng thông/main thread với LCP và TBT.
  const schedule = () => window.setTimeout(run, 10000)
  if (document.readyState === 'complete') schedule()
  else window.addEventListener('load', schedule, { once: true })
}

export function trackWebVitals() {
  let active = true
  let timer = 0
  let idleId = 0
  let stopMetrics = () => {}

  const start = async () => {
    try {
      const { onCLS, onINP, onLCP } = await import('web-vitals')
      if (!active) return
      const report = ({ name, value, delta, rating }) => {
        track('web_vital', {
          metric_name: name,
          metric_value: value,
          metric_delta: delta,
          metric_unit: name === 'CLS' ? 'score' : 'ms',
          metric_rating: rating,
          page_path: window.location.pathname,
        })
      }
      const unsubscribe = [onCLS(report), onINP(report), onLCP(report)]
      stopMetrics = () => unsubscribe.forEach((stop) => stop())
    } catch (error) {
      console.error('Failed to initialize Core Web Vitals reporting.', error)
    }
  }

  const schedule = () => {
    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(start, { timeout: 5000 })
    } else {
      timer = window.setTimeout(start, 1000)
    }
  }

  if (document.readyState === 'complete') schedule()
  else window.addEventListener('load', schedule, { once: true })

  return () => {
    active = false
    window.removeEventListener('load', schedule)
    window.clearTimeout(timer)
    if (idleId) window.cancelIdleCallback(idleId)
    stopMetrics()
  }
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
