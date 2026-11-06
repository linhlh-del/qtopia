# QTOPIA — Knowledge base

Tài liệu tổng hợp toàn bộ hệ thống landing page QTOPIA: hạ tầng, frontend, CMS, backend, lead, analytics, vận hành và các lỗi đã gặp. Việc còn phải làm nằm ở [TODO-CHECKLIST.md](TODO-CHECKLIST.md). Hướng dẫn cài đặt chi tiết từng bước nằm ở [deploy/DEPLOY.md](../deploy/DEPLOY.md).

Cập nhật lần cuối: 06/11/2026 (bản 3: 2 bài tin tức thật, trang cảm ơn `/cam-on`, lead Worker chuyển sang `be/qtopia/`).

Tài liệu liên quan: [RESPONSIVE-DEVICES.md](RESPONSIVE-DEVICES.md) (100 thiết bị, kết quả đo) · [TODO-CHECKLIST.md](TODO-CHECKLIST.md) · [deploy/DEPLOY.md](../deploy/DEPLOY.md) · [lead-worker/readme.md](../lead-worker/readme.md)

---

## 1. Kiến trúc tổng thể

```text
                         ┌──────────────── Cloudflare (zone rever.io.vn, DNS + proxy) ────────────────┐
Khách ──HTTPS──► qtopia.rever.io.vn ──► Cloudflare Tunnel (cloudflared trên VPS) ──► nginx :443 (VPS)
                                                                                   │
                                                          root /var/www/qtopia/current  (HTML tĩnh prerender)
                                                          /cms-deploy → deploy hook 127.0.0.1:8790

Biên tập viên ──► qtopia-cms.vercel.app (CMS, Vercel) ──► Supabase "palm-river-db" (dùng chung nhiều dự án)
                        │ sửa nháp / Đăng                     ├─ Postgres: cms_projects, cms_content, cms_leads, cms_events…
                        │                                      ├─ Storage: bucket cms-media (ảnh CMS)
                        │                                      └─ Edge Functions: cms-admin (Đăng, trạng thái), collect (analytics)
                        └── Đăng → cms-admin → POST https://qtopia.rever.io.vn/cms-deploy?project=qtopia&token=…
                                               → deploy hook → npm run build:release (lấy nội dung đã đăng → build → đổi symlink)

Form trên landing ──► Cloudflare Worker qtopia-lead-worker ──► Google Sheet (Apps Script) + bảng cms_leads (CMS → Lead)
Tracker trên landing ──► Edge Function collect ──► bảng cms_events (Dashboard CMS: online, lượt xem, click, lead)
GA4 G-Y9NFTDSE57 (gtag trong <head>) · Google Search Console (meta xác minh trong <head>)
```

**Nguyên tắc chính**
- Website là **HTML tĩnh prerender**. Khi khách xem trang, website không gọi API nào, nên SEO và PageSpeed giữ tốt và CMS có sự cố thì site vẫn chạy.
- Nội dung CMS chỉ lên website **lúc build**: bấm Đăng thì website build lại.
- Phát hành **không downtime**: build vào `releases/<id>`, chạy `seo-check`, rồi mới đổi symlink `current`. Build lỗi thì site vẫn giữ bản cũ.

---

## 2. Tài khoản, dịch vụ, định danh

