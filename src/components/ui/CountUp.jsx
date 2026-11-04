import { useEffect, useRef } from 'react'

// Số liệu đếm tăng dần, chạy 1 lần khi cuộn tới.
// Giá trị cuối LUÔN nằm trong DOM (bot đọc được); số đang quay vẽ bằng ::after qua data-display,
// nên crawler không bao giờ đọc phải số dở dang. Không dùng state → không re-render mỗi khung hình.
export default function CountUp({ value, duration = 1400, className = '' }) {
  const text = String(value)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const match = text.match(/\d+/)
    if (!match) return undefined
    const target = Number(match[0])
    const width = match[0].length
    const prefix = text.slice(0, match.index)
    const suffix = text.slice(match.index + width)

    let raf = 0
    let io = null
    let cancelled = false

    const finish = () => {
      el.dataset.state = 'done'
      delete el.dataset.display
    }

    const run = () => {
      if (cancelled) return
      const t0 = performance.now()
      el.dataset.state = 'running'
      const loop = (now) => {
        if (cancelled) return
        const p = Math.min((now - t0) / duration, 1)
        const eased = 1 - (1 - p) ** 3
        el.dataset.display = `${prefix}${String(Math.floor(target * eased)).padStart(width, '0')}${suffix}`
        if (p >= 1) return finish()
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    }

    el.dataset.state = 'armed'
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io.disconnect()
            run()
          }
        },
        { threshold: 0.3 },
      )
      io.observe(el)
    } else {
      run()
    }

    return () => {
      cancelled = true
      io?.disconnect()
      cancelAnimationFrame(raf)
      delete el.dataset.state
      delete el.dataset.display
    }
  }, [text, duration])

  return (
    <span ref={ref} className={`countup ${className}`}>
      <span className="countup__final">{text}</span>
    </span>
  )
}
