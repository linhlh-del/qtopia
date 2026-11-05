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
    if (typeof window !== 'undefined') {
      const section = document.getElementById(id)
      if (section && 'IntersectionObserver' in window) {
        await new Promise((resolve) => {
          const observer = new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
              observer.disconnect()
              resolve()
            }
          }, { rootMargin: '600px' })
          observer.observe(section)
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
