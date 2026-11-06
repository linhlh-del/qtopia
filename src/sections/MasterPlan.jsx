import { createPortal } from 'react-dom'
import Img from '../components/ui/Img'
import { useEffect, useState } from 'react'
import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'
import { useReveal } from '../hooks/useReveal'
import { useNearViewport } from '../hooks/useNearViewport'
import { masterPlan } from '../data/project'
import { amenityLabelPositions } from '../data/amenity-label-positions'

const zones = [
  { id: '10', name: 'Oasis Resort', color: '#a4d93b', path: 'M61.4 154L62.4 144L74.4 134L110.4 128L195.4 122L222.4 121L242.4 121L250.4 124L273.4 148L305.4 169L367.4 195L417.4 204L436.4 194L468.4 160L519.4 138L542.4 126L555.4 126L563.4 134L564.4 146L560.4 164L553.4 184L542.4 221L532.4 245L525.4 271L512.4 302L502.4 325L489.4 346L479.4 365L476.4 380L475.4 391L476.4 402L476.4 415L475.4 430L469.4 444L452.4 456L426.4 468L416.4 479L406.4 484L311.4 403L215.4 322L108.4 232L84.4 213L73.4 202L65.4 192L61.4 179L59.4 170L58.4 166Z' },
  { id: '11', name: 'Ocean Galaxy', color: '#ff4f91', path: 'M448.4 598L426.4 489L426.4 479L441.4 467L481.4 446L485.4 436L489.4 423L504.4 417L522.4 417L545.4 418L575.4 423L607.4 424L638.4 430L663.4 433L695.4 437L725.4 440L753.4 447L765.4 455L775.4 462L778.4 481L778.4 499L777.4 523L774.4 554L777.4 590L774.4 610L774.4 629L773.4 649L769.4 661L751.4 682L733.4 691L691.4 702L661.4 711L636.4 722L602.4 727L588.4 727L578.4 725L556.4 719L521.4 696L484.4 670L474.4 662L462.4 643L453.4 631Z' },
  { id: '12', name: 'Quậy Station', color: '#25b9ff', path: 'M827.4 244L962.4 247L993.4 251L1017.4 258L1020.4 275L1020.4 296L1024.4 324L1030.4 361L1018.4 405L1015.4 443L1021.4 479L1032.4 514L1038.4 544L1038.4 584L1028.4 626L1012.4 645L964.4 656L911.4 658L873.4 658L841.4 659L832.4 660Z' },
]

const sourceIdByZone = { 10: 'oasis-resort', 11: 'ocean-galaxy', 12: 'quay-station' }
const runnerColors = { 10: '#4f7709', 11: '#b51258', 12: '#006baf' }
// Màu viền khu trên mặt bằng: tông tươi, đậm sắc (không pha trắng) để nổi trên ảnh
const zoneLightColors = { 10: '#a8ef1c', 11: '#ff3f8e', 12: '#1ab8ff' }
const amenitiesByZone = Object.fromEntries(zones.map((zone) => [zone.id, masterPlan.zones.find((item) => item.id === sourceIdByZone[zone.id])?.markers || []]))

// Tra cứu nhanh tiện ích theo số để mở popup chi tiết khi bấm vào số trên mặt bằng.
const amenityByNumber = Object.fromEntries(zones.flatMap((zone) => amenitiesByZone[zone.id].map((amenity) => [amenity.n, { ...amenity, zone }])))

