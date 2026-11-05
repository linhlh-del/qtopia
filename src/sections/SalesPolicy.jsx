import { useState } from 'react'
import { Link } from 'react-router-dom'
import Container from '../components/ui/Container'
import Icon from '../components/ui/Icons'
import Img from '../components/ui/Img'
import SectionHeading from '../components/ui/SectionHeading'
import { useContactPopup } from '../components/ContactPopup'
import { salesPolicy } from '../data/project'
import { track } from '../lib/analytics'
import { useReveal } from '../hooks/useReveal'

// Chính sách bán hàng: layout theo mẫu CSBH (tiêu đề + giá + tab phương thức + timeline các mốc thanh toán),
// phối lại theo tone QTOPIA (nền navy, điểm nhấn lime/hồng). Timeline nằm ngang từ tablet trở lên,
// chuyển thành danh sách dọc trên điện thoại để chữ không bị bóp nhỏ.

// Vị trí tâm mỗi mốc (theo % chiều ngang) tính từ flex của từng cột → line, dot và chữ "between" khớp tuyệt đối.
function centers(milestones) {
  const total = milestones.reduce((s, m) => s + (m.flex ?? 1), 0)
  let acc = 0
  return milestones.map((m) => {
    const f = m.flex ?? 1
    const c = ((acc + f / 2) / total) * 100
    acc += f
    return c
  })
}

function Amount({ m, size = 'lg' }) {
  if (!m.amount) return null
  const big = size === 'lg' ? 'text-3xl xl:text-4xl' : 'text-xl'
  return (
    <span className="flex items-baseline justify-center gap-0.5 font-display font-extrabold leading-none text-white">
      <span className={big}>{m.amount}</span>
      <span className={`${m.unit === '%' ? 'text-base' : 'text-sm'} font-bold text-q-lime`}>{m.unit}</span>
    </span>
  )
}

function BankBadge({ value, className = '' }) {
  return (
    <span
      className={`inline-flex flex-col items-center rounded-2xl border border-q-pink/60 bg-q-pink/10 px-3 py-1.5 text-center leading-tight ${className}`}
    >
      <span className="text-[length:calc(0.68rem*var(--type-scale))] font-medium uppercase tracking-wider text-white/75">NH giải ngân</span>
      <span className="font-display text-xl font-extrabold text-q-pink">{value}</span>
    </span>
  )
}

function TimelineHorizontal({ milestones }) {
  const pos = centers(milestones)
  return (
    <div className="relative hidden sm:block" aria-hidden="true">
      {/* hàng nhãn trên line */}
      <div className="flex">
        {milestones.map((m, i) => (
          <div key={i} style={{ flex: m.flex ?? 1 }} className="flex min-w-0 flex-col items-center justify-end px-1 pb-2 text-center">
            <span className="h-4 whitespace-nowrap text-[length:calc(0.7rem*var(--type-scale))] text-white/60 lg:text-xs">{m.top || ''}</span>
            <span className="whitespace-nowrap font-display text-lg font-semibold text-white lg:text-xl">{m.label}</span>
          </div>
        ))}
      </div>

      {/* line + dot */}
      <div className="relative h-4">
        <span
          className="absolute top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-q-lime via-white/40 to-q-pink"
          style={{ left: `${pos[0]}%`, right: `${100 - pos[pos.length - 1]}%` }}
        />
        {milestones.map((m, i) => (
          <span key={i}>
            <span
              className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-q-navy bg-q-lime shadow-[0_0_0_4px_rgba(170,236,14,0.2)]"
              style={{ left: `${pos[i]}%` }}
            />
            {m.between && i < milestones.length - 1 ? (
              <span
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/15 bg-q-navy-700 px-3 py-1 text-xs italic text-white/85 lg:text-sm"
                style={{ left: `${(pos[i] + pos[i + 1]) / 2}%` }}
              >
                {m.between}
              </span>
            ) : null}
          </span>
        ))}
      </div>

      {/* số tiền + ghi chú dưới line */}
      <div className="flex pt-3">
        {milestones.map((m, i) => (
          <div key={i} style={{ flex: m.flex ?? 1 }} className="flex min-w-0 flex-col items-center gap-1.5 px-1 text-center">
            <Amount m={m} />
            {m.note ? <span className="text-xs text-white/70 lg:text-sm">{m.note}</span> : null}
            {m.bank ? <BankBadge value={m.bank} className={m.amount ? 'mt-1' : ''} /> : null}
          </div>
        ))}
      </div>
    </div>
  )
}

