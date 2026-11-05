import { lazy, Suspense } from 'react'

// Prerender keeps the full section HTML. Hydration waits until that section is near view.
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
  return function DeferredSection(props) {
    return <Suspense fallback={<section id={id} className="section-screen" aria-busy="true" />}><Component {...props} /></Suspense>
  }
}