// Chi tiết tiện ích khi bấm số trên mặt bằng.
// - inline (điện thoại): nằm NGOÀI ảnh, ngay dưới các nút khu → không che số trên mặt bằng.
// - overlay (tablet): thẻ nổi trượt vào từ mép phải của ảnh. Máy tính dùng cột danh sách bên phải.
function AmenityDetail({ n, onClose, inline = false }) {
  const amenity = amenityByNumber[n]
  if (!amenity) return null
  const { zone } = amenity
  const index = amenitiesByZone[zone.id].findIndex((item) => item.n === n)
  return (
    <aside key={n} role="dialog" aria-label={`Chi tiết tiện ích ${amenity.name}`}
      className={inline
        ? 'amenity-detail-inline mt-2 rounded-2xl border-l-4 bg-white shadow-soft sm:hidden'
        : 'floorplan-drawer absolute bottom-3 right-3 z-30 hidden max-h-[80%] w-72 overflow-y-auto rounded-[1.5rem] border-l-4 bg-white/95 shadow-card backdrop-blur-xl sm:block lg:hidden'}
      style={{ borderColor: zone.color }}>
      <div className={'flex items-center gap-3 ' + (inline ? 'p-2.5' : 'items-start p-4')}>
        <span className={'grid shrink-0 place-items-center rounded-full font-display font-bold text-white ' + (inline ? 'size-8 text-sm' : 'size-10 text-base')} style={{ background: runnerColors[zone.id] }}>{n}</span>
        <div className="min-w-0 flex-1">
          <p className="m-0 font-display text-[length:calc(0.65rem*var(--type-scale))] font-bold uppercase tracking-widest" style={{ color: zone.color }}>{zone.name}</p>
          <h3 className={'m-0 font-display font-bold leading-tight text-q-navy ' + (inline ? 'text-[length:calc(0.95rem*var(--type-scale))]' : 'text-lg')}>{amenity.name}</h3>
          <p className="m-0 mt-0.5 text-xs text-q-muted">Tiện ích {index + 1}/{amenitiesByZone[zone.id].length} của khu {zone.name}</p>
        </div>
        <button type="button" onClick={onClose} aria-label="Đóng thông tin tiện ích"
          className="grid size-9 shrink-0 place-items-center rounded-full bg-q-navy/80 text-xl leading-none text-white hover:bg-q-navy">×</button>
      </div>
    </aside>
  )
}

