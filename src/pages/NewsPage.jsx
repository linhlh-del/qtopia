import { Link } from 'react-router-dom'
import Container from '../components/ui/Container'
import MediaFrame from '../components/ui/MediaFrame'
import { formatNewsDate, getNewsHref, hasRealNews, isSampleNews, newsItems } from '../data/news'

function NewsImage({ item, className = '' }) {
  return (
    <MediaFrame
      src={item.image}
      alt={item.imageAlt || item.title}
      ratio="16 / 10"
      note={isSampleNews(item) ? 'Khung ảnh demo' : 'Ảnh sẽ được cập nhật'}
      className={className}
    />
  )
}

function NewsMeta({ item }) {
  return (
    <div className="flex items-center justify-between gap-3 text-[length:calc(0.7rem*var(--type-scale))] font-semibold uppercase tracking-wider text-q-muted">
      <span><span className="mr-1 text-q-lime-ink">#</span>{item.category}</span>
      {isSampleNews(item) ? <span>Bài viết mẫu</span> : item.date ? <time dateTime={item.date}>{formatNewsDate(item.date)}</time> : null}
    </div>
  )
}

function NewsCard({ item }) {
  return (
    <article className="flex flex-col border-r border-b border-q-navy/10 p-4 sm:p-5">
      <Link to={getNewsHref(item.id)} aria-label={item.title} className="group mb-4 block overflow-hidden rounded-lg">
        <NewsImage item={item} className="transition-transform duration-500 group-hover:scale-[1.03]" />
      </Link>
      <h2 className="m-0 font-display text-base font-bold leading-snug text-q-navy">
        <Link to={getNewsHref(item.id)} className="text-inherit no-underline hover:text-q-blue">{item.title}</Link>
      </h2>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-q-muted">{item.excerpt}</p>
      <div className="mt-auto pt-4">
        <NewsMeta item={item} />
      </div>
    </article>
  )
}

export default function NewsPage() {
  const [featured, ...articles] = newsItems
  const highlights = articles.slice(0, 2)

  return (
    <>
      <section className="relative overflow-hidden bg-q-navy py-12 text-white sm:py-16">
        <div className="orbit-bg opacity-60" style={{ '--orbit-x': '85%', '--orbit-y': '20%' }} />
        <Container className="relative text-center">
          <p className="m-0 font-display text-xs font-bold uppercase tracking-[0.2em] text-q-lime">Cập nhật từ QTOPIA</p>
          <h1 className="section-title mt-3 text-[length:calc(clamp(1.9rem,4.4vw,3.4rem)*var(--type-scale))] text-white">Tin tức & sự kiện</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
            Cập nhật thông tin và những câu chuyện xoay quanh QTOPIA.
          </p>
        </Container>
      </section>

      <section className="bg-q-sand py-10 sm:py-14">
        <Container>
          <p className="mb-4 inline-block border-b border-q-lime-ink pb-2 font-display text-xs font-bold uppercase tracking-[0.18em] text-q-lime-ink">
            Tin mới nhất
          </p>
          <div className="grid overflow-hidden rounded-xl border border-q-navy/10 bg-white lg:grid-cols-[minmax(0,3fr)_minmax(15rem,1fr)]">
            <article className="grid min-w-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div className="flex flex-col p-5 sm:p-8">
                <h2 className="font-display text-xl font-bold leading-snug text-q-navy sm:text-2xl">
                  <Link to={getNewsHref(featured.id)} className="text-inherit no-underline hover:text-q-blue">
                    {featured.title}
                  </Link>
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-q-muted">{featured.excerpt}</p>
                <div className="mt-auto pt-6">
                  <NewsMeta item={featured} />
                  <Link to={getNewsHref(featured.id)} className="btn-base btn-primary relative mt-5 inline-flex no-underline">
                    Đọc bài viết<span className="sr-only">: {featured.title}</span>
                  </Link>
                </div>
              </div>
              <Link to={getNewsHref(featured.id)} aria-label={featured.title} className="group block min-w-0 overflow-hidden">
                <NewsImage item={featured} className="h-full w-full min-h-56 transition-transform duration-500 group-hover:scale-[1.03] md:min-h-full" />
              </Link>
            </article>

            <aside aria-label="Bài viết nổi bật" className="flex flex-col border-t border-q-navy/10 lg:border-l lg:border-t-0">
              {highlights.map((item) => (
                <article key={item.id} className="flex flex-1 flex-col justify-center border-b border-q-navy/10 p-5 last:border-0 sm:p-6">
                  <h3 className="m-0 font-display text-base font-bold leading-snug text-q-navy">
                    <Link to={getNewsHref(item.id)} className="text-inherit no-underline hover:text-q-blue">{item.title}</Link>
                  </h3>
                  <div className="mt-4"><NewsMeta item={item} /></div>
                </article>
              ))}
            </aside>
          </div>

          {articles.length > highlights.length ? (
          <div className="mt-12 sm:mt-16">
            <div className="mb-5 text-center">
              <p className="m-0 font-display text-xs font-bold uppercase tracking-[0.18em] text-q-lime-ink">Khám phá thêm</p>
              <h2 className="mt-2 font-display text-2xl font-extrabold text-q-navy">Các bài viết khác</h2>
            </div>
            <div className="grid overflow-hidden rounded-xl border-t border-l border-q-navy/10 bg-white sm:grid-cols-2 lg:grid-cols-4">
              {articles.slice(highlights.length).map((item) => <NewsCard key={item.id} item={item} />)}
            </div>
          </div>
          ) : null}
          {hasRealNews() ? null : <p className="mt-5 text-center text-xs text-q-muted">Bài viết và ảnh đang ở dạng minh họa.</p>}
        </Container>
      </section>
    </>
  )
}
