// Bản build SSR: dùng ở bước prerender (scripts/prerender.mjs) để ghi HTML tĩnh cho từng route.
import { prerenderToNodeStream } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'
import App from './App.jsx'
import { preloadAll } from './components/DeferredSection'
// Nạp sẵn nội dung chữ để JSON-LD (FAQPage, dateModified) có đủ dữ liệu khi prerender <head>
import './data/seo-content'

// prerender (react-dom/static) chờ mọi Suspense/lazy xong rồi mới xuất HTML hoàn chỉnh: không có script
// inline $RC/$RT để ghép nội dung → HTML sạch hơn và tương thích CSP chặn inline script.
async function renderOnce(url) {
  const { prelude } = await prerenderToNodeStream(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
  let html = ''
  for await (const chunk of prelude) html += chunk.toString()
  return html
}

// Tải trước mọi component lazy → render đồng bộ, không còn ranh giới Suspense treo
// → không sinh script inline $RC/$RT (HTML sạch, tương thích CSP chặn inline script).
export async function render(url) {
  await preloadAll()
  return renderOnce(url)
}

export { headTags, tagsToHtml } from './seo/head'
export { SITE_URL, SITE_URL_PLACEHOLDER, pages, hiddenPages, routes, indexableRoutes, absUrl } from './seo/site-meta'
export { buildCmsSchema } from './cms/schema'
export { pageDefaults } from './seo/site-meta'
