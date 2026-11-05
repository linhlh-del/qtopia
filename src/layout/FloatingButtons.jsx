import { useEffect, useState } from 'react'
import Icon from '../components/ui/Icons'
import { useContactPopup } from '../components/ContactPopup'
import { siteMeta } from '../data/project'
import { isFilled } from '../lib/filled'

// Cụm nút nổi (máy tính): CHỈ icon, ≥ 48px, có aria-label + title. Nút lên đầu trang nằm phía trên cụm CTA.
// Điện thoại: cụm này ẩn (đã có thanh sticky đáy); nút lên đầu trang nằm trên thanh sticky.
const fab =
  'grid size-12 cursor-pointer place-items-center rounded-full border-0 text-white shadow-[0_10px_24px_-8px_rgba(5,10,46,0.5)] transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out)] hover:scale-[1.07] hover:shadow-[0_14px_30px_-8px_rgba(5,10,46,0.6)] active:scale-95'

function FabRings() {
  return (
    <>
      <span className="fab-cta-ring fab-cta-ring-1" aria-hidden="true" />
      <span className="fab-cta-ring fab-cta-ring-2" aria-hidden="true" />
    </>
  )
}

// Hotline / Zalo chưa có dữ liệu thật từ CĐT: nút vẫn hiển thị nhưng mở form để lại số,
// thay vì trỏ tới link giả. Khi siteMeta.hotlineHref / siteMeta.zalo được điền, nút tự chuyển sang link thật.
function CallButton({ popup, where }) {
  const ready = isFilled(siteMeta.hotline) && siteMeta.hotlineHref
  const label = ready ? `Gọi hotline ${siteMeta.hotline}` : 'Để lại số, tư vấn viên gọi lại'
  const className = `${fab} relative isolate fab-cta-pulse fab-call-pulse bg-[var(--cta-from)]`
  const content = (
    <>
      <FabRings />
      <Icon name="phone" size={22} className="fab-cta-icon" />
    </>
  )
  return ready ? (
    <a href={siteMeta.hotlineHref} aria-label={label} title={label} data-cta-name="floating_call" data-cta-location={where} className={className}>
      {content}
    </a>
  ) : (
    <button type="button" onClick={() => popup.open(where + '_call')} aria-label={label} title={label} data-cta-name="floating_call" data-cta-location={where} className={className}>
      {content}
    </button>
  )
}

function ZaloButton({ popup, where }) {
  const ready = isFilled(siteMeta.zalo)
  const label = ready ? 'Chat Zalo với tư vấn viên' : 'Nhận tư vấn qua Zalo'
  const className = `${fab} relative isolate fab-cta-pulse fab-zalo-pulse bg-[#0068ff] font-display text-[length:calc(0.72rem*var(--type-scale))] font-bold tracking-tight`
  const content = (
    <>
      <FabRings />
      <span className="fab-cta-icon" aria-hidden="true">Zalo</span>
    </>
  )
  return ready ? (
    <a href={siteMeta.zalo} target="_blank" rel="noopener" aria-label={label} title={label} data-cta-name="floating_zalo" data-cta-location={where} className={className}>
      {content}
    </a>
  ) : (
    <button type="button" onClick={() => popup.open(where + '_zalo')} aria-label={label} title={label} data-cta-name="floating_zalo" data-cta-location={where} className={className}>
      {content}
    </button>
  )
}

export default function FloatingButtons() {
  const popup = useContactPopup()
  const [past, setPast] = useState(false)
  // Điện thoại: nút "lên đầu trang" chỉ hiện khi khách đang cuộn NGƯỢC lên (có ý định quay lại đầu trang),
  // ẩn khi cuộn xuống để không đè lên chữ / bản đồ / form ở góc phải dưới.
  const [scrollingUp, setScrollingUp] = useState(false)

  useEffect(() => {
    let frame = 0
    let lastY = window.scrollY
    let idle = 0
    const check = () => {
      frame = 0
      const y = window.scrollY
      setPast(y > window.innerHeight * 0.7)
      if (Math.abs(y - lastY) > 8) setScrollingUp(y < lastY)
      lastY = y
      window.clearTimeout(idle)
      idle = window.setTimeout(() => setScrollingUp(false), 2500)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check)
    }
    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
      window.clearTimeout(idle)
    }
  }, [])
  const mobileTop = past && scrollingUp
  const mobileTopCls = `transition-all duration-[var(--dur-base)] ease-[var(--ease-out)] ${
    mobileTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
  }`

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const topCls = `transition-all duration-[var(--dur-base)] ease-[var(--ease-out)] ${
    past ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
  }`

  return (
    <>
      <div className="fixed bottom-8 right-5 z-30 hidden flex-col items-center gap-2.5 lg:flex">
        <button
          type="button"
          onClick={toTop}
          aria-label="Lên đầu trang"
          title="Lên đầu trang"
          tabIndex={past ? 0 : -1}
          data-cta-name="back_to_top"
          data-cta-location="floating"
          className={`${fab} bg-white !text-q-navy ring-1 ring-q-navy/15 ${topCls}`}
        >
          <Icon name="up" size={22} />
        </button>
        <CallButton popup={popup} where="floating" />
        <ZaloButton popup={popup} where="floating" />
        <button
          type="button"
          onClick={() => popup.open('floating')}
          aria-label="Nhận thông tin dự án"
          title="Nhận thông tin dự án"
          data-cta-name="floating_price"
          data-cta-location="floating"
          className={`${fab} relative isolate fab-cta-pulse fab-offer-pulse bg-q-blue`}
        >
          <FabRings />
          <Icon name="doc" size={22} className="fab-cta-icon" />
        </button>
      </div>

      {/* Điện thoại: chỉ nút lên đầu trang — Gọi và Zalo đã nằm sẵn trên thanh sticky đáy */}
      <button
        type="button"
        onClick={toTop}
        aria-label="Lên đầu trang"
        title="Lên đầu trang"
        tabIndex={mobileTop ? 0 : -1}
        data-cta-name="back_to_top"
        data-cta-location="floating_mobile"
        className={`${fab} fixed bottom-[calc(var(--bar-h)+0.75rem)] right-4 z-30 bg-white !text-q-navy ring-1 ring-q-navy/15 lg:hidden ${mobileTopCls}`}
      >
        <Icon name="up" size={22} />
      </button>
    </>
  )
}
