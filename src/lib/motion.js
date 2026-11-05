// Chỉ chạy các nét SVG lặp vô hạn khi phần bản đồ đang ở gần khung nhìn.
export function pauseOffscreenMotion() {
  const selector = '#vi-tri, #tien-ich, #mat-bang'
  const sections = new Set()
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(
    (entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) target.setAttribute('data-motion-active', '')
        else target.removeAttribute('data-motion-active')
      })
    },
    { rootMargin: '20% 0px', threshold: 0 },
  ) : null

  const register = (section) => {
    if (sections.has(section) || section.getAttribute('aria-busy') === 'true') return
    sections.add(section)
    if (observer) observer.observe(section)
    else section.setAttribute('data-motion-active', '')
  }
  document.querySelectorAll(selector).forEach(register)

  // React.lazy replaces Suspense placeholders after Layout's effect has run.
  // Observe the real section as it mounts, including SPA navigation and HMR.
  const mounts = new MutationObserver((records) => {
    for (const section of sections) {
      if (!section.isConnected) {
        observer?.unobserve(section)
        sections.delete(section)
      }
    }
    for (const record of records) {
      for (const node of record.addedNodes) {
        if (node.nodeType !== 1) continue
        if (node.matches(selector)) register(node)
        node.querySelectorAll(selector).forEach(register)
      }
    }
  })
  mounts.observe(document.getElementById('main') || document.body, { childList: true, subtree: true })
  return () => {
    mounts.disconnect()
    observer?.disconnect()
    sections.forEach((section) => section.removeAttribute('data-motion-active'))
    sections.clear()
  }
}
