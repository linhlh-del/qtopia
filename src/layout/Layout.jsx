import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ValueNav from './ValueNav'
import FloatingButtons from './FloatingButtons'
import Seo from '../components/Seo'
import { ContactPopupProvider } from '../components/ContactPopup'
import { initDelegatedTracking, loadGtm, trackPageView, trackScrollDepth, trackSectionViews, trackWebVitals } from '../lib/analytics'
import { captureFirstTouch } from '../lib/utm'
import { pauseOffscreenMotion } from '../lib/motion'
import { cmsPageView, initCmsTracker } from '../cms/tracker'

/* Cuộn tới section khi URL có #id; chỉ cuộn một lần để không giành quyền cuộn của người dùng.
   scroll-padding-top của <html> đã tính chiều cao header. */
function useScrollToSection() {
  const { pathname, hash, key } = useLocation()
  useEffect(() => {
    const id = hash ? decodeURIComponent(hash.slice(1)) : ''
    if (!id) {
      window.scrollTo(0, 0)
      return undefined
    }
    const go = (behavior) => document.getElementById(id)?.scrollIntoView({ block: 'start', behavior })
    const timer = window.setTimeout(() => go(), 0)
    // Vừa chuyển trang: các section phía trên còn đang tải và đổi chiều cao → bám theo section đích
    // trong 2,5 giây; dừng ngay khi khách tự cuộn / chạm / bấm phím.
    let userMoved = false
    const stop = () => { userMoved = true }
    const opts = { passive: true, once: true }
    window.addEventListener('wheel', stop, opts)
    window.addEventListener('touchstart', stop, opts)
    window.addEventListener('keydown', stop, opts)
    const main = document.getElementById('main')
    const ro = 'ResizeObserver' in window && main ? new ResizeObserver(() => { if (!userMoved) go('instant') }) : null
    ro?.observe(main)
    const done = window.setTimeout(() => ro?.disconnect(), 2500)
    return () => {
      window.clearTimeout(timer)
      window.clearTimeout(done)
      ro?.disconnect()
      window.removeEventListener('wheel', stop)
      window.removeEventListener('touchstart', stop)
      window.removeEventListener('keydown', stop)
    }
  }, [pathname, hash, key])
}

/* Link tới section trên CÙNG trang (vd. menu "/#vi-tri" khi đang ở trang chủ): cuộn thẳng tới section,
   không đi qua React Router. Lý do: router chuyển trang trong một transition; các section tải chậm
   (deferredSection) chỉ tải JS khi gần khung nhìn → transition chờ section, section chờ cuộn → đứng im.
   Chỉ preventDefault (không chặn lan truyền) để các listener đo click (GA4, dashboard CMS) vẫn chạy;
   <Link> của React Router tự bỏ qua khi event đã bị preventDefault. */
function useSamePageHashLinks() {
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = e.target.closest?.('a[href]')
      if (!a || (a.target && a.target !== '_self')) return
      const url = new URL(a.getAttribute('href'), window.location.href)
      if (url.origin !== window.location.origin) return
      if (url.pathname !== window.location.pathname) {
        // sắp chuyển sang trang khác: cho các section tải chậm tải ngay để router không phải chờ chúng
        window.dispatchEvent(new Event('qtopia:route-change'))
        return
      }
      if (!url.hash) return
      const el = document.getElementById(decodeURIComponent(url.hash.slice(1)))
      if (!el) return
      e.preventDefault()
      el.scrollIntoView({ block: 'start' })
      if (window.location.hash !== url.hash) window.history.pushState(window.history.state, '', url.hash)
      window.dispatchEvent(new CustomEvent('qtopia:hash-nav', { detail: url.hash }))
    }
    const onPop = () => window.dispatchEvent(new Event('qtopia:route-change'))
    document.addEventListener('click', onClick, true)
    window.addEventListener('popstate', onPop)
    return () => {
      document.removeEventListener('click', onClick, true)
      window.removeEventListener('popstate', onPop)
    }
  }, [])
}

// Bật hiệu ứng chỉ khi JS đã chạy: bản prerender / bot vẫn thấy ảnh hiển thị bình thường.
if (typeof document !== 'undefined') document.documentElement.classList.add('js-ready')

export default function Layout() {
  const { pathname } = useLocation()
  useScrollToSection()
  useSamePageHashLinks()

  // một lần: UTM đầu tiên, GTM, listener CTA
  useEffect(() => {
    window.__qtopiaHydrated = true // từ đây các section tải chậm không hoãn nữa (xem DeferredSection)
    captureFirstTouch()
    loadGtm()
    // Dashboard CMS (online, lượt xem, click, lead): tracker nhẹ, gửi theo lô bằng sendBeacon; lỗi thì bỏ qua.
    try {
      initCmsTracker({ clicks: true })
      cmsPageView(window.location.pathname)
    } catch {
      /* tracker lỗi không ảnh hưởng trang */
    }
    const stopWebVitals = trackWebVitals()
    const stopTracking = initDelegatedTracking()
    return () => {
      stopWebVitals()
      stopTracking()
    }
  }, [])

  // mỗi route: page_view (SPA), scroll_depth, section_view
  useEffect(() => {
    trackPageView({ page_path: pathname, page_title: document.title })
    cmsPageView(pathname)
    const stopScroll = trackScrollDepth()
    const stopSections = trackSectionViews()
    const stopMotion = pauseOffscreenMotion()
    return () => {
      stopScroll()
      stopSections()
      stopMotion()
    }
  }, [pathname])

  return (
    <ContactPopupProvider>
      <Seo />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:font-semibold focus:text-q-navy"
      >
        Bỏ qua, tới nội dung chính
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      <ValueNav />
      <FloatingButtons />
    </ContactPopupProvider>
  )
}
