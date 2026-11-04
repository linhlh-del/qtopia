// Bản build SSR: dùng ở bước prerender (scripts/prerender.mjs) để ghi HTML tĩnh cho từng route.
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App.jsx'

export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
}

export { headTags, tagsToHtml } from './seo/head'
export { SITE_URL, SITE_URL_PLACEHOLDER, pages, hiddenPages, routes, absUrl } from './seo/site-meta'
