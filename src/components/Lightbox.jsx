import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Img from './ui/Img'

/* Xem ảnh phóng to ngay trên trang (không mở tab mới).
   - <LightboxProvider> bọc vùng nội dung; <ZoomImage> là ảnh bấm được để phóng to.
   - Đóng bằng nút ×, phím Esc, hoặc bấm ra vùng nền. Khoá cuộn trang khi đang mở.
   - Ảnh vẫn nằm trong <a href> trỏ tới file gốc: không có JS thì vẫn xem được (bot cũng đọc được). */

const Ctx = createContext(null)

export function LightboxProvider({ children }) {
  const [item, setItem] = useState(null)
  const [zoomed, setZoomed] = useState(false)
  const closeRef = useRef(null)
  const lastFocus = useRef(null)
  const close = useCallback(() => setItem(null), [])
  const open = useCallback((next) => {
    lastFocus.current = document.activeElement
    setZoomed(false)
    setItem(next)
  }, [])

  useEffect(() => {
    if (!item) return undefined
    const onKey = (e) => e.key === 'Escape' && close()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
      lastFocus.current?.focus?.()
    }
  }, [item, close])

  return (
    <Ctx.Provider value={open}>
      {children}
      {item && typeof document !== 'undefined'
        ? createPortal(
            <div
              className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/88 p-3 backdrop-blur-sm sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-label={item.caption || item.alt}
              onClick={close}
            >
              <button
                ref={closeRef}
                type="button"
                aria-label="Đóng ảnh phóng to"
                onClick={close}
                className="absolute right-3 top-3 z-10 grid size-12 cursor-pointer place-items-center rounded-full bg-white/15 text-3xl leading-none text-white hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-q-lime sm:right-5 sm:top-5"
              >
                ×
              </button>
              <figure onClick={(e) => e.stopPropagation()} className="m-0 flex max-h-full w-full max-w-6xl flex-col items-center">
                {/* Chạm ảnh để phóng 2× rồi kéo/vuốt để xem chi tiết (hữu ích cho layout trên điện thoại) */}
                <div className={`max-h-[78svh] w-full rounded-lg ${zoomed ? 'overflow-auto overscroll-contain' : 'flex justify-center overflow-hidden'}`}>
                  <button
                    type="button"
                    onClick={() => setZoomed((z) => !z)}
                    aria-pressed={zoomed}
                    aria-label={zoomed ? 'Thu nhỏ ảnh' : 'Phóng to chi tiết ảnh'}
                    className={`block p-0 ${zoomed ? 'w-[200%] max-w-none cursor-zoom-out' : 'cursor-zoom-in'}`}
                  >
                    <Img
                      src={item.src}
                      alt={item.alt}
                      priority
                      fade={false}
                      sizes="200vw"
                      className={`block rounded-lg bg-white ${zoomed ? 'h-auto w-full' : 'max-h-[78svh] w-auto max-w-full object-contain'}`}
                    />
                  </button>
                </div>
                <figcaption className="mt-3 max-w-3xl text-center text-sm text-white/85">
                  {item.caption ? <span className="block">{item.caption}</span> : null}
                  <span className="mt-1 block text-xs text-white/60">{zoomed ? 'Kéo để xem · chạm ảnh để thu nhỏ' : 'Chạm vào ảnh để phóng to chi tiết'}</span>
                </figcaption>
              </figure>
            </div>,
            document.body,
          )
        : null}
    </Ctx.Provider>
  )
}

/** Ảnh bấm để phóng to. Ngoài provider thì hoạt động như link ảnh bình thường. */
export function ZoomImage({ src, alt, caption, sizes, className = '', imgClassName = 'block h-auto w-full' }) {
  const open = useContext(Ctx)
  return (
    <a
      href={src}
      data-zoom=""
      onClick={(e) => {
        if (!open) return
        e.preventDefault()
        open({ src, alt, caption })
      }}
      aria-label={`Phóng to ảnh: ${caption || alt}`}
      className={`group relative block cursor-zoom-in overflow-hidden ${className}`}
    >
      <Img src={src} alt={alt} sizes={sizes} className={imgClassName} />
      <span aria-hidden="true" className="absolute bottom-2 right-2 rounded-full bg-q-navy/80 px-3 py-1 text-xs font-semibold text-white opacity-90 transition-opacity group-hover:opacity-100">
        Phóng to ⤢
      </span>
    </a>
  )
}

/** Nút chữ mở lightbox (vd. "Xem ảnh lớn"). */
export function ZoomLink({ src, alt, caption, children, className = '' }) {
  const open = useContext(Ctx)
  return (
    <a
      href={src}
      data-zoom=""
      onClick={(e) => {
        if (!open) return
        e.preventDefault()
        open({ src, alt, caption })
      }}
      className={className}
    >
      {children}
    </a>
  )
}