| Thành phần | Giá trị / nơi quản lý |
|---|---|
| Domain | `qtopia.rever.io.vn` (domain phụ). Domain `rever.io.vn` mua ở **Vietnix**, nameserver trỏ về **Cloudflare** |
| DNS | Cloudflare → zone `rever.io.vn` → bản ghi `qtopia` là **CNAME → tunnel** `f26fa7ff-c203-4690-8855-7aec23349cd0.cfargotunnel.com` (Proxied) |
| SSL Cloudflare | Zone đang ở *Automatic SSL/TLS*, đang chạy chế độ **Full**. Chứng chỉ Origin (hạn 2041) đặt trên VPS |
| VPS | `14.225.220.196`, hostname `lussosaigon-vps-bfsc`, Ubuntu 24.04, nginx 1.24, Node 24.14.1 cài qua **nvm của root**, ufw mở 22/2222/80/443. VPS này còn chạy lussosaigon, canho-palmriver… |
| Cloudflare Tunnel | Service `cloudflared` trên VPS, cấu hình `/etc/cloudflared/config.yml` (đang phục vụ `api.rever.io.vn` và `qtopia.rever.io.vn`) |
| Code landing | GitHub `linhlh-del/qtopia` (nhánh `main`). Trên máy dev: `D:\source-code\landing-page\landing-page\qtopia-landing` |
| Code CMS | GitHub `linhlh-del/qtopia-cms`. Vercel project → `https://qtopia-cms.vercel.app` |
| Backend CMS | Supabase project **`palm-river-db`** (ref `ocbsfqgqukhaixskzwdz`), **dùng chung** với Norton Park, Sensa Park và 2 site Palm River. Mã nguồn backend: `landing-page/cms-supabase/` (chưa có git riêng) |
| Lead Worker | Cloudflare Worker `qtopia-lead-worker`, mã nguồn `qtopia-landing/lead-worker/` |
| GA4 | `G-Y9NFTDSE57` (gtag trong `index.html`) |
| Search Console | Property URL prefix `https://qtopia.rever.io.vn/`, meta `google-site-verification` = `xbjr4…L0` trong `index.html` (còn giữ thẻ cũ `X-aD_…` của property Vercel). Trang chủ **đã được Google index** |
| Favicon | `public/favicon.ico` (32×32, do chủ dự án tự thay) + bộ PNG trong `public/icons/` (32/48/96/192/512, logo phủ kín khung, nền trong suốt) + `icons/apple-touch-icon.png` (nền navy). Các file icon cũ ở gốc `public/` (`favicon-32.png`, `icon-192.png`…) **không còn dùng** — bị khoá ghi trên máy dev nên chưa xoá |
| Admin CMS (owner) | linhlh@rever.vn, gianghoa@rever.vn, minhdh1@rever.vn, hoangdnk@rever.vn |

> **Bí mật không bao giờ commit hoặc dán vào chat:** Supabase `service_role` key, token deploy hook, `GOOGLE_SHEET_URL`, private key chứng chỉ Origin. Anon key của Supabase là khoá công khai (chỉ đọc được bản đã đăng).

---

## 3. Thư mục và file trên VPS

| Đường dẫn | Nội dung |
|---|---|
| `/var/www/qtopia/src` | Mã nguồn landing (git clone), có `node_modules` |
| `/var/www/qtopia/src/.env.production` | `VITE_SITE_URL`, `QTOPIA_BASE_DIR=/var/www/qtopia`, `STRICT_SEO=1`, `CMS_SUPABASE_URL`, `CMS_SUPABASE_ANON_KEY`, `QTOPIA_CHOWN=www-data:www-data`, (sẽ thêm) `VITE_LEAD_ENDPOINT` |
| `/var/www/qtopia/releases/<YYYYMMDD-HHMMSS>` | Các bản build (giờ UTC), giữ 5 bản gần nhất |
| `/var/www/qtopia/current` | Symlink → bản đang chạy (nginx `root`) |
| `/etc/nginx/sites-available/qtopia` (+ symlink trong `sites-enabled`) | Cấu hình site. Gốc trong repo `deploy/nginx-qtopia.conf`; trên VPS đã đổi sang cú pháp http2 của nginx 1.24 |
| `/etc/nginx/snippets/qtopia-security.conf` | Header bảo mật dùng chung cho các `location` |
| `/etc/nginx/conf.d/cloudflare-realip.conf` | IP thật của khách (dải IP Cloudflare + 127.0.0.1 cho tunnel) |
| `/etc/ssl/cloudflare/qtopia.rever.io.vn.{pem,key}` | Chứng chỉ Origin Cloudflare |
| `/etc/cloudflared/config.yml` | Ingress tunnel: `qtopia.rever.io.vn → https://localhost:443` (`originServerName`, `noTLSVerify`) |
| `/opt/qtopia-deploy-hook/server.mjs` | Deploy hook (gốc trong repo `deploy/cms-deploy-hook/server.mjs`) |
| `/etc/systemd/system/qtopia-deploy-hook.service` | Unit systemd (gốc trong repo `deploy/cms-deploy-hook/`) |
| `/etc/qtopia-deploy-hook.env` | `DEPLOY_HOOK_TOKEN_QTOPIA`, `QTOPIA_DIR`, `PORT=8790`, `HOST=127.0.0.1` (chmod 600) |

---

## 4. Frontend — `qtopia-landing`

**Stack:** React 19, Vite 8, Tailwind 4, React Router 7. Mỗi route được prerender thành HTML tĩnh (`react-dom/static`), sau đó hydrate.

