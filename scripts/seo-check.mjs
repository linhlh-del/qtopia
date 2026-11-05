/**
 * Kiểm tra HTML đã prerender trong dist/ theo checklist SEO (v2): `npm run build && npm run seo:check`
 * - đúng 1 <h1>, thứ tự heading không nhảy cấp
 * - title ≤ 60 ký tự, description 150–160 ký tự, mỗi trang title/description khác nhau
 * - canonical + Open Graph (type/title/description/image/url) có đủ; og:url == canonical
 * - mọi <img> có alt (alt="" chỉ chấp nhận khi aria-hidden); ảnh có width/height
 * - JSON-LD parse được; FAQPage khớp FAQ hiển thị
 * - sitemap.xml chỉ gồm URL có file tương ứng; robots.txt có dòng Sitemap
 * Thoát mã 1 nếu có lỗi (cảnh báo không làm fail).
 */
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
const dist = resolve(dirname(fileURLToPath(import.meta.url)), '..', process.env.QTOPIA_BUILD_DIR || 'dist')
// Kiểm tra đúng các URL được index: đọc từ sitemap.xml (trang noindex như bài mẫu không nằm trong đó).
const sitemapXml = existsSync(join(dist, 'sitemap.xml')) ? readFileSync(join(dist, 'sitemap.xml'), 'utf8') : ''
const pages = [...sitemapXml.matchAll(/<loc>https?:\/\/[^/<]+(\/[^<]*)<\/loc>/g)].map((m) => m[1].replace(/\/+$/, '') || '/')
if (!pages.length) {
  console.log('  ✗ không đọc được URL nào từ dist/sitemap.xml — chạy npm run build trước')
  process.exit(1)
}
const fileOf = (p) => join(dist, p === '/' ? 'index.html' : `${p.slice(1)}/index.html`)

let errors = 0
let warns = 0
const err = (p, m) => (errors++, console.log(`  ✗ [${p}] ${m}`))
const warn = (p, m) => (warns++, console.log(`  ! [${p}] ${m}`))
const attr = (tag, name) => (tag.match(new RegExp(`\\s${name}="([^"]*)"`)) || [])[1]
const decode = (s) => s.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<')

const seen = { title: new Map(), desc: new Map() }
const rows = []

