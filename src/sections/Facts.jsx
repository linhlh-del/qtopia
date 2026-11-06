import { Link } from 'react-router-dom'
import Container from '../components/ui/Container'
import CountUp from '../components/ui/CountUp'
import OrbitLines from '../components/ui/OrbitLines'
import { facts } from '../data/project'
import { useReveal } from '../hooks/useReveal'

// Tổng quan dự án = 8 ô số liệu (2 cột trên điện thoại, 4 cột trên máy tính → 2 hàng đều nhau).
// Nền xanh brand + Orbit Lines giống section Vị trí / Chính sách để đồng bộ với header #062aa3.
export default function Facts({ showTopicLink = true }) {
  const ref = useReveal()
  return (
    <section
      id="so-lieu"
      data-snap-section
      aria-label="Số liệu tổng quan dự án QTOPIA"
      className="brand-orbit-bg brand-orbit-bg-flip section-screen relative overflow-hidden text-white"
    >
      {/* chữ Q bên trái, tâm sát mép → chỉ hiện một nửa */}
      <OrbitLines flip className="-translate-x-[22%]" />
      <Container className="relative z-10">
        <p className="section-label section-label-light mb-3 sm:mb-5 [@media(max-height:740px)]:mb-2">Tổng quan dự án</p>
        <dl ref={ref} className="m-0 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/15 lg:grid-cols-4">
          {facts.map((f, i) => (
            <div
              key={f.label}
              style={{ '--i': i }}
              className="stagger flex flex-col gap-0.5 bg-[#03135c]/75 px-3.5 py-3 backdrop-blur-sm sm:gap-1 sm:px-6 sm:py-7 [@media(max-height:740px)]:gap-0 [@media(max-height:740px)]:py-1.5 [@media(max-height:620px)]:px-3 [@media(max-height:620px)]:py-1.5"
            >
              <dd className="order-1 m-0 flex flex-col items-start gap-0 sm:flex-row sm:items-baseline sm:gap-1.5">
                <CountUp value={f.value} className="font-display text-[1.7rem] font-extrabold leading-tight sm:text-4xl [@media(max-height:740px)]:text-2xl" />
                <span className="font-display text-xs font-semibold leading-tight text-q-lime sm:text-sm">{f.unit}</span>
              </dd>
              <dt className="order-2 text-xs text-white/70 sm:text-sm">{f.label}</dt>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-xs text-white/65 [@media(max-height:740px)]:mt-2 [@media(max-height:620px)]:mt-1 [@media(max-height:620px)]:text-[length:calc(0.65rem*var(--type-scale))] [@media(max-height:620px)]:leading-snug">Thời gian di chuyển là số liệu tham khảo theo brochure.</p>
        {showTopicLink ? (
          <Link
            to="/tong-quan"
            title="Tổng quan dự án QTOPIA: số liệu, tiện ích, pháp lý"
            data-cta-name="overview_detail"
            data-cta-location="so-lieu"
            className="mt-3 inline-flex min-h-11 items-center gap-2 font-display text-sm font-semibold text-q-lime no-underline underline-offset-4 hover:underline [@media(max-height:620px)]:mt-1"
          >
            Xem tổng quan dự án QTOPIA
          </Link>
        ) : null}
      </Container>
    </section>
  )
}