### Cấu trúc
```text
src/
├─ data/project.js        # TOÀN BỘ nội dung trang (siteMeta, hero, stories, facts, vị trí, tiện ích, CSBH, pháp lý, FAQ…)
├─ data/news.js           # bài tin tức (id = slug, seoTitle, metaDescription, body có ## / ###, nguồn tham khảo)
├─ cms/content.js         # registerCms(): đè nội dung CMS đã đăng lên data/* lúc build
├─ cms/schema.js          # sinh dist/cms-schema.json (CMS đọc để biết trường nào sửa được)
├─ cms/tracker.js         # tracker dashboard CMS → Edge Function collect
├─ seo/site-meta.js       # title/description/H1/OG từng route, sitelinkPaths, mainNav
├─ seo/structured-data.js # JSON-LD (WebSite, Organization, ApartmentComplex, WebPage, Breadcrumb, FAQPage, ItemList sitelinks)
├─ seo/head.js            # thẻ <head> cho prerender + đổi route
├─ sections/*.jsx         # Hero, Story, Facts, Location, MasterPlan, FeaturedAmenities, Residences, SalesPolicy,
│                         #   NearbyPlaces, News, Legal, Faq, Register
├─ pages/                 # Home, Topic (trang con), NewsPage, NewsDetail, ThankYou (/cam-on), NotFound
├─ layout/                # Header, Footer, ValueNav (thanh đáy mobile + dock trái), FloatingButtons, Layout
├─ lib/analytics.js       # GA4 (gtag trong <head>) + sự kiện click_cta, scroll_depth, section_view, web vitals
├─ lib/lead.js            # gửi form → VITE_LEAD_ENDPOINT (hoặc endpoint cấu hình trong CMS)
├─ lib/fit-sections.js    # tự co nội dung section (CSS zoom ≥ 80%) để vừa 1 màn hình
├─ lib/section-snap.js    # lướt qua 1/4 màn hình → tự kéo section kế tiếp lên (chỉ trang chủ)
└─ components/DeferredSection.jsx # section tải JS chậm (gần khung nhìn) + preload khi prerender
scripts/
├─ build.mjs              # fetch-cms → vite build → SSR build → prerender
├─ fetch-cms.mjs          # lấy bản đã đăng (RPC cms_get_published_content) + tải ảnh về public/assets/cms
├─ prerender.mjs          # HTML từng route, 404, sitemap.xml, robots.txt, cms-schema.json
├─ release.mjs            # build:release (VPS) — release dir + seo-check + đổi symlink + giữ 5 bản
├─ seo-check.mjs          # kiểm tra HTML build (H1, title ≤60, description 150–160, OG, JSON-LD, alt…)
├─ optimize-images.mjs    # tạo biến thể WebP 480–1920 → src/data/responsive-images.json
└─ serve-dist.mjs         # server tĩnh test cục bộ (có header bảo mật như production)
deploy/                    # nginx, header bảo mật, deploy hook, DEPLOY.md
lead-worker/               # Cloudflare Worker nhận lead
```

### Route và trang
- `/` là trang chủ, gồm các section theo thứ tự: Hero, Tổng quan, Số liệu, Nightlife, Vị trí, Tiện ích, Tiện ích nổi bật, Mặt bằng, Chính sách bán hàng, Tin tức (**luôn hiện**, kể cả khi còn bài mẫu), Pháp lý, FAQ, Liên hệ.
- Menu header dùng link `/#id`. Link tới section **trên cùng trang** được cuộn thẳng (không qua React Router), vì router chờ các section tải chậm sẽ làm trang đứng im (`useSamePageHashLinks` trong `Layout.jsx`).
- **5 trang sitelinks:** `/tong-quan`, `/vi-tri`, `/tien-ich`, `/chinh-sach-ban-hang`, `/tien-ich-xung-quanh`. Thêm `/mat-bang`.
- `/tin-tuc` và `/tin-tuc/<slug>`: hiện có 2 bài thật (06/11/2026, lấy từ bộ 10 bài SEO), đều được index, có JSON-LD `NewsArticle` + breadcrumb 3 cấp. Bài còn chữ mẫu thì `noindex` và không vào sitemap.
  - Thêm bài: thêm phần tử vào `src/data/news.js` (CMS không thêm/bớt bài được). Trong `body`, đoạn cách nhau 1 dòng trống, `## ` là H2, `### ` là H3. Ảnh bài tải lên trên CMS → Tin tức.
