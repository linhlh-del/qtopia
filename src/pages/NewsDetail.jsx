import { Link, useParams } from 'react-router-dom'
import Container from '../components/ui/Container'
import MediaFrame from '../components/ui/MediaFrame'
import { getNewsHref, isSampleNews, newsItems } from '../data/news'
import NotFound from './NotFound'

export default function NewsDetail() {
  const { articleId } = useParams()
  const article = newsItems.find((item) => item.id === articleId)

  if (!article) return <NotFound />

  const related = newsItems.filter((item) => item.id !== article.id).slice(0, 3)

  return (
    <>
      <section className="bg-q-sand pb-12 sm:pb-16">
        <div className="bg-q-navy py-8 text-white sm:py-10">
          <Container>
            <nav aria-label="Đường dẫn trang">
              <ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0 text-sm text-white/70">
                <li><Link to="/" className="text-white/80 underline-offset-4 hover:underline">Trang chủ</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link to="/tin-tuc" className="text-white/80 underline-offset-4 hover:underline">Tin tức</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-semibold text-q-lime">{article.category}</li>
              </ol>
            </nav>
          </Container>
        </div>

        <Container className="pt-8 sm:pt-12">
          <article className="w-full">
            <div className="mx-auto max-w-3xl text-center">
              <p className="m-0 font-display text-xs font-bold uppercase tracking-[0.18em] text-q-lime-ink">
                {article.category}
                {isSampleNews(article) ? (
                  <>
                    <span className="px-2 text-q-navy/30">/</span> Bài viết mẫu
                  </>
                ) : null}
              </p>
              <h1 className="section-title mt-4 text-[length:calc(clamp(1.8rem,4vw,3rem)*var(--type-scale))] text-q-navy">{article.title}</h1>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-q-muted">{article.excerpt}</p>
            </div>

            <MediaFrame
              src={article.image}
              alt={article.title}
              ratio="16 / 9"
              note="Khung ảnh demo"
              className="mt-8 overflow-hidden rounded-xl border border-q-navy/10 shadow-soft sm:mt-10"
            />

            <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-12">
              <div className="min-w-0">
                <div className="space-y-5 text-base leading-[1.85] text-q-ink">
                  <p className="m-0">{article.excerpt}</p>
                  {article.body ? (
                    article.body
                      .split(/\n\s*\n/)
                      .map((para) => para.trim())
                      .filter(Boolean)
                      .map((para) => (
                        <p key={para.slice(0, 32)} className="m-0 whitespace-pre-line">
                          {para}
                        </p>
                      ))
                  ) : (
                    <>
                      <h2 className="m-0 pt-2 font-display text-xl font-bold leading-snug text-q-navy">Thông tin bài viết</h2>
                      <p className="m-0">Nội dung chi tiết của bài viết sẽ được cập nhật sau.</p>
                    </>
                  )}
                </div>
                <div className="mt-8 border-t border-q-navy/10 pt-5">
                  <span className="rounded-full bg-q-navy/5 px-3 py-1.5 text-xs font-semibold text-q-navy">{article.category}</span>
                  <Link to="/tin-tuc" className="ml-3 text-sm font-semibold text-q-navy underline underline-offset-4 hover:text-q-blue">
                    Quay lại Tin tức
                  </Link>
                </div>
              </div>

              <aside className="h-fit rounded-xl border border-q-navy/10 bg-white p-5">
                <p className="m-0 font-display text-xs font-bold uppercase tracking-[0.16em] text-q-lime-ink">Bài viết nổi bật</p>
                <ul className="m-0 mt-4 flex list-none flex-col divide-y divide-q-navy/10 p-0">
                  {related.map((item) => (
                    <li key={item.id} className="py-3 first:pt-0 last:pb-0">
                      <Link to={getNewsHref(item.id)} className="font-display text-sm font-semibold leading-snug text-q-navy no-underline hover:text-q-blue">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 w-full">
                  <Link to="/#lien-he" className="btn-base btn-primary flex w-full justify-center whitespace-nowrap no-underline">
                    Nhận thông tin QTOPIA
                  </Link>
                </div>
              </aside>
            </div>
          </article>
        </Container>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="m-0 font-display text-xs font-bold uppercase tracking-[0.16em] text-q-lime-ink">Cùng chủ đề</p>
              <h2 className="mt-2 font-display text-2xl font-extrabold text-q-navy">Bài viết liên quan</h2>
            </div>
            <Link to="/tin-tuc" className="font-display text-sm font-bold text-q-navy underline underline-offset-4 hover:text-q-blue">
              Tất cả tin tức
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-xl border border-q-navy/10 bg-q-sand">
                <Link to={getNewsHref(item.id)} aria-label={item.title} className="group block overflow-hidden">
                  <MediaFrame src={item.image} alt={item.title} ratio="16 / 10" note="Khung ảnh demo" className="transition-transform duration-500 group-hover:scale-[1.03]" />
                </Link>
                <div className="p-5">
                  <p className="m-0 text-[length:calc(0.68rem*var(--type-scale))] font-bold uppercase tracking-wider text-q-lime-ink">{item.category}</p>
                  <h3 className="mt-2 font-display text-lg font-bold leading-snug text-q-navy">
                    <Link to={getNewsHref(item.id)} className="text-inherit no-underline hover:text-q-blue">{item.title}</Link>
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-q-muted">{item.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-5 text-center text-xs text-q-muted">Bài viết và ảnh đang ở dạng minh họa.</p>
        </Container>
      </section>
    </>
  )
}
