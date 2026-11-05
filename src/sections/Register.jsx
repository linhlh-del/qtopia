import Container from '../components/ui/Container'
import Img from '../components/ui/Img'
import LeadFormFields from '../components/LeadFormFields'
import { leadFormContent } from '../data/project'
import { useReveal } from '../hooks/useReveal'

// Đăng ký tư vấn: một bên ảnh dự án, một bên biểu mẫu.
export default function Register() {
  const ref = useReveal()
  return (
    <section id="lien-he" data-snap-section className="section-screen relative overflow-hidden bg-q-navy text-white">
      <div className="orbit-bg opacity-50" style={{ '--orbit-x': '12%', '--orbit-y': '85%' }} />
      <Container className="relative flex min-h-0 flex-1 flex-col justify-center">
        <div ref={ref} className="mx-auto flex max-h-full w-full flex-col overflow-hidden rounded-[1.75rem] bg-white text-q-ink shadow-card md:grid md:grid-cols-2">
          <div className="relative hidden md:block md:min-h-[180px]">
            <Img
              src={leadFormContent.image}
              alt="Phối cảnh dự án căn hộ QTOPIA nhìn từ biển"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-q-navy/80 to-transparent" />
            <p className="absolute bottom-4 left-5 right-5 m-0 font-display text-base font-bold text-white drop-shadow sm:text-lg">
              {leadFormContent.heading}
            </p>
          </div>

          <div className="shrink-0 p-5 sm:p-7">
            <h2 className="section-label">{leadFormContent.label}</h2>
            <p className="m-0 mt-1 font-display text-lg font-bold text-q-navy md:hidden">{leadFormContent.heading}</p>
            <p className="mb-4 mt-2 text-sm text-q-muted sm:mb-5">{leadFormContent.description}</p>
            <LeadFormFields formLocation="lien-he" />
          </div>
        </div>
      </Container>
    </section>
  )
}
