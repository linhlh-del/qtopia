import { Link } from 'react-router-dom'
import Img from '../components/ui/Img'
import { legalDisclaimer, siteMeta } from '../data/project'
import { isFilled } from '../lib/filled'
import { footerTopicPaths, mainNav, pages } from '../seo/site-meta'

const linkCls = 'inline-flex min-h-11 items-center font-display text-sm font-medium text-white/85 no-underline transition-colors hover:text-q-lime'

export default function Footer() {
  return (
    <footer id="legal" className="bg-q-navy pt-[clamp(3rem,8svh,5rem)] text-white/70">
      <div className="container-page flex flex-col gap-12 pb-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Img src="/images/brand/logo-horizontal-white.png" alt="QTOPIA" className="h-9 w-auto self-start" />
            <p className="max-w-xs text-sm leading-relaxed">
              Thành phố cuối tuần của siêu đô thị TP. Hồ Chí Minh — khu giải trí phức hợp bên biển.
            </p>
          </div>

          <nav aria-label="Chân trang — các mục chính" className="flex flex-col items-start gap-0.5">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-q-lime">Khám phá</p>
            {mainNav.map((item) => (
              <Link key={item.to} to={item.to} title={item.title} className={linkCls}>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Trang con theo chủ đề — liên kết nội bộ có từ khoá */}
          <nav aria-label="Chân trang — trang chủ đề" className="flex flex-col items-start gap-0.5">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-q-lime">Thông tin chi tiết</p>
            <Link to="/tin-tuc" title={pages['/tin-tuc'].menu} className={linkCls}>
              Tin tức & sự kiện
            </Link>
            {footerTopicPaths.map((p) => (
              <Link key={p} to={p} title={pages[p].menu} className={linkCls}>
                {pages[p].breadcrumb} QTOPIA
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-2.5 text-sm leading-relaxed">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-q-lime">Liên hệ</p>
            {isFilled(siteMeta.hotline) ? (
              <a href={siteMeta.hotlineHref} className="inline-flex min-h-11 items-center self-start font-semibold text-white no-underline hover:underline">
                Hotline: {siteMeta.hotline}
              </a>
            ) : null}
            {isFilled(siteMeta.email) ? (
              <a href={`mailto:${siteMeta.email}`} className="text-white no-underline hover:underline">
                {siteMeta.email}
              </a>
            ) : null}
            {isFilled(siteMeta.address) ? <span>{siteMeta.address}</span> : null}
            <Link to="/#lien-he" className="inline-flex min-h-11 items-center self-start font-display text-sm font-semibold text-white underline underline-offset-4">
              Đăng ký nhận thông tin QTOPIA
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <p className="text-xs leading-relaxed text-white/60">{legalDisclaimer}</p>
          <p className="mt-4 text-xs text-white/55">
            © {new Date().getFullYear()} {siteMeta.projectName} — Trang thông tin giới thiệu dự án, chưa phải website chính thức của Chủ đầu tư.
          </p>
        </div>
      </div>
      {/* chừa chỗ cho thanh sticky đáy trên điện thoại / tablet */}
      <div aria-hidden="true" className="h-[var(--bar-h)] lg:hidden" />
    </footer>
  )
}
