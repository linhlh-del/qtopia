import { useState } from 'react'
import Container from '../components/ui/Container'
import Icon from '../components/ui/Icons'
import SectionHeading from '../components/ui/SectionHeading'
import { useContactPopup } from '../components/ContactPopup'
import { legalContent, legalDisclaimer } from '../data/project'
import { useReveal } from '../hooks/useReveal'

// Pháp lý: bên trái nhãn + câu dẫn + CTA nhận hồ sơ, bên phải accordion các văn bản pháp lý
// (tên văn bản + số hiệu; mở ra xem nội dung). Accordion giãn bằng grid-rows như FAQ, mặc định mở mục đầu.
export default function Legal() {
  const ref = useReveal()
  const popup = useContactPopup()
  const [open, setOpen] = useState(0)

  return (
    <section id="phap-ly" data-snap-section className="section-screen !h-auto !max-h-none min-h-[calc(100svh-var(--header-h))] !justify-start bg-q-cream">
      <Container>
        <div className="grid gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-12">
          <div className="flex flex-col items-start gap-4">
            <SectionHeading label={legalContent.label} lead={legalContent.lead} />
            <button
              type="button"
              onClick={() => popup.open('phap-ly')}
              data-cta-name="legal_request"
              data-cta-location="phap-ly"
              className="btn-base btn-primary"
            >
              <Icon name="shield" size={18} />
              {legalContent.cta}
            </button>
          </div>

          <div ref={ref} className="flex flex-col gap-2 sm:gap-2.5">
            {legalContent.items.map((item, i) => {
              const isOpen = open === i
              return (
                <div
                  key={item.title}
                  style={{ '--i': i }}
                  className={`stagger rounded-3xl bg-white px-4 py-1 transition-shadow duration-300 sm:px-5 ${isOpen ? 'shadow-card' : 'shadow-soft'}`}
                >
                  <h3 className="m-0">
                    <button
                      type="button"
                      id={`legal-q-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`legal-a-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex min-h-14 w-full cursor-pointer items-center gap-3 py-2.5 text-left"
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-q-navy text-q-lime">
                        <Icon name="shield" size={18} />
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="font-display text-[length:calc(0.95rem*var(--type-scale))] font-semibold leading-snug text-q-navy sm:text-base">{item.title}</span>
                        <span className="text-xs font-normal text-q-muted sm:text-sm">{item.subtitle}</span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={`grid size-8 shrink-0 place-items-center rounded-full bg-q-sand text-lg text-q-navy transition-transform duration-300 ease-[var(--ease-out)] ${isOpen ? 'rotate-45' : ''}`}
                      >
                        +
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`legal-a-${i}`}
                    role="region"
                    aria-labelledby={`legal-q-${i}`}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-out)] motion-reduce:transition-none ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                  >
                    <div className="min-h-0 overflow-hidden" inert={!isOpen}>
                      <p className="m-0 pb-4 pl-12 pr-2 text-sm leading-relaxed text-q-muted sm:pr-10">{item.body}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <p className="mb-0 mt-4 text-[length:calc(0.7rem*var(--type-scale))] leading-snug text-q-muted sm:text-xs">{legalDisclaimer}</p>
      </Container>
    </section>
  )
}
