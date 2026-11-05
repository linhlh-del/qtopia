import { useEffect, useRef } from 'react'

// Hiệu ứng xuất hiện khi cuộn tới. Dùng thuộc tính data-reveal (pending → visible) thay vì class,
// vì React ghi đè className mỗi lần render. Trước khi JS chạy (SSR / bot) nội dung hiển thị bình thường.
export function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.setAttribute('data-reveal', 'visible')
      return undefined
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-reveal', 'visible')
            io.unobserve(entry.target)
          } else {
            entry.target.setAttribute('data-reveal', 'pending')
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}
