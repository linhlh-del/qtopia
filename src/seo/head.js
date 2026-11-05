/* Dựng danh sách thẻ <head> cho một trang. Dùng chung cho:
   - prerender (tagsToHtml → ghi thẳng vào HTML tĩnh, để bot / Facebook / Zalo đọc được mà không chạy JS)
   - client (applyHead → cập nhật <head> khi chuyển route trong SPA) */
import { SITE, absAsset, absUrl, hiddenPages, pageMeta } from './site-meta'
import { structuredData } from './structured-data'

function imageMimeType(src) {
  const path = src.split(/[?#]/, 1)[0].toLowerCase()
  const extension = path.slice(path.lastIndexOf('.') + 1)
  const types = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
  }
  const type = types[extension]
  if (!type) throw new Error(`Unsupported image format: ${src}`)
  return type
}

export function headTags(path) {
  const m = pageMeta(path)
  const hidden = Boolean(hiddenPages[path] || m.noindex)
  const url = absUrl(path)
  const imageSrc = m.ogImage || '/images/og-qtopia-trang-chu.webp'
  const image = absAsset(imageSrc)
  const twitterImageSrc = m.twitterImage || SITE.twitterImage
  const twitterImage = absAsset(twitterImageSrc)
  const ogImageType = imageMimeType(imageSrc)
  const twitterImageType = imageMimeType(twitterImageSrc)
  const tags = [
    { tag: 'meta', key: 'name:description', attrs: { name: 'description', content: m.description } },
    { tag: 'meta', key: 'name:robots', attrs: { name: 'robots', content: hidden ? 'noindex, follow' : 'index, follow' } },
    ...(hidden ? [] : [{ tag: 'link', key: 'rel:canonical', attrs: { rel: 'canonical', href: url } }]),
    { tag: 'meta', key: 'property:og:type', attrs: { property: 'og:type', content: 'website' } },
    { tag: 'meta', key: 'property:og:site_name', attrs: { property: 'og:site_name', content: SITE.name } },
    { tag: 'meta', key: 'property:og:locale', attrs: { property: 'og:locale', content: SITE.locale } },
    { tag: 'meta', key: 'property:og:title', attrs: { property: 'og:title', content: m.ogTitle || m.title } },
    { tag: 'meta', key: 'property:og:description', attrs: { property: 'og:description', content: m.ogDescription || m.description } },
    { tag: 'meta', key: 'property:og:url', attrs: { property: 'og:url', content: url } },
    { tag: 'meta', key: 'property:og:image', attrs: { property: 'og:image', content: image } },
    { tag: 'meta', key: 'property:og:image:type', attrs: { property: 'og:image:type', content: ogImageType } },
    { tag: 'meta', key: 'property:og:image:width', attrs: { property: 'og:image:width', content: String(SITE.ogImageWidth) } },
    { tag: 'meta', key: 'property:og:image:height', attrs: { property: 'og:image:height', content: String(SITE.ogImageHeight) } },
    { tag: 'meta', key: 'property:og:image:alt', attrs: { property: 'og:image:alt', content: m.ogImageAlt || SITE.name } },
    { tag: 'meta', key: 'name:twitter:card', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
    { tag: 'meta', key: 'name:twitter:title', attrs: { name: 'twitter:title', content: m.ogTitle || m.title } },
    { tag: 'meta', key: 'name:twitter:description', attrs: { name: 'twitter:description', content: m.ogDescription || m.description } },
    { tag: 'meta', key: 'name:twitter:image', attrs: { name: 'twitter:image', content: twitterImage } },
    { tag: 'meta', key: 'name:twitter:image:type', attrs: { name: 'twitter:image:type', content: twitterImageType } },
    { tag: 'meta', key: 'name:twitter:image:width', attrs: { name: 'twitter:image:width', content: String(SITE.ogImageWidth) } },
    { tag: 'meta', key: 'name:twitter:image:height', attrs: { name: 'twitter:image:height', content: String(SITE.ogImageHeight) } },
    { tag: 'meta', key: 'name:twitter:image:alt', attrs: { name: 'twitter:image:alt', content: m.twitterImageAlt || SITE.twitterImageAlt } },
  ]
  if (!hidden) {
    tags.push({ tag: 'script', key: 'jsonld', attrs: { type: 'application/ld+json' }, json: structuredData(path) })
  }
  return { title: m.title, tags }
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

export function tagsToHtml(tags) {
  return tags
    .map((t) => {
      if (t.tag === 'script') {
        // thoát "<" để chuỗi JSON không đóng sớm thẻ script
        const json = JSON.stringify(t.json).replace(/</g, '\\u003c')
        return `<script data-seo="${t.key}" type="application/ld+json">${json}</script>`
      }
      const attrs = Object.entries(t.attrs)
        .map(([k, v]) => `${k}="${esc(v)}"`)
        .join(' ')
      return `<${t.tag} data-seo="${t.key}" ${attrs} />`
    })
    .join('\n    ')
}

/* Chỉ chạy ở trình duyệt */
export function applyHead(path) {
  const { title, tags } = headTags(path)
  document.title = title
  // Bỏ bộ metadata mặc định trong index.html rồi ghi metadata đúng route hiện tại.
  document.querySelectorAll('[data-seo]').forEach((el) => el.remove())
  const frag = document.createDocumentFragment()
  tags.forEach((t) => {
    const el = document.createElement(t.tag)
    el.setAttribute('data-seo', t.key)
    Object.entries(t.attrs).forEach(([k, v]) => el.setAttribute(k, v))
    if (t.tag === 'script') el.textContent = JSON.stringify(t.json)
    frag.appendChild(el)
  })
  document.head.appendChild(frag)
}
