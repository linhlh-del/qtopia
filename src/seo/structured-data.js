/* JSON-LD cho từng trang (một khối @graph mỗi trang).
   Nguyên tắc (checklist): chỉ khai báo thông tin NHÌN THẤY được trên trang và đã xác minh.
   Hotline / địa chỉ chưa điền thật (isFilled=false) thì không đưa vào schema. */
import { siteMeta, faq, masterPlan } from '../data/project'
import { isFilled } from '../lib/filled'
import { SITE, SITE_URL, absAsset, absUrl, pageMeta, pages, sitelinkPaths } from './site-meta'

const ID = {
  site: `${SITE_URL}/#website`,
  org: `${SITE_URL}/#organization`,
  project: `${SITE_URL}/#project`,
}

function organization() {
  const org = {
    '@type': 'Organization',
    '@id': ID.org,
    name: SITE.name,
    url: SITE_URL + '/',
    logo: { '@type': 'ImageObject', url: absAsset(SITE.logo) },
  }
  if (isFilled(siteMeta.hotline)) {
    org.contactPoint = {
      '@type': 'ContactPoint',
      telephone: siteMeta.hotline,
      contactType: 'sales',
      areaServed: 'VN',
      availableLanguage: 'vi',
    }
  }
  return org
}

function project(path) {
  const p = pageMeta(path)
  const node = {
    '@type': 'ApartmentComplex',
    '@id': ID.project,
    name: SITE.name,
    description: pages['/'].description,
    url: SITE_URL + '/',
    image: absAsset(pages['/'].ogImage),
    amenityFeature: masterPlan.zones.flatMap((z) =>
      z.markers.map((m) => ({ '@type': 'LocationFeatureSpecification', name: m.name, value: true })),
    ),
  }
  if (isFilled(siteMeta.address)) {
    node.address = { '@type': 'PostalAddress', streetAddress: siteMeta.address, addressCountry: 'VN' }
  }
  return path === '/' ? node : { ...node, description: p.description }
}

export function structuredData(path) {
  const meta = pageMeta(path)
  const url = absUrl(path)
  const graph = [
    {
      '@type': 'WebSite',
      '@id': ID.site,
      url: SITE_URL + '/',
      name: SITE.name,
      alternateName: SITE.alternateName,
      inLanguage: 'vi-VN',
      publisher: { '@id': ID.org },
    },
    organization(),
    project(path),
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: meta.title,
      description: meta.description,
      inLanguage: 'vi-VN',
      isPartOf: { '@id': ID.site },
      about: { '@id': ID.project },
      primaryImageOfPage: meta.ogImage ? { '@type': 'ImageObject', url: absAsset(meta.ogImage) } : undefined,
      ...(path === '/' ? { datePublished: SITE.published } : {}),
    },
  ]

  if (path !== '/' && pages[path]) {
    const crumbs = [{ name: pages['/'].breadcrumb, item: absUrl('/') }]
    if (meta.article) crumbs.push({ name: pages['/tin-tuc'].breadcrumb, item: absUrl('/tin-tuc') })
    crumbs.push({ name: meta.article ? meta.article.headline : meta.breadcrumb, item: url })
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, ...c })),
    })
  }

  if (meta.article) {
    const a = meta.article
    graph.push({
      '@type': 'NewsArticle',
      '@id': `${url}#article`,
      headline: a.headline,
      description: meta.description,
      inLanguage: 'vi-VN',
      mainEntityOfPage: { '@id': `${url}#webpage` },
      image: absAsset(a.image || meta.ogImage),
      ...(a.datePublished ? { datePublished: a.datePublished, dateModified: a.datePublished } : {}),
      author: { '@id': ID.org },
      publisher: { '@id': ID.org },
      about: { '@id': ID.project },
    })
  }

  if (path === '/') {
    // Danh sách trang chính (gợi ý cấu trúc site cho Google khi tạo sitelinks; Google tự quyết định hiển thị).
    graph.push({
      '@type': 'ItemList',
      '@id': `${SITE_URL}/#main-pages`,
      name: 'Các trang chính của QTOPIA',
      itemListElement: sitelinkPaths.map((p, i) => ({
        '@type': 'SiteNavigationElement',
        position: i + 1,
        name: pages[p].breadcrumb,
        description: pages[p].menu,
        url: absUrl(p),
      })),
    })
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}
