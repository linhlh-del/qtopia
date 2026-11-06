/* ============================================================
   SCHEMA CHO CMS — website tự mô tả những gì sửa được. Prerender ghi ra dist/cms-schema.json;
   CMS (qtopia-cms) đọc file này, nên thêm/bớt trường chỉ cần sửa ở đây, không phải sửa CMS.

   Trường được sinh TỰ ĐỘNG từ giá trị mặc định trong code (cmsDefaults — trước khi CMS đè):
   - mọi chuỗi (string) trong object đã registerCms → trường chữ (text / textarea)
   - chuỗi là đường dẫn ảnh (/images/… .webp|.jpg|.png) → trường ảnh
   - bỏ qua khoá kỹ thuật (id, màu, toạ độ, độ rộng, đường dẫn nội bộ…) để biên tập viên không làm vỡ giao diện
   ============================================================ */
import { cmsDefaults } from './content'

/* Thứ tự + nhãn tiếng Việt của từng nhóm nội dung trên CMS */
const GROUPS = [
  ['siteMeta', 'Thông tin chung (hotline, Zalo, địa chỉ)'],
  ['heroContent', 'Hero — ảnh & tiêu đề màn đầu'],
  ['stories', 'Hai màn câu chuyện (Tổng quan, Nightlife)'],
  ['facts', 'Số liệu tổng quan'],
  ['locationContent', 'Vị trí'],
  ['nearbyContent', 'Tiện ích xung quanh'],
  ['featuredAmenityGroups', 'Tiện ích nổi bật (ảnh + chú thích)'],
  ['salesPolicy', 'Chính sách bán hàng'],
  ['newsItems', 'Tin tức (bài viết)'],
  ['legalContent', 'Pháp lý'],
  ['faq', 'Câu hỏi thường gặp'],
  ['leadFormContent', 'Form đăng ký'],
  ['legalNotice', 'Chân trang — miễn trừ trách nhiệm'],
]

/* Khoá không cho sửa: định danh, màu, bố cục, đường dẫn kỹ thuật */
const SKIP_KEY = /^(id|color|align|flex|icon|to|hotlineHref|ratio|variant)$/
const IMAGE_VALUE = /^\/(images|assets)\/.+\.(webp|jpe?g|png|avif|svg)$/i

const LABELS = {
  projectName: 'Tên dự án', tagline: 'Khẩu hiệu', hotline: 'Hotline hiển thị', zalo: 'Liên kết Zalo', email: 'Email',
  address: 'Địa chỉ', developer: 'Chủ đầu tư / phát triển', h1: 'Tiêu đề (H1)', slogan: 'Dòng phụ', alt: 'Mô tả ảnh (alt)',
  label: 'Nhãn / tiêu đề', lead: 'Đoạn dẫn', title: 'Tiêu đề', subtitle: 'Dòng phụ', body: 'Nội dung', excerpt: 'Tóm tắt',
  category: 'Chuyên mục', caption: 'Chú thích', q: 'Câu hỏi', a: 'Trả lời', cta: 'Chữ trên nút', ctaPrimary: 'Chữ trên nút chính',
  value: 'Giá trị', unit: 'Đơn vị', note: 'Ghi chú', amount: 'Số tiền / %', top: 'Ghi chú phía trên', between: 'Chữ giữa hai mốc',
  bank: 'Ngân hàng giải ngân', heading: 'Tiêu đề', description: 'Mô tả', consentNote: 'Ghi chú đồng ý', disclaimer: 'Miễn trừ trách nhiệm',
  prefix: 'Chữ trước giá', minutes: 'Số phút', glossary: 'Giải thích viết tắt', perksNote: 'Ghi chú ưu đãi', image: 'Ảnh', src: 'Ảnh',
  imageAlt: 'Mô tả ảnh (alt)', seoTitle: 'Tiêu đề SEO (≤ 60 ký tự)', metaDescription: 'Mô tả SEO (150–160 ký tự)', date: 'Ngày đăng (YYYY-MM-DD)',
  sourceTitle: 'Tư liệu tham khảo — tên', sourceUrl: 'Tư liệu tham khảo — link',
}

function walk(value, path, out) {
  if (typeof value === 'string') {
    const leaf = path[path.length - 1]
    if (SKIP_KEY.test(String(leaf))) return
    const key = path.join('.')
    const human = path
      .slice(1)
      .map((p) => (/^\d+$/.test(p) ? `#${Number(p) + 1}` : LABELS[p] || p))
      .join(' · ')
    if (IMAGE_VALUE.test(value) || leaf === 'image') {
      out.images.push({ key, label: human || key, default: value, ratio: '16/9' })
    } else {
      const long = value.length > 90 || leaf === 'body'
      out.fields.push({ key, label: human || key, default: value, type: long ? 'textarea' : 'text', rows: value.length > 260 || leaf === 'body' ? 6 : 3 })
    }
    return
  }
  if (Array.isArray(value)) value.forEach((v, i) => walk(v, [...path, String(i)], out))
  else if (value && typeof value === 'object') for (const [k, v] of Object.entries(value)) walk(v, [...path, k], out)
}

export function buildCmsSchema({ pageDefaults, routes, leadEndpoint = '', siteUrl = '' }) {
  const sections = GROUPS.filter(([name]) => cmsDefaults[name]).map(([name, label]) => {
    const out = { fields: [], images: [] }
    walk(cmsDefaults[name], [name], out)
    return { id: name, label, locked: true, inLayout: false, ...out }
  })
  return {
    version: 1,
    project: 'qtopia',
    siteUrl,
    langs: ['vi'],
    sections,
    seo: routes.map((path) => ({
      path,
      label: pageDefaults[path]?.breadcrumb || path,
      default: { title: pageDefaults[path]?.title || '', description: pageDefaults[path]?.description || '' },
      defaultOgImage: pageDefaults[path]?.ogImage || '/images/thumbnail-opengraph-image.jpg',
    })),
    settings: [],
    lead: { defaultEndpoint: leadEndpoint },
  }
}
