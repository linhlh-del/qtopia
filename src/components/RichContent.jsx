import { useState } from 'react'
import { Link } from 'react-router-dom'
import Container from './ui/Container'
import { LightboxProvider, ZoomImage, ZoomLink } from './Lightbox'
import { amenityCatalog } from '../data/amenity-catalog'
import { q5q6FloorPlan, q7FloorPlan } from '../data/qtopiaFloorPlan'
import { unitTypeInfo } from '../data/project'
import { CONTENT_UPDATED, PROJECT_ADDRESS, faqGroups, mapEmbedUrl, mapLinkUrl, seoContent } from '../data/seo-content'
import { pages } from '../seo/site-meta'
import { unitTypes } from '../data/unit-types'
import { videosFor, ytEmbed, ytThumb } from '../data/videos'

/* Nội dung chữ tĩnh của trang chủ đề (src/data/seo-content.js).
   Mọi thứ render thành HTML thuần (bảng, danh sách, <details>) để bản prerender có đủ chữ cho bot,
   không phụ thuộc hiệu ứng / JS. */

const h2Cls = 'text-balance mt-12 mb-4 font-display text-[length:calc(1.5rem*var(--type-scale))] font-extrabold leading-tight text-q-navy first:mt-0 sm:text-[length:calc(1.75rem*var(--type-scale))]'
const h3Cls = 'text-balance mt-8 mb-3 font-display text-lg font-bold leading-snug text-q-navy'
const pCls = 'my-4 text-base leading-[1.75] text-q-ink'
const listCls = 'my-4 flex flex-col gap-2 pl-5 text-base leading-[1.75] text-q-ink'

const plans = { 'q5-q6': q5q6FloorPlan, q7: q7FloorPlan }

/** Không cho xuống dòng ngay tại "–" giữa hai từ (vd. "Q5–Q6", "25–30 m²"): chèn word joiner U+2060 */
const nb = (text) => text.replace(/(\S)–(\S)/g, '$1⁠–⁠$2')

/** id ổn định cho H2 (dùng cho mục lục / anchor): bỏ dấu tiếng Việt, nối bằng gạch ngang */
const slugify = (text) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)

function Toc({ items }) {
  return (
    <nav aria-label="Mục lục" className="mb-10 rounded-xl border border-q-navy/10 bg-white p-4 sm:p-5">
      <details className="group">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between font-display text-base font-bold text-q-navy [&::-webkit-details-marker]:hidden">
          Mục lục
          {/* Cùng mũi tên với dropdown chọn tháp ở mặt bằng (Residences.jsx) */}
          <span aria-hidden="true" className="grid size-4 place-items-center transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-open:rotate-180 motion-reduce:transition-none">
            <img src="/images/arrow-sm.webp" alt="" aria-hidden="true" width="96" height="56" decoding="async" className="block h-auto w-[14px]" />
          </span>
        </summary>
        <ol className="m-0 mt-1 grid list-decimal gap-x-8 pl-5 text-sm sm:grid-cols-2">
          {items.map((t) => (
            <li key={t}>
              <a href={`#${slugify(t)}`} className="inline-flex min-h-11 items-center text-q-navy no-underline hover:text-q-blue hover:underline">
                {t}
              </a>
            </li>
          ))}
        </ol>
      </details>
    </nav>
  )
}