for (const p of pages) {
  const f = fileOf(p)
  if (!existsSync(f)) {
    err(p, `thiếu file ${f}`)
    continue
  }
  const html = readFileSync(f, 'utf8')
  const body = html.slice(html.indexOf('<body'))

  // title / description
  const title = decode((html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '')
  const desc = decode(attr((html.match(/<meta[^>]*data-seo="name:description"[^>]*>/) || [''])[0], 'content') || '')
  if (!title) err(p, 'thiếu <title>')
  if (title.length > 60) err(p, `title ${title.length} ký tự (> 60)`)
  if (desc.length < 150 || desc.length > 160) err(p, `description ${desc.length} ký tự (cần 150–160)`)
  if ((html.match(/<meta name="description"/g) || []).length + (html.match(/data-seo="name:description"/g) || []).length !== 1) err(p, 'description bị trùng / thiếu')
  if (seen.title.has(title)) err(p, `title trùng với ${seen.title.get(title)}`)
  if (seen.desc.has(desc)) err(p, `description trùng với ${seen.desc.get(desc)}`)
  seen.title.set(title, p)
  seen.desc.set(desc, p)

  // canonical / OG
  const canonical = attr((html.match(/<link[^>]*rel="canonical"[^>]*>/) || [''])[0], 'href')
  if (!canonical) err(p, 'thiếu canonical')
  for (const prop of ['og:type', 'og:title', 'og:description', 'og:image', 'og:url']) {
    if (!new RegExp(`property="${prop}"`).test(html)) err(p, `thiếu ${prop}`)
  }
  const ogUrl = attr((html.match(/<meta[^>]*property="og:url"[^>]*>/) || [''])[0], 'content')
  if (canonical && ogUrl && canonical !== ogUrl) err(p, `og:url (${ogUrl}) khác canonical (${canonical})`)
  const ogImage = attr((html.match(/<meta[^>]*property="og:image"[^>]*>/) || [''])[0], 'content')
  if (ogImage && !/^https?:\/\//.test(ogImage)) err(p, 'og:image không phải URL tuyệt đối')
  if (!/name="robots" content="index, follow"/.test(html)) err(p, 'thiếu robots index, follow')

  // heading
  const heads = [...body.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]))
  const h1 = heads.filter((h) => h === 1).length
  if (h1 !== 1) err(p, `có ${h1} thẻ <h1> (cần đúng 1)`)
  for (let i = 1; i < heads.length; i++) {
    if (heads[i] - heads[i - 1] > 1) err(p, `heading nhảy cấp h${heads[i - 1]} → h${heads[i]}`)
  }

  // ảnh
  const imgs = [...body.matchAll(/<img\b[^>]*>/g)].map((m) => m[0])
  let noAlt = 0
  let noSize = 0
  imgs.forEach((tag) => {
    const alt = attr(tag, 'alt')
    if (alt === undefined || (alt === '' && !/aria-hidden="true"/.test(tag))) noAlt++
    if (!attr(tag, 'width') || !attr(tag, 'height')) noSize++
  })
  if (noAlt) err(p, `${noAlt}/${imgs.length} ảnh thiếu alt`)
  if (noSize) warn(p, `${noSize}/${imgs.length} ảnh thiếu width/height`)
  const eager = imgs.filter((t) => attr(t, 'loading') === 'eager').length
  if (eager > 2) warn(p, `${eager} ảnh eager (chỉ ảnh hero nên eager)`)

  // JSON-LD
  const ld = [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)]
  if (ld.length !== 1) err(p, `có ${ld.length} khối JSON-LD (cần 1)`)
  let graph = []
  try {
    graph = JSON.parse(ld[0][1])['@graph'] || []
  } catch (e) {
    err(p, `JSON-LD không hợp lệ: ${e.message}`)
  }
  const types = graph.map((n) => n['@type'])
  for (const t of ['WebSite', 'Organization', 'ApartmentComplex', 'WebPage']) if (!types.includes(t)) err(p, `JSON-LD thiếu ${t}`)
  if (p !== '/' && !types.includes('BreadcrumbList')) err(p, 'JSON-LD thiếu BreadcrumbList')
  if (p === '/') {
    const faq = graph.find((n) => n['@type'] === 'FAQPage')
    if (!faq) err(p, 'JSON-LD thiếu FAQPage')
    else {
      const shown = [...body.matchAll(/<button\b(?=[^>]*\bid="faq-q-\d+")[^>]*>([^<]*)/g)]
        .map((m) => decode(m[1].trim()))
      const ldQ = faq.mainEntity.map((q) => q.name)
      if (JSON.stringify(shown) !== JSON.stringify(ldQ)) err(p, 'FAQPage không khớp FAQ hiển thị')
    }
  }
  if (/hotline|telephone/i.test(JSON.stringify(graph)) && /1900 0000/.test(JSON.stringify(graph))) err(p, 'JSON-LD chứa hotline placeholder')

  rows.push({ page: p, title: title.length, desc: desc.length, h1, imgs: imgs.length, jsonld: types.length })
}

// sitemap / robots / 404
const sm = existsSync(join(dist, 'sitemap.xml')) ? readFileSync(join(dist, 'sitemap.xml'), 'utf8') : ''
if (!sm) err('sitemap', 'thiếu sitemap.xml')
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
if (locs.length !== pages.length) err('sitemap', `có ${locs.length} URL, cần ${pages.length}`)
if (!/<lastmod>/.test(sm)) err('sitemap', 'thiếu lastmod')
const robots = existsSync(join(dist, 'robots.txt')) ? readFileSync(join(dist, 'robots.txt'), 'utf8') : ''
if (!/^Sitemap: https?:\/\//m.test(robots)) err('robots', 'thiếu dòng Sitemap:')
if (/Disallow:\s*\/\s*$/m.test(robots)) err('robots', 'đang chặn toàn site')
if (!existsSync(join(dist, '404.html'))) err('404', 'thiếu 404.html')
else if (!/noindex/.test(readFileSync(join(dist, '404.html'), 'utf8'))) err('404', '404.html chưa noindex')
for (const f of ['favicon-48.png', 'apple-touch-icon.png', 'site.webmanifest']) if (!existsSync(join(dist, f))) err('assets', `thiếu ${f}`)
if (!/theme-color/.test(readFileSync(fileOf('/'), 'utf8'))) err('/', 'thiếu theme-color')
if (/qtopia\.example\.com/.test(sm)) warn('sitemap', 'đang dùng domain MẪU — đặt VITE_SITE_URL trước khi phát hành')

console.table(rows)
console.log(errors ? `\n${errors} lỗi, ${warns} cảnh báo` : `\nĐạt: 0 lỗi, ${warns} cảnh báo`)
process.exit(errors ? 1 : 0)
