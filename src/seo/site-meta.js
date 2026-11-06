import { cmsSeo } from '../cms/content'
import { hasRealNews, isSampleNews, newsItems } from '../data/news'

/* ============================================================
   SEO — MỘT NGUỒN DUY NHẤT cho title, description, H1, intro, snippet của từng trang và menu.
   Dùng chung cho: <Seo> (đổi <head> khi chuyển route), bước prerender (ghi <head> tĩnh vào dist/<route>/index.html),
   sitemap.xml và JSON-LD.

   Bảng snippet (checklist v2 mục 10.2): URL | Từ khoá chính | Title (≤ 60) | Description (150–160) | H1 | OG image
   Quy ước: từ khoá chính đứng đầu title; description có từ khoá + số liệu + CTA. Đo lại bằng `npm run seo:check`.
   ============================================================ */

/* Tên miền chính thức — PHẢI đổi khi có domain thật (canonical, og:url, sitemap, JSON-LD đều dựa vào đây).
   Đặt VITE_SITE_URL trong .env.production. Mặc định chỉ là placeholder, bước build sẽ cảnh báo. */
export const SITE_URL_PLACEHOLDER = 'https://qtopia.example.com'
export const SITE_URL = (import.meta.env?.VITE_SITE_URL || SITE_URL_PLACEHOLDER).replace(/\/+$/, '')

export const SITE = {
  name: 'QTOPIA',
  alternateName: 'QTOPIA — Thành phố cuối tuần của siêu đô thị TP. Hồ Chí Minh',
  locale: 'vi_VN',
  lang: 'vi',
  themeColor: '#050a2e',
  published: '2026-11-01', // datePublished của trang chủ
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitterImage: '/images/thumb-twitter-image.jpg',
  twitterImageAlt: 'Phối cảnh tòa căn hộ QTOPIA bên biển về đêm, Thành phố cuối tuần',
  logo: '/images/brand/logo-horizontal-white.png',
}

/**
 * Trang (route). changefreq / priority dùng cho sitemap.xml.
 * h1 / intro: hiển thị ở trang con (src/pages/Topic.jsx). Trang chủ có H1 riêng trong Hero.
 * menu: mô tả ngắn cho thuộc tính `title` của link menu / footer (≤ 70 ký tự).
 */
