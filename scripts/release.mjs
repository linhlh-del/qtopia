/**
 * Phát hành trên VPS (không panel): mỗi domain trong sites/ có thư mục riêng, build vào thư mục release mới
 * rồi đổi symlink `current` của domain đó một lần. nginx trỏ root vào <base>/sites/$host/current → khách
 * không bao giờ thấy bản build dở dang; domain nào lỗi thì `current` của domain đó giữ nguyên bản đang chạy.
 *
 *   node scripts/release.mjs                        build TẤT CẢ domain (= npm run build:release; webhook CMS gọi lệnh này)
 *   node scripts/release.mjs canho-qtopia.vn ...    chỉ build các domain được nêu
 *
 * Cấu trúc trên VPS (base mặc định: thư mục cha của mã nguồn, vd /var/www/qtopia):
 *   <base>/src                                 mã nguồn
 *   <base>/sites/<domain>/releases/<id>        các bản build của domain
 *   <base>/sites/<domain>/current              symlink → bản đang chạy (nginx root)
 *
 * Biến môi trường (đặt trong .env.production hoặc unit systemd):
 *   QTOPIA_BASE_DIR   thư mục gốc chứa sites/                 (mặc định: thư mục cha của mã nguồn)
 *   QTOPIA_SITES      danh sách domain, cách nhau dấu phẩy     (mặc định: mọi thư mục trong sites/)
 *   QTOPIA_KEEP       số bản release giữ lại để rollback       (mặc định 5)
 *   QTOPIA_GIT_PULL=1 cập nhật mã nguồn (git pull --ff-only) trước khi build
 *   QTOPIA_CHOWN      vd. www-data:www-data — khi build bằng root, trả quyền thư mục release cho user web
 *
 * Rollback thủ công (trong <base>/sites/<domain>): ln -sfn releases/<id> current.tmp && mv -T current.tmp current
 */
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, renameSync, rmSync, symlinkSync, writeFileSync, unlinkSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadCmsEnv } from './load-cms-env.mjs'
import { listSites, readSiteEnv } from './sites.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
loadCmsEnv(root)
const base = resolve(process.env.QTOPIA_BASE_DIR || resolve(root, '..'))
const keep = Math.max(2, Number(process.env.QTOPIA_KEEP || 5))
const lock = join(base, '.release.lock')

const log = (m) => console.log(`[release] ${m}`)
const run = (cmd, args, env = {}) => {
  const r = spawnSync(cmd, args, { cwd: root, stdio: 'inherit', env: { ...process.env, ...env } })
  if (r.status !== 0) throw new Error(`${cmd} ${args.join(' ')} → exit ${r.status}`)
}

const argSites = process.argv.slice(2).filter((a) => !a.startsWith('-'))
const sites = argSites.length
  ? argSites
  : (process.env.QTOPIA_SITES || '').split(',').map((s) => s.trim()).filter(Boolean).length
    ? process.env.QTOPIA_SITES.split(',').map((s) => s.trim()).filter(Boolean)
    : listSites(root)
if (!sites.length) {
  console.error('[release] Không có domain nào trong sites/ (cần sites/<domain>/site.env).')
  process.exit(2)
}
for (const s of sites) readSiteEnv(root, s) // kiểm tra cấu hình trước khi build

mkdirSync(base, { recursive: true })
if (existsSync(lock)) {
  console.error(`[release] Đang có một bản build khác (${lock}). Xoá file lock nếu chắc chắn không còn tiến trình nào.`)
  process.exit(2)
}
writeFileSync(lock, String(process.pid))

const id = new Date().toISOString().replace(/[-:]/g, '').replace(/\..+/, '').replace('T', '-')
const done = []
const failed = []
try {
  if (process.env.QTOPIA_GIT_PULL === '1') {
    log('git pull --ff-only')
    run('git', ['pull', '--ff-only'])
  }
  const commit = spawnSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: root, encoding: 'utf8' }).stdout?.trim()
  const common = { QTOPIA_RELEASE: id, GIT_COMMIT: commit || '' }

  // Lấy nội dung CMS MỘT lần cho mọi domain (lỗi → dừng hết, các website giữ bản đang chạy)
  if (process.env.SKIP_CMS !== '1') {
    log('lấy nội dung CMS đã đăng')
    run(process.execPath, [join(root, 'scripts/fetch-cms.mjs')], common)
  }

  log(`build ${sites.length} domain: ${sites.join(', ')}`)
  for (const site of sites) {
    const siteBase = join(base, 'sites', site)
    const releases = join(siteBase, 'releases')
    const current = join(siteBase, 'current')
    const out = join(releases, id)
    mkdirSync(releases, { recursive: true })
    try {
      log(`[${site}] build → ${out}`)
      const env = {
        ...common,
        QTOPIA_SITE: site,
        SKIP_CMS: '1',
        QTOPIA_BUILD_DIR: out,
        QTOPIA_SSR_DIR: join(root, '.ssr-release') /* phải nằm trong mã nguồn để Node tìm thấy node_modules */,
      }
      run(process.execPath, [join(root, 'scripts/build.mjs')], env)
      log(`[${site}] kiểm tra SEO bản build`)
      run(process.execPath, [join(root, 'scripts/seo-check.mjs')], env)

      if (process.env.QTOPIA_CHOWN) run('chown', ['-R', process.env.QTOPIA_CHOWN, out])

      // đổi symlink nguyên tử: tạo link tạm rồi rename đè lên `current`
      const tmp = `${current}.tmp-${process.pid}`
      if (existsSync(tmp)) unlinkSync(tmp)
      symlinkSync(out, tmp, 'dir')
      renameSync(tmp, current)
      done.push(site)
      log(`[${site}] ĐÃ PHÁT HÀNH ${id}`)

      // dọn bản cũ, giữ `keep` bản gần nhất
      const old = readdirSync(releases).filter((d) => /^\d{8}-\d{6}$/.test(d)).sort().slice(0, -keep)
      for (const d of old) rmSync(join(releases, d), { recursive: true, force: true })
      if (old.length) log(`[${site}] đã xoá ${old.length} bản cũ`)
    } catch (e) {
      failed.push(site)
      console.error(`[release] [${site}] LỖI: ${e.message} — domain này giữ nguyên bản đang chạy.`)
      rmSync(out, { recursive: true, force: true })
    }
  }
} catch (e) {
  console.error(`[release] LỖI: ${e.message} — mọi website giữ nguyên bản đang chạy.`)
  failed.push('(chung)')
} finally {
  rmSync(lock, { force: true })
}
log(`xong ${id}: ${done.length} thành công${done.length ? ` (${done.join(', ')})` : ''}${failed.length ? ` · ${failed.length} lỗi (${failed.join(', ')})` : ''}`)
process.exit(failed.length ? 1 : 0)
