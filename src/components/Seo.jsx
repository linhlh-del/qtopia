import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { applyHead } from '../seo/head'
import { routes } from '../seo/site-meta'

// Cập nhật <head> khi chuyển route (trang prerender đã có sẵn head đúng; hàm này chỉ cần khi điều hướng trong SPA).
export default function Seo() {
  const { pathname } = useLocation()
  useEffect(() => {
    const path = pathname.replace(/\/+$/, '') || '/'
    applyHead(routes.includes(path) ? path : '/404')
  }, [pathname])
  return null
}
