import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import LeadFormFields from './LeadFormFields'
import Icon from './ui/Icons'
import Img from './ui/Img'
import { leadFormContent } from '../data/project'

const Ctx = createContext({ open: () => {} })
export const useContactPopup = () => useContext(Ctx)

const SEEN_KEY = 'qtopia_popup_seen'

// Section "Tổng quan dự án" (Facts): popup tự mở khi khách đã lướt qua section này
const OVERVIEW_ID = 'so-lieu'
// trang không có section tổng quan: tự mở khi đã cuộn quá nửa trang
const FALLBACK_DEPTH = 0.5

// Popup đăng ký tư vấn (dùng <dialog> gốc: Esc đóng, giữ focus trong hộp thoại).
// Tự mở 1 lần/phiên, KHÔNG mở khi vừa vào trang: chỉ khi khách đã lướt qua section tổng quan; có nút đóng, không bật lặp lại.
export function ContactPopupProvider({ autoOpen = true, children }) {
  const ref = useRef(null)
  const [source, setSource] = useState('popup')
  const [session, setSession] = useState(0) // đổi mỗi lần mở → form được làm mới

  const open = useCallback((from = 'popup') => {
    const dlg = ref.current
    if (!dlg || dlg.open) return
    setSource(from)
    setSession((n) => n + 1)
    dlg.showModal()
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      /* bỏ qua */
    }
  }, [])

  // Mở khi đáy section tổng quan lên tới 30% trên của màn hình (section kế tiếp đã chiếm phần lớn màn hình).
  // Không mở trên trang cảm ơn, không cắt ngang khi khách đang gõ vào form khác (thử lại ở lần cuộn sau).
  useEffect(() => {
    const seen = () => {
      try {
        return sessionStorage.getItem(SEEN_KEY) === '1'
      } catch {
        return true
      }
    }
    if (!autoOpen || seen()) return undefined
    const passed = () => {
      const el = document.getElementById(OVERVIEW_ID)
      if (el) return el.getBoundingClientRect().bottom <= window.innerHeight * 0.3
      const max = document.documentElement.scrollHeight - window.innerHeight
      return max > 0 && window.scrollY / max >= FALLBACK_DEPTH
    }
    const onScroll = () => {
      if (seen()) return window.removeEventListener('scroll', onScroll)
      if (window.location.pathname.includes('/cam-on') || document.activeElement?.closest?.('form') || !passed()) return
      window.removeEventListener('scroll', onScroll)
      open('popup_auto')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [autoOpen, open])

  const value = useMemo(() => ({ open }), [open])

  return (
    <Ctx.Provider value={value}>
      {children}
      <dialog
        ref={ref}
        aria-labelledby="popup-title"
        onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
        className="m-auto w-[min(94vw,46rem)] overflow-y-auto overflow-x-hidden rounded-[1.75rem] border-0 bg-white p-0 shadow-card backdrop:bg-q-navy/70 backdrop:backdrop-blur-sm"
      >
        {/* Một bên ảnh dự án, một bên biểu mẫu (ảnh ẩn trên điện thoại để form luôn vừa màn hình) */}
        <div className="relative grid sm:grid-cols-2">
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label="Đóng hộp thoại đăng ký"
            title="Đóng"
            className="absolute right-3 top-3 z-10 grid size-11 place-items-center rounded-full bg-white/80 text-q-muted backdrop-blur hover:bg-q-sand"
          >
            <Icon name="close" />
          </button>

          <div className="relative max-sm:hidden">
            <Img
              src={leadFormContent.image}
              alt="Phối cảnh dự án căn hộ QTOPIA nhìn từ biển"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-q-navy/85 to-q-navy/10" />
            <p className="absolute bottom-5 left-5 right-5 m-0 font-display text-lg font-bold text-white drop-shadow">
              Tìm hiểu thêm về QTOPIA
            </p>
          </div>

          <div className="p-5 sm:p-7">
            <span className="section-label">Đăng ký tư vấn</span>
            <h2 id="popup-title" className="mt-2 font-display text-xl font-extrabold text-q-navy">
              Nhận thông tin QTOPIA
            </h2>
            <p className="mb-4 mt-1.5 text-sm text-q-muted">Để lại thông tin, chuyên viên sẽ liên hệ sớm nhất.</p>
            <LeadFormFields key={session} formLocation={source} showNeed />
          </div>
        </div>
      </dialog>
    </Ctx.Provider>
  )
}
