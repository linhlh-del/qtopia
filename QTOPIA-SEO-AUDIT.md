# Đối chiếu `qtopia-landing` với checklist SEO landing page BĐS

**Bảng tick 77 tiêu chí:** [QTOPIA-SEO-LANDING-CHECKLIST.md](QTOPIA-SEO-LANDING-CHECKLIST.md) — 11 đạt, 50 chưa đạt (gồm các mục làm một phần), 14 cần xác minh, 2 không áp dụng.

Ngày rà soát: 04/11/2026. Đối chiếu từ source hiện có, `dist/` hiện có và lệnh kiểm tra local. Đây là site **QTOPIA**, không có dữ liệu hay code ATOPIA trong thư mục. Trạng thái: **Đạt** = xác minh được trong code/HTML; **Một phần** = đã có cơ chế nhưng thiếu dữ liệu hoặc chưa test thực tế; **Chưa đạt** = có bằng chứng thiếu/sai; **Chưa xác minh** = cần quyền tài khoản, site đã deploy hoặc thiết bị thật.

**Cập nhật nguồn 04/11/2026:** Người dùng cung cấp [website công bố pháp lý Q'TOPIA](https://phaply.qtopia.vn/). Thông tin dưới đây đối chiếu trực tiếp với nội dung công khai trên trang đó. Đây là nguồn cho thông tin pháp lý, chưa xác nhận `phaply.qtopia.vn` hay `qtopia.vn` là domain cần dùng cho canonical của landing page.

> Không lấy `README.md` làm bằng chứng duy nhất: một số ghi chú đã cũ so với `src/data/project.js` (ví dụ ảnh bản đồ và ảnh mặt bằng tiện ích hiện đã gán đường dẫn). Repo con có thay đổi sẵn trong `index.html`, `src/data/project.js`, `src/sections/Location.jsx`, `src/seo/site-meta.js`; báo cáo đọc trạng thái hiện tại, không sửa các file đó.

## Kết quả theo nhóm

| Mục checklist | Trạng thái | Bằng chứng và phần còn thiếu |
|---|---|---|
| 0. Mục tiêu | Chưa xác minh | Chưa có kết quả Lighthouse, PageSpeed, CrUX, Search Console hay GA4 để xác nhận ngưỡng. |
| 1. Head và metadata | Một phần | `index.html`, `src/seo/head.js`, `src/seo/site-meta.js` có charset, viewport, robots, canonical, OG, Twitter và metadata theo route. Domain là `qtopia-tau.vercel.app`, cần chốt domain chính thức. Bản build hiện tại chưa kiểm tra được toàn bộ route từ source mới. |
| 2. HTML và Local SEO | Một phần | `Layout.jsx` có semantic header/main/footer và skip link; H1 từng trang nằm trong Hero/Topic/News. `siteMeta.address` còn rỗng, dù trang pháp lý đã công bố thửa đất 08, tờ bản đồ 38, xã Phước Hải, TP.HCM. Câu về thời gian di chuyển 75 phút ở trang chủ/Facts và 90 phút ở trang vị trí/FAQ chưa nhất quán. Chưa đối chiếu Google Business Profile. |
| 3. UI/UX và tốc độ | Một phần | Có CSS variables, giao diện responsive, `Img.jsx` có lazy mặc định, kích thước từ `image-sizes.json`, `fetchPriority` cho ảnh ưu tiên. Chưa đo LCP/INP/CLS hoặc kiểm tra thiết bị thật. Một số section bị cố định `height`/`max-height` bằng viewport; cần kiểm tra nguy cơ cắt nội dung trên màn thấp. |
| 4. Chuyển đổi | Một phần | `LeadFormFields.jsx` có tên, điện thoại, validate, label và chỉ báo thành công sau response. `ValueNav.jsx` có sticky bar; `FloatingButtons.jsx` có Gọi/Zalo. `.env.production` chưa có `VITE_LEAD_ENDPOINT`, vì vậy form chưa gửi lead thật. Không thấy công cụ tính vay; không bắt buộc nếu không phù hợp sản phẩm. |
| 5. Site và nội dung | Một phần | Có trang chủ, `/vi-tri`, `/tien-ich`, `/mat-bang`, `/tin-tuc`, 10 route bài tin; có prerender/sitemap/robots trong `scripts/prerender.mjs`. Chưa có `/bang-gia` do chưa có dữ liệu giá. `src/data/news.js` vẫn là 10 bài mẫu lorem ipsum và đang được đưa vào danh sách route/sitemap: cần thay nội dung thật hoặc noindex/bỏ khỏi sitemap trước publish. Thông tin quy mô/loại hình trong landing page cần đối chiếu với trang pháp lý theo đúng phạm vi. |
| 6. Quy tắc code | Đạt ở mức cấu trúc | React/Vite/Tailwind được giữ nguyên; component, dữ liệu, SEO và analytics tách file; có build/prerender, lint, `seo:check`. Có inline script gtag trong `index.html`, nên tiêu chí “không JS inline” chưa đạt nếu áp dụng nghiêm. |
| 7. Trước publish | Chưa đạt | `npm run seo:check` trên `dist/` hiện có trả **12 lỗi**; bản `dist` này cũ (trang chủ không có H1/JSON-LD, thiếu `404.html`, thiếu `apple-touch-icon.png`). `npm run build` bị `EPERM` khi Vite dọn `dist/assets`, nên chưa tạo được bản build mới để kết luận source mới đạt hay lỗi. OG preview, Lighthouse và test form/CTA trên điện thoại chưa xác minh. |
| 8. Search Console | Một phần | `index.html` có `google-site-verification`, nhưng không thể suy ra property đã xác minh hay sitemap đã nộp. Chưa kiểm tra index, Pages, Core Web Vitals và liên kết GA4. |
| 9. GTM/GA4/UTM | Một phần | `src/lib/analytics.js` có `page_view`, `generate_lead`, `click_call`, `click_zalo`, `click_cta`, `scroll_depth`, `section_view`; `view_floorplan` được gọi trong mặt bằng. `utm.js` giữ first-touch, `lead.js` gửi theo lead. `.env.production` không đặt `VITE_GTM_ID`, nhưng `index.html` đã gắn trực tiếp gtag `G-6LEMBK6FTP`; cần kiểm tra cấu hình thực, tránh `page_view` trùng khi điều hướng SPA và xác nhận event đến GA4. Chưa thấy `loan_calculator_use` vì chưa có calculator. |
| 10. Snippet và schema | Một phần | `site-meta.js` là bảng metadata, `structured-data.js` tạo WebSite, Organization, ApartmentComplex, WebPage, BreadcrumbList, FAQPage; OG riêng cho 3 trang chủ đề. Bài tin mẫu tạo description bằng lorem ipsum; ảnh OG cho bài tin dùng chung. Trang pháp lý gọi sản phẩm là “căn hộ du lịch”; cần rà lại tính phù hợp của `ApartmentComplex` và mô tả sản phẩm trước khi công bố schema. Chưa chạy Rich Results Test/Schema Validator hoặc kiểm tra snippet Google. |
| 11. Hiệu ứng và cuộn | Một phần | `src/index.css` có `--dur-*`, easing, stagger, reduced motion; section dùng `svh`, anchor cuộn mượt và offset header. Site **cuộn tự nhiên**, không có `scroll-snap-type: y` cho toàn trang, nên yêu cầu “mỗi lần cuộn đúng một section” chưa đạt nếu giữ nguyên yêu cầu mẫu. Có pulse nút nổi lặp vô hạn 2,4 s, chưa đúng gợi ý nhẹ/không gây xao nhãng. |
| 12. CTA | Một phần | Floating icon 48 px, aria-label/title, back-to-top và sticky bar đã có; header có nút tư vấn; `README.md` có CTA map. Hero hiện chỉ có một CTA mở popup, chưa có 3 thẻ CTA điều hướng tới các giá trị chính như mẫu. Không có section bảng giá nên CTA quay về từ bảng giá chưa áp dụng. Chưa đo tương phản/kiểm tra che khuất trên thiết bị thật. |
| 13. Kỹ thuật và vận hành | Một phần | Có favicon/manifest/theme-color, cache asset hash trong `vercel.json`, robots/sitemap và cơ chế 404. Chưa xác nhận HTTP 404 trên hosting, HTTPS/redirect, nén, tốc độ, a11y bằng bàn phím và trình duyệt/thiết bị thật. |

## Đối chiếu mới với website pháp lý

| Chủ đề | Trang pháp lý công bố | `qtopia-landing` hiện tại | Kết luận |
|---|---|---|---|
| Chủ đầu tư | Công ty Cổ phần Đầu tư Serenity | `siteMeta.developer = "Phát Đạt Corporation"`; phần pháp lý trong source cũng nhắc Serenity | Cần phân biệt vai trò pháp nhân chủ đầu tư và đơn vị phát triển/tiếp thị; không thay thế một tên bằng tên kia khi chưa chốt vai trò. |
| Địa chỉ | Thửa đất 08 (cũ 30), tờ bản đồ 38 (cũ 19), xã Phước Hải, TP.HCM | `siteMeta.address` rỗng; nội dung pháp lý dùng địa danh cũ kèm tên mới | Có nguồn để điền địa chỉ chính xác, cần thống nhất cách hiển thị trong footer/schema/landing page. |
| Diện tích | 55.569,8 m² | Facts ghi 7,5 ha; phần pháp lý trong source nêu khu đất 73.842 m² | Chưa thể kết luận sai vì có thể khác phạm vi đất/giai đoạn. Cần tài liệu giải thích quan hệ giữa các số liệu trước khi công bố như một “quy mô dự án”. |
| Số tháp/loại hình | 5 tháp **căn hộ du lịch** S4–S8, 2.927 căn | Facts ghi 9 tháp; nội dung mặt bằng dùng Q5–Q7; schema là `ApartmentComplex` | Có khả năng đang mô tả các phạm vi/giai đoạn khác nhau. Cần đối chiếu tài liệu thương mại và pháp lý, ghi rõ phạm vi từng số liệu. |
| Xây dựng | Trang công bố văn bản miễn giấy phép xây dựng số 34147/SXD-QLXDCT ngày 23/09/2026 và thông báo khởi công 29/10/2026 | Accordion pháp lý ghi “Giấy phép xây dựng & điều kiện mở bán — Đang cập nhật” | Mục về tình trạng giấy phép/miễn giấy phép đã có thông tin mới; điều kiện kinh doanh/mở bán vẫn cần kiểm tra riêng, không suy ra từ văn bản miễn giấy phép. |
| Quyền sử dụng đất | Trang công bố giấy chứng nhận CU764720 và thông tin dự án đang thế chấp tại MB Bank Chi nhánh Sài Gòn | Accordion pháp lý chỉ nêu đấu giá, quy hoạch, đăng ký đầu tư, mục “đang cập nhật” | Cần rà lại nội dung pháp lý trình bày công khai, có thể liên kết thẳng đến nguồn; không bỏ qua tình trạng thế chấp khi giới thiệu pháp lý. |

Nguồn: [website công bố pháp lý Q'TOPIA](https://phaply.qtopia.vn/), xem mục I–III và cuối trang. Không suy ra tình trạng đủ điều kiện mở bán từ các văn bản được liệt kê.

## Các mục đã có bằng chứng rõ trong code

- Metadata theo route, canonical/OG/JSON-LD được thiết kế từ một nguồn (`src/seo/site-meta.js`, `src/seo/head.js`, `src/seo/structured-data.js`).
- Cấu trúc semantic, skip link và H1 riêng trong các component (`src/layout/Layout.jsx`, `src/sections/Hero.jsx`, `src/pages/Topic.jsx`).
- Ảnh qua `Img.jsx` có alt, lazy/priority, `fetchPriority` và kích thước khi có trong bảng ảnh.
- Form tên + số điện thoại, validate số Việt Nam, lỗi có label/aria và event lead chỉ sau response thành công.
- Sticky bar mobile, CTA nổi desktop, nút lên đầu trang, điều hướng anchor, tracking click.
- Lưu UTM first-touch và gắn vào payload lead.
- Có route tin tức, prerender, sitemap, robots và lệnh SEO check (cần build sạch để xác nhận đầu ra mới).
- Có CSS variables cho motion và hỗ trợ `prefers-reduced-motion`.

## Việc cần xử lý trước publish, theo ưu tiên

1. **P0 — Pháp lý, lead và nội dung thật:** đối chiếu vai trò Serenity/Phát Đạt, địa chỉ, phạm vi diện tích và số tháp, loại hình căn hộ du lịch; cập nhật mục miễn giấy phép xây dựng và rà soát thông tin thế chấp theo nguồn pháp lý. Cấu hình `VITE_LEAD_ENDPOINT`, gửi lead thử; thay 10 bài mẫu hoặc ngăn index/sitemap các bài đó; chốt số liệu 75/90 phút.
2. **P0 — Build/SEO:** xử lý quyền truy cập `dist/assets`, build lại rồi chạy `npm run seo:check`; chỉ đánh dấu đạt khi 0 lỗi trên build mới. Chốt hostname chính thức trong `.env.production` và metadata fallback ở `index.html`.
3. **P1 — Analytics:** xác nhận mô hình gtag trực tiếp hay GTM, test `page_view` SPA và events trong GA4 DebugView; tránh trùng page view, xác nhận key events và UTM trong lead.
4. **P1 — SEO nội dung:** thay snippet lorem ipsum, xác minh nội dung với tài liệu dự án, kiểm tra schema và OG preview.
5. **P1 — UX thực tế:** kiểm tra section màn thấp, CTA không che form, keyboard/focus, thiết bị thật; đo Lighthouse và Core Web Vitals.
6. **P2 — Theo yêu cầu thiết kế mẫu:** nếu thực sự muốn cuộn từng section và 3 thẻ hero CTA, cần thiết kế/triển khai thêm; hiện site không có hai phần này.

## Lệnh đã chạy và giới hạn

```text
npm run seo:check  → exit 1; 12 lỗi, 0 cảnh báo trên dist/ hiện có
npm run build      → exit 1; EPERM khi Vite xóa dist/assets
```

Vì build chưa thành công, không suy diễn 12 lỗi của `dist/` là lỗi của source hiện tại. Không có dữ liệu tài khoản Google hay kết quả đo trên site thật, nên các mục Search Console/GA4/Lighthouse vẫn để **chưa xác minh**.