function AmenityPanel({ expanded, setExpanded, selected, setSelected, setSelectedZone, className = '' }) {
  return (
    <aside className={'scroll-thin flex flex-col overflow-y-auto p-3 sm:p-4 ' + className} aria-label="Danh sách tiện ích theo khu">
      <p className="mb-3 font-display text-xs font-bold uppercase tracking-widest text-q-muted">3 khu trải nghiệm</p>
      <div className="amenity-panel-groups flex flex-col gap-2">
        {zones.map((zone) => {
          const open = expanded === zone.id
          return (
            <div key={zone.id} className="overflow-hidden rounded-2xl border border-q-navy/10 bg-white/90">
              <button type="button" onClick={() => { setExpanded(open ? null : zone.id); setSelectedZone(open ? null : zone.id) }} aria-expanded={open} aria-controls={'amenities-' + zone.id}
                className="flex min-h-12 w-full items-center gap-2 px-3 text-left font-display text-sm font-bold text-q-navy sm:px-4">
                <span className="size-3 shrink-0 rounded-full" style={{ background: runnerColors[zone.id] }} />
                <span className="flex-1">{zone.name}</span>
                {/* Khung vuông cố định: mũi tên xoay quanh đúng tâm của nó, không xê dịch khi mở/đóng */}
                <span aria-hidden="true"
                  className="grid size-[18px] shrink-0 place-items-center transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] will-change-transform [transform-origin:50%_50%] motion-reduce:transition-none"
                  style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <img src="/images/arrow-sm.webp" alt="" aria-hidden="true" width="96" height="56" decoding="async" className="block h-auto w-[17.5px]" />
                </span>
              </button>
              {/* Mở/đóng mượt: animate grid-template-rows 0fr ↔ 1fr (không cần đo chiều cao) */}
              <div id={'amenities-' + zone.id} inert={!open}
                className={'grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ' + (open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}>
                <div className="min-h-0 overflow-hidden">
                <div className="grid gap-1 border-t border-q-navy/10 p-2">
                  {amenitiesByZone[zone.id].map((amenity) => (
                    <button key={amenity.n} type="button" onClick={() => { setSelected(amenity.n); setSelectedZone(zone.id) }} aria-pressed={selected === amenity.n}
                      className={'flex min-h-11 items-center gap-2 rounded-xl px-2 py-1.5 text-left text-xs leading-normal transition-colors sm:text-sm ' + (selected === amenity.n ? 'bg-q-navy text-white' : 'text-q-ink hover:bg-q-cream')}>
                      <span className="grid size-6 shrink-0 place-items-center rounded-full font-display text-xs font-bold text-white" style={{ background: runnerColors[zone.id] }}>{amenity.n}</span>
                      {amenity.name}
                    </button>
                  ))}
                </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </aside>
  )
}

export default function MasterPlan() {
  const ref = useReveal()
  const [mapRef, mapVisible] = useNearViewport('300px')
  const [expanded, setExpanded] = useState(null)
  const [selected, setSelected] = useState(null)
  const [hoveredZone, setHoveredZone] = useState(null)
  const [selectedZone, setSelectedZone] = useState(null)
  const [fullscreen, setFullscreen] = useState(false)
  const [zoom, setZoom] = useState(1)

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

  const showZone = (id) => setExpanded(id)
  const panelProps = { expanded, setExpanded, selected, setSelected, setSelectedZone }
  const highlightedZone = hoveredZone || selectedZone

  const mapBlock = (
      <div className={fullscreen ? 'amenity-layout-full fixed inset-0 z-[100] flex flex-col justify-center gap-3 overflow-auto bg-q-navy p-3' : 'amenity-layout relative mt-5 w-full rounded-[2rem] bg-white p-2 shadow-card sm:p-3 lg:flex'}
        style={fullscreen ? { alignItems: 'safe center' } : undefined}>
        {/* Máy tính: 2 cột liền nhau — ảnh bên trái (rộng tối đa theo chiều cao màn hình), cột danh sách
            bên phải lấp hết phần còn lại, ăn sát mép trên/dưới/phải của ảnh nên không còn khoảng trắng. */}
        <div ref={mapRef} className={'amenity-map relative mx-auto w-full shrink-0 overflow-hidden ' + (fullscreen
          ? 'amenity-map-full aspect-[1672/941] rounded-xl'
          : 'aspect-[1120/941] max-w-[calc((100svh-var(--header-h)-16rem)*1.19)] rounded-[1.6rem] sm:max-w-[calc((100svh-var(--header-h)-13rem)*1.19)] lg:mx-0 lg:aspect-[1672/941] lg:w-[min(calc(100%-19rem),calc((100svh-var(--header-h)-9rem)*1.777))] lg:max-w-none lg:rounded-r-none')}
          style={fullscreen ? { width: `${zoom * 100}%`, maxWidth: zoom > 1 ? 'none' : '178svh' } : undefined}>
          <Img
            src={masterPlan.image}
            alt={mapVisible ? '' : 'Mặt bằng tiện ích QTOPIA với ba khu Oasis Resort, Ocean Galaxy và Quậy Station'}
            sizes={fullscreen ? '100vw' : '(min-width: 1280px) 60vw, (min-width: 768px) 100vw, 135vw'}
            className={'absolute inset-y-0 left-0 h-full max-w-none ' + (fullscreen ? 'w-full' : 'w-[149.2857%] lg:w-full')}
          />
          {mapVisible ? <svg className={'absolute inset-y-0 left-0 h-full ' + (fullscreen ? 'w-full' : 'w-[149.2857%] lg:w-full')} viewBox="0 0 1672 941" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Mặt bằng tiện ích QTOPIA với ba khu Oasis Resort, Ocean Galaxy và Quậy Station">
            {zones.map((zone) => (
              <g key={zone.id} className="amenity-zone" style={{ color: zone.color, opacity: expanded && expanded !== zone.id ? 0.55 : 1 }}>
                {/* Viền khu: mảnh, màu sáng (tông nhạt của màu khu) */}
                <path d={zone.path} fill="currentColor" fillOpacity={expanded === zone.id ? 0.07 : 0.035} stroke="currentColor" strokeOpacity="1" strokeWidth="2.4" strokeLinejoin="round" vectorEffect="non-scaling-stroke" style={{ color: zoneLightColors[zone.id] }} />
                {/* Vệt chạy: đoạn line trắng mảnh hơn viền, chạy ở giữa đường viền */}
                <path d={zone.path} fill="none" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="9 91" pathLength="100" vectorEffect="non-scaling-stroke" className={'amenity-zone-runner amenity-zone-runner-white ' + (highlightedZone === zone.id ? 'amenity-zone-runner-active' : '')} />
                <path d={zone.path} fill="transparent" stroke="transparent" strokeWidth="18" onMouseEnter={() => { setHoveredZone(zone.id); showZone(zone.id) }} onMouseLeave={() => setHoveredZone(null)} onClick={() => { showZone(zone.id); setSelectedZone(zone.id) }} className="cursor-pointer" />
              </g>
            ))}
          </svg> : null}
          {mapVisible ? zones.flatMap((zone) => amenitiesByZone[zone.id].flatMap((amenity) => {
            const positions = amenityLabelPositions[amenity.n] || []
            const isSelected = selected === amenity.n
            return positions.map((position, index) => (
              <button key={`${amenity.n}-${index}`} type="button" onClick={() => { showZone(zone.id); setSelected(amenity.n); setSelectedZone(zone.id) }}
                aria-label={`${amenity.n}. ${amenity.name}`} aria-pressed={isSelected}
                className={'amenity-number absolute z-10 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full font-display text-[length:calc(0.7rem*var(--type-scale))] font-bold text-white ' + (isSelected ? 'amenity-number-selected ' : '') + (expanded === zone.id || isSelected ? 'amenity-number-focus' : '')}
                style={{ top: position.top, '--amenity-left-full': position.left, '--amenity-left-cropped': `${(parseFloat(position.left) * 1672 / 1120).toFixed(2)}%`, '--amenity-marker-color': runnerColors[zone.id] }}>
                <span>{amenity.n}</span>
              </button>
            ))
          })) : null}
          {mapVisible && fullscreen ? (
            <AmenityPanel {...panelProps} className="absolute bottom-3 right-3 top-16 z-20 hidden w-[34%] min-w-[17rem] rounded-2xl border border-white/60 bg-white/92 shadow-card backdrop-blur-xl lg:flex" />
          ) : null}
          {mapVisible && selected ? <AmenityDetail n={selected} onClose={() => setSelected(null)} /> : null}

          <div className={(fullscreen ? 'fixed right-3 top-3' : 'absolute right-2.5 top-2.5 sm:right-3 sm:top-3') + ' z-40 flex items-center gap-2'}>
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
            className="inline-flex min-h-11 items-center rounded-full bg-q-navy/80 px-4 font-display text-sm font-semibold text-white backdrop-blur hover:bg-q-navy">
            {fullscreen ? 'Thu nhỏ' : 'Phóng to'}
          </button>
          </div>
        </div>

        {fullscreen ? null : (
          <div className="amenity-legend-row relative hidden min-w-[19rem] flex-1 lg:block">
            <AmenityPanel {...panelProps} className="absolute inset-0 rounded-r-[1.6rem] bg-q-cream" />
          </div>
        )}

        <div className={(fullscreen ? 'w-full shrink-0' : 'amenity-mobile-legend mt-3') + ' lg:hidden'}>
          <div className="flex gap-2">
            {zones.map((zone) => {
              const active = expanded === zone.id
              return (
                <button key={zone.id} type="button" aria-pressed={active}
                  onClick={() => { const next = active ? null : zone.id; setExpanded(next); setSelectedZone(next); setSelected(null) }}
                  className={'flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-full border px-2 text-center font-display text-[length:calc(0.7rem*var(--type-scale))] font-bold leading-tight transition-colors sm:text-sm ' + (active ? 'border-transparent text-white' : 'border-q-navy/15 bg-white text-q-navy')}
                  style={active ? { background: runnerColors[zone.id] } : undefined}>
                  <span className="size-2.5 shrink-0 rounded-full" style={{ background: active ? '#fff' : zone.color }} />
                  {zone.name}
                </button>
              )
            })}
          </div>
          {expanded && !fullscreen ? (
            <ul className="m-0 mt-2 grid list-none grid-cols-2 gap-1 p-0 sm:grid-cols-3">
              {amenitiesByZone[expanded].map((amenity) => (
                <li key={amenity.n}>
                  <button type="button" onClick={() => setSelected(amenity.n)} aria-pressed={selected === amenity.n}
                    className={'flex min-h-11 w-full cursor-pointer items-center gap-2 rounded-xl px-2 py-1 text-left text-xs leading-snug ' + (selected === amenity.n ? 'bg-q-navy text-white' : 'bg-q-sand/60 text-q-navy')}>
                    <span className="grid size-6 shrink-0 place-items-center rounded-full font-display text-[0.7rem] font-bold text-white" style={{ background: runnerColors[expanded] }}>{amenity.n}</span>
                    <span className="min-w-0">{amenity.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
          {selected ? <AmenityDetail inline n={selected} onClose={() => setSelected(null)} /> : null}
          <p className={'mb-0 mt-2 text-center text-xs ' + (selected ? 'max-sm:hidden ' : '') + (fullscreen ? 'text-white/70' : 'text-q-muted')}>Chọn một khu để xem danh sách tiện ích, hoặc chạm vào điểm trên mặt bằng.</p>
        </div>
      </div>
  )

  return (
    <section id="tien-ich" data-snap-section className="section-screen bg-q-cream">
      <Container>
        <div ref={ref}>
          <SectionHeading label="Ba khu trải nghiệm tại QTOPIA" lead="Quậy Station hướng biển, Ocean Galaxy sôi động, Oasis Resort để thư giãn và vận động." />
        </div>

        {/* Toàn màn hình: đưa ra <body> bằng portal — section dùng content-visibility / transform / zoom làm position:fixed bị neo vào section (iOS: màn hình trống, khoá cuộn) */}
        {fullscreen && typeof document !== 'undefined' ? createPortal(mapBlock, document.body) : mapBlock}
      </Container>
    </section>
  )
}
