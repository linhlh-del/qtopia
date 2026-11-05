import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Img from "../components/ui/Img";
import Icon from "../components/ui/Icons";
import { useContactPopup } from "../components/ContactPopup";
import { mainNav } from "../seo/site-meta";

const navCls =
  "font-display text-[0.92rem] xl:text-[1.045rem] leading-[1.1] font-medium text-white/85 no-underline transition-colors duration-300 hover:text-q-lime";

// Header dính đầu trang (sticky, cao cố định --header-h). Nút "Tư vấn" luôn thấy cả trên điện thoại.
export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const popup = useContactPopup();

  useEffect(() => setOpen(false), [pathname, hash]);

  return (
    <header className="sticky top-0 z-40 bg-q-navy shadow-[inset_0_-1px_0_rgba(255,255,255,0.08)]">
      <div className="container-page relative flex h-[var(--header-h)] items-center justify-between gap-3">
        <Link
          to="/"
          aria-label="QTOPIA — về trang chủ"
          className="flex min-h-11 shrink-0 items-center"
        >
          <Img
            src="/images/brand/logo-horizontal-white.png"
            alt="QTOPIA"
            priority
            className="h-8 w-auto lg:h-9"
          />
        </Link>

        <nav
          aria-label="Menu chính"
          className="hidden items-center gap-3 whitespace-nowrap lg:flex xl:gap-6"
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
            className="btn-base btn-primary w-[6.6rem] shrink-0 !px-5 text-[1.045rem] leading-[1.1] md:max-lg:w-[5.346rem] lg:w-40"
          >
            TƯ VẤN
          </button>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Đóng menu" : "Mở menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid size-12 cursor-pointer place-items-center text-white lg:hidden"
          >
            <Icon name={open ? "close" : "menu"} size={24} />
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Menu di động"
          className="max-h-[calc(100svh-var(--header-h)-var(--bar-h))] overflow-y-auto border-t border-white/10 bg-q-navy lg:hidden"
        >
          <ul className="container-page m-0 flex list-none flex-col py-3">
            {mainNav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  title={item.title}
                  className="flex min-h-12 items-center border-b border-white/10 font-display text-[1.1rem] leading-[1.1] font-medium text-white no-underline"
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
