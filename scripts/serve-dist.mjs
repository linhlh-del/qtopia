// Static server nhỏ để kiểm tra dist/ giống hosting thật (Vercel/Netlify): /vi-tri → vi-tri/index.html,
// đường dẫn không tồn tại → 404.html với mã 404. Dùng: `npm run serve` (sau `npm run build`).
import { createReadStream, existsSync, readFileSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { dirname, extname, join, normalize, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, process.argv[2] || process.env.QTOPIA_BUILD_DIR || 'dist')
// Header bảo mật giống production (lấy từ vercel.json, cùng nội dung với deploy/nginx-qtopia.conf)
const securityHeaders = Object.fromEntries(
  (JSON.parse(readFileSync(join(root, 'vercel.json'), 'utf8')).headers.find((h) => h.source === '/(.*)')?.headers || []).map((h) => [h.key, h.value]),
)
const port = Number(process.env.PORT || 4180)
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.webmanifest': 'application/manifest+json', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.mp4': 'video/mp4',
}

const resolveFile = (urlPath) => {
  const p = normalize(decodeURIComponent(urlPath)).replace(/^([/\\])+/, '')
  const abs = join(dist, p)
  if (!abs.startsWith(dist)) return null
  if (existsSync(abs) && statSync(abs).isFile()) return abs
  const idx = join(abs, 'index.html')
  if (existsSync(idx)) return idx
  return null
}

createServer((req, res) => {
  const url = new URL(req.url, 'http://x')

  // Endpoint lead THỬ (chỉ để kiểm tra luồng form cục bộ): build với VITE_LEAD_ENDPOINT=/__lead rồi xem payload ở terminal.
  if (req.method === 'POST' && url.pathname === '/__lead') {
    let body = ''
    req.on('data', (c) => (body += c))
    req.on('end', () => {
      console.log('[lead thử]', body)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ ok: true }))
    })
    return
  }

  let file = resolveFile(url.pathname)
  let status = 200
  if (!file) {
    file = join(dist, '404.html')
    status = 404
  }
  const stream = createReadStream(file)
  stream.on('error', () => {
    // dist đang được build lại → không để server sập
    if (!res.headersSent) res.writeHead(503)
    res.end('dist đang được build lại')
  })
  stream.on('open', () => res.writeHead(status, { ...securityHeaders, 'Content-Type': types[extname(file)] || 'application/octet-stream' }))
  stream.pipe(res)
}).listen(port, () => console.log(`dist → http://localhost:${port}`))
