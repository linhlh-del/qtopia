/**
 * Nhiều domain, mỗi domain một bản build riêng.
 *
 *   sites/<domain>/site.env   cấu hình riêng của domain (VITE_SITE_URL bắt buộc; có thể thêm VITE_GTM_ID…)
 *
 * Các biến trong site.env được gán vào process.env nên ghi đè .env.production
 * (Vite và prerender đều ưu tiên process.env hơn file .env).
 * Sau này domain nào có layout riêng thì thêm cấu hình/biến vào đúng thư mục của domain đó.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

export const sitesDir = (root) => join(root, 'sites')

/** Danh sách domain có file sites/<domain>/site.env, sắp theo tên. */
export function listSites(root) {
  const dir = sitesDir(root)
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(join(dir, d.name, 'site.env')))
    .map((d) => d.name)
    .sort()
}

/** Đọc sites/<domain>/site.env (KEY=VALUE, bỏ dòng trống và dòng #). */
export function readSiteEnv(root, site) {
  if (!/^[a-z0-9.-]+$/i.test(site)) throw new Error(`Tên site không hợp lệ: ${site}`)
  const file = join(sitesDir(root), site, 'site.env')
  if (!existsSync(file)) throw new Error(`Không có ${file}`)
  const env = {}
  for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/i)
    if (m) env[m[1]] = m[2].replace(/^(['"])(.*)\1$/, '$2')
  }
  if (!env.VITE_SITE_URL) throw new Error(`${file}: thiếu VITE_SITE_URL`)
  env.VITE_SITE_URL = env.VITE_SITE_URL.replace(/\/+$/, '')
  // GA4 riêng từng domain: không có dòng VITE_GA4_ID → để trống, KHÔNG kế thừa mã của .env.production/domain khác
  env.VITE_GA4_ID = (env.VITE_GA4_ID || '').trim()
  if (env.VITE_GA4_ID && !/^G-[A-Z0-9]{4,12}$/.test(env.VITE_GA4_ID)) throw new Error(`${file}: VITE_GA4_ID sai định dạng (G-XXXXXXXXXX): ${env.VITE_GA4_ID}`)
  // GTM riêng từng domain: tương tự, không kế thừa container của domain khác
  env.VITE_GTM_ID = (env.VITE_GTM_ID || '').trim()
  if (env.VITE_GTM_ID && !/^GTM-[A-Z0-9]{4,10}$/.test(env.VITE_GTM_ID)) throw new Error(`${file}: VITE_GTM_ID sai định dạng (GTM-XXXXXXX): ${env.VITE_GTM_ID}`)
  return env
}

/** Gán cấu hình của site vào process.env (ghi đè .env.production). */
export function applySiteEnv(root, site) {
  const env = readSiteEnv(root, site)
  Object.assign(process.env, env)
  return env
}
