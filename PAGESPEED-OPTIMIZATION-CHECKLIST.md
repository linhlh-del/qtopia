# PageSpeed QTOPIA — phân tích và checklist tối ưu

Báo cáo ngày 05/11/2026: [mobile](https://pagespeed.web.dev/analysis/https-qtopia-tau-vercel-app/c6o1k5vd5b?form_factor=mobile) · [desktop](https://pagespeed.web.dev/analysis/https-qtopia-tau-vercel-app/pwnqpbsxv4?form_factor=desktop). Đây là điểm Lighthouse trong phòng thử nghiệm; cả hai báo cáo đều ghi **No Data** ở phần người dùng thực. Sau khi triển khai, đo lại nhiều lần với cùng cấu hình và theo dõi Core Web Vitals thực tế khi đủ dữ liệu.

## Mốc ban đầu trước tối ưu

| Chỉ số | Mobile | Desktop | Nhận xét |
|---|---:|---:|---|
| Performance | 70 | 54 | Mục tiêu ≥95 cho cả hai |
| SEO | 100 | 100 | Đã đạt theo các kiểm tra cơ bản của Lighthouse |
| Accessibility | 94 | 94 | Marker trên sơ đồ tiện ích có lỗi tương phản và kích thước vùng chạm |
| FCP | 2,8 s | 0,6 s | Mobile chậm |
| LCP | 8,0 s | 3,5 s | Nút thắt chính của mobile; desktop cũng cần giảm |
| TBT | 90 ms | 630 ms | Nút thắt lớn của desktop |
| CLS | 0 | 0 | Đã đạt |
| Speed Index | 3,5 s | 1,5 s | Mobile còn có thể cải thiện |

## Kết quả sau tối ưu — audit cục bộ

Ba lượt Lighthouse cuối trên static server cục bộ cho trung vị: mobile Performance 65, Accessibility 97, SEO 100, FCP 1,82 s, LCP 5,93 s, TBT 436 ms, CLS 0,011; desktop lần lượt 96, 97, 100, FCP 0,41 s, LCP 1,38 s, TBT 22 ms, CLS 0,01. Waterfall mobile không tải ảnh sơ đồ tiện ích và tổng transfer đo được khoảng 1,17 MB.

Các số này **không đại diện cho Vercel**: server cục bộ không nén HTML/CSS/JS bằng gzip/Brotli, còn Lighthouse mobile dao động đáng kể. Cần đo lại trên preview đã deploy trước khi kết luận mục tiêu Performance mobile ≥95 hoặc LCP ≤2,5 s đã đạt.

## Đo lại 06/11/2026 trên Vercel và đợt tối ưu tiếp theo

[Báo cáo mobile 06/11](https://pagespeed.web.dev/analysis/https-qtopia-tau-vercel-app/eh7yas3w2k?form_factor=mobile): **Performance 97 · Accessibility 97 · Best Practices 100 · SEO 100**. Các chỉ số: FCP 1,0 s, LCP 2,4 s, TBT 90 ms, CLS 0, SI 1,2 s.

| Checklist | Phát hiện trong báo cáo | Đã sửa |
|---|---|---|
| [x] | Improve image delivery: tiết kiệm được 93 KiB. Ảnh `birdview`/`view-from-sea` hiển thị ~1543 px nhưng phải tải bản 1920 px. | `scripts/optimize-images.mjs` thêm biến thể 1080/1600 px và giảm quality ảnh render 76 → 70 (effort 6). `view-from-sea-1920`: 245 → 212 KiB; trình duyệt chọn được bản 1600 (166 KiB). |
| [x] | Reduce unused JS 115 KiB và 2 long task (~95 ms), cả hai đều do `gtag/js`. | `loadGtm()` chỉ tải GA/GTM khi người dùng tương tác, hoặc 10 s sau sự kiện `load`. Sự kiện phát sinh trước đó vẫn xếp hàng trong `dataLayer`. |
| [x] | Touch targets: các chấm phân trang tin tức chỉ 8 px. | Mỗi chấm có vùng chạm 44 × 44 px, kích thước hiển thị giữ nguyên. |
| [x] | Identical links: các nút "Đọc thêm" cùng tên nhưng dẫn tới bài khác nhau. | Thêm tên bài vào tên link bằng `sr-only`. |
| [x] | Best Practices: thiếu CSP, COOP, XFO. | Thêm header trong `vercel.json` và `deploy/nginx-qtopia.conf`; `serve-dist` cũng gửi các header này để test cục bộ. |
| [ ] | Render-blocking CSS 17 KiB (ước tính 80 ms). | Để nguyên: inline cả file CSS vào mỗi trang làm mất cache giữa các trang, mà lợi ích chỉ khoảng 80 ms. |
| [ ] | Đo lại sau deploy. | Cần chạy PageSpeed 3 lần mỗi chế độ trên domain chính thức sau khi chuyển sang VPS (nginx gzip + cache). |

## Checklist P0 — làm trước

| Checklist | Công việc và vị trí code | Bằng chứng / cách nghiệm thu |
|---|---|---|
| [x] | Tạo biến thể responsive cho ảnh mặt bằng tiện ích; trong `src/sections/MasterPlan.jsx`, chỉ dựng SVG marker/polygon khi section gần viewport. | Waterfall mobile không yêu cầu ảnh sơ đồ khi mở Hero; khung ảnh và chế độ phóng to vẫn dùng cùng tỷ lệ. |
| [x] | Tạo `srcSet`/`sizes` cho Hero trong `src/sections/Hero.jsx` và `src/components/ui/Img.jsx`; giữ ảnh đầu `fetchPriority="high"` và không ưu tiên ảnh sau. | Mobile chọn `view-from-sea-800.webp` (~58 KiB), không nhận ảnh 2.400 px. Autoplay 6,5 giây được giữ theo lựa chọn của người dùng; ảnh đầu không chạy entrance animation. |
| [x] | Tạo biến thể theo kích thước hiển thị cho `birdview`, `ocean-galaxy`, `aqua-funny-park-night`, `position-map` và mascot; chế độ phóng to dùng kích thước lớn hơn. | Responsive manifest được dùng chung qua `Img.jsx`; các ảnh phục vụ bằng WebP. |
| [x] | Đo lại waterfall và tải muộn ảnh ngoài viewport; trì hoãn cả ảnh SVG của sơ đồ tiện ích. | Ba lượt audit cục bộ đều không tải ảnh mặt bằng tiện ích lúc chỉ mở Hero; transfer toàn trang khoảng 1,17 MB ở server không nén. |
| [x] | Đưa Google Analytics khỏi HTML tải đầu và nạp động sau tương tác/idle; giữ một cơ chế gtag/GTM và xếp hàng sự kiện trước khi script tải. | `index.html` không tải trực tiếp gtag; `src/lib/analytics.js` duy trì `page_view`/lead/click trong `dataLayer`. |

## Checklist P1 — sau khi P0 đã đo lại

| Checklist | Công việc và vị trí code | Bằng chứng / cách nghiệm thu |
|---|---|---|
| [x] | Trì hoãn JavaScript của `Location`, `MasterPlan`, `FeaturedAmenities`, `Residences` và `News` tới gần viewport; giữ HTML prerender và tách route bài viết. | `DeferredSection` giữ nội dung SSR nhưng chỉ import component khi section gần viewport; `npm run seo:check` đạt 0 lỗi/cảnh báo. |
| [x] | Giảm DOM ban đầu của sơ đồ: chỉ dựng marker/polygon khi section gần viewport; giữ điều khiển bàn phím và nội dung mô tả trong HTML. | Waterfall không tải ảnh sơ đồ lúc mở Hero; marker có nhãn và hit target 44 px. |
| [x] | Self-host subset WOFF2, preload đúng font Hero và đảm bảo font Poppins có glyph tiếng Việt đầy đủ. | Inter Latin-ext không còn tải; Poppins có subset tiếng Việt và dùng lại cùng file WOFF2. |
| [x] | Chỉ chạy animation sơ đồ khi section hoạt động/đang nhìn thấy hoặc khi người dùng tương tác. | `src/lib/motion.js` và CSS tạm dừng hiệu ứng ngoài viewport/đang cuộn. |
| [x] | Dùng Lighthouse Performance trace để tìm forced reflow trước khi sửa các điểm đọc layout. | Trace chỉ ra `useReveal()` gọi `getBoundingClientRect()` đồng bộ; đã chuyển sang `IntersectionObserver`. Audit sau sửa không còn forced-reflow finding. |

## Checklist P2 — chất lượng và kiểm chứng

| Checklist | Công việc | Bằng chứng / cách nghiệm thu |
|---|---|---|
| [x] | Sửa tương phản chữ số và vùng chạm của các nút `.amenity-number` trong `MasterPlan.jsx`; giữ trạng thái focus rõ ràng. | Lighthouse cục bộ đạt Accessibility median 97/100 trên cả mobile và desktop. |
| [ ] | Deploy preview rồi chạy PageSpeed mobile và desktop ít nhất 3 lần; lấy trung vị, kiểm tra Network và LCP element. | Đã chạy 3 lần mỗi chế độ trên static server cục bộ, nhưng chưa có preview Vercel. Mục tiêu sau deploy: Performance ≥95, LCP ≤2,5 s, TBT <200 ms, CLS <0,1, FCP mobile <1,8 s. |
| [x] | Tích hợp thu thập LCP, INP, CLS; sau deploy theo dõi phân vị 75 trên mobile và desktop khi dữ liệu đủ. | `web-vitals` gửi metric vào analytics; việc phân tích dữ liệu người dùng thực vẫn chờ triển khai và đủ lượng truy cập. |

## Những điểm đã đạt, nên giữ

| Checklist | Hiện trạng |
|---|---|
| [x] | SEO 100/100 trên cả hai báo cáo. Đây là kiểm tra SEO cơ bản, không đồng nghĩa với thứ hạng tìm kiếm. |
| [x] | CLS = 0 trên cả hai lượt đo; `Img.jsx` gắn sẵn width/height cho ảnh có metadata. |
| [x] | Ảnh Hero đầu đã được nạp eager và `fetchPriority="high"`. |
| [x] | `vercel.json` đã đặt cache 1 năm cho asset có hash và 30 ngày cho ảnh. |
