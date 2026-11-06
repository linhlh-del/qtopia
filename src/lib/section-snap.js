/* ============================================================
   SECTION SNAP — lướt qua 1/4 màn hình thì tự kéo section kế tiếp lên chiếm trọn khung hình.
   CSS scroll-snap chỉ bắt về điểm GẦN NHẤT (phải qua 1/2), nên dùng JS để có ngưỡng 1/4:
   - Khi khách ngừng cuộn (hết quán tính / 140 ms không có sự kiện cuộn, ngón tay đã nhấc):
       cuộn xuống ≥ 25% khung hình  → section kế tiếp lên đỉnh (ngay dưới header)
       cuộn lên   ≥ 25% khung hình  → section phía trên về đỉnh
       chưa đủ 25%                  → trả về section hiện tại
   - Section cao hơn màn hình (màn rất thấp): bên trong section cuộn tự do, chỉ bắt khi qua mép section.
   - Không bắt: footer, điện thoại xoay ngang, khi popup đang mở (body overflow hidden), khi đang chạm.
   - Tôn trọng prefers-reduced-motion (nhảy thẳng thay vì cuộn mượt).
   ============================================================ */
const THRESHOLD = 0.25
const IDLE_MS = 140

export function sectionSnap() {
  if (typeof window === 'undefined') return () => {}
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
  const landscapePhone = window.matchMedia('(orientation: landscape) and (max-height: 500px)')

  let startY = window.scrollY
  let idle = 0
  let touching = false
  let auto = false // đang tự cuộn → bỏ qua sự kiện cuộn của chính mình
  let autoTimer = 0

  const header = () => document.querySelector('header')?.offsetHeight || 0
  const sections = () => [...document.querySelectorAll('main > section[id]')]

  const snap = () => {
    idle = 0
    if (touching || auto || landscapePhone.matches || document.body.style.overflow === 'hidden') {
      startY = window.scrollY
      return
    }
    const y = window.scrollY
    const delta = y - startY
    startY = y
    if (Math.abs(delta) < 2) return

    const hh = header()
    const usable = window.innerHeight - hh
    const list = sections().map((el) => {
      const r = el.getBoundingClientRect()
      return { top: r.top + y - hh, h: r.height }
    })
    if (!list.length) return
    const last = list[list.length - 1]
    if (y > last.top + last.h - usable + 2) return // đã vào footer → cuộn tự do

    // Section đang chứa đỉnh khung hình: nếu cao hơn màn hình và đang ở giữa → cuộn tự do
    const cur = list.findIndex((s) => y >= s.top - 1 && y < s.top + s.h - 1)
    if (cur >= 0) {
      const s = list[cur]
      if (s.h > usable * 1.04 && y > s.top + 1 && y < s.top + s.h - usable - 1) return
    }

    let target
    if (delta > 0) {
      // xuống: section xa nhất đã lộ ≥ 25% khung hình từ đáy lên
      for (let j = 0; j < list.length; j++) if (list[j].top - usable * (1 - THRESHOLD) <= y) target = j
    } else {
      // lên: section gần nhất phía trên mà đỉnh khung hình đã lùi vào nó ≥ 25%
      for (let j = list.length - 1; j >= 0; j--) if (list[j].top + usable * (1 - THRESHOLD) >= y) target = j
    }
    if (target === undefined) return
    let top = list[target].top
    // section cao hơn màn hình, đi từ dưới lên: dừng ở mép DƯỚI của nó thay vì nhảy lên tận đỉnh
    if (delta < 0 && list[target].h > usable * 1.04 && y > list[target].top) {
      top = Math.max(list[target].top, list[target].top + list[target].h - usable)
    }
    if (Math.abs(top - y) < 2) return

    const targetEl = sections()[target]
    const offset = top - list[target].top // 0 = đỉnh section; > 0 = mép dưới của section cao
    auto = true
    clearTimeout(autoTimer)
    window.scrollTo({ top, behavior: reduce.matches ? 'instant' : 'smooth' })
    // hết cuộn tự động (smooth ~ 300–700 ms) → căn lại nếu chiều cao các section đổi trong lúc cuộn
    // (ảnh / section tải chậm), rồi nhận lại thao tác của khách
    autoTimer = setTimeout(() => {
      const want = targetEl.getBoundingClientRect().top + window.scrollY - header() + offset
      if (!touching && Math.abs(want - window.scrollY) > 2) window.scrollTo({ top: want, behavior: 'instant' })
      auto = false
      startY = window.scrollY
    }, 900)
  }

  const onScroll = () => {
    if (auto) return
    clearTimeout(idle)
    idle = setTimeout(snap, IDLE_MS)
  }
  const onTouchStart = () => {
    touching = true
    if (auto) { auto = false; clearTimeout(autoTimer); startY = window.scrollY }
  }
  const onTouchEnd = () => {
    touching = false
    clearTimeout(idle)
    idle = setTimeout(snap, IDLE_MS)
  }
  // con lăn / bàn phím trong lúc đang tự cuộn → khách giành lại quyền cuộn
  const onUserInput = () => {
    if (auto) { auto = false; clearTimeout(autoTimer); startY = window.scrollY }
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('touchstart', onTouchStart, { passive: true })
  window.addEventListener('touchend', onTouchEnd, { passive: true })
  window.addEventListener('touchcancel', onTouchEnd, { passive: true })
  window.addEventListener('wheel', onUserInput, { passive: true })
  window.addEventListener('keydown', onUserInput)
  return () => {
    clearTimeout(idle)
    clearTimeout(autoTimer)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('touchstart', onTouchStart)
    window.removeEventListener('touchend', onTouchEnd)
    window.removeEventListener('touchcancel', onTouchEnd)
    window.removeEventListener('wheel', onUserInput)
    window.removeEventListener('keydown', onUserInput)
  }
}
