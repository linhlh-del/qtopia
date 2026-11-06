import { createPortal } from 'react-dom'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Container from '../components/ui/Container'
import Icon from '../components/ui/Icons'
import Img from '../components/ui/Img'
import MediaFrame from '../components/ui/MediaFrame'
import SectionHeading from '../components/ui/SectionHeading'
import { useContactPopup } from '../components/ContactPopup'
import { unitLayoutImages, unitTypeInfo } from '../data/project'
import { FLOOR_VIEWBOX_H, FLOOR_VIEWBOX_W, q5q6FloorPlan } from '../data/qtopiaFloorPlan'
import { track } from '../lib/analytics'
import { useReveal } from '../hooks/useReveal'
import { useNearViewport } from '../hooks/useNearViewport'

const tower = q5q6FloorPlan
const unitsByCode = Object.fromEntries(tower.units.map((unit) => [unit.code, unit]))
const legend = [...new Set(tower.units.map((unit) => unit.type))].map((type) => unitTypeInfo[type])
const q7Types = Object.entries(unitLayoutImages.q7).map(([id, layout]) => ({ ...unitTypeInfo[id], ...layout }))

// Viền căn: tông tươi, đậm sắc theo loại căn (nền căn vẫn giữ màu pastel của sơ đồ)
const unitBorderColors = { 'ama-studio': '#ff8a1f', 'mira-1pn': '#a8d81c', 'vita-2pn': '#1ab8ff' }
// Thứ tự line trắng chạy qua các căn theo vòng: hàng trên trái → phải, rồi hàng dưới phải → trái
const runnerOrder = [
  ...tower.units.filter((u) => u.labelY < 100).sort((a, b) => a.labelX - b.labelX),
  ...tower.units.filter((u) => u.labelY >= 100).sort((a, b) => b.labelX - a.labelX),
]
const RUNNER_LAP = '2s' // thời gian line chạy hết 1 vòng quanh 1 căn (chậm hơn 10% so với 1,8s ban đầu)
const RUNNER_REST_MS = 600 // nghỉ giữa 2 căn: line ẩn đi rồi mới xuất hiện ở căn kế tiếp

