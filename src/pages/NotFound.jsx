import { Link } from 'react-router-dom'
import Container from '../components/ui/Container'

export default function NotFound() {
  return (
    <section className="section-y bg-q-cream">
      <Container className="flex flex-col items-center gap-5 text-center">
        <h1 className="section-title text-q-navy">Không tìm thấy trang</h1>
        <p className="prose-lead max-w-xl text-q-muted">
          Trang bạn tìm không tồn tại hoặc đã được chuyển đi. Quay về trang chủ để xem tổng quan dự án, vị trí, tiện ích và mặt bằng căn hộ QTOPIA.
        </p>
        <Link to="/" className="btn-base btn-dark no-underline">
          Về trang chủ QTOPIA
        </Link>
      </Container>
    </section>
  )
}
