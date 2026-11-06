import { Link } from 'react-router-dom'
import Container from '../components/ui/Container'
import Img from '../components/ui/Img'
import Icon from '../components/ui/Icons'
import { useReveal } from '../hooks/useReveal'

// Màn "story" toàn khung hình: ảnh làm chủ, khối chữ ngắn gọn ở một bên.
export default function Story({ data }) {
  const ref = useReveal()
  const right = data.align === 'right'
  return (
    <section
      id={data.id}
      data-snap-section
      className="relative flex min-h-[calc(100svh-var(--header-h))] items-center overflow-hidden bg-q-brand-deep text-white"
    >
      <Img src={data.image} alt={data.alt} className="absolute inset-0 h-full w-full object-cover" />
      <div
        className={`absolute inset-0 ${
          right ? 'bg-gradient-to-l' : 'bg-gradient-to-r'
        } from-q-brand-deep/85 via-q-brand-deep/35 to-transparent max-lg:bg-gradient-to-t max-lg:from-q-brand-deep/90 max-lg:via-q-brand-deep/40 max-lg:to-transparent`}
      />
      <Container
        className={`relative z-10 flex py-14 max-lg:items-end max-lg:pb-[calc(2rem+var(--bar-h))] ${right ? 'lg:justify-end' : ''}`}
      >
        <div ref={ref} className="text-panel flex max-w-xl flex-col gap-3">
          <h2 className="section-label section-label-light">{data.label}</h2>
          <p className="prose-lead m-0 text-white">{data.lead}</p>
          {data.points.length ? (
            <ul className="m-0 flex list-none flex-col gap-1.5 p-0 text-sm text-white/95">
              {data.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-q-lime" />
                  {p}
                </li>
              ))}
            </ul>
          ) : null}
          <div className="pt-1">
            <Link
              to={data.cta.to}
              data-cta-name={data.cta.name}
              data-cta-location={data.id}
              data-cta-target={data.cta.to}
              className="btn-base btn-outline cta-fx no-underline"
            >
              {data.cta.label}
              <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
