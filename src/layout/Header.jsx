import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import Img from "../components/ui/Img";
import Icon from "../components/ui/Icons";
import { useContactPopup } from "../components/ContactPopup";
import OrbitLines from "../components/ui/OrbitLines";
import { siteMeta } from "../data/project";
import { isFilled } from "../lib/filled";
import { mainNav } from "../seo/site-meta";

const navCls =
  "inline-flex items-center py-2 font-display text-[length:calc(0.92rem*var(--type-scale))] xl:text-[length:calc(1.045rem*var(--type-scale))] leading-[1.1] font-medium text-white no-underline transition-colors duration-300 hover:text-q-lime";

// Header dính đầu trang (sticky, cao cố định --header-h). Nút "Tư vấn" luôn thấy cả trên điện thoại.
export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const popup = useContactPopup();

  useEffect(() => setOpen(false), [pathname, hash])
  // Link cùng trang cuộn thẳng (Layout → useSamePageHashLinks), không đổi location của router → đóng menu ở đây
  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('qtopia:hash-nav', close)
    return () => window.removeEventListener('qtopia:hash-nav', close)
  }, []);
  // Menu mở: khoá cuộn trang, Esc để đóng
  useEffect(() => {
    if (!open) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    // Bấm mục menu cùng trang: mở khoá ngay (đồng bộ) để lệnh cuộn tới section không bị chặn
    const unlock = () => { document.body.style.overflow = previousOverflow }
    window.addEventListener('keydown', onKey)
    window.addEventListener('qtopia:before-hash-nav', unlock)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('qtopia:before-hash-nav', unlock)
    }
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-[#062aa3] shadow-[inset_0_-1px_0_rgba(255,255,255,0.08)]">
      <div className="container-page header-container relative flex h-[var(--header-h)] items-center justify-between gap-3">
        <Link
          to="/"
          aria-label="QTOPIA — về trang chủ"
          className="flex min-h-11 shrink-0 items-center"
        >
          <Img
            src="/images/brand/logo-horizontal-white.png"
            alt="QTOPIA"
            className="h-7 w-auto sm:h-8 lg:h-9"
          />
        </Link>

        <nav
          aria-label="Menu chính"
          className="hidden items-center gap-3 whitespace-nowrap xl:flex xl:gap-6"
        >
          {mainNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              title={item.title}
              className={navCls}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <button
            type="button"
            onClick={() => popup.open("header")}
            data-cta-name="header_consult"
            data-cta-location="header"
            className="btn-base btn-primary min-w-24 shrink-0 whitespace-nowrap !px-4 text-[length:calc(1.045rem*var(--type-scale))] leading-[1.1] lg:w-40"
          >
            TƯ VẤN
          </button>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Đóng menu" : "Mở menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid size-12 cursor-pointer place-items-center text-white xl:hidden"
          >
            <Icon name={open ? "close" : "menu"} size={24} />
          </button>
        </div>
      </div>

      {/* Menu mobile: ngăn trượt từ mép phải, render ra <body> nên không đẩy bố cục trang.
          Nền giống section Vị trí (xanh brand + Orbit Lines + lớp phủ). */}
      {open && typeof document !== "undefined"
        ? createPortal(
            <div className="fixed inset-0 z-[110] flex justify-end xl:hidden">
              <button
                type="button"
                aria-label="Đóng menu"
                onClick={() => setOpen(false)}
                className="side-drawer-backdrop absolute inset-0 cursor-default border-0 bg-q-navy/70 p-0 backdrop-blur-sm"
              />
              <nav
                id="mobile-nav"
                aria-label="Menu di động"
                className="side-drawer brand-orbit-bg relative flex h-full w-[min(360px,86vw)] flex-col overflow-hidden text-white shadow-[-20px_0_50px_-20px_rgb(0_0_0/0.6)]"
              >
                <OrbitLines />
                <div className="relative z-10 flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-white/10 pl-5 pr-2">
                  <Img src="/images/brand/logo-horizontal-white.png" alt="QTOPIA" className="h-7 w-auto" />
                  <button
                    type="button"
                    aria-label="Đóng menu"
                    onClick={() => setOpen(false)}
                    className="grid size-12 cursor-pointer place-items-center text-white"
                  >
                    <Icon name="close" size={24} />
                  </button>
                </div>
                <ul className="relative z-10 m-0 flex min-h-0 flex-1 list-none flex-col overflow-y-auto px-5 py-3">
                  {mainNav.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        title={item.title}
                        onClick={() => setOpen(false)}
                        className="flex min-h-13 items-center justify-between border-b border-white/10 font-display text-[length:calc(1.15rem*var(--type-scale))] leading-[1.1] font-semibold text-white no-underline transition-colors hover:text-q-lime"
                      >
                        {item.label}
                        <Icon name="arrow" size={18} className="text-white/50" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="relative z-10 flex shrink-0 flex-col gap-2 border-t border-white/10 px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-4">
                  <button
                    type="button"
                    onClick={() => { setOpen(false); popup.open("mobile_menu"); }}
                    data-cta-name="menu_consult"
                    data-cta-location="mobile_menu"
                    className="btn-base btn-primary w-full"
                  >
                    Nhận tư vấn
                  </button>
                  {isFilled(siteMeta.hotline) && siteMeta.hotlineHref ? (
                    <a
                      href={siteMeta.hotlineHref}
                      data-cta-location="mobile_menu"
                      className="btn-base w-full border border-white/30 text-white no-underline hover:bg-white/10"
                    >
                      <Icon name="phone" size={18} />
                      {siteMeta.hotline}
                    </a>
                  ) : null}
                </div>
              </nav>
            </div>,
            document.body,
          )
        : null}
    </header>
  );
}
