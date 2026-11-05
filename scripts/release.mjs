/**
 * Phát hành trên VPS (không panel): build vào thư mục release mới rồi đổi symlink `current` một lần.
 * nginx trỏ root vào <base>/current → khách không bao giờ thấy bản build dở dang; lỗi ở bất kỳ bước nào
 * thì `current` giữ nguyên bản đang chạy.
 *
 *   node scripts/release.mjs            (= npm run build:release; webhook CMS gọi lệnh này)
 *
 * Biến môi trường (đặt trong .env.production hoặc unit systemd):
 *   QTOPIA_BASE_DIR   thư mục chứa releases/ và current   (mặc định: thư mục cha của mã nguồn)
 *   QTOPIA_KEEP       số bản release giữ lại để rollback   (mặc định 5)
 *   QTOPIA_GIT_PULL=1 cập nhật mã nguồn (git pull --ff-only) trước khi build
 *   QTOPIA_CHOWN      vd. www-data:www-data — khi build bằng root, trả quyền thư mục release cho user web
 *
 * Rollback thủ công: ln -sfn releases/<id> current.tmp && mv -T current.tmp current
 */
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, renameSync, rmSync, symlinkSync, writeFileSync, unlinkSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadCmsEnv } from './load-cms-env.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
loadCmsEnv(root)
const base = resolve(process.env.QTOPIA_BASE_DIR || resolve(root, '..'))
const releases = join(base, 'releases')
const current = join(base, 'current')
const keep = Math.max(2, Number(process.env.QTOPIA_KEEP || 5))
const lock = join(base, '.release.lock')

const log = (m) => console.log(`[release] ${m}`)
const run = (cmd, args, env = {}) => {
  const r = spawnSync(cmd, args, { cwd: root, stdio: 'inherit', env: { ...process.env, ...env } })
  if (r.status !== 0) throw new Error(`${cmd} ${args.join(' ')} → exit ${r.status}`)
}

mkdirSync(releases, { recursive: true })
if (existsSync(lock)) {
  console.error(`[release] Đang có một bản build khác (${lock}). Xoá file lock nếu chắc chắn không còn tiến trình nào.`)
  process.exit(2)
}
writeFileSync(lock, String(process.pid))

const id = new Date().toISOString().replace(/[-:]/g, '').replace(/\..+/, '').replace('T', '-')
const out = join(releases, id)
let ok = false
try {
  if (process.env.QTOPIA_GIT_PULL === '1') {
    log('git pull --ff-only')
    run('git', ['pull', '--ff-only'])
  }
  const commit = spawnSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: root, encoding: 'utf8' }).stdout?.trim()
  log(`build → ${out}`)
  const env = { QTOPIA_BUILD_DIR: out, QTOPIA_SSR_DIR: join(root, '.ssr-release') /* phải nằm trong mã nguồn để Node tìm thấy node_modules */, QTOPIA_RELEASE: id, GIT_COMMIT: commit || '' }
  run(process.execPath, [join(root, 'scripts/build.mjs')], env)
  log('kiểm tra SEO bản build')
  run(process.execPath, [join(root, 'scripts/seo-check.mjs')], env)

  if (process.env.QTOPIA_CHOWN) run('chown', ['-R', process.env.QTOPIA_CHOWN, out])

  // đổi symlink nguyên tử: tạo link tạm rồi rename đè lên `current`
  const tmp = `${current}.tmp-${process.pid}`
  if (existsSync(tmp)) unlinkSync(tmp)
  symlinkSync(out, tmp, 'dir')
  renameSync(tmp, current)
  ok = true
  log(`ĐÃ PHÁT HÀNH ${id}`)

  // dọn bản cũ, giữ `keep` bản gần nhất
  const old = readdirSync(releases).filter((d) => /^\d{8}-\d{6}$/.test(d)).sort().slice(0, -keep)
  for (const d of old) rmSync(join(releases, d), { recursive: true, force: true })
  if (old.length) log(`đã xoá ${old.length} bản cũ`)
} catch (e) {
  console.error(`[release] LỖI: ${e.message} — website giữ nguyên bản đang chạy.`)
  rmSync(out, { recursive: true, force: true })
} finally {
  rmSync(lock, { force: true })
}
process.exit(ok ? 0 : 1)
