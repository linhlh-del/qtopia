import Container from '../components/ui/Container'
import CountUp from '../components/ui/CountUp'
import Img from '../components/ui/Img'
import { facts } from '../data/project'
import { useReveal } from '../hooks/useReveal'

// Tổng quan dự án = 8 ô số liệu (2 cột trên điện thoại, 4 cột trên máy tính → 2 hàng đều nhau).
// Nền ảnh phối cảnh (như hai màn story) thay vì màu đặc, có lớp phủ tối để chữ/số liệu đủ tương phản.
export default function Facts() {
  const ref = useReveal()
  return (
    <section
      id="so-lieu"
      data-snap-section
      aria-label="Số liệu tổng quan dự án QTOPIA"
      className="section-screen relative overflow-hidden bg-q-navy text-white"
    >
      <Img src="/images/renders/view-from-sea.webp" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-q-navy/92 via-q-navy/70 to-q-navy/92" />
      <Container className="relative z-10">
        <p className="section-label section-label-light mb-5 [@media(max-height:740px)]:mb-2">Tổng quan dự án</p>
        <dl ref={ref} className="m-0 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/15 lg:grid-cols-4">
          {facts.map((f, i) => (
            <div
              key={f.label}
              style={{ '--i': i }}
              className="stagger flex flex-col gap-1 bg-q-navy-700/90 px-4 py-5 backdrop-blur-sm sm:px-6 sm:py-7 [@media(max-height:740px)]:gap-0 [@media(max-height:740px)]:py-2.5 [@media(max-height:620px)]:px-3 [@media(max-height:620px)]:py-1.5"
            >
              <dd className="order-1 m-0 flex items-baseline gap-1.5">
                <CountUp value={f.value} className="font-display text-3xl font-extrabold sm:text-4xl [@media(max-height:740px)]:text-2xl" />
                <span className="font-display text-xs font-semibold text-q-lime sm:text-sm">{f.unit}</span>
              </dd>
              <dt className="order-2 text-xs text-white/70 sm:text-sm">{f.label}</dt>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-xs text-white/65 [@media(max-height:740px)]:mt-2 [@media(max-height:620px)]:mt-1 [@media(max-height:620px)]:text-[length:calc(0.65rem*var(--type-scale))] [@media(max-height:620px)]:leading-snug">Các mốc thời gian di chuyển là thông tin tham khảo trong brochure, phụ thuộc điểm xuất phát và điều kiện giao thông.</p>
      </Container>
    </section>
  )
}