- `/cam-on`: trang cảm ơn. Form gửi thành công (popup hay section Liên hệ) → đóng popup, chuyển sang `/cam-on`. Trang có file HTML prerender nhưng `noindex`, không vào sitemap (khai báo trong `hiddenPages`). Dùng làm trang đích chuyển đổi cho GA4/quảng cáo (page_view `/cam-on`), song song event `generate_lead`.
- Thêm trang con mới: thêm vào `pages` + `topicPaths` (`site-meta.js`) và `BODY` (`pages/Topic.jsx`).

### Nội dung và CMS
- Mỗi object trong `data/project.js` và `data/news.js` đều được gọi `registerCms(name, obj)`. CMS sửa theo khoá đường dẫn, ví dụ `salesPolicy.methods.2.title` hoặc `newsItems.0.image`. Danh sách trong CMS có **số phần tử cố định**: không thêm hay bớt dòng trên CMS được, muốn thêm thì sửa code.
- SEO từng trang (title, description, ảnh OG) sửa được trong CMS → trang SEO.
- Thông tin đã chốt: thời gian tới trung tâm TP.HCM là **75 phút**. Địa chỉ: "Thửa đất số 08, tờ bản đồ số 38, xã Phước Hải, TP. Hồ Chí Minh" (lấy từ phaply.qtopia.vn). Giá Studio từ **1.195 tỷ**.
- **Quy ước nội dung:** viết thuần Việt, câu ngắn. Giữ nguyên **tên riêng trong brochure** (Quậy Station, Ocean Galaxy, Oasis Resort, Aqua Funny Park, DJ Ocean, AMA/MIRA/VITA/ARIA, Aqua Home, Galaxy Dome…). Dịch các từ tiếng Anh chung: Entertainment Complex → *khu giải trí phức hợp*, Nightlife Hub → *khu giải trí đêm*, Resort City / wellness → *thành phố nghỉ dưỡng / chăm sóc sức khoẻ*, rooftop / tầng mái → *sân thượng*, Beach club → *câu lạc bộ bãi biển*, Locker → *tủ đồ cá nhân*, Infinity → *hồ bơi vô cực*, check-in → *chụp ảnh*.

### Hiệu năng (PageSpeed mobile 97 trên bản Vercel cũ)
- Ảnh WebP nhiều kích thước, có `srcset`/`sizes`. Ảnh hero `fetchpriority=high`; các ảnh khác lazy.
- Các section nặng (Vị trí, Tiện ích, Mặt bằng, Tin tức) chỉ tải JS khi khách cuộn gần tới. HTML prerender vẫn có đủ nội dung.
- Font tự host trong `public/fonts` (khai báo ở `src/fonts.css`):
  - Nội dung, link (`--font-body`): SF Pro trên iPhone/iPad/Mac, **Inter** (variable 400–800, subset Việt + Latin) trên thiết bị khác.
  - Tiêu đề, nút, nhãn (`--font-display`): SF Pro trên iPhone/iPad/Mac, **Poppins** (500–800) trên thiết bị khác.
  - Đã thử font tiêu đề amatry (SVN-Amatry của site chủ đầu tư) ngày 06/11/2026 rồi bỏ, giữ nguyên font cũ cho cả tiêu đề lẫn nội dung.
- Có `content-visibility: auto` cho các section.
- GA4 hiện nằm trong `<head>` theo yêu cầu, nên điểm mobile có thể thấp hơn một chút so với lúc trì hoãn tải GA.

### UI / responsive (chi tiết: [RESPONSIVE-DEVICES.md](RESPONSIVE-DEVICES.md))
- **Mục tiêu:** mỗi section cao đúng `100svh − header` (svh = vùng nhìn thấy khi thanh trình duyệt đang hiện). Có phương án dự phòng `vh` cho Safari < 15.4.
- **3 tầng để vừa 1 màn hình:**
  1. CSS mobile first + breakpoint theo chiều cao (`max-height: 760 / 740 / 620`). Màn thấp thì sắp xếp lại: Vị trí 2×2, Tin tức ảnh 2:1 và tóm tắt 1 dòng, CSBH câu dẫn 2 dòng.
  2. `fit-sections.js`: section nào vẫn cao hơn màn hình thì thu nhỏ đều nội dung bằng CSS `zoom`, **tối thiểu 80%** (`data-fit` trên section cho biết mức đang dùng). Không áp dụng cho hero và điện thoại xoay ngang.
  3. Section vẫn dư thì cuộn tự nhiên (chỉ còn ở iPhone SE đời 1 và vài section ở iPhone 7/8 dư 12–37px).
