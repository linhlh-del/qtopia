/**
 * Build thử mọi domain trên máy dev (không đụng symlink như release.mjs):
 *   npm run build:sites                       → dist-sites/<domain>/ cho mọi domain trong sites/
 *   npm run build:sites -- canho-qtopia.vn    → chỉ domain được nêu
 * Nội dung CMS lấy một lần ở domain đầu tiên, các domain sau dùng lại (SKIP_CMS=1).
 */
import { spawnSync } from 'node:child_process'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { listSites, readSiteEnv } from './sites.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2).filter((a) => !a.startsWith('-'))
const sites = args.length ? args : listSites(root)
for (const s of sites) readSiteEnv(root, s)

const node = (script, env) => {
  const r = spawnSync(process.execPath, [join(root, script)], { cwd: root, stdio: 'inherit', env: { ...process.env, ...env } })
  if (r.status !== 0) process.exit(r.status || 1)
}

sites.forEach((site, i) => {
  const env = {
    QTOPIA_SITE: site,
    QTOPIA_BUILD_DIR: join(root, 'dist-sites', site),
    QTOPIA_SSR_DIR: join(root, '.ssr-sites'),
    ...(i > 0 || process.env.SKIP_CMS === '1' ? { SKIP_CMS: '1' } : {}),
  }
  console.log(`\n=== ${site} ===`)
  node('scripts/build.mjs', env)
  node('scripts/seo-check.mjs', env)
})
console.log(`\nĐã build ${sites.length} domain vào dist-sites/: ${sites.join(', ')}`)
