import { Link, useParams } from 'react-router-dom'
import Container from '../components/ui/Container'
import MediaFrame from '../components/ui/MediaFrame'
import { useContactPopup } from '../components/ContactPopup'
import { formatNewsDate, getNewsHref, hasRealNews, isSampleNews, newsItems, parseNewsBody } from '../data/news'
import NotFound from './NotFound'

function ArticleBody({ body }) {
  const blocks = parseNewsBody(body)
  if (!blocks.length) return <p className="m-0">Nội dung chi tiết của bài viết sẽ được cập nhật sau.</p>
  return blocks.map((b, i) => {
    const key = `${i}-${b.text.slice(0, 24)}`
    if (b.type === 'h2') {
      return (
        <h2 key={key} className="m-0 pt-4 font-display text-[length:calc(1.35rem*var(--type-scale))] font-bold leading-snug text-q-navy">
          {b.text}
        </h2>
      )
    }
    if (b.type === 'h3') {
      return (
        <h3 key={key} className="m-0 pt-1 font-display text-[length:calc(1.08rem*var(--type-scale))] font-bold leading-snug text-q-navy">
          {b.text}
        </h3>
      )
    }
    return (
      <p key={key} className="m-0 whitespace-pre-line">
        {b.text}
      </p>
    )
  })
}

export default function NewsDetail() {
  const { articleId } = useParams()
  const popup = useContactPopup()
  const article = newsItems.find((item) => item.id === articleId)

  if (!article) return <NotFound />

  const sample = isSampleNews(article)
  const date = formatNewsDate(article.date)
  const related = newsItems.filter((item) => item.id !== article.id).slice(0, 3)
  const alt = article.imageAlt || article.title

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
                {sample ? (
                  <>
                    <span className="px-2 text-q-navy/30">/</span> Bài viết mẫu
                  </>
                ) : date ? (
                  <>
                    <span className="px-2 text-q-navy/30">/</span>
                    <time dateTime={article.date}>{date}</time>
                  </>
                ) : null}
              </p>
              <h1 className="section-title mt-4 text-[length:calc(clamp(1.8rem,4vw,3rem)*var(--type-scale))] text-q-navy">{article.title}</h1>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-q-muted">{article.excerpt}</p>
            </div>

            <MediaFrame
              src={article.image}
              alt={alt}
              ratio="16 / 9"
              priority
              note={sample ? 'Khung ảnh demo' : 'Ảnh sẽ được cập nhật'}
              className="mt-8 overflow-hidden rounded-xl border border-q-navy/10 shadow-soft sm:mt-10"
            />

            <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-12">
              <div className="min-w-0">
                <div className="space-y-5 text-base leading-[1.85] text-q-ink">
                  {article.body ? <ArticleBody body={article.body} /> : <p className="m-0">{article.excerpt}</p>}
                </div>

                {article.cta ? (
                  <div className="mt-8 rounded-xl bg-q-navy p-5 text-white sm:p-6">
                    <p className="m-0 font-display text-base font-bold leading-snug sm:text-lg">{article.cta}</p>
                    <button
                      type="button"
                      onClick={() => popup.open('news_cta')}
                      data-cta-name="news_cta"
                      data-cta-location={article.id}
                      className="btn-base btn-primary mt-4"
                    >
                      Đăng ký nhận thông tin
                    </button>
                  </div>
                ) : null}

                {article.sourceUrl ? (
                  <p className="mt-6 text-sm text-q-muted">
                    Tư liệu tham khảo:{' '}
                    <a href={article.sourceUrl} target="_blank" rel="noopener nofollow" className="text-q-navy underline underline-offset-4 hover:text-q-blue">
                      {article.sourceTitle || article.sourceUrl}
                    </a>
                  </p>
                ) : null}

                <div className="mt-8 border-t border-q-navy/10 pt-5">
                  <span className="rounded-full bg-q-navy/5 px-3 py-1.5 text-xs font-semibold text-q-navy">{article.category}</span>
                  <Link to="/tin-tuc" className="ml-3 text-sm font-semibold text-q-navy underline underline-offset-4 hover:text-q-blue">
                    Quay lại Tin tức
                  </Link>
                </div>
              </div>

              <aside className="h-fit rounded-xl border border-q-navy/10 bg-white p-5 lg:sticky lg:top-24">
                {related.length ? (
                  <>
                    <p className="m-0 font-display text-xs font-bold uppercase tracking-[0.16em] text-q-lime-ink">Bài viết khác</p>
                    <ul className="m-0 mt-4 flex list-none flex-col divide-y divide-q-navy/10 p-0">
                      {related.map((item) => (
                        <li key={item.id} className="py-3 first:pt-0 last:pb-0">
                          <Link to={getNewsHref(item.id)} className="font-display text-sm font-semibold leading-snug text-q-navy no-underline hover:text-q-blue">
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
                <div className={related.length ? 'mt-5 w-full' : 'w-full'}>
                  <Link to="/#lien-he" className="btn-base btn-primary flex w-full justify-center whitespace-nowrap no-underline">
                    Nhận thông tin QTOPIA
                  </Link>
                </div>
              </aside>
            </div>
          </article>
        </Container>
      </section>

      {related.length ? (
        <section className="bg-white py-12 sm:py-16">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="m-0 font-display text-xs font-bold uppercase tracking-[0.16em] text-q-lime-ink">Đọc tiếp</p>
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
                    <MediaFrame
                      src={item.image}
                      alt={item.imageAlt || item.title}
                      ratio="16 / 10"
                      note={isSampleNews(item) ? 'Khung ảnh demo' : 'Ảnh sẽ được cập nhật'}
                      className="transition-transform duration-500 group-hover:scale-[1.03]"
                    />
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
            {hasRealNews() ? null : <p className="mt-5 text-center text-xs text-q-muted">Bài viết và ảnh đang ở dạng minh họa.</p>}
          </Container>
        </section>
      ) : null}
    </>
  )
}