- **Tablet:** cỡ chữ ×1,656 và bố cục 1 cột **chỉ khi dọc** (`(768px <= width < 1280px) and (orientation: portrait)`). Tablet ngang dùng bố cục 2 cột của desktop.
- **Tự kéo section (`section-snap.js`, chỉ trang chủ):** khi khách ngừng cuộn, lướt ≥ 25% màn hình thì section kế tiếp/phía trên kéo lên sát header, chưa tới 25% thì trở về. Cuộn tự do trong section cao hơn màn hình, trong footer, khi popup mở, khi điện thoại ngang. Đổi độ nhạy bằng hằng `THRESHOLD`.
- **Chữ trên ảnh:** section Story có tấm nền `.text-panel` (navy 58% + làm mờ ảnh + bóng chữ); Hero có bóng chữ.
- **Lớp phủ toàn màn hình** (Phóng to sơ đồ Tiện ích, Phóng to Mặt bằng, lightbox ảnh tiện ích) được render qua **React Portal vào `<body>`**. Không đặt `position: fixed` bên trong section: `content-visibility`, `transform` (hiệu ứng xuất hiện) và `zoom` làm nó bị neo vào section.
- Mobile khác: nút ↑ chỉ hiện khi khách cuộn ngược lên; chú thích tuyến giao thông thu gọn; sơ đồ tiện ích chỉ hiện chấm màu kèm danh sách theo khu; CSBH timeline dọc mỗi mốc một dòng; FAQ hiện 5 câu + "Xem thêm"; Pháp lý đóng sẵn trên mobile; Mặt bằng phóng to có gợi ý xoay ngang máy.
- **Không thêm phần tử `position: absolute` (vd. `.sr-only`) bên trong carousel/khung cuộn mà không có cha `relative`**: nó thoát khỏi khung, làm trang rộng ra và Safari iOS cũ thu nhỏ cả trang. `body` có `overflow-x: clip` làm lưới an toàn.

---

## 5. Build và phát hành

| Lệnh | Tác dụng |
|---|---|
| `npm run dev` | Chạy dev ở máy (Vite) |
| `npm run build` | Build đầy đủ vào `dist/` (`QTOPIA_BUILD_DIR` đổi được) |
| `npm run seo:check` | Kiểm tra bản build (dùng sitemap làm danh sách trang) |
| `npm run build:release` | **Dùng trên VPS**: build vào release mới, chạy seo-check, đổi symlink, dọn bản cũ |
| `npm run images:optimize` | Tạo lại ảnh tối ưu sau khi thêm hoặc đổi ảnh trong `public/images` |

Biến môi trường build: `VITE_SITE_URL`, `VITE_LEAD_ENDPOINT`, `CMS_SUPABASE_URL`, `CMS_SUPABASE_ANON_KEY`, `QTOPIA_BASE_DIR`, `QTOPIA_KEEP`, `QTOPIA_GIT_PULL`, `QTOPIA_CHOWN`, `STRICT_SEO`, `SKIP_CMS=1` (bỏ bước lấy nội dung CMS).

URL `collect` của tracker được **tự suy ra** từ `CMS_SUPABASE_URL` trong `vite.config.js`.

---

## 6. CMS — `qtopia-cms` (Vercel)

- Vite + React SPA, đăng nhập Google qua Supabase Auth. Quyền theo bảng `cms_members`: **owner, editor, sales, viewer**. Owner thêm thành viên trong trang Thành viên.
- Các trang: Nội dung, SEO, Head/Tracking (owner), Đăng (Publish), Lead, Cài đặt lead (owner), Dashboard, Thành viên, Nhật ký.
- CMS đọc `https://qtopia.rever.io.vn/cms-schema.json` (trường sửa được) và `cms-status.json` (bản đang chạy, `content_hash`) để biết website đã lên bản mới nhất chưa.
- Ảnh tải lên được nén sang WebP và lưu ở bucket `cms-media/qtopia/…`. Lúc build, ảnh được tải về `public/assets/cms/`, nên khách xem ảnh trực tiếp từ domain website.
- Biến môi trường Vercel: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_SITE_URL=https://qtopia.rever.io.vn`.
- Supabase Auth → Redirect URLs có `https://qtopia-cms.vercel.app/**`.

