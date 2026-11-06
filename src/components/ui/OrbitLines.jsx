import { useId } from 'react'

// Super graphic "Orbit Lines" theo brand guideline: các vòng đồng tâm cách đều tạo hình chữ Q
// phát sáng (hồng → cyan → xanh), cộng cụm vòng cung mờ ở góc đối diện.
// Dùng cùng lớp nền .brand-orbit-bg (gradient xanh #062aa3) đặt trên <section>.
const RING_COUNT = 24
const CENTER = { x: 1120, y: 410 }

const rings = Array.from({ length: RING_COUNT }, (_, i) => {
  const t = i / (RING_COUNT - 1)
  return {
    // các vòng đồng tâm, cách đều nhau
    r: 200 + t * 250,
    opacity: 0.85 - t * 0.5,
  }
})

const echoRings = Array.from({ length: 12 }, (_, i) => ({ r: 360 + i * 22 }))

export default function OrbitLines({ flip = false, className = '' }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const id = (name) => `${name}-${uid}`
  return (
    <>
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full opacity-70 lg:opacity-100 ${className}`}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <defs>
        <radialGradient id={id('orbit-core-glow')} cx={CENTER.x} cy={CENTER.y} r="480" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2a8bff" stopOpacity="0.55" />
          <stop offset="0.45" stopColor="#1452e0" stopOpacity="0.25" />
          <stop offset="1" stopColor="#062aa3" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id('orbit-ring-stroke')} x1="640" y1="0" x2="1440" y2="900" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ff6ad5" />
          <stop offset="0.3" stopColor="#3fe6ff" />
          <stop offset="0.55" stopColor="#2f7dff" />
          <stop offset="0.72" stopColor="#ff5fae" />
          <stop offset="1" stopColor="#2a5cff" />
        </linearGradient>
        <linearGradient id={id('orbit-echo-stroke')} x1="0" y1="500" x2="700" y2="900" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4f8dff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#4f8dff" stopOpacity="0" />
        </linearGradient>
        <filter id={id('orbit-ring-glow')} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="1440" height="900" fill={`url(#${id('orbit-core-glow')})`} />

      <g fill="none" stroke={`url(#${id('orbit-echo-stroke')})`} strokeWidth="3">
        {echoRings.map((ring) => (
          <circle key={ring.r} cx="140" cy="1080" r={ring.r} />
        ))}
      </g>

      <g fill="none" stroke={`url(#${id('orbit-ring-stroke')})`} strokeWidth="3.2" filter={`url(#${id('orbit-ring-glow')})`}>
        {rings.map((ring) => (
          <circle key={ring.r} cx={CENTER.x} cy={CENTER.y} r={ring.r} strokeOpacity={ring.opacity} />
        ))}
      </g>
    </svg>
    {/* Lớp phủ tối để chữ nổi trên nền sáng: đậm bên trái (cột chữ), nhạt dần sang phải */}
    <div aria-hidden="true" className={`brand-orbit-scrim ${flip ? 'brand-orbit-scrim-flip' : ''}`} />
    </>
  )
}
