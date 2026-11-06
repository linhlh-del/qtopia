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
import { floorPlans } from '../data/qtopiaFloorPlan'
import { track } from '../lib/analytics'
import { useReveal } from '../hooks/useReveal'
import { useNearViewport } from '../hooks/useNearViewport'

// Dữ liệu tính sẵn cho từng tháp (Q5 & Q6, Q7): tra căn theo mã, chú thích loại căn, thứ tự line trắng chạy
// (hàng trên trái → phải, rồi hàng dưới phải → trái)
const towerMeta = Object.fromEntries(floorPlans.map((plan) => [plan.id, {
  unitsByCode: Object.fromEntries(plan.units.map((unit) => [unit.code, unit])),
  legend: [...new Set(plan.units.map((unit) => unit.type))].map((type) => unitTypeInfo[type]),
  runnerOrder: [
    ...plan.units.filter((u) => u.labelY < plan.viewBoxH / 2).sort((a, b) => a.labelX - b.labelX),
    ...plan.units.filter((u) => u.labelY >= plan.viewBoxH / 2).sort((a, b) => b.labelX - a.labelX),
  ],
}]))
const q7Types = Object.entries(unitLayoutImages.q7).map(([id, layout]) => ({ ...unitTypeInfo[id], ...layout }))

// Viền căn: tông tươi, đậm sắc theo loại căn (nền căn vẫn giữ màu pastel của sơ đồ)
const unitBorderColors = { 'ama-studio': '#ff8a1f', 'mira-1pn': '#a8d81c', 'vita-2pn': '#1ab8ff' }
const RUNNER_LAP = '2s' // thời gian line chạy hết 1 vòng quanh 1 căn (chậm hơn 10% so với 1,8s ban đầu)
const RUNNER_REST_MS = 600 // nghỉ giữa 2 căn: line ẩn đi rồi mới xuất hiện ở căn kế tiếp

