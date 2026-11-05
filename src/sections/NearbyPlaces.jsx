import Container from '../components/ui/Container'
import Icon from '../components/ui/Icons'
import Img from '../components/ui/Img'
import SectionHeading from '../components/ui/SectionHeading'
import { nearbyContent } from '../data/project'
import { useReveal } from '../hooks/useReveal'

// Tiện ích xung quanh: các mốc kết nối và điểm đến lân cận, chia 2 nhóm.
// Mỗi mốc là một thẻ: tên + thời gian tham khảo (nếu có) + một dòng mô tả.
export default function NearbyPlaces() {
  const ref = useReveal()
  return (
    <section
      id="tien-ich-xung-quanh"
      className="section-screen relative overflow-hidden bg-q-navy text-white"
    >
      <Img src="/images/renders/birdview.webp" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-q-navy/95 via-q-navy/85 to-q-navy/95" />
      <div className="orbit-bg" style={{ '--orbit-x': '90%', '--orbit-y': '10%' }} />

      <Container className="relative z-10">
        <SectionHeading label={nearbyContent.label} lead={nearbyContent.lead} light />

        <div ref={ref} className="mt-6 grid gap-5 sm:mt-8 lg:grid-cols-2 lg:gap-8">
          {nearbyContent.groups.map((g, gi) => (
            <div key={g.title} style={{ '--i': gi }} className="stagger rounded-3xl border border-white/10 bg-q-navy-700/70 p-4 backdrop-blur-md sm:p-6">
              <h3 className="m-0 mb-4 flex items-center gap-2.5 font-display text-sm font-bold uppercase tracking-[0.12em] text-q-lime sm:text-base">
                <span className="grid size-9 place-items-center rounded-full bg-q-lime/10">
                  <Icon name={g.icon} size={18} />
                </span>
                {g.title}
              </h3>
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {g.items.map((it) => (
                  <li key={it.name} className="flex items-center gap-4 rounded-2xl bg-white/5 px-4 py-3">
                    <span className="flex w-16 shrink-0 flex-col items-center leading-none">
                      {it.minutes ? (
                        <>
                          <span className="font-display text-2xl font-extrabold">{it.minutes}</span>
                          <span className="mt-1 text-[0.68rem] text-q-lime">phút</span>
                        </>
                      ) : (
                        <span className="grid size-9 place-items-center rounded-full border border-white/20 text-white/80">
                          <Icon name="pin" size={16} />
                        </span>
                      )}
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="font-display text-[0.95rem] font-semibold text-white">{it.name}</span>
                      <span className="text-xs leading-snug text-white/70 sm:text-sm">{it.note}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mb-0 mt-4 text-xs text-white/60">
          Thời gian di chuyển là số liệu tham khảo theo brochure; thực tế phụ thuộc điểm xuất phát, tuyến đường và giao thông.
        </p>
      </Container>
    </section>
  )
}