**Luồng Đăng**
1. Editor lưu nháp vào `cms_content.draft`.
2. Bấm **Đăng**: Edge Function `cms-admin` chép nháp sang `published`, lưu thêm một phiên bản, rồi gọi `DEPLOY_HOOK_QTOPIA`.
3. Deploy hook chạy `npm run build:release`. Trang Đăng hỏi trạng thái qua GET `…/cms-deploy?action=status&project=qtopia`.

---

## 7. Backend — Supabase `palm-river-db` (dùng chung)

- **Bảng (tiền tố `cms_`):** `cms_projects`, `cms_members`, `cms_content` (draft/published), `cms_versions`, `cms_leads`, `cms_events`, `cms_audit_log`. RLS theo thành viên của từng project. RPC `cms_get_published_content(p)` cho anon key gọi.
- **Edge Functions:**
  - `cms-admin`: đăng, rollback, trạng thái deploy, lead thử.
  - `collect`: nhận sự kiện từ tracker, không cần JWT, kiểm origin bằng `cms_projects.site_url`.
  - Cả hai chỉ chấp nhận project nằm trong mảng `PROJECTS` (`_shared/util.ts`), danh sách này **phải có `'qtopia'` ở CẢ HAI function**. Sửa trên dashboard: Edge Functions → *tên function* → Code → `_shared/util.ts` → Deploy. Thiếu ở `collect` thì dashboard CMS trống; kiểm tra bằng lệnh `curl` ở mục 12 (kết quả đúng `{"ok":true,"stored":0}`, sai là `{"error":"project"}`).
  - Bản `cms-admin` đang chạy trên Supabase **cũ hơn** repo `cms-supabase`: gọi deploy hook bằng POST rỗng, không gửi header token. Vì vậy token nằm trong URL `DEPLOY_HOOK_QTOPIA`.
- **Secrets** (Edge Functions → Secrets):
  - `CMS_ORIGINS` = `https://norton-park-cms.vercel.app,https://palm-river-mkt-cms.vercel.app,https://palm-river-no-rever-cms.vercel.app,https://sensa-park-cms.vercel.app,https://qtopia-cms.vercel.app`. Đổi giá trị là **thay cả danh sách**, nên phải giữ đủ mọi CMS.
  - `DEPLOY_HOOK_QTOPIA` = `https://qtopia.rever.io.vn/cms-deploy?project=qtopia&token=<token>`
  - `DEPLOY_HOOK_TOKEN_QTOPIA` = `<token>` (trùng với `/etc/qtopia-deploy-hook.env`)
- Project `qtopia` đã đăng ký bằng SQL Editor (migration `20261106000000_qtopia_project.sql`, `20261106000100_qtopia_owner.sql`). Project này **không có bảng lịch sử migration của CLI**.
- **Phần mềm:** CLI Supabase 3.x mặc định nhắm vào DB local. Với project này dùng `npx supabase@2.122.0 …`, hoặc làm trên dashboard.

---

## 8. Lead

```text
Form (Hero popup / Liên hệ / nút nổi…) → src/lib/lead.js → POST VITE_LEAD_ENDPOINT
→ Cloudflare Worker qtopia-lead-worker → Google Sheet (RAW_LEAD) + bảng cms_leads (CMS → Lead)
→ thành công: form báo đã gửi, gửi event GA4 generate_lead, tracker CMS ghi "lead"
```
- Payload gồm `name`, `phone`, `form_type` (vị trí form), `page_url`, `source_url`, `referrer`, `utm_*`, `submitted_at`. Không bao giờ gửi PII sang analytics.
- Worker có: kiểm origin (`ALLOWED_ORIGINS`), honeypot, rate limit 5 lần/phút/IP, bỏ lead trùng SĐT trong 2 phút, chặn công thức trong Sheets. Chỉ báo thành công khi Sheet đã ghi.
- Secret Worker: `GOOGLE_SHEET_URL`, `SUPABASE_SERVICE_ROLE_KEY`. Chi tiết trong `lead-worker/readme.md`.

---

## 9. Analytics