export const pages = {
  '/': {
    title: 'QTOPIA — Thành phố cuối tuần bên biển gần TP.HCM',
    description:
      'QTOPIA – Thành phố cuối tuần bên biển, cách TP.HCM 75 phút. Sở hữu thiên nhiên núi, biển, rừng; thành phố nghỉ dưỡng, chăm sóc sức khoẻ, giải trí 24/7.',
    ogTitle: 'QTOPIA — Thành phố cuối tuần của siêu đô thị TP.HCM',
    ogDescription:
      'QTOPIA – Thành phố cuối tuần bên biển, cách TP.HCM 75 phút. Sở hữu thiên nhiên núi, biển, rừng; thành phố nghỉ dưỡng, chăm sóc sức khoẻ, giải trí 24/7.',
    breadcrumb: 'Trang chủ',
    changefreq: 'weekly',
    priority: 1.0,
    ogImage: '/images/thumbnail-opengraph-image.jpg',
    ogImageAlt: 'Phối cảnh tòa căn hộ QTOPIA bên biển về đêm, Thành phố cuối tuần',
    menu: 'Tổng quan dự án căn hộ QTOPIA',
  },
  '/tong-quan': {
    title: 'Tổng quan QTOPIA — Thành phố cuối tuần tại Phước Hải',
    description:
      'Tổng quan dự án QTOPIA tại Phước Hải: các tháp Q5, Q6, Q7, căn Studio đến 3PN, ba khu tiện ích Quậy Station, Ocean Galaxy, Oasis Resort. Xem số liệu dự án.',
    breadcrumb: 'Tổng quan',
    h1: 'Tổng quan dự án QTOPIA — thành phố cuối tuần bên biển',
    intro: [
      'QTOPIA là tổ hợp căn hộ và trải nghiệm giải trí, nghỉ dưỡng bên biển tại khu vực Phước Hải: phía trước là biển, phía sau là núi và rừng.',
      'Trang này tóm tắt số liệu chính của dự án, ba khu trải nghiệm và các văn bản pháp lý đã công bố, để bạn nắm nhanh QTOPIA trước khi đi vào vị trí, tiện ích và mặt bằng.',
    ],
    changefreq: 'monthly',
    priority: 0.9,
    ogImage: '/images/og-qtopia-trang-chu.webp',
    ogImageAlt: 'Phối cảnh tổng thể dự án QTOPIA bên bờ biển với núi xanh phía sau',
    menu: 'Tổng quan dự án QTOPIA: số liệu, tiện ích, pháp lý',
  },
  '/vi-tri': {
    title: 'Vị trí QTOPIA — Trước biển, sau núi, gần TP.HCM',
    description:
      'Tìm hiểu vị trí QTOPIA tại khu vực Phước Hải: trước biển, sau núi, gần rừng. Brochure nêu khoảng 75 phút từ trung tâm TP.HCM và 30 phút từ sân bay Long Thành.',
    breadcrumb: 'Vị trí',
    h1: 'Vị trí QTOPIA — trước biển, sau núi, gần rừng',
    intro: [
      'Theo brochure, QTOPIA được phát triển tại khu vực Phước Hải với địa thế trước biển, sau núi, gần rừng — một bối cảnh cho những chuyến nghỉ cuối tuần.',
      'Các mốc kết nối được tài liệu giới thiệu gồm khoảng 75 phút từ trung tâm TP.HCM, 30 phút từ sân bay Long Thành, 19 phút từ Hồ Tràm và 2 phút từ Quảng trường Phước Hải. Thời gian thực tế có thể thay đổi.',
    ],
    changefreq: 'monthly',
    priority: 0.8,
    ogImage: '/images/og-qtopia-vi-tri.webp',
    ogImageAlt: 'Góc nhìn từ trên cao vị trí dự án QTOPIA giữa biển, núi và khu dân cư',
    menu: 'Bản đồ vị trí và cự ly kết nối từ QTOPIA',
  },
  '/tien-ich': {
    title: 'Tiện ích QTOPIA — Ocean Galaxy và Oasis Resort',
    description:
      'Khám phá tiện ích QTOPIA qua ba khu Quậy Station, Ocean Galaxy và Oasis Resort: từ DJ Ocean, Aqua Funny Park tới hồ bơi, thể thao và vườn cảnh quan bên biển.',
    breadcrumb: 'Tiện ích',
    h1: 'Tiện ích QTOPIA — ba khu trải nghiệm bên biển',
    intro: [
      'Quậy Station hướng ra biển, Ocean Galaxy sôi động về đêm, Oasis Resort dành cho hồ bơi, thể thao và thư giãn.',
      'Nổi bật có sàn DJ Ocean, công viên nước Aqua Funny Park, hồ bơi Oasis, vườn hoa và sân thượng. Chọn từng khu trên sơ đồ để xem chi tiết.',
    ],
    changefreq: 'monthly',
    priority: 0.8,
    ogImage: '/images/og-qtopia-tien-ich.webp',
    ogImageAlt: 'Phối cảnh khu Ocean Galaxy về đêm với hồ bơi và sàn DJ tại QTOPIA',
    menu: 'Ba khu tiện ích và khu giải trí đêm của QTOPIA',
  },
  '/mat-bang': {
    title: 'Mặt bằng QTOPIA — Q5, Q6, Q7 và bốn loại căn',
    description:
      'Xem mặt bằng QTOPIA: sơ đồ căn hộ tầng điển hình Q5–Q6 với mã căn, diện tích sử dụng và tim tường; tham khảo thêm bốn loại căn AMA, MIRA, VITA, ARIA tại Q7.',
    breadcrumb: 'Mặt bằng',
    h1: 'Mặt bằng QTOPIA — căn hộ Q5, Q6 và các loại căn Q7',
    intro: [
      'Tầng điển hình Q5–Q6 trong brochure gồm AMA Studio, MIRA 1PN+ và VITA 2PN. Trên sơ đồ tương tác, chọn mã căn để xem diện tích sử dụng (SD) và diện tích tim tường (TT).',
      'Brochure Q7 giới thiệu thêm ARIA 3PN bên cạnh AMA, MIRA và VITA. Bên dưới sơ đồ Q5–Q6 là ảnh layout tham khảo và khoảng diện tích theo từng loại căn Q7.',
    ],
    changefreq: 'monthly',
    priority: 0.8,
    ogImage: '/images/og-qtopia-mat-bang.webp',
    ogImageAlt: 'Phối cảnh tiện ích sân thượng tháp Q5 thuộc dự án QTOPIA',
    menu: 'Sơ đồ căn Q5–Q6 và các loại căn tháp Q7',
  },
  '/chinh-sach-ban-hang': {
    title: 'Chính sách bán hàng QTOPIA — Studio từ 1.195 tỷ',
    description:
      'Chính sách bán hàng QTOPIA: căn Studio từ 1.195 tỷ, ký HĐMB chỉ 10%, thanh toán nhanh 70% hoặc vay ngân hàng hỗ trợ lãi suất 24 tháng. Nhận bảng tính dòng tiền.',
    breadcrumb: 'Chính sách bán hàng',
    h1: 'Chính sách bán hàng QTOPIA — 3 phương thức thanh toán',
    intro: [
      'Căn Studio QTOPIA có giá chỉ từ 1.195 tỷ đồng. Khách hàng chọn một trong ba phương thức: thanh toán chuẩn theo tiến độ, thanh toán nhanh 70% hoặc vay ngân hàng.',
      'Với phương thức vay, chính sách hỗ trợ lãi suất 24 tháng hoặc đến khi bàn giao và ân hạn nợ gốc 48 tháng (áp dụng có điều kiện). Chính sách áp dụng theo văn bản chính thức của Chủ đầu tư.',
    ],
    changefreq: 'weekly',
    priority: 0.9,
    ogImage: '/images/og-qtopia-trang-chu.webp',
    ogImageAlt: 'Chính sách bán hàng và phương thức thanh toán căn hộ QTOPIA',
    menu: 'Giá, tiến độ thanh toán và hỗ trợ vay QTOPIA',
  },
  '/tien-ich-xung-quanh': {
    title: 'Tiện ích xung quanh QTOPIA — Hồ Tràm, Long Thành',
    description:
      'Tiện ích xung quanh QTOPIA: 2 phút tới Quảng trường Phước Hải, 19 phút tới Hồ Tràm, 30 phút tới sân bay Long Thành; gần Vũng Tàu, Bà Rịa. Xem bản đồ kết nối.',
    breadcrumb: 'Tiện ích xung quanh',
    h1: 'Tiện ích xung quanh QTOPIA — biển, đô thị và sân bay',
    intro: [
      'Ngoài ba khu tiện ích nội khu, QTOPIA nằm gần các điểm đến biển như Hồ Tràm, Vũng Tàu và trung tâm Phước Hải, cùng các đầu mối giao thông của khu vực.',
      'Danh sách dưới đây tổng hợp các mốc trên bản đồ kết nối của dự án; thời gian di chuyển là số liệu tham khảo theo brochure.',
    ],
    changefreq: 'monthly',
    priority: 0.8,
    ogImage: '/images/og-qtopia-vi-tri.webp',
    ogImageAlt: 'Góc nhìn từ trên cao vị trí dự án QTOPIA giữa biển, núi và khu dân cư',
    menu: 'Các điểm đến và kết nối quanh QTOPIA',
  },
  '/tin-tuc': {
    title: 'Tin tức QTOPIA — Cập nhật thông tin dự án',
    description:
      'Tin tức QTOPIA Phước Hải: cập nhật tiến độ, tổng quan dự án, tiện ích và những thông tin cần kiểm tra trước khi tìm mua căn hộ du lịch ven biển. Đọc ngay.',
    breadcrumb: 'Tin tức & sự kiện',
    h1: 'Tin tức & sự kiện QTOPIA',
    intro: ['Cập nhật thông tin và những câu chuyện xoay quanh QTOPIA.'],
    changefreq: 'weekly',
    priority: 0.7,
    ogImage: '/images/og-qtopia-trang-chu.webp',
    ogImageAlt: 'Thông tin và bài viết về dự án QTOPIA',
    menu: 'Tin tức và sự kiện QTOPIA',
    noindex: !hasRealNews(),
  },
  ...Object.fromEntries(
    newsItems.map((item) => {
      const sample = isSampleNews(item)
      let description = sample
        ? `${item.excerpt} Bài viết mẫu về ${item.category.toLowerCase()} tại QTOPIA.`
        : item.metaDescription || `${item.excerpt} ${item.category} QTOPIA — đọc chi tiết bài viết.`
      if (sample) while (description.length < 150) description += ' Lorem ipsum dolor sit amet.'
      if (description.length > 160) {
        description = description.slice(0, description.lastIndexOf(' ', 157)) + '…'
      }

      const path = `/tin-tuc/${item.id}`
      return [
        path,
        {
          title: item.seoTitle || `${item.title} — Tin tức QTOPIA`,
          description,
          breadcrumb: item.category,
          changefreq: 'monthly',
          priority: 0.5,
          ogImage: item.image || '/images/og-qtopia-trang-chu.webp',
          ogImageAlt: sample ? 'Bài viết mẫu về dự án QTOPIA' : item.imageAlt || item.title,
          // Bài viết thật: thêm JSON-LD NewsArticle + breadcrumb 3 cấp (Trang chủ › Tin tức › bài)
          article: sample ? undefined : { headline: item.title, datePublished: item.date, image: item.image },
          menu: item.title,
          // Bài mẫu (chưa có nội dung thật) không được index và không vào sitemap.
          noindex: sample,
        },
      ]
    }),
  ),
}

