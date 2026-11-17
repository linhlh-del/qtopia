import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'
import { dirname, join } from 'node:path'
import { cleanHead, cmsHeadPlugin, hostOf, readCms, resolveHead } from './scripts/cms-head.mjs'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))

/* Thẻ đo lường chèn thẳng vào HTML lúc build → có trong index.html của MỌI trang prerender (scripts/cms-head.mjs).
   Nguồn mã, theo thứ tự ưu tiên: CMS "Thẻ head & tracking" riêng domain → CMS tất cả domain → sites/<domain>/site.env.
   - Có GTM: snippet GTM chuẩn của Google (ngay sau <meta viewport>) + <noscript> ngay sau <body>. GA4 cấu hình TRONG GTM.
   - Không GTM mà có GA4: gtag.js. GA4 từ site.env bị bỏ khi đã có GTM (tránh đếm trùng); GA4 nhập trong CMS thì giữ. */
const cms = readCms(join(root, 'src/generated/cms-content.json'))

// Thư mục đầu ra do scripts/build.mjs truyền vào (QTOPIA_BUILD_DIR / QTOPIA_SSR_DIR).
// Tracker dashboard CMS: URL Edge Function `collect` suy ra từ CMS_SUPABASE_URL (không cần thêm biến môi trường).
export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, root, ''), ...process.env }
  const ga4Id = String(env.VITE_GA4_ID || '').trim()
  if (ga4Id && !/^G-[A-Z0-9]{4,12}$/.test(ga4Id)) throw new Error(`VITE_GA4_ID sai định dạng (G-XXXXXXXXXX): ${ga4Id}`)
  const gtmId = String(env.VITE_GTM_ID || '').trim()
  if (gtmId && !/^GTM-[A-Z0-9]{4,10}$/.test(gtmId)) throw new Error(`VITE_GTM_ID sai định dạng (GTM-XXXXXXX): ${gtmId}`)
  const host = hostOf(env.VITE_SITE_URL || '')
  const fromCms = resolveHead(cms.head, host)
  const fallback = { gtmId, ...(fromCms.gtmId || gtmId ? {} : { ga4Id }) }
  const head = cleanHead(resolveHead(cms.head, host, fallback))
  const supabaseUrl = (env.CMS_SUPABASE_URL || env.VITE_SUPABASE_URL || '').replace(/\/+$/, '')
  return {
    plugins: [react(), tailwindcss(), cmsHeadPlugin(cms, { gtm: true, host, fallback, position: 'top' })],
    define: {
      'import.meta.env.VITE_GA4_ID': JSON.stringify(head.gtmId ? '' : head.ga4Id || ''),
      'import.meta.env.VITE_GTM_ID': JSON.stringify(head.gtmId || ''),
      'import.meta.env.VITE_CMS_PROJECT': JSON.stringify('qtopia'),
      'import.meta.env.VITE_CMS_COLLECT_URL': JSON.stringify(
        env.VITE_CMS_COLLECT_URL || (supabaseUrl ? `${supabaseUrl}/functions/v1/collect` : ''),
      ),
    },
  }
})
