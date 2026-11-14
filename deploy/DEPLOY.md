# Triển khai QTOPIA: landing page trên VPS Ubuntu + CMS trên Vercel

## Kiến trúc

```
Biên tập viên ──► qtopia-cms (Vercel, SPA)                 Khách truy cập
                     │ lưu bản nháp / bấm "Đăng"                │
                     ▼                                          ▼
              Supabase (cms-supabase, dùng chung)          nginx (VPS)  root = /var/www/qtopia/current
              cms_content.published                              ▲
                     │ Edge Function cms-admin "publish"         │ symlink đổi nguyên tử
                     ▼                                           │
     POST https://canho-qtopia.vn/cms-deploy  ──nginx──► deploy hook (127.0.0.1:8790, systemd)
                                                    └─ npm run build:release (thư mục /var/www/qtopia/src)
                                                         1. fetch-cms: lấy bản đã đăng + tải ảnh về /assets/cms/
                                                         2. vite build + SSR + prerender → releases/<id>
                                                         3. seo-check bản build (lỗi → dừng, giữ bản cũ)
                                                         4. current → releases/<id>; giữ 5 bản để rollback
```

Vì sao chọn mô hình này:

- **Nội dung vẫn là HTML tĩnh prerender.** Không gọi API lúc khách xem trang, nên SEO và PageSpeed giữ nguyên. CMS có sự cố cũng không làm sập website.
- **Không cần panel trên VPS.** Chỉ cần nginx, Node.js và một service systemd nhỏ.
- **Phát hành không downtime, rollback được.** Mỗi lần đăng là một thư mục build mới; chỉ đổi symlink khi build và `seo-check` đều đạt.
- **Dùng lại backend CMS sẵn có** (`cms-supabase`: Google login, phân quyền, lịch sử phiên bản, leads), chỉ thêm project `qtopia`.

## 1. Chuẩn bị VPS (một lần)

```bash
sudo apt update && sudo apt install -y nginx git
# Node.js 22 LTS
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - && sudo apt install -y nodejs

sudo mkdir -p /var/www/qtopia
sudo chown -R www-data:www-data /var/www/qtopia
sudo -u www-data git clone https://github.com/linhlh-del/qtopia.git /var/www/qtopia/src
cd /var/www/qtopia/src && sudo -u www-data npm ci
```

Tạo `/var/www/qtopia/src/.env.production`. File này không commit vào git; quyền nên là `chmod 640`, owner `www-data`.

```ini
VITE_SITE_URL=https://canho-qtopia.vn
VITE_LEAD_ENDPOINT=<URL nhận lead, vd Cloudflare Worker ghi vào cms_leads>
CMS_SUPABASE_URL=https://<project>.supabase.co
CMS_SUPABASE_ANON_KEY=<anon key>
QTOPIA_BASE_DIR=/var/www/qtopia
STRICT_SEO=1
```

Build lần đầu:

```bash
cd /var/www/qtopia/src && sudo -u www-data npm run build:release
ls -l /var/www/qtopia/current   # → releases/<id>
```

## 2. Domain canho-qtopia.vn (Cloudflare) + nginx

**Cloudflare** (zone `canho-qtopia.vn`):

1. DNS → Add record. Type `A`, Name `@`, IPv4 = IP của VPS, Proxy status **Proxied** (đám mây cam).
2. SSL/TLS → Overview: chọn **Full (strict)**.
3. SSL/TLS → Origin Server → **Create Certificate**. Hostname `canho-qtopia.vn` và `*.canho-qtopia.vn`, hạn 15 năm. Lưu 2 khối PEM lên VPS:
   ```bash
   sudo mkdir -p /etc/ssl/cloudflare
   sudo nano /etc/ssl/cloudflare/canho-qtopia.vn.pem   # dán "Origin Certificate"
   sudo nano /etc/ssl/cloudflare/canho-qtopia.vn.key   # dán "Private Key"
   sudo chmod 600 /etc/ssl/cloudflare/canho-qtopia.vn.key
   ```
4. SSL/TLS → Edge Certificates: bật **Always Use HTTPS**. Speed → Optimization: Brotli bật mặc định.
5. **Caching → Cache Rules:** không cache HTML ở edge. Để mặc định Cloudflare chỉ cache file tĩnh (`/assets`, `/images`) là đủ, khách thấy nội dung CMS mới ngay. Nếu sau này bật cache HTML thì phải purge sau mỗi lần đăng.

**Lấy IP thật của khách qua Cloudflare** (`/etc/nginx/conf.d/cloudflare-realip.conf`):

```bash
{ for ip in $(curl -s https://www.cloudflare.com/ips-v4) $(curl -s https://www.cloudflare.com/ips-v6); do echo "set_real_ip_from $ip;"; done; echo "real_ip_header CF-Connecting-IP;"; } | sudo tee /etc/nginx/conf.d/cloudflare-realip.conf
```

**nginx:**

```bash
sudo cp deploy/qtopia-security.conf /etc/nginx/snippets/qtopia-security.conf
sudo cp deploy/nginx-qtopia.conf /etc/nginx/sites-available/qtopia
sudo ln -s ../sites-available/qtopia /etc/nginx/sites-enabled/qtopia
sudo nginx -t && sudo systemctl reload nginx
```

Firewall: chỉ mở 22, 80, 443 (`sudo ufw allow OpenSSH && sudo ufw allow 'Nginx Full' && sudo ufw enable`).

### Nhiều domain trên cùng một máy — mỗi domain một thư mục build riêng

Cùng một mã nguồn `/var/www/qtopia/src`, nhưng **mỗi domain có cấu hình và bản build riêng**:

