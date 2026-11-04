import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ValueNav from './ValueNav'
import FloatingButtons from './FloatingButtons'
import Seo from '../components/Seo'
import { ContactPopupProvider } from '../components/ContactPopup'
import { initDelegatedTracking, loadGtm, track, trackScrollDepth, trackSectionViews } from '../lib/analytics'
import { captureFirstTouch } from '../lib/utm'
import { pauseOffscreenMotion } from '../lib/motion'

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
    return initDelegatedTracking()
  }, [])

  // mỗi route: page_view (SPA), scroll_depth, section_view
  useEffect(() => {
    track('page_view', { page_path: pathname, page_title: document.title })
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