| Kênh | Nội dung |
|---|---|
| GA4 `G-Y9NFTDSE57` | `page_view` (lần tải đầu do gtag tự gửi, các lần đổi route do code gửi, không trùng), `generate_lead`, `click_cta`, `click_call`, `click_zalo`, `scroll_depth`, `section_view`, `view_floorplan`, `select_payment_method`, `web_vital` |
| Dashboard CMS | tracker (`src/cms/tracker.js`) gửi `pageview`, `heartbeat` 30 giây một lần (số người online), `section_view`, `cta_click` (theo `data-cta-name@data-cta-location`), `lead`, `leave` → `collect` → `cms_events`. Chỉ dùng id ngẫu nhiên, không có PII |
| Search Console | Chỉ gửi **`sitemap.xml`** trong mục Sitemaps (gửi URL trang vào đây sẽ báo lỗi "Sitemap is HTML"). Từng URL thì dùng ô **URL Inspection** trên cùng → Request indexing. Kiểm tra dữ liệu có cấu trúc: search.google.com/test/rich-results và validator.schema.org. Sitelinks, logo và tên site trên kết quả do Google tự quyết, cập nhật sau vài ngày đến vài tuần |
| Cloudflare Web Analytics | Cloudflare tự chèn `static.cloudflareinsights.com` → đã cho phép trong CSP |

---

## 10. Bảo mật

- Header (nginx + `vercel.json`): CSP, HSTS, X-Frame-Options SAMEORIGIN, nosniff, Referrer-Policy, COOP, Permissions-Policy.
- CSP cho phép `'unsafe-inline'` cho script. Lý do: React 19 chèn script `$RC` nhỏ cho các section lớn đã prerender, và gtag nằm inline.
- `script-src` cho phép GTM và `static.cloudflareinsights.com`; `connect-src` cho phép GA, `cloudflareinsights.com`, `*.supabase.co`, `*.workers.dev`. Nếu Worker dùng domain riêng, phải thêm domain đó vào CSP (cả `vercel.json` lẫn nginx trên VPS).
- File nginx trên VPS đã sửa tay (http2 cho nginx 1.24, CSP, `/site.webmanifest`), nên **không chép đè** `deploy/nginx-qtopia.conf` lên VPS; sửa từng dòng bằng `sed` rồi `nginx -t`.
- Deploy hook chỉ nghe `127.0.0.1`, bắt buộc token, thư mục build và lệnh build cố định. nginx tắt access log cho `/cms-deploy`, vì token có thể nằm trong URL.
- nginx chặn file ẩn (`.env`, `.git`).

---

## 11. Lỗi đã gặp và cách xử lý

