import { useState } from 'react'
import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'
import { faq } from '../data/project'
import { useReveal } from '../hooks/useReveal'

// Câu hỏi thường gặp — nội dung KHỚP với FAQPage trong JSON-LD (src/seo/structured-data.js).
// Accordion: mỗi lần mở 1 câu, câu trả lời giãn bằng grid-rows 0fr → 1fr (mượt, không giật).
// Section canh nội dung từ trên xuống (justify-start) và được cao hơn 1 màn hình khi cần,
// nên khi mở chỉ đẩy các câu BÊN DƯỚI (và section sau), các câu phía trên đứng yên.
// Câu trả lời luôn có trong DOM (bot / prerender vẫn đọc được).
export default function Faq() {
  const ref = useReveal()
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" data-snap-section className="section-screen !h-auto !max-h-none min-h-[calc(100svh-var(--header-h))] !justify-start bg-q-cream">
      <Container>
        <SectionHeading label="Câu hỏi thường gặp về căn hộ QTOPIA" />
        <div ref={ref} className="mt-5 flex flex-col gap-2 sm:gap-2.5">
          {faq.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={item.q}
                style={{ '--i': i }}
                className={`stagger rounded-3xl bg-white px-5 py-1 transition-shadow duration-300 sm:px-6 ${isOpen ? 'shadow-card' : 'shadow-soft'}`}
              >
                <h3 className="m-0">
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex min-h-12 w-full cursor-pointer items-center justify-between gap-4 py-2.5 text-left font-display text-[length:calc(0.95rem*var(--type-scale))] font-semibold text-q-navy sm:min-h-14 sm:py-3 sm:text-base [@media(max-height:740px)]:min-h-10 [@media(max-height:740px)]:py-1.5"
                  >
                    {item.q}
                    <span
                      aria-hidden="true"
                      className={`grid size-8 shrink-0 place-items-center rounded-full bg-q-sand text-lg text-q-navy transition-transform duration-300 ease-[var(--ease-out)] ${isOpen ? 'rotate-45' : ''}`}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-out)] motion-reduce:transition-none ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="min-h-0 overflow-hidden" inert={!isOpen}>
                    <p className="m-0 pb-5 pr-10 leading-relaxed text-q-muted">{item.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
