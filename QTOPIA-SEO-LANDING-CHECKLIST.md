# Checklist landing page bất động sản QTOPIA

Phỏng theo checklist `seo-landing-page-bds` do người dùng cung cấp. Đây là bộ tiêu chí cho QTOPIA, áp dụng cho mã nguồn trong thư mục này. Trạng thái thực tế và bằng chứng nằm ở [QTOPIA-SEO-AUDIT.md](QTOPIA-SEO-AUDIT.md). Tên miền, địa chỉ, giá, pháp lý và nội dung thương mại vẫn cần đối chiếu nguồn chính thức trước khi xuất bản.

**Nguồn pháp lý dự án để đối chiếu:** [phaply.qtopia.vn](https://phaply.qtopia.vn/), do người dùng cung cấp ngày 04/11/2026. Trang này là nguồn công khai thông tin pháp lý; không tự coi đây là hostname chính thức của landing page bán hàng. Cần xác định rõ số liệu trên trang pháp lý áp dụng cho toàn bộ QTOPIA hay riêng 5 tháp căn hộ du lịch được nêu tại đó.

**Cách tick:** Mỗi dòng chỉ tick một cột. **Đạt** = đã kiểm chứng trong source; **Chưa đạt** = thiếu hoặc mới làm một phần; **Cần xác minh** = cần tài khoản, site live hoặc thiết bị thật. Hai tiêu chí có điều kiện 4.5 và 12.6 được ghi **không áp dụng**, vì site chưa có công cụ tính vay/giá hoặc section bảng giá. Xem bằng chứng và giới hạn ở [QTOPIA-SEO-AUDIT.md](QTOPIA-SEO-AUDIT.md).

**Cập nhật 06/11/2026:** các tiêu chí 1.3–1.7, 2.1, 2.5, 3.3, 5.2–5.6, 10.1–10.4 và 13.3 đã chuyển sang Đạt, sau khi `npm run build && npm run seo:check` chạy với 0 lỗi trên 7 URL được index.

Các thay đổi chính trong đợt này:

- 5 trang chính cho sitelinks, có JSON-LD `ItemList`/`SiteNavigationElement`.
- Bài tin mẫu được gắn `noindex` và loại khỏi sitemap.
- Sitemap có thêm `changefreq` và `priority`.
- Địa chỉ dự án lấy theo phaply.qtopia.vn.
- Có header bảo mật và cấu hình nginx với 404 thật, gzip, HTTPS.
- Lead nhận qua CMS khi đã cấu hình endpoint. Mục 4.2 (gửi lead thử end-to-end) vẫn phải test sau khi đặt `VITE_LEAD_ENDPOINT`.

Các mục 13.2 và 7.5 cần kiểm tra lại sau khi gắn domain trên VPS.

## 0. Mục tiêu và cách đo

| Mục tiêu               | Ngưỡng tham khảo                            | Cách đo                                   |
| ---------------------- | ------------------------------------------- | ----------------------------------------- |
| Lighthouse SEO         | ≥ 95, tối thiểu 90                          | Mobile và desktop, từng route             |
| Lighthouse Performance | ≥ 90 mobile                                 | Lighthouse/PageSpeed Insights             |
| Core Web Vitals        | LCP < 2,5 s; INP < 200 ms; CLS < 0,1        | Dữ liệu thực tế trong Search Console/CrUX |
| Index                  | Tất cả URL chính hợp lệ được index          | Search Console > Pages và URL Inspection  |
| Lead                   | Đo được lead theo nguồn, UTM và vị trí form | GTM, GA4, hệ nhận lead                    |

Điểm Lighthouse là kiểm tra kỹ thuật, không bảo đảm thứ hạng tìm kiếm.

## 1. Head và metadata

| Đạt | Chưa đạt | Cần xác minh | ID  | Tiêu chí                                                                                                      |
| :-: | :------: | :----------: | --- | ------------------------------------------------------------------------------------------------------------- |
| [x] |   [ ]    |     [ ]      | 1.1 | `lang="vi"`, `charset="UTF-8"`, viewport, `robots` phù hợp từng route.                                        |
| [ ] |   [x]    |     [ ]      | 1.2 | Domain chính thức QTOPIA được cấu hình nhất quán trong canonical, OG URL, sitemap, robots và schema.          |
| [x] |   [ ]    |     [ ]      | 1.3 | Mỗi route có title riêng, ưu tiên từ khóa ở đầu, mục tiêu ≤ 60 ký tự.                                         |
| [x] |   [ ]    |     [ ]      | 1.4 | Mỗi route có description riêng, đúng nội dung, mục tiêu 150–160 ký tự; có thông tin cụ thể và CTA tự nhiên.   |
| [ ] |   [x]    |     [ ]      | 1.5 | Open Graph đủ `og:type`, `og:title`, `og:description`, `og:image` 1200×630, `og:url`; kiểm tra Facebook/Zalo. |
| [x] |   [ ]    |     [ ]      | 1.6 | Canonical tự trỏ cho trang indexable; trang 404 noindex và không vào sitemap.                                 |
| [x] |   [ ]    |     [ ]      | 1.7 | Đếm độ dài title/description từ HTML build, không chỉ từ config.                                              |

## 2. Nội dung, HTML và Local SEO

| Đạt | Chưa đạt | Cần xác minh | ID  | Tiêu chí                                                                                                                                              |
| :-: | :------: | :----------: | --- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| [x] |   [ ]    |     [ ]      | 2.1 | Mỗi route đúng một H1; H2/H3 theo thứ bậc; slogan để trong đoạn văn nếu không mô tả chủ đề.                                                           |
| [x] |   [ ]    |     [ ]      | 2.2 | Dùng `header`, `nav`, `main`, `section`, `footer`; có liên kết bỏ qua menu cho bàn phím.                                                              |
| [ ] |   [x]    |     [ ]      | 2.3 | Ảnh nội dung có alt mô tả đúng ảnh; ảnh trang trí dùng alt rỗng đúng cách.                                                                            |
| [ ] |   [x]    |     [ ]      | 2.4 | Tên dự án, chủ đầu tư, vị trí và số liệu nhất quán giữa nội dung, metadata, schema, form và footer.                                                   |
| [x] |   [ ]    |     [ ]      | 2.5 | Xác minh địa chỉ QTOPIA, đơn vị hành chính hiện hành và tên địa danh cũ bằng nguồn chính thức; đối chiếu Google Business Profile nếu có.              |
| [ ] |   [x]    |     [ ]      | 2.6 | Những thông tin giá, pháp lý, tiến độ và cam kết đầu tư chỉ xuất bản khi có tài liệu xác thực.                                                        |
| [ ] |   [x]    |     [ ]      | 2.7 | Đối chiếu từng số liệu và tên pháp nhân với [trang công bố pháp lý](https://phaply.qtopia.vn/), ghi rõ phạm vi dự án/giai đoạn nếu số liệu khác nhau. |
| [ ] |   [x]    |     [ ]      | 2.8 | Kiểm tra loại hình sản phẩm trong nội dung và schema: trang pháp lý dùng “căn hộ du lịch”; không tự diễn đạt thành căn hộ ở nếu hồ sơ không hỗ trợ.   |

## 3. Giao diện, ảnh và tải trang

| Đạt | Chưa đạt | Cần xác minh | ID  | Tiêu chí                                                                                                      |
| :-: | :------: | :----------: | --- | ------------------------------------------------------------------------------------------------------------- |
| [ ] |   [x]    |     [ ]      | 3.1 | Màu, font, thời lượng hiệu ứng gom trong CSS variables; giao diện mobile trước, lưới co giãn tốt.             |
| [ ] |   [x]    |     [ ]      | 3.2 | Chữ thân dễ đọc (`line-height` khoảng 1,6–1,8); khoảng trắng đủ thoáng; CTA đạt vùng chạm tối thiểu 48×48 px. |
| [x] |   [ ]    |     [ ]      | 3.3 | Ảnh được nén và dùng WebP/AVIF khi phù hợp; có `width`/`height` hoặc aspect ratio.                            |
| [x] |   [ ]    |     [ ]      | 3.4 | Ảnh hero được ưu tiên (`fetchpriority="high"`, không lazy); ảnh dưới màn đầu lazy.                            |
| [x] |   [ ]    |     [ ]      | 3.5 | Không tải iframe, PDF, bảng giá hoặc mặt bằng nặng trước khi cần.                                             |
| [ ] |   [x]    |     [ ]      | 3.6 | CSS/JS build thành file riêng, chia bundle theo route nếu có lợi và loại bỏ thư viện không dùng.              |

## 4. Chuyển đổi và tương tác

| Đạt | Chưa đạt | Cần xác minh | ID  | Tiêu chí                                                                                                                         |
| :-: | :------: | :----------: | --- | -------------------------------------------------------------------------------------------------------------------------------- |
| [x] |   [ ]    |     [ ]      | 4.1 | Form ngắn gồm họ tên, số điện thoại và nút gửi; có label, báo lỗi rõ và validate số Việt Nam.                                    |
| [ ] |   [ ]    |     [x]      | 4.2 | Form chỉ báo thành công sau khi hệ nhận lead xác nhận; kiểm tra lead thật end to end.                                            |
| [x] |   [ ]    |     [ ]      | 4.3 | Mobile có CTA cố định phù hợp: khám phá giá trị chính, gọi, Zalo, nhận thông tin/bảng giá.                                       |
| [x] |   [ ]    |     [ ]      | 4.4 | Có đường tới vị trí, tiện ích, mặt bằng, giá hoặc tư vấn, tùy dữ liệu QTOPIA thật.                                               |
| N/A |   N/A    |     N/A      | 4.5 | Nếu có công cụ tính vay/giá, kết quả và điều kiện tính minh bạch, không trình bày như giá chào bán chính thức khi chưa xác minh. |

## 5. Cấu trúc site và nội dung

| Đạt | Chưa đạt | Cần xác minh | ID  | Tiêu chí                                                                                                                                                            |
| :-: | :------: | :----------: | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ ] |   [x]    |     [ ]      | 5.1 | Trang chủ giới thiệu tổng quan QTOPIA; các route con chỉ tạo khi có nội dung thật (ví dụ `/vi-tri`, `/tien-ich`, `/mat-bang`, `/bang-gia`, `/tin-tuc`, `/tien-do`). |
| [x] |   [ ]    |     [ ]      | 5.2 | Mỗi route có title, description, H1, canonical và OG riêng.                                                                                                         |
| [x] |   [ ]    |     [ ]      | 5.3 | Tin tức chỉ index khi là bài thật; bài mẫu/lorem ipsum không đưa vào sitemap.                                                                                       |
| [x] |   [ ]    |     [ ]      | 5.4 | Internal link dùng văn bản mô tả trang đích; không lạm dụng liên kết ra ngoài.                                                                                      |
| [x] |   [ ]    |     [ ]      | 5.5 | `sitemap.xml` chỉ chứa URL 200 chính thức, có `lastmod`; `robots.txt` khai báo Sitemap và cho phép tải CSS/JS/ảnh.                                                  |
| [x] |   [ ]    |     [ ]      | 5.6 | Có trang 404 trả HTTP 404 thật.                                                                                                                                     |

## 6. Quy tắc code

| Đạt | Chưa đạt | Cần xác minh | ID  | Tiêu chí                                                                                              |
| :-: | :------: | :----------: | --- | ----------------------------------------------------------------------------------------------------- |
| [x] |   [ ]    |     [ ]      | 6.1 | Giữ kiến trúc framework hiện có, tách component/dữ liệu/SEO/đo lường rõ ràng.                         |
| [ ] |   [x]    |     [ ]      | 6.2 | Prerender hoặc SSR nội dung và metadata cho mọi route indexable; bot đọc được khi chưa chạy JS.       |
| [ ] |   [x]    |     [ ]      | 6.3 | Không nhúng script hoặc style tĩnh không cần thiết vào HTML; giá trị động chỉ dùng inline khi hợp lý. |
| [x] |   [ ]    |     [ ]      | 6.4 | Có lệnh build, lint và kiểm tra SEO build được ghi trong README.                                      |

## 7. Kiểm tra trước publish

| Đạt | Chưa đạt | Cần xác minh | ID  | Tiêu chí                                                                                                             |
| :-: | :------: | :----------: | --- | -------------------------------------------------------------------------------------------------------------------- |
| [ ] |   [x]    |     [ ]      | 7.1 | Build sạch; kiểm tra HTML build của từng route: H1, title, description, alt, kích thước ảnh, canonical, OG, JSON-LD. |
| [ ] |   [x]    |     [ ]      | 7.2 | Kiểm tra nội dung và số liệu dự án khớp tài liệu chủ đầu tư.                                                         |
| [ ] |   [ ]    |     [x]      | 7.3 | Chạy Lighthouse/PageSpeed trên mobile và desktop; ghi kết quả theo URL và thời điểm.                                 |
| [ ] |   [ ]    |     [x]      | 7.4 | Kiểm tra OG preview trên Facebook/Zalo và các CTA/form trên điện thoại thật.                                         |
| [ ] |   [ ]    |     [x]      | 7.5 | Kiểm tra canonical, sitemap, robots sau khi gắn domain chính thức.                                                   |

## 8. Google Search Console

| Đạt | Chưa đạt | Cần xác minh | ID  | Tiêu chí                                                                                           |
| :-: | :------: | :----------: | --- | -------------------------------------------------------------------------------------------------- |
| [ ] |   [ ]    |     [x]      | 8.1 | Chốt domain QTOPIA, tạo property Domain và xác minh DNS; dùng URL prefix nếu chưa có domain riêng. |
| [ ] |   [ ]    |     [x]      | 8.2 | Gửi sitemap, xác nhận trạng thái thành công; yêu cầu index các route chính.                        |
| [ ] |   [ ]    |     [x]      | 8.3 | Kiểm tra Pages, URL Inspection, Core Web Vitals và các URL excluded ngoài ý muốn.                  |
| [ ] |   [ ]    |     [x]      | 8.4 | Liên kết Search Console với GA4 và xem truy vấn, impressions, clicks, CTR hàng tuần.               |

## 9. GTM, GA4, events và UTM

| Đạt | Chưa đạt | Cần xác minh | ID  | Tiêu chí                                                                                                                             |
| :-: | :------: | :----------: | --- | ------------------------------------------------------------------------------------------------------------------------------------ |
| [ ] |   [x]    |     [ ]      | 9.1 | Cấu hình GTM và GA4 thực, test GTM Preview/GA4 DebugView; SPA gửi `page_view` đúng một lần mỗi route.                                |
| [ ] |   [x]    |     [ ]      | 9.2 | Đo `generate_lead` chỉ sau gửi form thành công, có `form_location` và không gửi tên/số điện thoại vào analytics.                     |
| [ ] |   [x]    |     [ ]      | 9.3 | Đo `click_call`, `click_zalo`, `click_cta` (`cta_name`, `cta_location`, `cta_target`), `scroll_depth` 25/50/75/90 và `section_view`. |
| [ ] |   [x]    |     [ ]      | 9.4 | Nếu có công cụ liên quan: đo `loan_calculator_use`, `view_floorplan`.                                                                |
| [ ] |   [ ]    |     [x]      | 9.5 | Đánh dấu các event chuyển đổi phù hợp là Key events trong GA4.                                                                       |
| [ ] |   [x]    |     [ ]      | 9.6 | Quy ước UTM viết thường, không dấu; gắn ở chiến dịch bên ngoài, không gắn internal link.                                             |
| [ ] |   [x]    |     [ ]      | 9.7 | Lưu first-touch UTM và gửi kèm lead; đối chiếu nguồn lead với báo cáo GA4.                                                           |
| [ ] |   [ ]    |     [x]      | 9.8 | Rà soát yêu cầu consent/cookie theo thị trường và cách triển khai thực tế.                                                           |

## 10. SEO snippets và schema

| Đạt | Chưa đạt | Cần xác minh | ID   | Tiêu chí                                                                                                                    |
| :-: | :------: | :----------: | ---- | --------------------------------------------------------------------------------------------------------------------------- |
| [x] |   [ ]    |     [ ]      | 10.1 | Lập bảng cho từng URL: URL \| từ khóa \| title \| description \| H1 \| OG image.                                            |
| [x] |   [ ]    |     [ ]      | 10.2 | Dưới H1/H2 có đoạn giải thích rõ, tự nhiên; section chính có ID ổn định và đoạn trả lời ngắn cho câu hỏi người tìm kiếm.    |
| [x] |   [ ]    |     [ ]      | 10.3 | Menu và internal link có mô tả/anchor text rõ; không dùng một loạt nhãn “Xem thêm”.                                         |
| [x] |   [ ]    |     [ ]      | 10.4 | JSON-LD khớp nội dung hiển thị: `WebSite`, `Organization`, loại dự án phù hợp, `BreadcrumbList`, `FAQPage` khi có FAQ thật. |
| [ ] |   [x]    |     [ ]      | 10.5 | Không điền địa chỉ/hotline/schema thương mại bằng dữ liệu mẫu; chạy Rich Results Test và Schema Markup Validator.           |
| [ ] |   [ ]    |     [x]      | 10.6 | OG image riêng cho các trang chính; sau index kiểm tra snippet thực tế vì Google có thể viết lại.                           |

## 11. Hiệu ứng và cuộn trang

| Đạt | Chưa đạt | Cần xác minh | ID   | Tiêu chí                                                                                                               |
| :-: | :------: | :----------: | ---- | ---------------------------------------------------------------------------------------------------------------------- |
| [x] |   [ ]    |     [ ]      | 11.1 | Thời lượng/easing tập trung trong biến CSS; hiệu ứng xuất hiện khoảng 0,8–1,2 s, hover khoảng 0,25–0,35 s khi phù hợp. |
| [ ] |   [x]    |     [ ]      | 11.2 | Có stagger hợp lý; ưu tiên animate transform/opacity; hỗ trợ `prefers-reduced-motion`.                                 |
| [ ] |   [x]    |     [ ]      | 11.3 | Nếu chọn cuộn từng section: dùng `svh/dvh`, snap phù hợp, xử lý section dài, footer và trang con cuộn tự nhiên.        |
| [ ] |   [x]    |     [ ]      | 11.4 | Anchor cuộn mượt và tránh header cố định; test chuột, bàn phím, iOS Safari, Android Chrome và desktop.                 |
| [ ] |   [x]    |     [ ]      | 11.5 | Nội dung vẫn hiện trong HTML prerender, không phụ thuộc animation để bot đọc được.                                     |

## 12. CTA

| Đạt | Chưa đạt | Cần xác minh | ID   | Tiêu chí                                                                                                                        |
| :-: | :------: | :----------: | ---- | ------------------------------------------------------------------------------------------------------------------------------- |
| [x] |   [ ]    |     [ ]      | 12.1 | Nút nổi icon ≥ 48×48 px có `aria-label`/`title`; nút lên đầu trang ẩn ở hero và hiện khi cuộn.                                  |
| [ ] |   [x]    |     [ ]      | 12.2 | CTA có hover, active, focus-visible, disabled phù hợp; độ tương phản chữ/nền tối thiểu 4,5:1.                                   |
| [ ] |   [x]    |     [ ]      | 12.3 | Không che form/nội dung hoặc trùng với thanh CTA mobile; hiệu ứng pulse vừa phải và dừng khi giảm chuyển động.                  |
| [ ] |   [x]    |     [ ]      | 12.4 | Header mobile có CTA tư vấn nổi bật, không vỡ ở màn 320–360 px.                                                                 |
| [ ] |   [x]    |     [ ]      | 12.5 | CTA ở hero dẫn tới các giá trị chính của QTOPIA bằng link crawlable nếu là điều hướng; chốt tên nhãn và đích với nội dung thật. |
| N/A |   N/A    |     N/A      | 12.6 | Nếu có section bảng giá, có đường về các giá trị khác và giữ lựa chọn người dùng khi hợp lý.                                    |
| [ ] |   [x]    |     [ ]      | 12.7 | Có CTA map: nhãn \| vị trí \| đích \| event; kiểm tra không bỏ sót CTA.                                                         |

## 13. Kỹ thuật, an toàn và theo dõi

| Đạt | Chưa đạt | Cần xác minh | ID   | Tiêu chí                                                                                                                  |
| :-: | :------: | :----------: | ---- | ------------------------------------------------------------------------------------------------------------------------- |
| [ ] |   [ ]    |     [x]      | 13.1 | Đo LCP, INP, CLS bằng dữ liệu thực tế; kiểm tra ảnh hero, font swap, kích thước khung, tác vụ JS dài.                     |
| [ ] |   [ ]    |     [x]      | 13.2 | HTTPS và redirect về một hostname; cache dài cho asset có hash, gzip/brotli ở hosting.                                    |
| [x] |   [ ]    |     [ ]      | 13.3 | Favicon, manifest, theme-color, 404 đúng mã; không có redirect chain.                                                     |
| [ ] |   [ ]    |     [x]      | 13.4 | Điều hướng bàn phím và focus rõ; test Chrome, Safari iOS, Firefox, Samsung Internet; màn 375 px, tablet, desktop 1440 px. |
| [ ] |   [ ]    |     [x]      | 13.5 | Kiểm tra lead thật, analytics thật, OG preview, schema, Lighthouse trước và sau publish.                                  |
| [ ] |   [ ]    |     [x]      | 13.6 | Sau 1–2 tuần: xem Search Console/GA4, cập nhật snippet, hiệu năng và tỷ lệ chuyển đổi.                                    |

## Thông tin QTOPIA cần chốt trước publish

- Domain chính thức của landing page; tên thương mại và tên pháp lý dự án có được dùng cùng nhau như thế nào.
- Phân biệt pháp nhân chủ đầu tư (trang pháp lý ghi Công ty Cổ phần Đầu tư Serenity) với đơn vị phát triển/thương hiệu tiếp thị (source hiện ghi Phát Đạt Corporation).
- Địa chỉ trang pháp lý ghi thửa đất số 08, tờ bản đồ số 38, xã Phước Hải, TP. Hồ Chí Minh; xác nhận cách trình bày ngắn trên landing page. Chốt hotline, Zalo, hệ nhận lead.
- Làm rõ phạm vi số liệu 55.569,8 m² và 5 tháp S4–S8 trên trang pháp lý so với 7,5 ha và 9 tháp trong landing page.
- Tài liệu được phép công bố: vị trí, tiện ích, mặt bằng, giá, pháp lý, tiến độ, ảnh.
- Danh sách route và 3–5 giá trị ưu tiên trên mobile.
- Tài khoản Search Console, GTM, GA4 và người sở hữu việc đo lường.
