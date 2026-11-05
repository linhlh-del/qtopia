# QTOPIA — Checklist việc cần làm

Đánh dấu `[x]` khi xong. Thông tin hệ thống nằm ở [KNOWLEDGE-BASE.md](KNOWLEDGE-BASE.md), lệnh chi tiết ở [deploy/DEPLOY.md](../deploy/DEPLOY.md).

Cập nhật lần cuối: 06/11/2026.

## Đã xong
- [x] Landing chạy trên VPS qua Cloudflare Tunnel: `https://qtopia.rever.io.vn`
- [x] Phát hành không downtime (`npm run build:release`), giữ 5 bản build để rollback
- [x] 5 trang sitelinks, sitemap, robots.txt, JSON-LD; `seo-check` 0 lỗi
- [x] GA4 `G-Y9NFTDSE57` và meta xác minh Search Console trong `<head>`
- [x] CMS `qtopia-cms.vercel.app`: project `qtopia`, 4 owner, `CMS_ORIGINS`, Redirect URL
- [x] Deploy hook trên VPS (service `qtopia-deploy-hook`) + 2 secret trên Supabase
- [x] Tracker dashboard CMS trên landing (online, lượt xem, click, lead)
- [x] Mã nguồn lead Worker (`lead-worker/`), 11/11 test đạt

## Việc ngay (tuần này)
- [ ] **Deploy code mới lên VPS** (tracker, payload lead):
      `cd /var/www/qtopia/src && git pull && npm ci && npm run build:release`.
      Sau đó mở website, chờ khoảng 1 phút, xem **CMS → Dashboard**: phải có ít nhất 1 người online.
- [ ] **Deploy Lead Worker**, làm theo `lead-worker/readme.md`:
  - [ ] Tạo Google Sheet, dán Apps Script `apps-script/Code.gs`, deploy Web app, copy URL `/exec`
  - [ ] `npx wrangler secret put GOOGLE_SHEET_URL`
  - [ ] `npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY`
  - [ ] `npm run deploy`, kiểm tra `/health` có `sheetConfigured` và `cmsConfigured` đều `true`
  - [ ] Thêm `VITE_LEAD_ENDPOINT=https://qtopia-lead-worker.<account>.workers.dev/lead` vào `.env.production` trên VPS, rồi `npm run build:release`
  - [ ] Gửi thử form trên website: lead phải hiện ở Google Sheet **và** CMS → Lead
- [ ] **Đổi token deploy hook.** Token cũ đã lộ trong chat. Tạo token mới trên VPS, sửa `/etc/qtopia-deploy-hook.env`, restart service, cập nhật 2 secret trên Supabase, bấm Đăng thử.
- [ ] **Bấm Đăng thử trên CMS**: trang Đăng phải chuyển *Đang build* rồi *Sẵn sàng*, và `cms-status.json` có `release` mới.
- [ ] **Search Console:** Verify, chỉ gửi `sitemap.xml`, Request indexing 7 URL chính, liên kết GA4. Thêm Bing Webmaster (Import from GSC).

## Bảo mật và vận hành
- [ ] Cloudflare → Configuration Rule cho riêng `qtopia.rever.io.vn`: SSL **Full (strict)**
- [ ] Đồng bộ code `cms-admin` trên Supabase với repo `cms-supabase`. Bản đang chạy cũ hơn và gửi POST rỗng. Khi deploy lại, kiểm tra không làm hỏng 4 CMS khác.
- [ ] Đưa `cms-supabase/` vào git (hiện chưa có repo riêng, các thay đổi hook và migration chỉ nằm trên máy dev)
- [ ] Theo dõi uptime (UptimeRobot hoặc Better Stack) cho `https://qtopia.rever.io.vn` và `/cms-status.json`
- [ ] Sao lưu: export bảng `cms_content` và `cms_leads` định kỳ; sao lưu `/etc/qtopia-deploy-hook.env` và `/etc/cloudflared/config.yml`
- [ ] Khi nâng Node bằng nvm: sửa đường dẫn `v24.14.1` trong `qtopia-deploy-hook.service`, rồi `systemctl daemon-reload && systemctl restart qtopia-deploy-hook`
- [ ] Xoá thư mục `dist/` và `.ssr/` bị khoá quyền trên máy Windows (PowerShell Admin)
- [ ] Gỡ thẻ `google-site-verification` cũ (`X-aD_…`) nếu property `qtopia-tau.vercel.app` không dùng nữa