/** Mặc định SEO trong code (trước khi CMS đè) — dùng cho cms-schema.json */
export const pageDefaults = JSON.parse(JSON.stringify(pages))

// SEO sửa trên CMS (title / description / ảnh OG) đè lên mặc định
for (const [path, meta] of Object.entries(pages)) {
  const o = cmsSeo(path)
  if (o.title) meta.title = o.title
  if (o.description) {
    meta.description = o.description
    if (meta.ogDescription) meta.ogDescription = o.description
  }
  if (o.title && meta.ogTitle) meta.ogTitle = o.title
  if (o.ogImage) meta.ogImage = o.ogImage
}

/** Trang con theo chủ đề (liên kết nội bộ ở footer + CTA trong section) */
export const topicPaths = ['/tong-quan', '/vi-tri', '/tien-ich', '/tien-ich-xung-quanh', '/mat-bang', '/chinh-sach-ban-hang']

/** 5 trang chính muốn Google hiển thị dạng sitelinks (snippet con) dưới kết quả trang chủ. */
export const sitelinkPaths = ['/tong-quan', '/vi-tri', '/tien-ich', '/chinh-sach-ban-hang', '/tien-ich-xung-quanh']

/** Trang không đưa vào sitemap, noindex */
export const hiddenPages = {
  // Trang cảm ơn sau khi gửi form: được prerender (có file HTML) nhưng noindex, không vào sitemap.
  '/cam-on': {
    title: 'Cảm ơn bạn đã đăng ký — QTOPIA',
    description: 'Cảm ơn bạn đã để lại thông tin. Chuyên viên tư vấn QTOPIA sẽ liên hệ trong thời gian sớm nhất.',
    breadcrumb: 'Cảm ơn',
  },
  '/404': {
    title: 'Không tìm thấy trang — QTOPIA',
    description: 'Trang bạn tìm không tồn tại. Quay về trang chủ QTOPIA để xem tổng quan dự án, vị trí, tiện ích và mặt bằng.',
    breadcrumb: '404',
  },
}

