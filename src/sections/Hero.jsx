import { Fragment, useEffect, useState } from 'react'
import Container from '../components/ui/Container'
import Img from '../components/ui/Img'
import { useContactPopup } from '../components/ContactPopup'
import { heroContent } from '../data/project'
import { responsiveImageProps } from '../lib/responsive-image'

// Hero = ẢNH LÀM CHỦ. Khối chữ gói trong dải đáy (~20% chiều cao), chữ nhỏ, chỉ 1 CTA.
export default function Hero() {
  const [active, setActive] = useState(0)
  const popup = useContactPopup()
  const slide = heroContent.images[active]
  // Accept editorial line breaks as text, without rendering arbitrary HTML.
  const titleLines = slide.h1.split(/\r?\n|<\/?br\s*\/?>/i)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    let preloadId = 0
    let rotateId = 0
    const startRotation = () => {
      preloadId = window.setTimeout(() => {
        const next = heroContent.images[(active + 1) % heroContent.images.length]
        const image = new window.Image()
        const imageProps = responsiveImageProps(next.src, '100vw')
        image.decoding = 'async'
        image.sizes = imageProps.sizes
        if (imageProps.srcSet) image.srcset = imageProps.srcSet
        image.src = imageProps.src
      }, 2500)
      rotateId = window.setTimeout(
        () => setActive((i) => (i + 1) % heroContent.images.length),
        6500,
      )
    }
    if (document.readyState === 'complete') startRotation()
    else window.addEventListener('load', startRotation, { once: true })
    return () => {
      window.removeEventListener('load', startRotation)
      window.clearTimeout(preloadId)
      window.clearTimeout(rotateId)
    }
  }, [active])

  return (
    <section
      id="top"
      data-snap-section
      className="relative flex min-h-[calc(100svh-var(--header-h))] items-end overflow-hidden bg-q-navy text-white"
    >
      {heroContent.images.slice(active, active + 1).map((img) => (
        <Img
          key={img.src}
          src={img.src}
          alt={img.alt}
          priority={active === 0}
          fade={false}
          className={`${active === 0 ? '' : 'hero-image-enter '}absolute inset-0 h-full w-full object-cover`}
        />
      ))}
      {/* Lớp phủ chỉ đậm ở dải đáy — phần còn lại để ảnh hiện rõ */}
      {/* Lớp phủ đậm hơn ở điện thoại (chữ nằm trên vùng ảnh sáng) và nhạt hơn ở máy tính */}
      <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-q-navy via-q-navy/85 to-transparent lg:h-[42%] lg:via-q-navy/65" />

      <Container className="relative z-10 pb-[calc(1.5rem+var(--bar-h))] pt-20 lg:pb-10 lg:pr-24">
        <div className="flex max-w-lg flex-col items-start gap-3">
          <div key={slide.src} className="hero-copy-enter flex flex-col gap-3">
            <h1 className="m-0 font-display text-[clamp(1.35rem,3.1vw,2.1rem)] font-extrabold leading-[1.15] tracking-tight text-white">
              {titleLines.map((line, i) => (
                <Fragment key={i}>
                  {i > 0 && <br />}
                  <span className={titleLines.length > 1 ? 'whitespace-nowrap' : undefined}>{line}</span>
                </Fragment>
              ))}
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
