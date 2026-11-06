/**
 * Bước cuối của `npm run build` (sau bản build trình duyệt vào dist/ và bản build SSR vào .ssr/):
 *  1. Prerender từng route thành HTML tĩnh có sẵn nội dung + <head> SEO riêng (title, description, canonical, OG, JSON-LD):
 *       trang chủ, trang chủ đề, /tin-tuc, các trang chi tiết bài viết · dist/404.html
 *  2. sitemap.xml (chỉ URL 200, có lastmod) và robots.txt (có dòng Sitemap:)
 *
 * Biến môi trường (đọc từ .env.production): VITE_SITE_URL (tên miền chính thức), VITE_GTM_ID, STRICT_SEO=1 (build lỗi nếu còn domain mẫu).
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { loadEnv } from 'vite'

process.env.NODE_ENV = 'production'
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, process.env.QTOPIA_BUILD_DIR || 'dist')
const env = { ...loadEnv('production', root, ''), ...process.env }

const ssr = await import(pathToFileURL(resolve(root, process.env.QTOPIA_SSR_DIR || '.ssr', 'entry-server.js')).href)
const { pages, pageDefaults, buildCmsSchema, render, headTags, tagsToHtml, routes, indexableRoutes, hiddenPages, SITE_URL, SITE_URL_PLACEHOLDER, absUrl } = ssr

if (SITE_URL === SITE_URL_PLACEHOLDER) {
  const msg = `\n⚠  VITE_SITE_URL chưa được đặt — canonical, og:url, sitemap, JSON-LD đang dùng domain MẪU (${SITE_URL}).\n   Đặt VITE_SITE_URL=https://<tên-miền-thật> trong .env.production rồi build lại trước khi phát hành.\n`
  if (env.STRICT_SEO === '1') {
    console.error(msg)
    process.exit(1)
  }
  console.warn(msg)
}

const write = (rel, content) => {
  const file = join(dist, rel)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, content)
  console.log('  ✓', rel)
}

const template = readFileSync(join(dist, 'index.html'), 'utf8')
const gtmPreconnect = env.VITE_GTM_ID ? '<link rel="preconnect" href="https://www.googletagmanager.com" />\n    ' : ''

const page = async (path) => {
  const head = headTags(path)
  const body = await render(path === '/404' ? '/__404__' : path)
  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${head.title.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</title>`)
    .replace(/\s*<(?:meta|link)\b[^>]*data-seo="fallback"[^>]*\/?>(?:\r?\n)?/g, '')
    .replace('</head>', `    ${gtmPreconnect}${tagsToHtml(head.tags)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
}
const fileOf = (path) => (path === '/' ? 'index.html' : `${path.slice(1)}/index.html`)

console.log('Prerender:')
for (const r of routes) write(fileOf(r), await page(r))
// Trang ẩn (noindex, không vào sitemap) nhưng vẫn cần file HTML để tải trực tiếp được, vd. /cam-on
for (const r of Object.keys(hiddenPages).filter((p) => p !== '/404')) write(fileOf(r), await page(r))
write('404.html', await page('/404'))

/* ---------- sitemap.xml + robots.txt ---------- */
const lastmod = new Date().toISOString().slice(0, 10)
const urls = indexableRoutes
  .map((r) => `  <url><loc>${absUrl(r)}</loc><lastmod>${lastmod}</lastmod><changefreq>${pages[r].changefreq || 'monthly'}</changefreq><priority>${(pages[r].priority ?? 0.5).toFixed(1)}</priority></url>`)
  .join('\n')
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)

/* ---------- cms-schema.json: CMS đọc để biết trường nào sửa được (CORS * cấu hình ở nginx/vercel) ---------- */
write('cms-schema.json', JSON.stringify(buildCmsSchema({ pageDefaults, routes, siteUrl: SITE_URL, leadEndpoint: env.VITE_LEAD_ENDPOINT || '' }), null, 2) + '\n')

console.log(`Xong: ${routes.length} trang + 404 · domain ${SITE_URL}`)
