// Bản build SSR: dùng ở bước prerender (scripts/prerender.mjs) để ghi HTML tĩnh cho từng route.
import { renderToPipeableStream } from 'react-dom/server'
import { PassThrough } from 'node:stream'
import { StaticRouter } from 'react-router-dom'
import App from './App.jsx'

export function render(url) {
  return new Promise((resolve, reject) => {
    const output = new PassThrough()
    let html = ''
    output.on('data', (chunk) => { html += chunk.toString() })
    output.on('end', () => resolve(html))
    output.on('error', reject)
    const stream = renderToPipeableStream(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
    { onAllReady() { stream.pipe(output) }, onError: reject },
    )
  })
}

export { headTags, tagsToHtml } from './seo/head'
export { SITE_URL, SITE_URL_PLACEHOLDER, pages, hiddenPages, routes, absUrl } from './seo/site-meta'
