/* ============================================================
   NỘI DUNG TỪ CMS (bản đã đăng) — đè lên nội dung mặc định trong code lúc build.
   src/generated/cms-content.json do scripts/fetch-cms.mjs tải từ Supabase (không có file → dùng mặc định).

   Quy ước khoá (khớp src/cms/schema.js → dist/cms-schema.json mà CMS đọc):
     texts["siteMeta.hotline"]            → chữ theo đường dẫn trong một object dữ liệu đã đăng ký
     texts["salesPolicy.methods.2.title"] → phần tử trong danh sách (độ dài danh sách giữ nguyên)
     images["stories.0.image"]            → { src, alt } ảnh (đã tải về /assets/cms/ khi build)
     seo["/vi-tri"]                       → { title, description, ogImage: { src } }
     settings["siteMeta.zalo"]            → thông tin chung (giống texts)
     lead.endpoint                        → URL nhận lead (ưu tiên sau VITE_LEAD_ENDPOINT)

   Cách áp dụng: mỗi file dữ liệu gọi registerCms(name, object) ở cuối file. Object được sửa TẠI CHỖ,
   nên mọi component đang import từ src/data/* tự nhận nội dung CMS mà không phải đổi import.
   Bản sao giá trị mặc định (trước khi đè) được giữ lại để sinh cms-schema.json.
   ============================================================ */
const files = import.meta.glob('../generated/cms-content.json', { eager: true, import: 'default' })
export const cms = Object.values(files)[0] || {}

/** Giá trị mặc định trong code (trước khi đè), theo tên đã đăng ký — dùng cho schema */
export const cmsDefaults = {}

const clone = (v) => (v == null ? v : JSON.parse(JSON.stringify(v)))
const text = (v) => (typeof v === 'string' ? v : v && typeof v === 'object' ? v.vi : undefined)

function setPath(rootObj, keys, value) {
  let cur = rootObj
  for (let i = 0; i < keys.length - 1; i += 1) {
    cur = cur?.[keys[i]]
    if (cur == null || typeof cur !== 'object') return false // đường dẫn không còn tồn tại → bỏ qua
  }
  const last = keys[keys.length - 1]
  if (!(last in cur)) return false // chỉ sửa trường có sẵn, không tạo trường lạ
  cur[last] = value
  return true
}

/** Đăng ký một object dữ liệu và áp nội dung CMS lên nó (sửa tại chỗ). Trả về chính object. */
export function registerCms(name, obj) {
  cmsDefaults[name] = clone(obj)
  const apply = (bucket, pick) => {
    for (const [key, raw] of Object.entries(bucket || {})) {
      const [head, ...rest] = key.split('.')
      if (head !== name || !rest.length) continue
      const value = pick(raw)
      if (value === undefined || value === '') continue
      setPath(obj, rest, value)
    }
  }
  apply(cms.texts, text)
  apply(cms.settings, text)
  apply(cms.images, (v) => v?.src || undefined)
  return obj
}

/** SEO từng trang: { title, description, ogImage } — mọi trường tuỳ chọn */
export function cmsSeo(path) {
  const p = cms.seo?.[path]
  if (!p) return {}
  return { title: text(p.title), description: text(p.description), ogImage: p.ogImage?.src }
}

export const cmsLeadEndpoint = cms.lead?.endpoint || ''
export const cmsHead = cms.head || {}
