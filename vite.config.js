import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))

/* Thẻ đo lường chèn thẳng vào HTML lúc build → có trong index.html của MỌI trang prerender.
   - Có GTM: snippet GTM chuẩn của Google (đầu <head>) + <noscript> ngay sau <body>. GA4 cấu hình TRONG GTM.
   - Không GTM mà có GA4: gtag.js. */
function trackingPlugin({ gtmId, ga4Id }) {
  return {
    name: 'qtopia-tracking',
    transformIndexHtml(html) {
      let head = ''
      let body = ''
      if (gtmId) {
        head = `<!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');</script>
    <!-- End Google Tag Manager -->`
        body = `<!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->`
      } else if (ga4Id) {
        head = `<script async src="https://www.googletagmanager.com/gtag/js?id=${ga4Id}"></script>
    <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4Id}');</script>`
      }
      let out = html
      if (head) out = out.replace(/(<meta name="viewport"[^>]*>)/, `$1
    ${head}`)
      if (body) out = out.replace(/(<body[^>]*>)/, `$1
    ${body}`)
      return out
    },
  }
}

// Thư mục đầu ra do scripts/build.mjs truyền vào (QTOPIA_BUILD_DIR / QTOPIA_SSR_DIR).
// Tracker dashboard CMS: URL Edge Function `collect` suy ra từ CMS_SUPABASE_URL (không cần thêm biến môi trường).
export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, root, ''), ...process.env }
  const ga4Id = String(env.VITE_GA4_ID || '').trim()
  if (ga4Id && !/^G-[A-Z0-9]{4,12}$/.test(ga4Id)) throw new Error(`VITE_GA4_ID sai định dạng (G-XXXXXXXXXX): ${ga4Id}`)
  const gtmId = String(env.VITE_GTM_ID || '').trim()
  if (gtmId && !/^GTM-[A-Z0-9]{4,10}$/.test(gtmId)) throw new Error(`VITE_GTM_ID sai định dạng (GTM-XXXXXXX): ${gtmId}`)
  const supabaseUrl = (env.CMS_SUPABASE_URL || env.VITE_SUPABASE_URL || '').replace(/\/+$/, '')
  return {
    // Có GTM thì GA4 cấu hình trong GTM → không chèn gtag.js trực tiếp (tránh đếm trùng)
    plugins: [react(), tailwindcss(), trackingPlugin({ gtmId, ga4Id })],
    define: {
      'import.meta.env.VITE_GA4_ID': JSON.stringify(gtmId ? '' : ga4Id),
      'import.meta.env.VITE_GTM_ID': JSON.stringify(gtmId),
      'import.meta.env.VITE_CMS_PROJECT': JSON.stringify('qtopia'),
      'import.meta.env.VITE_CMS_COLLECT_URL': JSON.stringify(
        env.VITE_CMS_COLLECT_URL || (supabaseUrl ? `${supabaseUrl}/functions/v1/collect` : ''),
      ),
    },
  }
})