export default function Residences({ showTopicLink = true }) {
  const ref = useReveal()
  const [planRef, planVisible] = useNearViewport('300px')
  const popup = useContactPopup()
  const [towerId, setTowerId] = useState(floorPlans[0].id)
  const [towerMenu, setTowerMenu] = useState(false)
  const tower = floorPlans.find((plan) => plan.id === towerId)
  const { unitsByCode, legend, runnerOrder } = towerMeta[towerId]
  const [activeCode, setActiveCode] = useState(null) // căn đang mở popup (bấm)
  const [hoverCode, setHoverCode] = useState(null) // căn đang rê chuột (chỉ làm nổi bật)
  const [fullscreen, setFullscreen] = useState(false)
  const [zoom, setZoom] = useState(1)
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

  const closePanel = () => setActiveCode(null)

  // Đổi tháp: đóng popup, bỏ nổi bật, line trắng chạy lại từ căn đầu
  const selectTower = (id) => {
    setTowerMenu(false)
    if (id === towerId) return
    setTowerId(id)
    setActiveCode(null)
    setHoverCode(null)
    setRunIndex(0)
    setRunnerResting(false)
    window.clearTimeout(restTimer.current)
    track('select_floorplan_tower', { tower: id })
  }

  // Menu chọn tháp: bấm ra ngoài hoặc Esc để đóng
  useEffect(() => {
    if (!towerMenu) return undefined
    const onDoc = (event) => { if (!event.target.closest?.('[data-tower-menu]')) setTowerMenu(false) }
    const onKey = (event) => event.key === 'Escape' && setTowerMenu(false)
    document.addEventListener('click', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [towerMenu])

  const selectUnit = (unit) => (event) => {
    event.stopPropagation()
    setActiveCode(unit.code)
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

  // Popup thông tin căn: khoá cuộn trang, Esc để đóng (Esc ưu tiên đóng popup trước khi thoát Phóng to)
  useEffect(() => {
    if (!activeCode) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.stopImmediatePropagation()
        setActiveCode(null)
      }
    }
    window.addEventListener('keydown', onKey, true)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey, true)
    }
  }, [activeCode])

  const planBlock = (
      <div ref={planRef} data-floor-plan
        className={fullscreen ? 'fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-q-navy' : 'relative mt-4 h-[calc(min(1000px,38svh*3.165)/2.8716)] overflow-hidden rounded-[1.5rem] bg-white shadow-card sm:h-[min(540px,44svh)] xl:h-[min(600px,50svh)]'}
        onMouseLeave={() => setHoverCode(null)}>
        {/* Khung cố định chiều cao cho mọi tháp (mobile lấy theo ảnh có tỉ lệ cao nhất - Q7), ảnh căn giữa dọc
            → đổi tháp không làm các phần bên dưới dịch chuyển */}
        <div className={fullscreen ? 'flex h-full w-full overflow-auto' : 'flex h-full items-center overflow-x-auto'}
          style={fullscreen ? { justifyContent: 'safe center', alignItems: 'safe center' } : undefined}>
          <div key={tower.id} className={fullscreen ? 'floorplan-fullscreen tower-fade relative shrink-0' : 'tower-fade relative w-full min-w-[min(1000px,calc(38svh*3.165))] lg:min-w-0'}
            style={fullscreen ? { '--fp-ar': tower.imageWidth / tower.imageHeight, '--fp-zoom': zoom } : undefined}>
            <MediaFrame
              src={tower.image}
              alt={`Mặt bằng tầng điển hình ${tower.label} dự án QTOPIA`}
              ratio={`${tower.imageWidth} / ${tower.imageHeight}`}
              imgClassName="h-full w-full object-fill"
            />
            {planVisible ? <svg
              className="absolute inset-0 h-full w-full"
              viewBox={`0 0 ${tower.viewBoxW} ${tower.viewBoxH}`}
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
                const isActive = activeCode === unit.code || hoverCode === unit.code
                return (
                  <polygon
                    key={unit.code}
                    points={unit.points}
                    role="button"
                    tabIndex={0}
                    aria-label={`Căn ${unit.code} — ${unitTypeInfo[unit.type].name} ${unitTypeInfo[unit.type].subtitle}, diện tích sử dụng ${unit.usableArea} mét vuông`}
                    onMouseEnter={() => setHoverCode(unit.code)}
                    onFocus={() => setHoverCode(unit.code)}
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
              const isActive = activeCode === unit.code || hoverCode === unit.code
              return (
                <button
                  key={`label-${unit.code}`}
                  type="button"
                  tabIndex={-1}
                  aria-hidden="true"
                  onMouseEnter={() => setHoverCode(unit.code)}
                  onClick={selectUnit(unit)}
                  style={{
                    left: `${(unit.labelX / tower.viewBoxW) * 100}%`,
                    top: `${(unit.labelY / tower.viewBoxH) * 100}%`,
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

  // Popup thông tin căn: render ra <body> (nằm trên mọi thứ, kể cả chế độ Phóng to), nền mờ như popup nhận thông tin.
  // Desktop: trượt ra từ mép phải; điện thoại: trượt lên từ đáy.
  const unitDrawer = activeUnit && typeof document !== 'undefined' ? createPortal(
    <div className="fixed inset-0 z-[120] flex items-end sm:items-stretch sm:justify-end" role="dialog" aria-modal="true" aria-labelledby="unit-drawer-title">
      <button type="button" aria-label="Đóng thông tin căn hộ" onClick={closePanel}
        className="fp-drawer-backdrop absolute inset-0 cursor-default border-0 bg-q-navy/70 p-0 backdrop-blur-sm" />
      <aside key={activeUnit.code}
        className="fp-drawer relative flex max-h-[88svh] w-full flex-col overflow-hidden rounded-t-[1.5rem] bg-white shadow-card sm:max-h-none sm:w-[min(440px,92vw)] sm:rounded-l-[1.5rem] sm:rounded-tr-none">
        <header className="flex items-start gap-3 border-b border-q-navy/10 px-5 pb-4 pt-5 sm:px-6 sm:pt-6">
          <div className="min-w-0 flex-1">
            <p className="m-0 font-display text-xs font-bold uppercase tracking-[0.14em]" style={{ color: activeUnit.labelColor }}>
              {tower.label} · {tower.floorRange}
            </p>
            <h3 id="unit-drawer-title" className="m-0 mt-1 font-display text-2xl font-extrabold leading-tight text-q-navy">
              Căn {activeUnit.code}
            </h3>
            <p className="m-0 mt-1 text-sm font-semibold text-q-muted">{activeType.name} · {activeType.subtitle}</p>
          </div>
          <button type="button" onClick={closePanel} aria-label="Đóng thông tin căn hộ"
            className="grid size-11 shrink-0 place-items-center rounded-full bg-q-sand text-2xl leading-none text-q-navy transition-colors hover:bg-q-navy hover:text-white">
            ×
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 sm:px-6 sm:py-5">
          {activeLayout ? (
            <div className="overflow-hidden rounded-2xl bg-q-sand/60 p-3">
              <MediaFrame
                src={activeLayout.image}
                alt={`Mặt bằng tham khảo loại ${activeType.name} ${activeType.subtitle} tại ${tower.label}`}
                ratio="4 / 3"
                className="w-full"
                imgClassName="h-full w-full object-contain"
              />
            </div>
          ) : null}
          <dl className="m-0 mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-q-sand/70 p-3">
              <dt className="text-xs text-q-muted">Diện tích sử dụng</dt>
              <dd className="m-0 mt-0.5 font-display text-xl font-bold text-q-navy">{activeUnit.usableArea} m²</dd>
            </div>
            <div className="rounded-xl bg-q-sand/70 p-3">
              <dt className="text-xs text-q-muted">Diện tích tim tường</dt>
              <dd className="m-0 mt-0.5 font-display text-xl font-bold text-q-navy">{activeUnit.grossArea} m²</dd>
            </div>
          </dl>
          <p className="m-0 mt-3 text-xs leading-relaxed text-q-muted">Ảnh layout minh họa theo loại căn; diện tích lấy theo mã căn trên sơ đồ.</p>
        </div>
        <div className="border-t border-q-navy/10 px-5 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4 sm:px-6">
          <button type="button" onClick={() => popup.open('mat-bang')} data-cta-name="floorplan_quote" className="btn-base btn-primary w-full">
            Nhận báo giá căn {activeUnit.code}
          </button>
        </div>
      </aside>
    </div>,
    document.body,
  ) : null

  return (
    <section id="mat-bang" data-snap-section className="section-screen bg-q-cream">
      {unitDrawer}
      <Container>
        <div ref={ref}>
          {/* Tiêu đề mọi tháp xếp chồng trong cùng 1 ô lưới, chỉ hiện tháp đang chọn → khối luôn cao bằng
              tiêu đề dài nhất ("Q5 & Q6" xuống 2 dòng trên mobile), đổi tháp không làm phần dưới dịch chuyển */}
          <div className="grid">
            {floorPlans.map((plan) => (
              <SectionHeading
                key={plan.id}
                className={`[grid-area:1/1] transition-opacity duration-500 ease-out motion-reduce:transition-none ${plan.id === tower.id ? 'opacity-100' : 'invisible opacity-0'}`}
                label={`Mặt bằng căn hộ ${plan.short}`}
                lead={`${plan.floorRange} · ${plan.units.length} căn trên sơ đồ · ${towerMeta[plan.id].legend.length} loại căn`}
              />
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-col items-start gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
          {/* Chọn tháp: Q5 & Q6 / Q7. Mobile: nút một hàng riêng, 3 chú thích một hàng bên dưới */}
          <div data-tower-menu className="relative">
            <button type="button" onClick={() => setTowerMenu((v) => !v)} aria-haspopup="listbox" aria-expanded={towerMenu}
              aria-label={`Chọn tháp, đang xem ${tower.label}`}
              className="inline-flex min-w-[9.5rem] shrink-0 cursor-pointer items-center justify-between gap-2.5 whitespace-nowrap rounded-full border-0 bg-q-blue px-4 py-2 font-display text-sm font-bold text-white shadow-soft [@media(max-height:740px)]:py-1">
              {tower.label}
              <span aria-hidden="true" className="grid size-4 place-items-center transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none"
                style={{ transform: towerMenu ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                <img src="/images/arrow-sm.webp" alt="" aria-hidden="true" width="96" height="56" decoding="async" className="block h-auto w-[14px]" />
              </span>
            </button>
            {towerMenu ? (
              <ul role="listbox" aria-label="Chọn tháp"
                className="tower-menu absolute left-0 top-full z-40 m-0 mt-2 min-w-full list-none overflow-hidden rounded-2xl bg-white p-1.5 shadow-card">
                {floorPlans.map((plan) => (
                  <li key={plan.id}>
                    <button type="button" role="option" aria-selected={plan.id === towerId} onClick={() => selectTower(plan.id)}
                      className={`flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 whitespace-nowrap rounded-xl border-0 px-3 text-left font-display text-sm font-semibold ${plan.id === towerId ? 'bg-q-blue/10 text-q-blue' : 'bg-transparent text-q-navy hover:bg-q-sand'}`}>
                      {plan.label}
                      {plan.id === towerId ? <span aria-hidden="true">✓</span> : null}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="flex flex-nowrap items-center gap-1.5 sm:contents">
            {legend.map((type) => (
              <span key={type.id} className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-2.5 py-1.5 text-xs font-semibold max-[359px]:gap-1 max-[359px]:px-2 max-[359px]:text-[11px] text-q-navy shadow-soft sm:gap-2 sm:px-3 sm:py-2 sm:text-sm [@media(max-height:740px)]:py-1">
                <span className="size-2.5 rounded-full sm:size-3" style={{ background: tower.units.find((unit) => unit.type === type.id).color }} />
                {type.name} · {type.subtitle}
              </span>
            ))}
          </div>
        </div>

        <p className="mt-4 text-left text-sm text-q-muted lg:hidden [@media(max-height:740px)]:mt-2">Chạm “Phóng to” để xem toàn sơ đồ, hoặc vuốt ngang và chạm vào căn để xem chi tiết.</p>
        {/* Toàn màn hình: đưa ra <body> bằng portal — section dùng content-visibility / transform / zoom làm position:fixed bị neo vào section (iOS: màn hình trống, khoá cuộn) */}
        {fullscreen && typeof document !== 'undefined' ? createPortal(planBlock, document.body) : planBlock}

        <p className="hint-hover mt-2 text-left text-xs text-q-muted">Rê chuột hoặc chọn mã căn để xem layout và diện tích.</p>
        {showTopicLink ? (
          <div className="mt-3 flex justify-start">
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
