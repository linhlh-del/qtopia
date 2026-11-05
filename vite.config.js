import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))

// Thư mục đầu ra do scripts/build.mjs truyền vào (QTOPIA_BUILD_DIR / QTOPIA_SSR_DIR).
// Tracker dashboard CMS: URL Edge Function `collect` suy ra từ CMS_SUPABASE_URL (không cần thêm biến môi trường).
export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, root, ''), ...process.env }
  const supabaseUrl = (env.CMS_SUPABASE_URL || env.VITE_SUPABASE_URL || '').replace(/\/+$/, '')
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'import.meta.env.VITE_CMS_PROJECT': JSON.stringify('qtopia'),
      'import.meta.env.VITE_CMS_COLLECT_URL': JSON.stringify(
        env.VITE_CMS_COLLECT_URL || (supabaseUrl ? `${supabaseUrl}/functions/v1/collect` : ''),
      ),
    },
  }
})
