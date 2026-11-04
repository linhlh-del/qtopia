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

/* Cuộn tới section khi URL có #id (nav, CTA, link chia sẻ); trang khác → về đầu trang.
   Mở thẳng link: ~1,5 giây đầu bố cục còn đổi (ảnh, font) → căn lại section dưới header mỗi lần đổi,
   dừng ngay khi người dùng tự cuộn / chạm / gõ phím. scroll-padding-top của <html> đã tính chiều cao header. */
function useScrollToSection() {
  const { pathname, hash, key } = useLocation()
  useEffect(() => {
    const id = hash ? decodeURIComponent(hash.slice(1)) : ''
    if (!id) {
      window.scrollTo(0, 0)
      return undefined
    }
    const el = () => document.getElementById(id)
    const t = setTimeout(() => el()?.scrollIntoView({ block: 'start' }), 0)
    let stop = false
    const ro = new ResizeObserver(() =>
      requestAnimationFrame(() => {
        const target = el()
        const header = document.querySelector('header')?.getBoundingClientRect().height || 0
        if (!stop && target && Math.abs(target.getBoundingClientRect().top - header) > 2) {
          target.scrollIntoView({ block: 'start', behavior: 'auto' })
        }
      }),
    )
    ro.observe(document.getElementById('main') || document.body)
    const quit = () => {
      stop = true
      ro.disconnect()
    }
    const timer = setTimeout(quit, 1500)
    const evs = ['wheel', 'touchstart', 'keydown', 'pointerdown']
    evs.forEach((ev) => window.addEventListener(ev, quit, { passive: true, once: true }))
    return () => {
      clearTimeout(t)
      clearTimeout(timer)
      quit()
      evs.forEach((ev) => window.removeEventListener(ev, quit))
    }
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
    return () => {
      stopScroll()
      stopSections()
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
