import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Icon from '../components/ui/Icons'
import { useContactPopup } from '../components/ContactPopup'
import { siteMeta } from '../data/project'
import { isFilled } from '../lib/filled'

/* CTA cố định tới 4 giá trị chính của dự án (đo thứ tự ưu tiên bằng event click_cta):
   Vị trí → Tiện ích → Mặt bằng → Đăng ký bảng giá.
   - Điện thoại / tablet (< 1024px): thanh sticky đáy Khám phá | Gọi | Zalo | Nhận bảng giá
   - Máy tính (≥ 1280px): cột icon dọc mép trái, hiện sau hero, tô đậm section đang xem */
const ITEMS = [
  { key: 'vi-tri', id: 'vi-tri', to: '/#vi-tri', icon: 'pin', label: 'Vị trí' },
  { key: 'tien-ich', id: 'tien-ich', to: '/#tien-ich', icon: 'star', label: 'Tiện ích' },
  { key: 'mat-bang', id: 'mat-bang', to: '/#mat-bang', icon: 'plan', label: 'Mặt bằng' },
  { key: 'lien-he', id: 'lien-he', to: '/#lien-he', icon: 'doc', label: 'Đăng ký' },
]
const IDS = ITEMS.map((i) => i.id)

function useActiveSection(pathname) {
  const [active, setActive] = useState(null)
  useEffect(() => {
    let frame = 0
    const check = () => {
      frame = 0
      const mid = window.innerHeight / 2
      const hit = IDS.find((id) => {
        const r = document.getElementById(id)?.getBoundingClientRect()
        return r && r.top <= mid && r.bottom >= mid
      })
      setActive(hit || null)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check)
    }
    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [pathname])
  return active
}

function usePastHero() {
  const [past, setPast] = useState(false)
  useEffect(() => {
    let frame = 0
    const check = () => {
      frame = 0
      setPast(window.scrollY > window.innerHeight * 0.6)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check)
    }
    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])
  return past
}

const barItem =
  'flex h-[calc(var(--bar-h)-1px)] items-center justify-center no-underline'

export default function ValueNav() {
  const { pathname } = useLocation()
  const popup = useContactPopup()
  const active = useActiveSection(pathname)
  const pastHero = usePastHero()
  const [explore, setExplore] = useState(false)
  const barRef = useRef(null)

  useEffect(() => setExplore(false), [pathname])
  useEffect(() => {
    if (!explore) return undefined
    const onDown = (e) => {
      if (!barRef.current?.contains(e.target)) setExplore(false)
    }
    const onKey = (e) => e.key === 'Escape' && setExplore(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [explore])

  return (
    <>
      {/* Điện thoại / tablet: thanh sticky đáy */}
      <nav
        ref={barRef}
        aria-label="Lối tắt nhanh"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-q-navy pb-[env(safe-area-inset-bottom)] text-white lg:hidden"
      >
        <div
          id="explore-sheet"
          hidden={!explore}
          className="absolute inset-x-0 bottom-full border-t border-white/10 bg-q-navy px-5 pb-4 pt-3 shadow-[0_-12px_30px_rgba(5,10,46,0.35)]"
        >
          <ul className="m-0 grid list-none grid-cols-2 gap-2 p-0 sm:grid-cols-4">
            {ITEMS.map((it) => (
              <li key={it.key}>
                <Link
                  to={it.to}
                  onClick={() => setExplore(false)}
                  data-cta-name={`value_nav_${it.key}`}
                  data-cta-location="sticky_bar_explore"
                  aria-current={active === it.id ? 'true' : undefined}
                  className={`flex min-h-12 items-center gap-3 rounded-2xl border px-4 font-display text-sm font-semibold no-underline ${
                    active === it.id ? 'border-q-lime bg-white/10 text-q-lime' : 'border-white/15 text-white'
                  }`}
                >
                  <Icon name={it.icon} />
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <ul className={`m-0 grid list-none p-0 ${isFilled(siteMeta.hotline) && isFilled(siteMeta.zalo) ? 'grid-cols-4' : isFilled(siteMeta.hotline) || isFilled(siteMeta.zalo) ? 'grid-cols-3' : 'grid-cols-2'}`}>
          <li>
            <button
              type="button"
              onClick={() => setExplore((v) => !v)}
              aria-expanded={explore}
              aria-controls="explore-sheet"
              aria-label={explore ? 'Đóng danh mục lối tắt' : 'Mở danh mục: vị trí, tiện ích, mặt bằng'}
              className={`${barItem} w-full cursor-pointer border-0 border-r border-white/10 ${explore ? 'bg-white/10' : 'bg-transparent'} text-white`}
            >
              <Icon name="grid" size={24} />
            </button>
          </li>
          {isFilled(siteMeta.hotline) && siteMeta.hotlineHref ? <li>
            <a href={siteMeta.hotlineHref} data-cta-location="sticky_bar" aria-label="Gọi hotline tư vấn" className={`${barItem} text-white`}>
              <Icon name="phone" size={24} />
            </a>
          </li> : null}
          {isFilled(siteMeta.zalo) ? <li>
            <a
              href={siteMeta.zalo}
              target="_blank"
              rel="noopener"
              data-cta-location="sticky_bar"
              aria-label="Chat Zalo với tư vấn viên"
              className={`${barItem} border-x border-white/10 text-white`}
            >
              <span aria-hidden="true" className="font-display text-[length:calc(1rem*var(--type-scale))] font-extrabold leading-none tracking-tight">Zalo</span>
            </a>
          </li> : null}
          <li>
            <button
              type="button"
              onClick={() => popup.open('sticky_bar')}
              data-cta-name="sticky_price"
              data-cta-location="sticky_bar"
              aria-label="Nhận thông tin dự án"
              className="cta-fx flex h-full min-h-[calc(var(--bar-h)-1px)] w-full cursor-pointer items-center justify-center border-0 bg-[var(--cta-form)] text-white"
            >
              <Icon name="doc" size={24} />
            </button>
          </li>
        </ul>
      </nav>

      {/* Máy tính: cột icon dọc mép trái, hiện sau hero */}
      <nav
        aria-label="Điều hướng nhanh tới giá trị chính"
        className={`fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 transition-all duration-[var(--dur-slow)] xl:block ${
          pastHero ? 'opacity-100' : 'pointer-events-none -translate-x-4 opacity-0'
        }`}
      >
        <ul className="m-0 flex list-none flex-col items-start gap-2 p-0">
          {ITEMS.map((it) => (
            <li key={it.key}>
              <Link
                to={it.to}
                aria-label={it.label}
                title={it.label}
                aria-current={active === it.id ? 'true' : undefined}
                tabIndex={pastHero ? 0 : -1}
                data-cta-name={`value_nav_${it.key}`}
                data-cta-location="side_rail"
                className={`group relative grid size-12 place-items-center rounded-full border no-underline shadow-soft transition-colors duration-300 ${
                  active === it.id ? 'border-q-lime bg-q-navy text-q-lime ring-2 ring-white/70' : 'border-q-navy/15 bg-white/95 text-q-navy hover:bg-white'
                }`}
              >
                <Icon name={it.icon} />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap rounded-full bg-q-navy px-3 py-1.5 font-display text-xs font-semibold text-white opacity-0 shadow-soft transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  {it.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