export default function Residences({ showTopicLink = true }) {
  const ref = useReveal()
  const [planRef, planVisible] = useNearViewport('300px')
  const popup = useContactPopup()
  const [activeCode, setActiveCode] = useState(null)
  const [pinned, setPinned] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [zoom, setZoom] = useState(1)
  const suppressHover = useRef(false)
  const [runIndex, setRunIndex] = useState(0)
  const [runnerResting, setRunnerResting] = useState(false)
  const restTimer = useRef(0)
  useEffect(() => () => window.clearTimeout(restTimer.current), [])
  // Hết 1 vòng quanh căn → nghỉ RUNNER_REST_MS → sang căn kế tiếp
  const nextRunnerUnit = () => {
    setRunnerResting(true)
    window.clearTimeout(restTimer.current)
    restTimer.current = window.setTimeout(() => {
      setRunIndex((i) => (i + 1) % runnerOrder.length)
      setRunnerResting(false)
    }, RUNNER_REST_MS)
  }
  // SVG chỉ render ở client (planVisible), nên đọc matchMedia ngay khi render là an toàn
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const runnerUnit = runnerOrder[runIndex % runnerOrder.length]
  const activeUnit = activeCode ? unitsByCode[activeCode] : null
  const activeType = activeUnit ? unitTypeInfo[activeUnit.type] : null
  const activeLayout = activeUnit ? unitLayoutImages[tower.id]?.[activeUnit.type] : null

  const clear = () => {
    setActiveCode(null)
    setPinned(false)
  }

  const hoverUnit = (code) => {
    if (!pinned && !suppressHover.current) setActiveCode(code)
  }

  const closePanel = () => {
    suppressHover.current = true
    clear()
  }

  const selectUnit = (unit) => (event) => {
    event.stopPropagation()
    if (pinned && activeCode === unit.code) return clear()
    setActiveCode(unit.code)
    setPinned(true)
    track('view_floorplan', { tower: tower.id, unit_code: unit.code, unit_type: unit.type })
  }

  useEffect(() => {
    if (!fullscreen) {
      setZoom(1)
      return undefined
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event) => event.key === 'Escape' && setFullscreen(false)
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [fullscreen])

  useEffect(() => {
    if (!pinned) return undefined
    const onDoc = (event) => {
      if (!event.target.closest?.('[data-floor-plan]')) clear()
    }
    const onKey = (event) => {
      if (event.key === 'Escape') clear()
    }
    document.addEventListener('click', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [pinned])

  const planBlock = (
      <div ref={planRef} data-floor-plan
        className={fullscreen ? 'fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-q-navy' : 'relative mt-4 overflow-hidden rounded-[1.5rem] bg-white shadow-card sm:h-[min(540px,44svh)] xl:h-[min(600px,50svh)]'}
        onMouseLeave={() => { suppressHover.current = false; if (!pinned) setActiveCode(null) }}>
        <div className={fullscreen ? 'flex h-full w-full overflow-auto' : 'overflow-x-auto sm:flex sm:h-full sm:items-center'}
          style={fullscreen ? { justifyContent: 'safe center', alignItems: 'safe center' } : undefined}>
          <div className={fullscreen ? 'floorplan-fullscreen relative shrink-0' : 'relative w-full min-w-[min(1000px,calc(38svh*3.165))] lg:min-w-0'}
            style={fullscreen ? { '--fp-ar': tower.imageWidth / tower.imageHeight, '--fp-zoom': zoom } : undefined}>
            <MediaFrame
              src={tower.image}
              alt={`Mặt bằng tầng điển hình ${tower.label} dự án QTOPIA`}
              ratio={`${tower.imageWidth} / ${tower.imageHeight}`}
              imgClassName="h-full w-full object-fill"
            />
            {planVisible ? <svg
              className="absolute inset-0 h-full w-full"
              viewBox={`0 0 ${FLOOR_VIEWBOX_W} ${FLOOR_VIEWBOX_H}`}
              preserveAspectRatio="none"
              aria-label={`Sơ đồ tương tác ${tower.label}, chọn mã căn để xem diện tích`}
            >
              {tower.units.map((unit) => {
                const top = unit.labelY < 100
                return (
                  <line
                    key={`leader-${unit.code}`}
                    x1={unit.labelX}
                    x2={unit.labelX}
                    y1={top ? unit.labelY + 10 : 351}
                    y2={top ? 53 : unit.labelY - 10}
                    stroke={unit.labelColor}
                    strokeWidth="1.5"
                    opacity=".65"
                    pointerEvents="none"
                  />
                )
              })}
              {tower.units.map((unit) => {
                const isActive = activeCode === unit.code
                return (
                  <polygon
                    key={unit.code}
                    points={unit.points}
                    role="button"
                    tabIndex={0}
                    aria-label={`Căn ${unit.code} — ${unitTypeInfo[unit.type].name} ${unitTypeInfo[unit.type].subtitle}, diện tích sử dụng ${unit.usableArea} mét vuông`}
                    onMouseEnter={() => hoverUnit(unit.code)}
                    onFocus={() => hoverUnit(unit.code)}
                    onClick={selectUnit(unit)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        selectUnit(unit)(event)
                      }
                    }}
                    className="cursor-pointer outline-none transition-[fill-opacity,opacity,filter] duration-300"
                    style={{
                      fill: unit.color,
                      fillOpacity: isActive ? 0.55 : 0.28,
                      stroke: unitBorderColors[unit.type] || unit.labelColor,
                      strokeWidth: isActive ? 2.6 : 1.8,
                      strokeLinejoin: 'round',
                      vectorEffect: 'non-scaling-stroke',
                      opacity: activeCode && !isActive ? 0.45 : 1,
                      filter: `drop-shadow(0 0 ${isActive ? 6 : 3}px ${unitBorderColors[unit.type] || unit.labelColor})`,
                    }}
                  >
                    <title>{unit.code}</title>
                  </polygon>
                )
              })}
              {/* Line trắng chạy giữa viền, lần lượt qua từng căn (hết 1 vòng căn này thì sang căn kế tiếp).
                  Tạm dừng khi section ra khỏi màn hình (CSS #mat-bang:not([data-motion-active])). */}
              {!reduceMotion && runnerUnit && !runnerResting ? (
                <polygon
                  key={`runner-${runIndex}`}
                  points={runnerUnit.points}
                  pathLength="100"
                  pointerEvents="none"
                  onAnimationEnd={nextRunnerUnit}
                  className={'amenity-zone-runner amenity-zone-runner-white ' + (activeCode === runnerUnit.code ? 'amenity-zone-runner-active' : '')}
                  style={{
                    fill: 'none',
                    stroke: '#fff',
                    strokeWidth: 1.4,
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    strokeDasharray: '16 84',
                    vectorEffect: 'non-scaling-stroke',
                    animationDuration: RUNNER_LAP,
                    animationIterationCount: 1,
                    // chậm dần ở cuối vòng, nhanh dần ở đầu vòng → chuyển căn không bị giật
                    animationTimingFunction: 'ease-in-out',
                  }}
                />
              ) : null}
            </svg> : null}
            {planVisible ? tower.units.map((unit) => {
              const isActive = activeCode === unit.code
              return (
                <button
                  key={`label-${unit.code}`}
                  type="button"
                  tabIndex={-1}
                  aria-hidden="true"
                  onMouseEnter={() => hoverUnit(unit.code)}
                  onClick={selectUnit(unit)}
                  style={{
                    left: `${(unit.labelX / FLOOR_VIEWBOX_W) * 100}%`,
                    top: `${(unit.labelY / FLOOR_VIEWBOX_H) * 100}%`,
                    background: unit.labelColor,
                  }}
                  className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-1.5 py-0.5 before:absolute before:-inset-x-1.5 before:-inset-y-2.5 before:content-[''] font-display text-[length:calc(10px*var(--type-scale))] font-bold leading-none text-white shadow-sm transition-transform sm:text-xs ${isActive ? 'scale-125 ring-2 ring-white' : 'hover:scale-110'}`}
                >
                  {unit.code}
                </button>
              )
            }) : null}
          </div>
        </div>

        {activeUnit ? (
          <aside
            key={activeUnit.code}
            onClick={(event) => event.stopPropagation()}
            className={`floorplan-drawer absolute inset-x-0 bottom-0 z-30 overflow-y-auto rounded-t-[1.5rem] bg-white/95 shadow-card backdrop-blur-xl sm:inset-y-0 sm:left-auto sm:right-0 sm:max-h-none sm:w-80 sm:rounded-l-[1.5rem] sm:rounded-tr-none ${fullscreen ? 'max-h-[48%]' : 'max-h-[94%]'}`}
          >
            <div className="relative">
              {activeLayout ? (
                <MediaFrame
                  src={activeLayout.image}
                  alt={`Mặt bằng tham khảo loại ${activeType.name} ${activeType.subtitle} tại ${tower.label}`}
                  ratio="16 / 9"
                  className="h-28 w-full sm:h-44"
                  imgClassName="h-full w-full object-contain"
                />
              ) : null}
              <button type="button" onClick={closePanel} aria-label="Đóng thông tin căn hộ" className="absolute right-2 top-2 grid h-11 w-11 place-items-center rounded-full bg-q-navy/80 text-xl text-white hover:bg-q-navy">
                ×
              </button>
            </div>
            <div className="flex flex-col gap-3 p-4 sm:p-5">
              <p className="m-0 text-xs font-semibold uppercase tracking-wide" style={{ color: activeUnit.labelColor }}>{tower.label} · {tower.floorRange}</p>
              <h3 className="m-0 font-display text-xl font-bold text-q-navy">Căn {activeUnit.code} · {activeType.name} {activeType.subtitle}</h3>
              <dl className="grid grid-cols-2 gap-3 rounded-xl bg-q-sand/70 p-3 text-sm">
                <div><dt className="text-q-muted">Diện tích sử dụng</dt><dd className="m-0 font-bold text-q-navy">{activeUnit.usableArea} m²</dd></div>
                <div><dt className="text-q-muted">Diện tích tim tường</dt><dd className="m-0 font-bold text-q-navy">{activeUnit.grossArea} m²</dd></div>
              </dl>
              <p className="m-0 text-xs text-q-muted">Ảnh layout minh họa theo loại căn; diện tích lấy theo mã căn trên sơ đồ.</p>
              <button type="button" onClick={() => popup.open('mat-bang')} data-cta-name="floorplan_quote" className="btn-base btn-primary w-full">
                Nhận báo giá căn {activeUnit.code}
              </button>
            </div>
          </aside>
        ) : null}

        {/* Điện thoại: nút nằm ở hành lang giữa hai dãy căn để không che mã căn ở góc trên */}
        <div className={'absolute right-3 top-3 z-40 flex items-center gap-2' + (fullscreen ? ' pt-[env(safe-area-inset-top)]' : ' max-lg:top-1/2 max-lg:-translate-y-1/2')}>
          {fullscreen ? (
            <div className="flex items-center overflow-hidden rounded-full bg-q-navy/80 backdrop-blur">
              <button type="button" onClick={() => setZoom((current) => Math.max(1, current - 1))} disabled={zoom === 1}
                aria-label="Thu nhỏ mức phóng" className="grid size-11 place-items-center text-xl text-white disabled:opacity-40">−</button>
              <span aria-live="polite" className="min-w-10 text-center font-display text-sm font-semibold text-white">{zoom}x</span>
              <button type="button" onClick={() => setZoom((current) => Math.min(4, current + 1))} disabled={zoom === 4}
                aria-label="Phóng to thêm" className="grid size-11 place-items-center text-xl text-white disabled:opacity-40">+</button>
            </div>
          ) : null}
          <button type="button" onClick={() => setFullscreen((current) => !current)}
            aria-label={fullscreen ? 'Thu nhỏ sơ đồ mặt bằng' : 'Phóng to sơ đồ mặt bằng'}
            className="inline-flex min-h-11 items-center rounded-full bg-q-navy/80 px-4 font-display text-sm font-semibold text-white backdrop-blur hover:bg-q-navy">
            {fullscreen ? 'Thu nhỏ' : 'Phóng to'}
          </button>
        </div>
        {fullscreen ? (
          <p className="pointer-events-none absolute inset-x-0 bottom-[calc(1rem+env(safe-area-inset-bottom))] m-0 hidden text-center text-xs text-white/70 portrait:block lg:hidden">
            Xoay ngang điện thoại để xem sơ đồ lớn hơn · bấm + để phóng to
          </p>
        ) : null}
      </div>
  )

  return (
    <section id="mat-bang" data-snap-section className="section-screen bg-q-cream">
      <Container>
        <div ref={ref}>
          <SectionHeading label="Mặt bằng căn hộ Q5 & Q6" lead={`${tower.floorRange} · ${tower.units.length} căn trên sơ đồ · ${legend.length} loại căn`} />
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {legend.map((type) => (
            <span key={type.id} className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold text-q-navy shadow-soft [@media(max-height:740px)]:py-1">
              <span className="h-3 w-3 rounded-full" style={{ background: tower.units.find((unit) => unit.type === type.id).color }} />
              {type.name} · {type.subtitle}
            </span>
          ))}
        </div>

        <p className="mt-4 text-center text-sm text-q-muted lg:hidden [@media(max-height:740px)]:mt-2">Chạm “Phóng to” để xem toàn sơ đồ, hoặc vuốt ngang và chạm vào căn để xem chi tiết.</p>
        {/* Toàn màn hình: đưa ra <body> bằng portal — section dùng content-visibility / transform / zoom làm position:fixed bị neo vào section (iOS: màn hình trống, khoá cuộn) */}
        {fullscreen && typeof document !== 'undefined' ? createPortal(planBlock, document.body) : planBlock}

        <p className="hint-hover mt-2 text-center text-xs text-q-muted">Rê chuột hoặc chọn mã căn để xem layout và diện tích.</p>
        {showTopicLink ? (
          <div className="mt-3 flex justify-center">
            <Link to="/mat-bang" title="Mặt bằng tầng điển hình và các loại căn hộ QTOPIA" data-cta-name="floorplan_detail" data-cta-location="mat-bang" className="btn-base btn-dark cta-fx no-underline">
              Xem mặt bằng chi tiết
              <Icon name="arrow" size={18} />
            </Link>
          </div>
        ) : null}
        {!showTopicLink ? (
          <div className="mt-12">
            <SectionHeading
              label="Loại căn tại tháp Q7"
              lead="Tháp Q7 có thêm căn ARIA 3PN, bên cạnh AMA Studio, MIRA 1PN+ và VITA 2PN. Diện tích là khoảng theo loại căn, không thay cho thông số từng mã căn."
            />
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {q7Types.map((type) => (
                <article key={type.id} className="overflow-hidden rounded-2xl bg-white shadow-soft">
                  <div className="aspect-[4/3] bg-q-sand/50 p-3">
                    <Img src={type.image} alt={`Mặt bằng tham khảo căn ${type.name} ${type.subtitle} tháp Q7`} className="h-full w-full object-contain" />
                  </div>
                  <div className="p-4">
                    <h3 className="m-0 font-display text-lg font-bold text-q-navy">{type.name} · {type.subtitle}</h3>
                    <p className="mb-0 mt-2 text-sm text-q-muted">{type.area}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  )
}
