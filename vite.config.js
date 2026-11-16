import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))

/* Google tag (gtag.js) theo mã GA4 của domain đang build — đặt đầu <head> như snippet chuẩn của Google */
function ga4Plugin(id) {
  return {
    name: 'qtopia-ga4',
    transformIndexHtml(html) {
      if (!id) return html
      const tag = `<script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>
    <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');</script>`
      return html.replace(/(<meta name="viewport"[^>]*>)/, `$1
    ${tag}`)
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
    plugins: [react(), tailwindcss(), ga4Plugin(gtmId ? '' : ga4Id)],
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
