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
import { stories } from '../data/project'
import { pages } from '../seo/site-meta'

// Trang con theo chủ đề (SEO nhóm từ khoá ngách): H1 + đoạn giới thiệu riêng + nội dung section tương ứng.
const BODY = {
  '/tong-quan': () => (
    <>
      <Facts showTopicLink={false} />
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
      <FeaturedAmenities />
    </>
  ),
  '/mat-bang': () => <Residences showTopicLink={false} />,
}

export default function Topic() {
  const path = useLocation().pathname.replace(/\/+$/, '') || '/'
  const meta = pages[path]
  const Body = BODY[path]
  if (!meta || !Body) return null

  return (
    <>
      <section className="relative overflow-hidden bg-q-navy py-14 text-white sm:py-20">
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
              <li aria-current="page" className="font-semibold text-white">
                {meta.breadcrumb}
              </li>
            </ol>
          </nav>
          <h1 className="section-title max-w-4xl text-[length:calc(clamp(1.9rem,4.4vw,3.4rem)*var(--type-scale))] text-white">{meta.h1}</h1>
          <div className="flex max-w-3xl flex-col gap-3">
            {meta.intro.map((p) => (
              <p key={p.slice(0, 24)} className="prose-lead m-0 text-white/85">
                {p}
              </p>
            ))}
          </div>
        </Container>
      </section>
      <Body />
      <Register />
    </>
  )
}
