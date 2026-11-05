/**
 * Build đầy đủ: (1) lấy nội dung CMS đã publish (nếu có cấu hình) → (2) bản client → (3) bản SSR → (4) prerender HTML + sitemap.
 * Thư mục đầu ra cấu hình bằng env để dùng chung cho máy dev và script release trên VPS:
 *   QTOPIA_BUILD_DIR (mặc định dist) · QTOPIA_SSR_DIR (mặc định .ssr)
 */
import { spawnSync } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
process.chdir(root)
const outDir = resolve(root, process.env.QTOPIA_BUILD_DIR || 'dist')
const ssrDir = resolve(root, process.env.QTOPIA_SSR_DIR || '.ssr')
process.env.QTOPIA_BUILD_DIR = outDir
process.env.QTOPIA_SSR_DIR = ssrDir

const node = (script) => {
  const r = spawnSync(process.execPath, [resolve(root, script)], { stdio: 'inherit', env: process.env })
  if (r.status !== 0) process.exit(r.status || 1)
}

if (process.env.SKIP_CMS !== '1') node('scripts/fetch-cms.mjs')
await build({ root, logLevel: 'warn', build: { outDir, emptyOutDir: true } })
await build({ root, logLevel: 'warn', publicDir: false, build: { ssr: 'src/entry-server.jsx', outDir: ssrDir, emptyOutDir: true } })
node('scripts/prerender.mjs')
