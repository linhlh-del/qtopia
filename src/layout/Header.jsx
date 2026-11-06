import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Img from "../components/ui/Img";
import Icon from "../components/ui/Icons";
import { useContactPopup } from "../components/ContactPopup";
import { mainNav } from "../seo/site-meta";

const navCls =
  "inline-flex items-center py-2 font-display text-[length:calc(0.92rem*var(--type-scale))] xl:text-[length:calc(1.045rem*var(--type-scale))] leading-[1.1] font-medium text-white/85 no-underline transition-colors duration-300 hover:text-q-lime";

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

  return (
    <header className="sticky top-0 z-40 bg-q-navy shadow-[inset_0_-1px_0_rgba(255,255,255,0.08)]">
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

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Menu di động"
          className="max-h-[calc(100svh-var(--header-h)-var(--bar-h))] overflow-y-auto border-t border-white/10 bg-q-navy xl:hidden"
        >
          <ul className="container-page m-0 flex list-none flex-col py-3">
            {mainNav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  title={item.title}
                  className="flex min-h-12 items-center border-b border-white/10 font-display text-[length:calc(1.1rem*var(--type-scale))] leading-[1.1] font-medium text-white no-underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