## Nội dung và pháp lý (cần chủ đầu tư / bộ phận pháp lý xác nhận)
- [ ] Đăng 3–5 **bài tin thật** trên CMS. Section Tin tức và trang `/tin-tuc` sẽ tự được index.
- [ ] Phân biệt vai trò **Công ty CP Đầu tư Serenity** (chủ đầu tư pháp lý) và **Phát Đạt** (`siteMeta.developer`)
- [ ] Đối chiếu số liệu 7,5 ha / 9 tháp với trang pháp lý (55.569,8 m², 5 tháp căn hộ du lịch S4–S8)
- [ ] Loại hình "căn hộ du lịch" và schema `ApartmentComplex`: rà lại cách diễn đạt
- [ ] Cập nhật mục Pháp lý "Giấy phép xây dựng" (văn bản miễn GPXD 34147/SXD-QLXDCT, thông báo khởi công 29/10/2026)
- [ ] Bộ phận pháp lý duyệt câu "Bằng việc gửi biểu mẫu…" ở form và chính sách bán hàng
- [ ] Thay tên tuyến giao thông tạm ("Cập nhật tên cao tốc…") trong `src/sections/Location.jsx`

## SEO và hiệu năng (sau 1–2 tuần)
- [ ] Search Console → Pages: kiểm tra trang bị loại (excluded) và Core Web Vitals
- [ ] Chạy PageSpeed mobile và desktop 3 lần trên domain thật, ghi kết quả vào `PAGESPEED-OPTIMIZATION-CHECKLIST.md`
- [ ] Đặt link từ website Rever, fanpage, Zalo OA về landing
- [ ] GA4: đánh dấu `generate_lead`, `click_call`, `click_zalo` là **Key events**
- [ ] Tablet 768: làm layout 2 cột cho Vị trí, Tiện ích, CSBH (checklist UI mục P3)

## Khi có domain chính thức
- [ ] Cloudflare: thêm hostname vào tunnel (`/etc/cloudflared/config.yml`), tạo DNS CNAME, chứng chỉ Origin mới
- [ ] nginx: `server_name` + chứng chỉ; giữ server block cũ để **301** từ `qtopia.rever.io.vn` sang domain mới
- [ ] `.env.production`: `VITE_SITE_URL` mới, chạy `npm run build:release`
- [ ] Supabase: `update cms_projects set site_url='https://<domain>' where id='qtopia';`
- [ ] Vercel CMS: `VITE_SITE_URL`; Lead Worker: thêm domain vào `ALLOWED_ORIGINS`, deploy lại
- [ ] CSP / `connect-src` nếu Worker dùng domain riêng
- [ ] Search Console: thêm property mới, dùng **Change of Address**, gửi sitemap mới
- [ ] GA4: kiểm tra luồng dữ liệu (stream) nhận đúng domain mới

## Quy trình thường ngày
| Việc | Cách làm |
|---|---|
| Sửa chữ, ảnh, SEO | CMS → sửa → **Đăng** (website tự build sau khoảng 1–2 phút) |
| Sửa code | Máy dev: sửa → `npm run build && npm run seo:check` → commit, push → VPS: `git pull && npm ci && npm run build:release` |
| Thêm người quản trị | CMS → Thành viên (owner thêm, chọn vai trò) |
| Website lỗi sau khi phát hành | Rollback symlink `current` về release trước (xem KNOWLEDGE-BASE mục 12) |
| Đăng mà không build | `journalctl -u qtopia-deploy-hook -n 30`; kiểm tra secret `DEPLOY_HOOK_*` trên Supabase |