| Thành phần | Vị trí |
|---|---|
| Cấu hình domain (VITE_SITE_URL, sau này: GTM, layout riêng…) | `sites/<domain>/site.env` trong repo |
| Bản build của domain | `/var/www/qtopia/sites/<domain>/releases/<id>` |
| Bản đang chạy (nginx root) | `/var/www/qtopia/sites/<domain>/current` |

Domain hiện có: `canho-qtopia.vn`, `qtopialiving.vn`, `qtopialiving.com`, `qtopiaresidence.vn`, `qtopiaresortcity.vn`, `qtopiaseaside.vn`. Mỗi domain tự có canonical, sitemap, robots, JSON-LD của chính nó. `www.<domain>` → 301 về `<domain>`; domain cũ `qtopia.rever.io.vn` → 301 về `canho-qtopia.vn`.

Lệnh:

```bash
npm run build:release                       # build + phát hành TẤT CẢ domain (webhook CMS gọi lệnh này)
npm run build:release -- qtopiaseaside.vn   # chỉ một domain
npm run build:sites                         # máy dev: build thử mọi domain vào dist-sites/<domain>
```

Nội dung CMS lấy một lần rồi dùng cho mọi domain. Domain nào build lỗi thì domain đó giữ bản đang chạy, các domain khác vẫn phát hành.

Thêm domain mới: tạo `sites/<domain>/site.env` (`VITE_SITE_URL=https://<domain>`), thêm tên vào `server_name` trong `deploy/nginx-qtopia.conf` (khối 80, khối www, khối chính), thêm route trên tunnel `qtopia-vps` (HTTPS `localhost:443`, Origin Server Name `canho-qtopia.vn`), rồi build lại.

> Lưu ý SEO: khi các domain còn cùng nội dung, Google có thể coi là trùng lặp và chỉ chọn một domain để xếp hạng. Nên làm nội dung/layout khác nhau cho từng domain càng sớm càng tốt.

Đổi domain chính về sau: sửa 4 chỗ rồi chạy `npm run build:release`:

- `VITE_SITE_URL` trong `.env.production`
- `server_name` và chứng chỉ trong file nginx
- `site_url` của project `qtopia` trong Supabase
- `VITE_SITE_URL` của CMS trên Vercel

Cấu hình nginx đã có sẵn:

- HTTPS (chứng chỉ Origin của Cloudflare) và HSTS.
- Nén gzip.
- Cache 1 năm cho `/assets` và `/fonts`, 30 ngày cho `/images`. HTML luôn được trình duyệt kiểm tra lại.
- URL sạch (`/vi-tri`); đường dẫn không tồn tại trả mã **404 thật**.
- Header bảo mật: CSP, COOP, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy.
- CORS `*` cho `cms-schema.json` và `cms-status.json`.
- Proxy `/cms-deploy` vào deploy hook.
- Chặn file ẩn như `.env` và `.git`.

## 3. Deploy hook (nhận lệnh "Đăng" từ CMS)

Service nằm ở `cms-supabase/vps-deploy-hook/server.mjs`; xem README cùng thư mục. Với project `qtopia`, hook chạy `npm run build:release` trong `QTOPIA_DIR`.

```ini
# /etc/qtopia-deploy-hook.env
DEPLOY_HOOK_TOKEN_QTOPIA=<openssl rand -hex 32>
QTOPIA_DIR=/var/www/qtopia/src
PORT=8790
HOST=127.0.0.1
NPM_BIN=/usr/bin/npm
```

Trong unit systemd, `ReadWritePaths` phải gồm `/var/www/qtopia` (cả `src`, `releases` và symlink `current`).

Secrets của Supabase Edge Function `cms-admin` (`supabase secrets set ...`):

- `DEPLOY_HOOK_QTOPIA=https://canho-qtopia.vn/cms-deploy`
- `DEPLOY_HOOK_TOKEN_QTOPIA=<cùng token ở trên>`
- `CMS_ORIGINS` thêm domain CMS trên Vercel

## 4. CMS trên Vercel (`qtopia-cms/`)

1. Import thư mục `qtopia-cms` thành một project Vercel (Framework: Vite).
2. Đặt các biến môi trường `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_SITE_URL=https://canho-qtopia.vn`.
3. Supabase → Authentication → URL Configuration: thêm domain CMS vào Redirect URLs (đăng nhập Google).
4. Chạy migration `qtopia` trong `cms-supabase` (`supabase db push`). Bước này tạo project và cấp quyền owner cho tài khoản quản trị.

Biên tập viên mở CMS, sửa nội dung rồi bấm **Đăng**. Khoảng 1–3 phút sau website có bản mới. Trang Publish của CMS hiển thị trạng thái BUILDING / READY / ERROR.

## 5. Vận hành

| Việc | Lệnh |
|---|---|
| Phát hành thủ công (code mới + nội dung) | `cd /var/www/qtopia/src && sudo -u www-data git pull && sudo -u www-data npm ci && sudo -u www-data npm run build:release` |
| Rollback | `cd /var/www/qtopia && ls releases && sudo -u www-data ln -sfn releases/<id> current.tmp && sudo -u www-data mv -T current.tmp current` |
| Xem log hook | `journalctl -u qtopia-deploy-hook -f` |
| Bản đang chạy | `curl -s https://canho-qtopia.vn/cms-status.json` |
| SSL | Chứng chỉ Origin của Cloudflare hạn 15 năm, chứng chỉ edge do Cloudflare tự gia hạn |

Một bản build hỏng không bao giờ được đưa lên: nếu `fetch-cms`, build hoặc `seo-check` lỗi, `current` vẫn trỏ vào bản cũ và lỗi hiện trong log hook.
