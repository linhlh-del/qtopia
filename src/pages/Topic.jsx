import { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Container from '../components/ui/Container'
import Location from '../sections/Location'
import MasterPlan from '../sections/MasterPlan'
import FeaturedAmenities from '../sections/FeaturedAmenities'
import Residences from '../sections/Residences'
import Register from '../sections/Register'
import Story from '../sections/Story'
import Facts from '../sections/Facts'
import Legal from '../sections/Legal'
import SalesPolicy from '../sections/SalesPolicy'
import NearbyPlaces from '../sections/NearbyPlaces'
import RichContent from '../components/RichContent'
import { stories } from '../data/project'
import { pages } from '../seo/site-meta'

// Trang con theo chủ đề (SEO nhóm từ khoá ngách): H1 + đoạn giới thiệu riêng + nội dung section tương ứng.
const BODY = {
  // Thông tin chi tiết nằm ngay dưới section "Tổng quan dự án" (số liệu), trước các phần hình ảnh/pháp lý
  '/tong-quan': () => (
    <>
      <Facts showTopicLink={false} />
      <RichContent path="/tong-quan" />
      <Story data={stories[0]} />
      <Story data={stories[1]} />
      <Legal />
    </>
  ),
  '/chinh-sach-ban-hang': () => <SalesPolicy showTopicLink={false} />,
  '/tien-ich-xung-quanh': () => (
    <>
      <NearbyPlaces />
      <Location showTopicLink={false} />
    </>
  ),
  '/vi-tri': () => <Location showTopicLink={false} />,
  '/tien-ich': () => (
    <>
      <MasterPlan />
      <FeaturedAmenities showTopicLink={false} />
    </>
  ),
  '/mat-bang': () => <Residences showTopicLink={false} />,
  // Trang chỉ có nội dung chữ (RichContent bên dưới)
  '/gia-ban': () => null,
  '/faq': () => null,
}
/** "A — b c" → ["A", "B c"] */
const h1Lines = (h1) => {
  const [first, ...rest] = h1.split(' — ')
  if (!rest.length) return [h1]
  const second = rest.join(' — ')
  return [first, second.charAt(0).toUpperCase() + second.slice(1)]
}

// Trang tự đặt RichContent ở vị trí riêng trong BODY (không thêm lần nữa ở cuối)
const INLINE_RICH = new Set(['/tong-quan'])
// Trang P1: nội dung hoàn toàn nằm trong RichContent
for (const p of ['/can-ho/studio-ama', '/can-ho/1pn-mira', '/can-ho/2pn-vita', '/can-ho/3pn-aria', '/phap-ly', '/chu-dau-tu', '/tien-do', '/nha-mau-noi-that', '/hinh-anh-video'])
  BODY[p] = () => null

export default function Topic() {
  const path = useLocation().pathname.replace(/\/+$/, '') || '/'
  const meta = pages[path]
  const Body = BODY[path]
  if (!meta || !Body) return null

  return (
    <>
      {/* Nền xanh thương hiệu (sáng hơn navy), đồng bộ với header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-q-brand-deep via-q-blue to-q-blue-600 py-14 text-white sm:py-20">
        <div className="orbit-bg opacity-70" style={{ '--orbit-x': '85%', '--orbit-y': '20%' }} />
        <Container className="relative flex flex-col gap-5">
          <nav aria-label="Đường dẫn trang">
            <ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0 text-sm text-white/75">
              <li>
                <Link to="/" className="text-white/85 underline-offset-4 hover:underline">
                  {pages['/'].breadcrumb}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              {meta.parent && pages[meta.parent] ? (
                <>
                  <li>
                    <Link to={meta.parent} className="text-white/85 underline-offset-4 hover:underline">
                      {pages[meta.parent].breadcrumb}
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                </>
              ) : null}
              <li aria-current="page" className="font-semibold text-white">
                {meta.breadcrumb}
              </li>
            </ol>
          </nav>
          {/* Rộng bằng container; tách 2 dòng có nghĩa tại " — " (dòng 2 viết hoa chữ đầu). Khoảng trắng trước <br> để textContent không dính chữ. */}
          <h1 className="section-title text-[length:calc(clamp(1.75rem,3.6vw,3rem)*var(--type-scale))] text-white">
            {h1Lines(meta.h1).map((line, i) => (
              <Fragment key={i}>
                {i > 0 ? <>{' '}<br /></> : null}
                {line}
              </Fragment>
            ))}
          </h1>
          <div className="flex max-w-5xl flex-col gap-3">
            {meta.intro.map((p) => (
              <p key={p.slice(0, 24)} className="prose-lead m-0 text-white/85">
                {p}
              </p>
            ))}
          </div>
        </Container>
      </section>
      <Body />
      {INLINE_RICH.has(path) ? null : <RichContent path={path} />}
      <Register />
    </>
  )
}