function Table({ caption, head, rows }) {
  return (
    <figure className="my-6">
      <figcaption className="mb-2 font-display text-sm font-semibold text-q-navy">{caption}</figcaption>
      <div className="overflow-x-auto rounded-xl border border-q-navy/10 bg-white [scrollbar-width:thin]">
      <table className={`w-full border-collapse text-left text-sm leading-relaxed ${head.length > 2 ? 'min-w-[34rem]' : ''}`}>
        <thead>
          <tr className="bg-q-navy text-white">
            {head.map((h) => (
              <th key={h} scope="col" className="px-4 py-3 font-display font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-q-navy/10 even:bg-q-cream">
              {r.map((c, j) =>
                j === 0 ? (
                  <th key={j} scope="row" className="px-4 py-3 font-semibold text-q-navy">
                    {c}
                  </th>
                ) : (
                  <td key={j} className="px-4 py-3 text-q-ink">
                    {c}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {head.length > 2 ? <p className="mt-1.5 text-xs text-q-muted sm:hidden">Vuốt ngang để xem đủ bảng →</p> : null}
    </figure>
  )
}

function FloorTable({ plan, type }) {
  const p = plans[plan]
  const typeName = (t) => `${unitTypeInfo[t].name} ${unitTypeInfo[t].subtitle}`
  const rows = [...p.units]
    .filter((u) => !type || u.type === type)
    .sort((a, b) => Number(a.code) - Number(b.code))
    .map((u) => [`Căn ${u.code}`, typeName(u.type), `${u.usableArea} m²`, `${u.grossArea} m²`])
  const count = (t) => p.units.filter((u) => u.type === t).length
  const types = [...new Set(p.units.map((u) => u.type))]
  if (type) {
    return (
      <Table
        caption={`Các căn ${typeName(type)} trên tầng điển hình ${p.label} (${count(type)}/${p.units.length} căn mỗi tầng)`}
        head={['Mã căn', 'Loại căn', 'Diện tích SD', 'Diện tích TT']}
        rows={rows}
      />
    )
  }
  return (
    <>
      <Table
        caption={`Số căn mỗi tầng điển hình ${p.label}`}
        head={['Loại căn', 'Số căn / tầng']}
        rows={[...types.map((t) => [typeName(t), String(count(t))]), ['Tổng', String(p.units.length)]]}
      />
      <Table
        caption={`Bảng mã căn tầng điển hình ${p.label} – diện tích sử dụng (SD) và tim tường (TT)`}
        head={['Mã căn', 'Loại căn', 'Diện tích SD', 'Diện tích TT']}
        rows={rows}
      />
    </>
  )
}

function Amenities({ descriptions, image, intro }) {
  return (
    <>
      <h2 id={slugify('Chi tiết 29 tiện ích nội khu QTOPIA')} className={`${h2Cls} scroll-mt-28`}>Chi tiết 29 tiện ích nội khu QTOPIA</h2>
      {image ? (
        <figure className="my-6">
          <ZoomImage src={image.src} alt={image.alt} caption={image.caption} sizes="(min-width: 1024px) 56rem, 92vw" className="rounded-xl border border-q-navy/10 bg-white" />
          <figcaption className="mt-2 text-sm text-q-muted">
            {image.caption}{' '}
            <ZoomLink src={image.src} alt={image.alt} caption={image.caption} className="inline-flex min-h-12 items-center font-semibold text-q-navy underline underline-offset-4 hover:text-q-blue">
              Xem ảnh lớn
            </ZoomLink>
          </figcaption>
        </figure>
      ) : null}
      {intro ? <p className={pCls}>{intro}</p> : null}
      {amenityCatalog.map((zone) => (
        <div key={zone.id}>
          <h3 className={h3Cls}>
            {zone.name} – {zone.markers.length} tiện ích
          </h3>
          <ul className="my-4 grid list-none gap-3 p-0 sm:grid-cols-2">
            {zone.markers.map((m) => (
              <li key={m.n} className="rounded-xl border border-q-navy/10 bg-white p-4">
                <h4 className="m-0 font-display text-base font-bold text-q-navy">
                  {m.n}. {m.name}
                </h4>
                {descriptions[m.name] ? <p className="m-0 mt-1.5 text-sm leading-relaxed text-q-muted">{descriptions[m.name]}</p> : null}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  )
}

function UnitType({ title, intro, features, images, path, short, hideMore, asSection }) {
  const H = asSection === false ? 'h2' : 'h3'
  return (
    <section className={`rounded-2xl border border-q-navy/10 bg-white p-5 sm:p-7 ${asSection === false ? 'mt-0' : 'mt-10'}`} aria-label={title}>
      <H id={slugify(title)} className="m-0 scroll-mt-28 text-balance font-display text-xl font-extrabold leading-snug text-q-navy">{nb(title)}</H>
      {intro.map((t) => (
        <p key={t.slice(0, 24)} className={pCls}>
          {t}
        </p>
      ))}
      <ul className={`${listCls} list-disc`}>
        {features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <div className={`mt-6 grid gap-5 ${images.length > 1 ? 'md:grid-cols-2' : ''}`}>
        {images.map((img) => (
          <figure key={img.src} className="m-0">
            <ZoomImage
              src={img.src}
              alt={img.alt}
              caption={img.caption}
              sizes={images.length > 1 ? '(min-width: 768px) 40vw, 92vw' : '(min-width: 1024px) 56rem, 92vw'}
              className="rounded-xl border border-q-navy/10 bg-q-cream"
            />
            <figcaption className="mt-2 text-sm font-semibold text-q-navy">{img.caption}</figcaption>
          </figure>
        ))}
      </div>
      {!hideMore && path ? (
        <Link to={path} className="btn-base btn-primary mt-5 inline-flex min-h-12 no-underline">
          Xem chi tiết căn {short}
        </Link>
      ) : null}
    </section>
  )
}

function Gallery({ items }) {
  return (
    <ul className="my-6 grid list-none grid-cols-2 gap-3 p-0 sm:gap-4 lg:grid-cols-3">
      {items.map((it) => (
        <li key={it.src} className="m-0">
          <figure className="m-0">
            <ZoomImage
              src={it.src}
              alt={it.alt}
              caption={it.caption}
              sizes="(min-width: 1024px) 18rem, 46vw"
              className="aspect-[4/3] rounded-xl border border-q-navy/10 bg-white"
              imgClassName="h-full w-full object-cover"
            />
            <figcaption className="mt-1.5 text-xs font-semibold leading-snug text-q-navy sm:text-sm">{it.caption}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  )
}

function VideoFacade({ v }) {
  const [play, setPlay] = useState(false)
  return (
    <figure className="m-0">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-q-navy">
        {play ? (
          <iframe
            src={ytEmbed(v.id)}
            title={v.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button type="button" onClick={() => setPlay(true)} aria-label={`Phát video: ${v.title}`} className="group absolute inset-0 cursor-pointer p-0">
            <img src={ytThumb(v.id)} alt={v.title} width="480" height="360" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            <span aria-hidden="true" className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-q-orange text-2xl text-white shadow-lg transition-transform group-hover:scale-110">▶</span>
          </button>
        )}
      </div>
      <figcaption className="mt-2 text-sm font-semibold text-q-navy">{v.title}</figcaption>
    </figure>
  )
}

function Videos({ path }) {
  const list = videosFor(path)
  if (!list.length) return null
  return (
    <>
      <h2 id="video" className={`${h2Cls} scroll-mt-28`}>Video QTOPIA Phước Hải</h2>
      <div className="my-6 grid gap-5 md:grid-cols-2">
        {list.map((v) => (
          <VideoFacade key={v.id} v={v} />
        ))}
      </div>
    </>
  )
}

function UnitCards() {
  return (
    <ul className="my-6 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
      {unitTypes.map((u) => (
        <li key={u.path} className="overflow-hidden rounded-2xl border border-q-navy/10 bg-white">
          <ZoomImage src={u.images[0].src} alt={u.images[0].alt} caption={u.images[0].caption} sizes="(min-width: 640px) 28rem, 92vw" className="bg-q-cream" />
          <div className="p-4 sm:p-5">
            <h3 className="m-0 font-display text-lg font-bold text-q-navy">{u.title}</h3>
            <p className="m-0 mt-1.5 text-sm leading-relaxed text-q-muted">{u.images[0].caption}</p>
            <Link to={u.path} className="mt-3 inline-flex min-h-12 items-center font-display text-sm font-bold text-q-navy underline underline-offset-4 hover:text-q-blue">
              Xem layout căn {u.short}
            </Link>
          </div>
        </li>
      ))}
    </ul>
  )
}

function MapEmbed() {
  return (
    <figure className="my-6">
      <div className="overflow-hidden rounded-xl border border-q-navy/10 bg-q-sand">
        <iframe
          src={mapEmbedUrl}
          title="Bản đồ Google Maps vị trí dự án QTOPIA Phước Hải"
          width="800"
          height="450"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block aspect-[16/10] h-auto w-full border-0 sm:aspect-[16/9]"
          allowFullScreen
        />
      </div>
      <figcaption className="mt-2 text-sm text-q-muted">
        {PROJECT_ADDRESS}.{' '}
        <a href={mapLinkUrl} target="_blank" rel="noopener" className="font-semibold text-q-navy underline underline-offset-4 hover:text-q-blue">
          Mở trong Google Maps
        </a>
      </figcaption>
    </figure>
  )
}

function FaqList({ items }) {
  return (
    <div className="my-4 flex flex-col gap-2.5">
      {items.map((f) => (
        <details key={f.q} className="group rounded-2xl bg-white px-5 py-1 shadow-soft open:shadow-card">
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 [&::-webkit-details-marker]:hidden">
            <h3 className="m-0 font-display text-base font-semibold leading-snug text-q-navy">{f.q}</h3>
            <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-q-sand text-lg text-q-navy transition-transform duration-300 group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="m-0 pb-4 pr-10 leading-relaxed text-q-muted">{f.a}</p>
        </details>
      ))}
    </div>
  )
}

function Block({ b }) {
  switch (b.t) {
    case 'h2':
      return (
        <h2 id={slugify(b.text)} className={`${h2Cls} scroll-mt-28`}>
          {nb(b.text)}
        </h2>
      )
    case 'h3':
      return <h3 className={h3Cls}>{nb(b.text)}</h3>
    case 'p':
      return <p className={pCls}>{b.text}</p>
    case 'ul':
      return (
        <ul className={`${listCls} list-disc`}>
          {b.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol className={`${listCls} list-decimal`}>
          {b.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ol>
      )
    case 'table':
      return <Table {...b} />
    case 'floorTable':
      return <FloorTable plan={b.plan} type={b.type} />
    case 'unit':
      return <UnitType {...b} />
    case 'gallery':
      return <Gallery items={b.items} />
    case 'videos':
      return <Videos path={b.path || '/hinh-anh-video'} />
    case 'unitCards':
      return <UnitCards />
    case 'amenities':
      return <Amenities descriptions={b.descriptions} image={b.image} intro={b.intro} />
    case 'map':
      return <MapEmbed />
    case 'note':
      return <p className="my-4 rounded-xl bg-q-sand px-4 py-3 text-sm leading-relaxed text-q-muted">{b.text}</p>
    case 'updated':
      return (
        <p className="mb-6 mt-0 text-sm font-semibold text-q-lime-ink">
          Cập nhật: <time dateTime={CONTENT_UPDATED.split('/').reverse().join('-')}>{CONTENT_UPDATED}</time>
        </p>
      )
    case 'faqGroups':
      return faqGroups.map((g) => (
        <section key={g.title} aria-label={g.title}>
          <h2 id={slugify(g.title)} className={`${h2Cls} scroll-mt-28`}>{g.title}</h2>
          <FaqList items={g.items} />
        </section>
      ))
    case 'links':
      return (
        <nav aria-label={b.title} className="mt-12 rounded-xl border border-q-navy/10 bg-white p-5 sm:p-6">
          <h2 className="m-0 font-display text-lg font-bold text-q-navy">{b.title}</h2>
          <ul className="m-0 mt-3 grid list-none gap-x-6 gap-y-1 p-0 sm:grid-cols-2">
            {b.items.map((l) => (
              <li key={l.to}>
                <Link to={l.to} title={pages[l.to]?.menu} className="inline-flex min-h-12 items-center font-display text-sm font-semibold text-q-navy underline underline-offset-4 hover:text-q-blue">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )
    default:
      return null
  }
}

export default function RichContent({ path }) {
  const content = seoContent[path]
  if (!content) return null
  const faqs = content.faqs || []
  const faqTitle = `Câu hỏi thường gặp: ${pages[path]?.breadcrumb} QTOPIA`
  const toc = [
    ...content.blocks.filter((b) => b.t === 'h2').map((b) => b.text),
    ...(content.blocks.some((b) => b.t === 'faqGroups') ? faqGroups.map((g) => g.title) : []),
    ...(content.blocks.some((b) => b.t === 'amenities') ? ['Chi tiết 29 tiện ích nội khu QTOPIA'] : []),
    ...(faqs.length ? [faqTitle] : []),
  ]
  // id bắt buộc: section-snap.js chỉ coi main > section[id] là section (section cao → cuộn tự do bên trong)
  return (
    <LightboxProvider>
    <section id="thong-tin-chi-tiet" className="bg-q-cream py-14 sm:py-20" aria-label={`Thông tin chi tiết: ${pages[path]?.breadcrumb || ''}`}>
      <Container>
        <article>
          {toc.length >= 4 && !content.noToc ? <Toc items={toc} /> : null}
          {content.blocks.filter((b) => b.t !== 'links').map((b, i) => (
            <Block key={i} b={b} />
          ))}
          {faqs.length ? (
            <>
              <h2 id={slugify(faqTitle)} className={`${h2Cls} scroll-mt-28`}>{faqTitle}</h2>
              <FaqList items={faqs} />
              <p className="mt-4 text-sm">
                <Link to="/faq" className="inline-flex min-h-12 items-center font-semibold text-q-navy underline underline-offset-4 hover:text-q-blue">
                  Xem tất cả câu hỏi về QTOPIA Phước Hải
                </Link>
              </p>
            </>
          ) : null}
          {content.blocks.filter((b) => b.t === 'links').map((b, i) => (
            <Block key={`l${i}`} b={b} />
          ))}
        </article>
      </Container>
    </section>
    </LightboxProvider>
  )
}
