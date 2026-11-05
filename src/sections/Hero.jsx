import { useEffect, useState } from 'react'
import Container from '../components/ui/Container'
import Img from '../components/ui/Img'
import { useContactPopup } from '../components/ContactPopup'
import { heroContent } from '../data/project'

// Hero = ẢNH LÀM CHỦ. Khối chữ gói trong dải đáy (~20% chiều cao), chữ nhỏ, chỉ 1 CTA.
export default function Hero() {
  const [active, setActive] = useState(0)
  const popup = useContactPopup()
  const slide = heroContent.images[active]

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const id = window.setTimeout(() => setActive((i) => (i + 1) % heroContent.images.length), 6500)
    return () => window.clearTimeout(id)
  }, [active])

  return (
    <section
      id="top"
      data-snap-section
      className="relative flex min-h-[calc(100svh-var(--header-h))] items-end overflow-hidden bg-q-navy text-white"
    >
      {heroContent.images.map((img, i) => (
        <Img
          key={img.src}
          src={img.src}
          alt={img.alt}
          priority={i === 0}
          fade={false}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ${
            i === active ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      {/* Lớp phủ chỉ đậm ở dải đáy — phần còn lại để ảnh hiện rõ */}
      {/* Lớp phủ đậm hơn ở điện thoại (chữ nằm trên vùng ảnh sáng) và nhạt hơn ở máy tính */}
      <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-q-navy via-q-navy/85 to-transparent lg:h-[42%] lg:via-q-navy/65" />

      <Container className="relative z-10 pb-[calc(1.5rem+var(--bar-h))] pt-20 lg:pb-10 lg:pr-24">
        <div className="flex max-w-lg flex-col items-start gap-3">
          <div key={slide.src} className="hero-copy-enter flex flex-col gap-3">
            <h1 className="m-0 font-display text-[clamp(1.35rem,3.1vw,2.1rem)] font-extrabold leading-[1.15] tracking-tight text-white">
              {slide.h1}
            </h1>
            <p className="m-0 font-display text-sm font-semibold text-q-lime sm:text-base">{slide.slogan}</p>
          </div>
          <button
            type="button"
            onClick={() => popup.open('hero')}
            data-cta-name="hero_register"
            data-cta-location="hero"
            className="btn-base btn-primary mt-1"
          >
            {heroContent.ctaPrimary}
          </button>
        </div>

        <div className="mt-5 flex gap-2" role="group" aria-label="Chọn ảnh nền">
          {heroContent.images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              aria-label={`Hiển thị ảnh ${i + 1}`}
              aria-current={i === active ? 'true' : undefined}
              onClick={() => setActive(i)}
              className="relative grid size-6 place-items-center before:absolute before:-inset-2.5 before:content-['']"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? 'w-6 bg-q-lime' : 'w-1.5 bg-white/55'
                }`}
              />
            </button>
          ))}
        </div>
      </Container>
    </section>
  )
}
