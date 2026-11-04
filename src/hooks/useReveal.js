import { useEffect, useRef } from 'react'

// Hiệu ứng xuất hiện khi cuộn tới. Dùng thuộc tính data-reveal (pending → visible) thay vì class,
// vì React ghi đè className mỗi lần render. Trước khi JS chạy (SSR / bot) nội dung hiển thị bình thường.
export function useReveal(options = {}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.setAttribute('data-reveal', 'visible')
      return undefined
    }
    // đã nằm trong khung nhìn lúc tải → hiện ngay, không nháy ẩn rồi hiện
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight * 0.92) {
      el.setAttribute('data-reveal', 'visible')
      return undefined
    }
    el.setAttribute('data-reveal', 'pending')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-reveal', 'visible')
            io.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08, ...options },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}
