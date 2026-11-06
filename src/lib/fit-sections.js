/* ============================================================
   FIT-TO-SCREEN: mỗi section toàn màn hình gói gọn trong đúng 1 khung hình thiết bị.
   Bố cục CSS (mobile first + breakpoint theo chiều cao) đã làm phần lớn việc. Trên màn hình thấp
   (iPhone 7/8/SE trong Safari ≈ 375×553, laptop 1280×640…), nếu nội dung một section vẫn cao hơn
   khung hình thì thu nhỏ đều nội dung của section đó bằng CSS `zoom` (giữ nguyên bố cục, chữ, ảnh tỉ lệ).
   - Tối thiểu 0,8 (80%) để chữ vẫn đọc được; cần nhỏ hơn thì section cao hơn màn hình và cuộn tự nhiên.
   - Không đụng hero (#top) và ảnh nền (phần tử position absolute).
   - Chạy lại khi đổi kích thước / xoay máy / nội dung đổi chiều cao (section tải chậm, mở accordion…).
   - Màn hình nằm ngang thấp (≤ 500px, điện thoại xoay ngang) không ép vừa 1 màn hình.
   ============================================================ */
const MIN_ZOOM = 0.8
const SKIP = new Set(['top'])

function viewportTarget() {
  // chiều cao khả dụng = 100svh − header (svh: khi thanh công cụ trình duyệt đang hiện)
  const probe = document.createElement('div')
  probe.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:100svh;visibility:hidden;pointer-events:none'
  document.body.appendChild(probe)
  const svh = probe.offsetHeight || window.innerHeight
  probe.remove()
  const header = document.querySelector('header')?.offsetHeight || 0
  return svh - header
}

function flowChildren(section) {
  return [...section.children].filter((el) => {
    const pos = getComputedStyle(el).position
    return pos !== 'absolute' && pos !== 'fixed' && el.offsetParent !== null
  })
}

function fitOne(section, target) {
  const kids = flowChildren(section)
  if (!kids.length) return
  // bỏ zoom cũ để đo kích thước tự nhiên
  kids.forEach((k) => { k.style.zoom = '' })
  const cs = getComputedStyle(section)
  const pad = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom)
  const natural = kids.reduce((sum, k) => {
    const m = getComputedStyle(k)
    return sum + k.offsetHeight + parseFloat(m.marginTop) + parseFloat(m.marginBottom)
  }, 0)
  const available = target - pad
  if (natural <= available || available <= 0) {
    section.removeAttribute('data-fit')
    return
  }
  let z = Math.max(MIN_ZOOM, Math.floor((available / natural) * 1000) / 1000)
  kids.forEach((k) => { k.style.zoom = String(z) })
  // Lượt 2: lề gộp / phần tử co giãn khiến chiều cao sau khi zoom chưa đúng tỉ lệ → đo lại và chỉnh thêm
  const over = section.getBoundingClientRect().height - target
  if (over > 1 && z > MIN_ZOOM) {
    z = Math.max(MIN_ZOOM, Math.floor(z * (1 - over / (target - pad)) * 1000) / 1000)
    kids.forEach((k) => { k.style.zoom = String(z) })
  }
  section.setAttribute('data-fit', String(z))
}

/** Bật fit-to-screen cho các section toàn màn hình trên trang hiện tại. Trả về hàm dừng. */
export function fitSections() {
  if (typeof window === 'undefined') return () => {}
  let frame = 0
  let timer = 0
  const sections = () =>
    [...document.querySelectorAll('main > section[id]')].filter(
      (s) => !SKIP.has(s.id) && (s.classList.contains('section-screen') || s.hasAttribute('data-snap-section')),
    )
  const landscapePhone = () => window.matchMedia('(orientation: landscape) and (max-height: 500px)').matches

  const run = () => {
    frame = 0
    const target = viewportTarget()
    for (const s of sections()) {
      if (landscapePhone()) {
        flowChildren(s).forEach((k) => { k.style.zoom = '' })
        s.removeAttribute('data-fit')
      } else fitOne(s, target)
    }
  }
  const schedule = () => { if (!frame) frame = requestAnimationFrame(run) }
  const later = (ms) => { clearTimeout(timer); timer = setTimeout(schedule, ms) }

  // Cập nhật theo sự kiện (không dùng ResizeObserver trên chính phần tử bị zoom → tránh vòng lặp):
  // DOM đổi (section tải chậm thay placeholder), ảnh tải xong, bấm (accordion / tab đổi chiều cao).
  const mo = new MutationObserver(() => later(150))
  const main = document.getElementById('main')
  if (main) mo.observe(main, { childList: true, subtree: true })
  const onLoad = (e) => { if (e.target?.tagName === 'IMG') later(150) }
  const onClick = () => later(420)
  document.addEventListener('load', onLoad, true)
  document.addEventListener('click', onClick, true)

  let lastW = window.innerWidth
  const onResize = () => {
    // thanh địa chỉ mobile ẩn/hiện chỉ đổi chiều cao → bỏ qua để nội dung không nhảy khi cuộn
    if (window.innerWidth === lastW && window.matchMedia('(pointer: coarse)').matches) return
    lastW = window.innerWidth
    schedule()
  }
  window.addEventListener('resize', onResize)
  const onOrient = () => later(250)
  window.addEventListener('orientationchange', onOrient)
  if (document.fonts?.ready) document.fonts.ready.then(schedule)
  schedule()
  return () => {
    mo.disconnect()
    cancelAnimationFrame(frame)
    clearTimeout(timer)
    document.removeEventListener('load', onLoad, true)
    document.removeEventListener('click', onClick, true)
    window.removeEventListener('resize', onResize)
    window.removeEventListener('orientationchange', onOrient)
  }
}
