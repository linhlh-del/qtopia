import { lazy, Suspense } from 'react'

/* Component tải chậm có thể "preload" phía server.
   - Trình duyệt: React.lazy như bình thường (tách bundle).
   - Prerender: entry-server gọi preloadAll() trước khi render → component đã có sẵn, render đồng bộ
     bên trong Suspense → HTML hoàn chỉnh, không có ranh giới treo, không có script inline $RC để ghép nội dung. */
const registry = []

export function preloadable(loader) {
  const entry = { loader, mod: null }
  registry.push(entry)
  const Lazy = lazy(loader)
  function Preloadable(props) {
    const C = typeof window === 'undefined' && entry.mod ? entry.mod.default : Lazy
    return <C {...props} />
  }
  return Preloadable
}

export async function preloadAll() {
  await Promise.all(registry.map(async (e) => { e.mod = e.mod || (await e.loader()) }))
}

// Section trang chủ: giữ HTML prerender, chỉ tải JS khi section gần khung nhìn (hydrate muộn).
export function deferredSection(id, loader) {
  const Component = lazy(async () => {
    // Chỉ hoãn khi đang hydrate HTML prerender của lần tải trang đầu. Chuyển trang trong ứng dụng
    // (window.__qtopiaHydrated = true, đặt trong Layout) → tải ngay, không chờ cuộn.
    if (typeof window !== 'undefined' && !window.__qtopiaHydrated) {
      const section = document.getElementById(id)
      if (section && 'IntersectionObserver' in window) {
        // Tải khi section gần khung nhìn — HOẶC ngay khi khách chuyển trang trong ứng dụng (sự kiện
        // qtopia:route-change từ Layout). Nếu không, lần render trang mới sẽ chờ một section không bao giờ
        // được cuộn tới (phần tử cũ đã bị gỡ khỏi DOM) → điều hướng đứng im.
        await new Promise((resolve) => {
          const done = () => {
            observer.disconnect()
            window.removeEventListener('qtopia:route-change', done)
            resolve()
          }
          const observer = new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) done()
          }, { rootMargin: '600px' })
          observer.observe(section)
          window.addEventListener('qtopia:route-change', done, { once: true })
        })
      }
    }
    return loader()
  })
  const entry = { loader, mod: null }
  registry.push(entry)
  return function DeferredSection(props) {
    const C = typeof window === 'undefined' && entry.mod ? entry.mod.default : Component
    return <Suspense fallback={<section id={id} className="section-screen" aria-busy="true" />}><C {...props} /></Suspense>
  }
}
