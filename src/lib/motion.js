// Chỉ chạy các nét SVG lặp vô hạn khi phần bản đồ đang ở gần khung nhìn.
export function pauseOffscreenMotion() {
  const sections = document.querySelectorAll('#vi-tri, #tien-ich')
  let scrollTimer = 0
  const onScroll = () => {
    if (!document.documentElement.hasAttribute('data-motion-scrolling')) {
      document.documentElement.setAttribute('data-motion-scrolling', '')
    }
    window.clearTimeout(scrollTimer)
    scrollTimer = window.setTimeout(() => {
      document.documentElement.removeAttribute('data-motion-scrolling')
    }, 160)
  }
  window.addEventListener('scroll', onScroll, { passive: true })

  const stopScrollMotion = () => {
    window.removeEventListener('scroll', onScroll)
    window.clearTimeout(scrollTimer)
    document.documentElement.removeAttribute('data-motion-scrolling')
  }
  if (!('IntersectionObserver' in window)) {
    sections.forEach((section) => section.setAttribute('data-motion-active', ''))
    return stopScrollMotion
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) target.setAttribute('data-motion-active', '')
        else target.removeAttribute('data-motion-active')
      })
    },
    { rootMargin: '20% 0px', threshold: 0 },
  )
  sections.forEach((section) => observer.observe(section))
  return () => {
    observer.disconnect()
    stopScrollMotion()
  }
}
