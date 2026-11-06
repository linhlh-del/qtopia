import { Link } from 'react-router-dom'
import Container from '../components/ui/Container'
import { siteMeta } from '../data/project'
import { getNewsHref, isSampleNews, newsItems } from '../data/news'
import { isFilled } from '../lib/filled'

// Trang cảm ơn sau khi gửi form (/cam-on): noindex, không vào sitemap.
// Dùng làm trang đích chuyển đổi (GA4 page_view /cam-on, quảng cáo) bên cạnh event generate_lead.
export default function ThankYou() {
  const hasHotline = isFilled(siteMeta.hotline) && siteMeta.hotlineHref
  const hasZalo = isFilled(siteMeta.zalo)
  const articles = newsItems.filter((item) => !isSampleNews(item)).slice(0, 3)

  return (
    <section className="section-screen relative flex items-center overflow-hidden bg-q-navy py-14 text-white">
      <div className="orbit-bg opacity-60" style={{ '--orbit-x': '80%', '--orbit-y': '20%' }} />
      <Container className="relative flex flex-col items-center gap-5 text-center">
        <span aria-hidden="true" className="grid size-16 place-items-center rounded-full bg-q-lime text-q-navy">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
            <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h1 className="section-title m-0 text-[length:calc(clamp(1.8rem,4.4vw,3.2rem)*var(--type-scale))] text-white">
          Cảm ơn bạn đã đăng ký
        </h1>
        <p className="prose-lead m-0 max-w-xl text-white/80">
          Thông tin của bạn đã được gửi thành công. Chuyên viên tư vấn QTOPIA sẽ liên hệ với bạn trong thời gian sớm nhất.
        </p>

        <div className="mt-2 flex flex-wrap justify-center gap-3">
          {hasHotline ? (
            <a href={siteMeta.hotlineHref} data-cta-name="call" data-cta-location="cam-on" className="btn-base btn-primary no-underline">
              Gọi ngay {siteMeta.hotline}
            </a>
          ) : null}
          {hasZalo ? (
            <a
              href={siteMeta.zalo}
              target="_blank"
              rel="noopener"
              data-cta-name="zalo"
              data-cta-location="cam-on"
              className="btn-base border border-white/40 text-white no-underline hover:bg-white/10"
            >
              Nhắn Zalo
            </a>
          ) : null}
          <Link to="/" className="btn-base border border-white/40 text-white no-underline hover:bg-white/10">
            Về trang chủ
          </Link>
        </div>

        {articles.length ? (
          <div className="mt-6 w-full max-w-2xl border-t border-white/15 pt-6 text-left">
            <p className="m-0 font-display text-xs font-bold uppercase tracking-[0.18em] text-q-lime">Trong lúc chờ, bạn có thể đọc</p>
            <ul className="m-0 mt-3 flex list-none flex-col gap-2 p-0">
              {articles.map((item) => (
                <li key={item.id}>
                  <Link to={getNewsHref(item.id)} className="font-display text-sm font-semibold text-white underline-offset-4 hover:text-q-lime hover:underline sm:text-base">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Container>
    </section>
  )
}
