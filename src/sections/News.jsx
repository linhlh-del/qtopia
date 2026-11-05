import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Container from '../components/ui/Container'
import MediaFrame from '../components/ui/MediaFrame'
import { getNewsHref, newsItems } from '../data/news'

function ArrowIcon({ direction = 'right' }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={`size-4 ${direction === 'left' ? 'rotate-180' : ''}`}
    >
      <path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function News() {
  const trackRef = useRef(null)
  const [activePage, setActivePage] = useState(0)
  const [pageTargets, setPageTargets] = useState([0, 0, 0, 0])
  const pageTargetsRef = useRef(pageTargets)

  const updatePagination = useCallback(() => {
    const track = trackRef.current
    const firstCard = track?.firstElementChild
    if (!track || !firstCard) return

    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0
    const cardStep = firstCard.getBoundingClientRect().width + gap
    const cardsPerPage = Math.max(1, Math.floor((track.clientWidth + gap) / cardStep))
    const pageCount = Math.ceil(newsItems.length / cardsPerPage)
    const maxScroll = track.scrollWidth - track.clientWidth
    const trackLeft = track.getBoundingClientRect().left
    const targets = Array.from({ length: pageCount }, (_, page) => {
      const card = track.children[Math.min(page * cardsPerPage, newsItems.length - 1)]
      const cardLeft = card.getBoundingClientRect().left - trackLeft + track.scrollLeft
      return Math.min(cardLeft, maxScroll)
    })
    pageTargetsRef.current = targets

    setPageTargets((current) =>
      current.length === targets.length && current.every((target, page) => target === targets[page])
        ? current
        : targets,
    )
    const nearestPage = targets.reduce(
      (nearest, target, page) =>
        Math.abs(target - track.scrollLeft) < Math.abs(targets[nearest] - track.scrollLeft) ? page : nearest,
      0,
    )
    setActivePage(nearestPage)
  }, [])

  const updateActivePage = useCallback(() => {
    const track = trackRef.current
    const targets = pageTargetsRef.current
    if (!track || !targets.length) return

    const nearestPage = targets.reduce(
      (nearest, target, page) =>
        Math.abs(target - track.scrollLeft) < Math.abs(targets[nearest] - track.scrollLeft) ? page : nearest,
      0,
    )
    setActivePage((current) => current === nearestPage ? current : nearestPage)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined

    let measureFrame = requestAnimationFrame(updatePagination)
    let scrollFrame = 0
    const onResize = () => {
      cancelAnimationFrame(measureFrame)
      measureFrame = requestAnimationFrame(updatePagination)
    }
    const onScroll = () => {
      if (scrollFrame) return
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0
        updateActivePage()
      })
    }
    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(track)
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(measureFrame)
      cancelAnimationFrame(scrollFrame)
      resizeObserver.disconnect()
      track.removeEventListener('scroll', onScroll)
    }
  }, [updateActivePage, updatePagination])

  const goToPage = (page) => {
    const track = trackRef.current
    if (!track) return
    track.scrollTo({ left: pageTargets[page], behavior: 'smooth' })
    setActivePage(page)
  }

  return (
    <section id="tin-tuc" data-snap-section className="qtopia-news section-screen overflow-hidden bg-q-sand">
      <Container>
        <header className="text-center">
          <p className="m-0 font-display text-xs font-bold uppercase tracking-[0.2em] text-q-lime-ink">Tin mới nhất</p>
          <h2 className="mt-3 font-display text-[length:calc(clamp(1.7rem,3.8vw,2.8rem)*var(--type-scale))] font-extrabold uppercase leading-tight tracking-wide text-q-navy">
            Tin tức & sự kiện
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-q-muted sm:text-base">
            Cập nhật những thông tin mới nhất về QTOPIA.
          </p>
        </header>

        <div className="mt-8 flex items-center justify-between gap-4 sm:mt-10">
          <div className="flex items-center gap-2" role="group" aria-label="Điều hướng tin tức">
            <button
              type="button"
              onClick={() => goToPage(Math.max(0, activePage - 1))}
              disabled={activePage === 0}
              aria-label="Trang tin trước"
              className="grid size-10 place-items-center rounded-full border border-q-navy/20 bg-white text-q-navy transition-colors hover:border-q-navy hover:bg-q-navy hover:text-white disabled:cursor-default disabled:opacity-35 disabled:hover:border-q-navy/20 disabled:hover:bg-white disabled:hover:text-q-navy sm:size-11"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={() => goToPage(Math.min(pageTargets.length - 1, activePage + 1))}
              disabled={activePage >= pageTargets.length - 1}
              aria-label="Trang tin tiếp theo"
              className="grid size-10 place-items-center rounded-full border border-q-navy/20 bg-white text-q-navy transition-colors hover:border-q-navy hover:bg-q-navy hover:text-white disabled:cursor-default disabled:opacity-35 disabled:hover:border-q-navy/20 disabled:hover:bg-white disabled:hover:text-q-navy sm:size-11"
            >
              <ArrowIcon />
            </button>
          </div>
          <Link
            to="/tin-tuc"
            className="inline-flex min-h-11 items-center gap-2 border-b border-q-navy/25 font-display text-xs font-bold uppercase tracking-wider text-q-navy no-underline transition-colors hover:border-q-lime-ink hover:text-q-lime-ink sm:text-sm"
          >
            Xem tất cả
            <ArrowIcon />
          </Link>
        </div>

        <ul
          ref={trackRef}
          className="m-0 mt-4 flex list-none snap-x snap-mandatory gap-4 overflow-x-auto p-1 pb-5 [scrollbar-width:none] sm:gap-6 lg:gap-8 [&::-webkit-scrollbar]:hidden"
          aria-label="Bài viết mới nhất"
        >
          {newsItems.map((item) => (
            <li key={item.id} className="flex w-[84%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4rem)/3)]">
              <article className="group flex w-full flex-col overflow-hidden rounded-xl border border-q-navy/10 bg-white shadow-soft transition-shadow duration-300 hover:shadow-card">
                <Link to={getNewsHref(item.id)} className="relative block overflow-hidden" aria-label={item.title}>
                  <MediaFrame
                    src={item.image}
                    alt={item.title}
                    ratio="16 / 10"
                    note="Khung ảnh demo"
                    className="transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute bottom-3 left-3 rounded-sm bg-q-navy px-3 py-1.5 font-display text-[length:calc(0.65rem*var(--type-scale))] font-bold uppercase tracking-wider text-q-lime">
                    {item.category}
                  </span>
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="m-0 font-display text-lg font-bold leading-snug text-q-navy">
                    <Link to={getNewsHref(item.id)} className="text-inherit no-underline transition-colors hover:text-q-blue">
                      {item.title}
                    </Link>
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-q-muted">{item.excerpt}</p>
                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-q-navy/10 pt-4">
                    <span className="text-[length:calc(0.68rem*var(--type-scale))] font-semibold uppercase tracking-wider text-q-muted">Bài viết mẫu</span>
                    <Link
                      to={getNewsHref(item.id)}
                      className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-wide text-q-navy no-underline hover:text-q-blue"
                    >
                      Đọc thêm
                      <ArrowIcon />
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-1 flex justify-center gap-2" role="group" aria-label="Chọn trang tin tức">
          {pageTargets.map((_, page) => (
            <button
              key={page}
              type="button"
              onClick={() => goToPage(page)}
              aria-label={`Đi tới trang ${page + 1}`}
              aria-current={page === activePage ? 'page' : undefined}
              className={`h-2 rounded-full transition-all duration-200 ${
                page === activePage ? 'w-6 bg-q-lime-ink' : 'w-2 bg-q-navy/20 hover:bg-q-navy/40'
              }`}
            />
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-q-muted">Bài viết và ảnh đang ở dạng minh họa.</p>
      </Container>
    </section>
  )
}
