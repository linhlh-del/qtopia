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
    const timer = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }), 0)
    return () => window.clearTimeout(timer)
  }, [pathname, hash, key])
}

// Bật hiệu ứng chỉ khi JS đã chạy: bản prerender / bot vẫn thấy ảnh hiển thị bình thường.
if (typeof document !== 'undefined') document.documentElement.classList.add('js-ready')

export default function Layout() {
  const { pathname } = useLocation()
  useScrollToSection()

  // một lần: UTM đầu tiên, GTM, listener CTA
  useEffect(() => {
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