| Triệu chứng | Nguyên nhân | Cách xử lý |
|---|---|---|
| `npm run build` báo `EPERM` khi xoá `dist/assets` (máy Windows) | `dist/`, `.ssr/` do một sandbox khác tạo, ACL không cho xoá | Xoá bằng PowerShell quyền Admin, hoặc build vào thư mục khác: `QTOPIA_BUILD_DIR=dist-local QTOPIA_SSR_DIR=.ssr-local` |
| `sudo: npm: command not found` | Node cài bằng nvm trong `/root` | Build bằng root. Thêm `QTOPIA_CHOWN=www-data:www-data` để trả quyền thư mục cho nginx |
| Build trên VPS báo `Cannot find package 'react'` | Thư mục SSR nằm ngoài mã nguồn | Đã sửa: `.ssr-release` nằm trong `src` |
| nginx cảnh báo `protocol options redefined` / `http2 on` lỗi | nginx 1.24 không hỗ trợ `http2 on;` | Dùng `listen 443 ssl http2;` |
| Cloudflare **525** | VPS không nhận kết nối trực tiếp từ Cloudflare; VPS dùng **Cloudflare Tunnel** | Thêm ingress `qtopia.rever.io.vn → https://localhost:443` vào tunnel, DNS đổi sang CNAME trỏ tunnel |
| Search Console "Sitemap is HTML" | Gửi nhầm URL trang (`/tien-ich-xung-quanh`) vào mục Sitemaps | Xoá các mục nhầm, chỉ gửi `sitemap.xml` |
| CMS "Chưa cấu hình DEPLOY_HOOK" | Thiếu secret `DEPLOY_HOOK_QTOPIA` | Đặt 2 secret deploy hook |
| Hook trả 400 rồi 401 | Bản `cms-admin` đang chạy trên Supabase gửi POST **rỗng, không có header token** | Hook nhận project từ `?project=` và token từ `?token=` → đặt URL đầy đủ vào `DEPLOY_HOOK_QTOPIA` |
| Dashboard CMS trống | Landing chưa có tracker | Đã thêm `src/cms/tracker.js` |
| `supabase migration list` báo kết nối `127.0.0.1:54322` | CLI 3.x mặc định nhắm DB local | Dùng `npx supabase@2.122.0` hoặc dashboard |
| SQL báo lỗi `supabase_migrations.schema_migrations does not exist` | Project chưa từng dùng CLI để chạy migration | Bỏ phần ghi lịch sử, chạy lại (cả khối SQL chạy trong một transaction) |
| Prerender sinh script inline `$RC` | Tính năng outline Suspense boundary lớn của React 19.2 | Hành vi bình thường. CSP cho phép inline |
| Bấm menu header, URL đổi `/#vi-tri` nhưng trang đứng im | Router chuyển trang trong transition; section tải chậm chờ cuộn tới → chờ nhau mãi | Link cùng trang cuộn thẳng; section tải chậm tải ngay khi chuyển trang; căn lại vị trí 2,5 giây |
| Dashboard CMS trống dù đã có tracker | `collect` trên Supabase chưa có `'qtopia'` trong `PROJECTS` | Sửa `_shared/util.ts` của function `collect` rồi Deploy |
| iPhone 7 Plus / iOS cũ: cả trang bị thu nhỏ, section sai chiều cao | Chữ `.sr-only` trong thẻ Tin tức thoát khỏi carousel (trang rộng 2.800px); Safari ≤ 17 không có `content-visibility` nên không che được | Thêm `relative` cho link; `body { overflow-x: clip }` |
| iPhone: bấm "Phóng to" Tiện ích/Mặt bằng → màn hình trống, không lướt được, không bấm được căn | Lớp phủ `position: fixed` bị neo vào section (content-visibility/transform/zoom), nằm ngoài màn hình; trang đã khoá cuộn | Render lớp phủ qua React Portal vào `<body>` |
| Tablet ngang: Vị trí/Tiện ích cao gấp rưỡi màn hình | Khối CSS tablet (chữ ×1,656, 1 cột) áp cả khi xoay ngang | Chỉ áp khi `orientation: portrait` |
| Google hiện icon quả địa cầu thay vì logo | Mới index; thiếu `/favicon.ico`; logo trong icon nhỏ | Thêm `favicon.ico` + bộ `public/icons/`; Request indexing trang chủ; chờ vài ngày–vài tuần |
| Không ghi đè được file trong `public/` trên máy Windows (`Invalid argument` / `EPERM`) | File do sandbox khác tạo, khoá quyền ghi | Ghi file mới với tên/thư mục khác, hoặc xoá bằng PowerShell Admin |

---

## 12. Lệnh hay dùng

```bash
# VPS — cập nhật code + build lại
cd /var/www/qtopia/src && git pull && npm ci && npm run build:release

# VPS — bản đang chạy / rollback
curl -s https://qtopia.rever.io.vn/cms-status.json
cd /var/www/qtopia && ls releases && ln -sfn releases/<id> current.tmp && mv -T current.tmp current

# VPS — deploy hook
systemctl status qtopia-deploy-hook ; journalctl -u qtopia-deploy-hook -f
cp /var/www/qtopia/src/deploy/cms-deploy-hook/server.mjs /opt/qtopia-deploy-hook/ && systemctl restart qtopia-deploy-hook

# Kiểm tra Edge Function collect đã nhận project qtopia (không ghi dữ liệu)
curl -s -X POST -H "Origin: https://qtopia.rever.io.vn" -d '{"project":"qtopia","visitor_id":"t","session_id":"t","events":[]}' https://ocbsfqgqukhaixskzwdz.supabase.co/functions/v1/collect

# Kiểm tra favicon / sitemap trên site thật
curl -s -o /dev/null -w "%{http_code} %{content_type}\n" https://qtopia.rever.io.vn/favicon.ico
curl -s https://qtopia.rever.io.vn/sitemap.xml | grep -c "<loc>"

# VPS — tunnel / nginx
cloudflared tunnel --config /etc/cloudflared/config.yml ingress validate && systemctl restart cloudflared
nginx -t && systemctl reload nginx

# Máy dev
npm run dev
npm run build && npm run seo:check
cd lead-worker && npm test && npm run deploy
```