// Điện thoại: timeline dọc, mỗi mốc 1 hàng (mốc thời gian bên trái, số tiền bên phải).
function TimelineVertical({ milestones }) {
  // Điện thoại: mỗi mốc gọn trên 1 dòng (mốc · ghi chú … số tiền) để cả phương thức vừa một màn hình.
  return (
    <ol className="relative m-0 list-none p-0 sm:hidden" aria-hidden="true">
      <span className="absolute bottom-3 left-[0.4rem] top-3 w-0.5 rounded-full bg-gradient-to-b from-q-lime via-white/40 to-q-pink" />
      {milestones.map((m, i) => (
        <li key={i} className="relative pl-6">
          <span className="absolute left-0 top-[0.85rem] size-3.5 rounded-full border-2 border-q-navy bg-q-lime shadow-[0_0_0_3px_rgba(170,236,14,0.2)]" />
          <div className="flex min-h-11 items-center justify-between gap-3 border-b border-white/10 py-1">
            <span className="flex min-w-0 flex-wrap items-baseline gap-x-2 leading-tight">
              <span className="font-display text-[0.95rem] font-semibold text-white">{m.label}</span>
              {m.top || m.note ? (
                <span className="text-xs text-white/65">{[m.top, m.note].filter(Boolean).join(' · ')}</span>
              ) : null}
            </span>
            <span className="flex shrink-0 items-center gap-2">
              {m.bank ? (
                <span className="rounded-full border border-q-pink/60 bg-q-pink/10 px-2 py-0.5 text-xs font-semibold text-q-pink">NH {m.bank}</span>
              ) : null}
              <Amount m={m} size="sm" />
            </span>
          </div>
          {m.between ? <span className="block py-1 text-xs italic text-white/70">↓ {m.between}</span> : null}
        </li>
      ))}
    </ol>
  )
}

// Bản text thuần cho trình đọc màn hình / bot (timeline trực quan được ẩn khỏi cây truy cập).
function MilestonesText({ milestones }) {
  return (
    <ul className="sr-only">
      {milestones.map((m, i) => (
        <li key={i}>
          {[m.top, m.label].filter(Boolean).join(' ')}:
          {m.amount ? ` ${m.amount} ${m.unit}` : ''}
          {m.note ? ` (${m.note})` : ''}
          {m.bank ? ` – ngân hàng giải ngân ${m.bank}` : ''}
          {m.between ? `. Sau đó ${m.between}` : ''}
        </li>
      ))}
    </ul>
  )
}

