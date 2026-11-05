# QTOPIA — landing page

React 19 + Vite + Tailwind v4, prerender HTML tĩnh cho từng route (SEO, Open Graph, Zalo/Facebook đọc được không cần JS).

```bash
npm run dev            # chạy dev
npm run build          # lấy nội dung CMS (nếu cấu hình) + build client + SSR + prerender (dist/), sitemap, cms-schema.json
npm run build:release  # (VPS) build vào releases/<id>, seo-check, đổi symlink current — xem deploy/DEPLOY.md
npm run seo:check  # kiểm tra dist/ theo checklist SEO v2 (H1, title/description, OG, alt, JSON-LD, sitemap, robots, 404)
npm run serve      # phục vụ dist/ giống hosting thật (thư mục tĩnh + 404 đúng mã) tại :4180
```

## Trước khi phát hành (còn là placeholder)

| Mục | Ở đâu | Ghi chú |
|---|---|---|
| Tên miền | `.env.production` → `VITE_SITE_URL` | `https://qtopia.rever.io.vn` (domain phụ trên Cloudflare, chuyển sang domain chính thức khi có) |
| Hotline, Zalo, địa chỉ, email | `src/data/project.js` → `siteMeta` | Giá trị placeholder tự bị loại khỏi JSON-LD và footer (`src/lib/filled.js`) |
| Endpoint lead | `VITE_LEAD_ENDPOINT` | Chưa có thì form báo lỗi demo (không giả thành công) |
| GTM / GA4 | `VITE_GTM_ID` | Thêm trigger History Change nếu muốn dùng `page_view` của GTM thay cho event `page_view` thủ công |
| Địa chỉ hành chính | `siteMeta.address` | Đối chiếu đơn vị hành chính hiện hành (đã sáp nhập 2025) trước khi điền |
| Tin tức | `newsItems` | Đang là bản mẫu minh hoạ |
| Bản đồ vị trí | `locationContent.mapImage` | Đang để `null` → trang hiện khung trống |
| Ảnh mặt bằng tiện ích tổng thể | `masterPlan.image` | Để `null` → sơ đồ minh hoạ. Có ảnh thật thì gán đường dẫn rồi chỉnh lại `points` / `markers` (toạ độ % khung ảnh) |
| Ảnh mặt bằng tầng điển hình | `floorPlans['q5-q6'].image`, `floorPlans.q7.image` | Để `null` → khung trống. Có ảnh thật thì gán đường dẫn, điền `imageWidth`/`imageHeight` đúng tỉ lệ ảnh rồi vẽ lại `points` từng căn theo viewBox 100 × 60 |

### Ảnh đang dùng

Chỉ dùng ảnh gốc Chủ đầu tư giao: `public/images/renders` (thư mục "PC dự án"), `public/images/layouts`
(mặt bằng từng loại căn) và `public/images/brand` (logo). Mọi ảnh từng cắt ra từ brochure PDF đã được gỡ;
chỗ nào chưa có ảnh thật thì component `MediaFrame` giữ nguyên khung và hiện placeholder, nên khi thay ảnh
vào bố cục không đổi.

## Trang chính (sitelinks) và CMS

- 5 trang chính muốn Google hiện dạng snippet con: `/tong-quan`, `/vi-tri`, `/tien-ich`, `/chinh-sach-ban-hang`, `/tien-ich-xung-quanh` (khai báo ở `sitelinkPaths`, `src/seo/site-meta.js`; trang chủ có JSON-LD `ItemList` các trang này). Ngoài ra có `/mat-bang`.
- Bài tin còn chữ mẫu → tự `noindex` và không vào sitemap; sửa bài trên CMS là tự được index.
- Nội dung sửa được trên CMS: mọi object trong `src/data/project.js` / `news.js` đã `registerCms(...)`; SEO từng trang trong `site-meta.js`. Schema cho CMS sinh tự động ra `dist/cms-schema.json` (`src/cms/schema.js`).
- Hosting VPS + CMS Vercel: `deploy/DEPLOY.md`.

## Một nguồn dữ liệu

- Nội dung dự án: `src/data/project.js`
- Title / description / H1 / OG / menu theo trang (bảng snippet): `src/seo/site-meta.js` — title ≤ 60, description 150–160 ký tự (`seo:check` đo lại)
- Thêm trang con: thêm vào `pages` + `topicPaths` (site-meta) và `BODY` (`src/pages/Topic.jsx`)

## Đo lường (GA4 qua GTM, không gửi PII)

Sự kiện: `page_view` · `generate_lead` (`form_location`) · `click_call` · `click_zalo` · `click_cta` (`cta_name`, `cta_location`, `cta_target`) · `scroll_depth` (25/50/75/90) · `section_view` · `view_floorplan`.
UTM đầu tiên của khách lưu ở localStorage và gửi kèm lead. Quy ước UTM: viết thường, không dấu; `utm_campaign` = tên chiến dịch + tháng (vd `qtopia_2026-11`); không gắn UTM vào link nội bộ.

## CTA map

| CTA | Vị trí | Đích | Event |
|---|---|---|---|
| Nhận bảng giá | Hero | Popup tư vấn | `click_cta` `hero_register` |
| Tư vấn | Header | Popup tư vấn | `click_cta` `header_consult` |
| Khám phá · Gọi · Zalo · Bảng giá | Thanh sticky mobile | Sheet lối tắt / `tel:` / Zalo / popup | `click_cta` · `click_call` · `click_zalo` · `sticky_price` |
| Vị trí · Tiện ích · Mặt bằng · Đăng ký | Cột icon trái (desktop) | `/#vi-tri` … `/#lien-he` | `click_cta` `value_nav_*` |
| Gọi · Zalo · Bảng giá · Lên đầu trang | Cụm nút nổi (desktop) | `tel:` / Zalo / popup / đầu trang | `click_call` · `click_zalo` · `floating_price` · `back_to_top` |
| Xem … chi tiết (vị trí, tiện ích, mặt bằng) | Cuối từng section | `/vi-tri` · `/tien-ich` · `/mat-bang` | `click_cta` `*_detail` |
| Nhận báo giá căn X | Panel mặt bằng căn hộ | Popup tư vấn | `view_floorplan` khi chọn căn |

## Ghi chú kỹ thuật

- Mỗi section gói gọn trong một khung hình thiết bị: class `.section-screen` (`min-height` chứ không phải
  `height`, có chừa chỗ cho thanh CTA cố định ở đáy trên điện thoại) — màn rất thấp vẫn giãn ra được thay vì cắt nội dung.
- Tiêu đề section là chữ nhỏ màu xanh lá (`.section-label`), vẫn là `<h2>` chứa từ khoá cho SEO.
- Hiệu ứng: CTA có vệt sáng quét + quầng sáng khi hover (`.btn-primary`, `.cta-fx`); số liệu đếm tăng dần
  (`CountUp`, giá trị cuối luôn nằm trong DOM cho bot); ảnh hiện dần khi tải xong (`Img` + `html.js-ready`).
- Trang cuộn tự nhiên trên mọi thiết bị; các nút điều hướng vẫn lướt tới section tương ứng.
- Hiệu ứng xuất hiện dùng `data-reveal` (không dùng class) để không bị React ghi đè; thời lượng/easing ở biến CSS `--dur-*`, `--ease-out`.
- Tên file ảnh viết thường, không dấu (Linux/Vercel phân biệt hoa-thường). Kích thước ảnh tra từ `src/data/image-sizes.json`.
