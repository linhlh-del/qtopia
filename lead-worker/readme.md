# Lead Worker — QTOPIA

Cloudflare Worker nhận lead từ form trên `https://qtopia.rever.io.vn`. Worker kiểm tra và chuẩn hoá dữ liệu, ghi vào Google Sheet qua Apps Script, rồi đồng bộ lead sang **trang Lead của CMS** (`qtopia-cms`, bảng `cms_leads` trên Supabase).

```text
Form trên landing (src/lib/lead.js)
  → POST https://qtopia-lead-worker.<account>.workers.dev/lead   (JSON)
  → Worker: kiểm origin · chống spam (honeypot + rate limit + chống trùng 2 phút) · chuẩn hoá SĐT · chặn công thức Sheets
  → Apps Script ghi 1 dòng vào sheet RAW_LEAD   (bản lưu chính)
  → (nền) ghi bảng cms_leads trên Supabase     (hiện ở CMS → Lead, realtime)
  → { success: true } → form báo thành công + dashboard CMS ghi sự kiện "lead"
```

Worker chỉ trả về thành công khi **Apps Script xác nhận đã ghi**. Nếu ghi Sheet lỗi, Worker thử lại 1 lần, vẫn lỗi thì báo cho khách gửi lại. Lead không bao giờ bị mất mà không ai biết.

## Cài đặt (một lần, khoảng 10 phút)

1. **Google Sheet**
   - Tạo một Sheet mới, vào *Extensions → Apps Script*, dán nội dung file `apps-script/Code.gs`.
   - Chọn *Deploy → New deployment → Web app*: **Execute as: Me**, **Who has access: Anyone**. Copy URL kết thúc bằng `/exec`.
   - Mở URL đó trên trình duyệt, phải thấy `{"success":true,"message":"Webhook is running"}`.
2. **Deploy Worker.** Chạy trong thư mục `lead-worker/` trên máy có Node:
   ```bash
   npm install
   npx wrangler login
   npx wrangler secret put GOOGLE_SHEET_URL            # dán URL /exec ở bước 1
   npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY   # Supabase → Project Settings → API → service_role
   npm run deploy
   ```
   Khoá `service_role` **chỉ** đặt trong secret của Worker. Không bao giờ đưa khoá này vào landing, CMS hay git.
3. **Kiểm tra** `https://qtopia-lead-worker.<account>.workers.dev/health`: phải có `sheetConfigured: true` và `cmsConfigured: true`.
4. **Nối landing với Worker.** Chọn một trong hai cách:
   - Thêm `VITE_LEAD_ENDPOINT=https://qtopia-lead-worker.<account>.workers.dev/lead` vào `/var/www/qtopia/src/.env.production` trên VPS, rồi chạy `npm run build:release`. Cách này ưu tiên cao hơn.
   - Hoặc trong CMS vào **Cài đặt lead** (chỉ owner), dán URL trên rồi bấm **Đăng**.
5. Gửi thử form trên website. Lead phải xuất hiện ở **Google Sheet** và ở **CMS → Lead**.

## Cấu hình (`wrangler.jsonc`)

| Biến | Giá trị |
|---|---|
| `PROJECT_NAME` | `QTOPIA` (cột project trên Sheet) |
| `PROJECT_ID` | `qtopia` (project trong CMS) |
| `SUPABASE_URL` | Supabase dùng chung của CMS |
| `ALLOWED_ORIGINS` | `https://qtopia.rever.io.vn`, CMS `https://qtopia-cms.vercel.app`, Supabase (gửi lead thử từ CMS). **Khi đổi domain landing phải thêm domain mới vào đây rồi deploy lại.** |
| `RATE_LIMIT_PER_MINUTE` | 5 lần/phút/IP |

Secret: `GOOGLE_SHEET_URL` và `SUPABASE_SERVICE_ROLE_KEY`, đặt bằng `npx wrangler secret put`.

Khi đổi sang Sheet khác: deploy lại Apps Script mới, rồi chạy `npx wrangler secret put GOOGLE_SHEET_URL`.

## API

`POST /lead` (hoặc `POST /`), `Content-Type: application/json`. Các trường: `name`*, `phone`*, `email`, `form_type`, `page_url`, `source_url`, `referrer`, `utm_*`, `gclid`, `fbclid`, `ttclid`, `submitted_at`, cùng honeypot `website` (phải để trống). Xem danh sách đầy đủ trong `src/lead.js`.

| Mã | Ý nghĩa |
|---|---|
| 200 `{success:true}` | Đã ghi Sheet, hoặc SĐT trùng trong 2 phút nên không ghi lại |
| 400 | Thiếu tên, SĐT sai, JSON lỗi. Trường `error` là câu tiếng Việt, hiển thị được cho khách |
| 403 | Origin không nằm trong `ALLOWED_ORIGINS` |
| 413 / 429 | Dữ liệu quá lớn / gửi quá nhiều lần trong 1 phút |
| 500 / 502 | Chưa đặt `GOOGLE_SHEET_URL` / Apps Script lỗi sau 2 lần thử |

`GET /health`: trạng thái cấu hình, không lộ secret.

## Lệnh

```bash
npm test          # 11 test (node:test)
npm run dev       # chạy thử ở máy (cần file .dev.vars, xem .dev.vars.example)
npm run tail      # xem log realtime của Worker đang chạy
```