export default function SalesPolicy({ showTopicLink = true }) {
  const ref = useReveal()
  const popup = useContactPopup()
  const { methods, price } = salesPolicy
  const [activeId, setActiveId] = useState(methods[0].id)
  const active = methods.find((m) => m.id === activeId)

  const select = (id) => {
    setActiveId(id)
    track('select_payment_method', { method: id })
  }

  const onTabKey = (e) => {
    const i = methods.findIndex((m) => m.id === activeId)
    const next = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : null
    if (next === null) return
    e.preventDefault()
    const m = methods[(next + methods.length) % methods.length]
    select(m.id)
    document.getElementById(`csbh-tab-${m.id}`)?.focus()
  }

  return (
    <section
      id="chinh-sach"
      data-snap-section
      className="section-screen relative overflow-hidden bg-q-navy text-white"
    >
      <Img src="/images/renders/aqua-funny-park-night.webp" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-q-navy/95 via-q-navy/85 to-q-navy/95" />
      <div className="orbit-bg" style={{ '--orbit-x': '10%', '--orbit-y': '90%' }} />

      <Container className="relative z-10">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-10">
          <SectionHeading label={salesPolicy.label} lead={salesPolicy.lead} light />
          <p className="m-0 flex items-center gap-3 lg:justify-end">
            <span className="font-display text-xs font-semibold uppercase leading-tight tracking-[0.14em] text-white/80 sm:text-sm">
              {price.prefix.split(' ').slice(0, 2).join(' ')}
              <br />
              {price.prefix.split(' ').slice(2).join(' ')}
            </span>
            <span className="bg-gradient-to-b from-white to-q-lime bg-clip-text font-display text-[2.6rem] font-extrabold leading-none tracking-tight text-transparent sm:text-6xl xl:text-7xl">
              {price.value}
            </span>
            <span className="font-display text-sm font-bold uppercase leading-tight text-white sm:text-base">
              {price.unit.split(' ')[0]}
              <br />
              {price.unit.split(' ').slice(1).join(' ')}
            </span>
          </p>
        </div>

        <div ref={ref} className="mt-4 sm:mt-8">
          {/* Tabs phương thức */}
          <div
            role="tablist"
            aria-label="Phương thức thanh toán"
            onKeyDown={onTabKey}
            className="stagger grid grid-cols-3 gap-1 rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-sm sm:inline-grid"
          >
            {methods.map((m) => {
              const on = m.id === activeId
              return (
                <button
                  key={m.id}
                  id={`csbh-tab-${m.id}`}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls={`csbh-panel-${m.id}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => select(m.id)}
                  className={`min-h-11 cursor-pointer rounded-full px-2 font-display text-[length:calc(0.72rem*var(--type-scale))] font-semibold leading-tight transition-colors duration-300 sm:px-5 sm:text-sm ${
                    on ? 'bg-q-lime text-q-navy' : 'bg-transparent text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="sm:hidden">{m.tabShort || m.tab}</span>
                  <span className="hidden sm:inline">{m.tab}</span>
                </button>
              )
            })}
          </div>

          {/* Panel phương thức đang chọn */}
          <div
            id={`csbh-panel-${active.id}`}
            role="tabpanel"
            aria-labelledby={`csbh-tab-${active.id}`}
            className="stagger mt-3 rounded-3xl border border-white/10 bg-q-navy-700/70 px-4 py-3.5 backdrop-blur-md sm:px-8 sm:py-7"
            style={{ '--i': 1 }}
          >
            <h3 className="m-0 mb-2 font-display text-sm font-bold uppercase max-sm:sr-only tracking-[0.12em] text-white sm:mb-6 sm:text-lg">
              {active.title}
            </h3>

            <TimelineHorizontal milestones={active.milestones} />
            <TimelineVertical milestones={active.milestones} />
            <MilestonesText milestones={active.milestones} />

            {active.perks ? (
              <div className="mt-3 flex flex-col gap-1.5 border-t border-white/10 pt-3 sm:mt-6 sm:pt-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                {active.perks.map((p) => (
                  <span key={p} className="inline-flex items-center gap-2 rounded-full bg-q-lime/10 px-3 py-1.5 text-xs font-semibold text-q-lime sm:text-sm">
                    <Icon name="shield" size={16} />
                    {p}
                  </span>
                ))}
                {active.perksNote ? <span className="text-xs italic text-white/60">{active.perksNote}</span> : null}
              </div>
            ) : null}
          </div>

          <div className="stagger mt-3 flex flex-col-reverse gap-3 sm:mt-5 sm:flex-row sm:items-center sm:justify-between" style={{ '--i': 2 }}>
            <div className="flex flex-col gap-1 text-[length:calc(0.7rem*var(--type-scale))] leading-snug text-white/60 sm:text-xs">
              <span className="max-sm:hidden">{salesPolicy.glossary}</span>
              <span>{salesPolicy.disclaimer}</span>
            </div>
            <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex sm:self-auto [&>*]:max-sm:!px-3 [&>*]:max-sm:!text-[0.8rem]">
            {showTopicLink ? (
              <Link
                to="/chinh-sach-ban-hang"
                title="Chi tiết chính sách bán hàng và phương thức thanh toán QTOPIA"
                data-cta-name="sales_policy_detail"
                data-cta-location="chinh-sach"
                className="btn-base btn-outline cta-fx no-underline"
              >
                Chi tiết chính sách
                <Icon name="arrow" size={18} />
              </Link>
            ) : null}
            <button
              type="button"
              onClick={() => popup.open('chinh-sach')}
              data-cta-name="sales_policy_request"
              data-cta-location="chinh-sach"
              className="btn-base btn-primary"
            >
              <Icon name="doc" size={18} />
              {salesPolicy.cta}
            </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