export const routes = Object.keys(pages)
/** Route được index (đưa vào sitemap) */
export const indexableRoutes = routes.filter((r) => !pages[r].noindex)

/** Menu chính (anchor nhảy tới section trên trang chủ) */
export const mainNav = [
  { to: '/#tong-quan', label: 'Tổng quan', title: 'Tổng quan dự án căn hộ QTOPIA' },
  { to: '/#vi-tri', label: 'Vị trí', title: pages['/vi-tri'].menu },
  { to: '/#tien-ich', label: 'Tiện ích', title: pages['/tien-ich'].menu },
  { to: '/#mat-bang', label: 'Mặt bằng', title: pages['/mat-bang'].menu },
  { to: '/#chinh-sach', label: 'Chính sách', title: 'Chính sách bán hàng và phương thức thanh toán QTOPIA' },
  { to: '/#tin-tuc', label: 'Tin tức', title: 'Tin tức và thông tin dự án QTOPIA' },
  { to: '/#phap-ly', label: 'Pháp lý', title: 'Thông tin pháp lý dự án QTOPIA' },
  { to: '/#lien-he', label: 'Liên hệ', title: 'Liên hệ nhận thông tin dự án QTOPIA' },
]

export const absUrl = (path) => SITE_URL + (path === '/' ? '/' : path)
export const absAsset = (src) => (/^https?:/.test(src) ? src : SITE_URL + src)

export function pageMeta(path) {
  return pages[path] || hiddenPages[path] || pages['/']
}
