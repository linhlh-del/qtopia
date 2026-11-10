# QTOPIA Phước Hải — Review các đề xuất SEO & giao diện

> Ngày 10/11/2026 · Phạm vi: `qtopia-landing` (bản build kiểm tra `dist-check`, **chưa deploy**).
> Mục tiêu ban đầu: đưa `qtopia.rever.io.vn` vào **top 20** cho `qtopia`, `qtopia phước hải`, `tiện ích qtopia`, `mặt bằng qtopia`, `giá bán qtopia`, `căn hộ qtopia`.

---

## 1. Điểm xuất phát (vì sao phải làm)

| Hiện trạng trước khi sửa | Đối thủ top 1–5 | Hệ quả |
|---|---|---|
| 12 URL, ~11.400 chữ | 25–68 URL, 26.000–97.000 chữ | Google có rất ít trang để xếp hạng cho từ khoá dài |
| Trang chi tiết 580–906 chữ, phần lớn là hiệu ứng JS | Trang tương ứng 1.700–2.400 chữ, có bảng | Bot đọc được rất ít nội dung |
| 7/12 title không có “Phước Hải” | Cả 5 đều có | Lệch từ khoá `qtopia phước hải` |
| Không có trang giá, FAQ, căn hộ, pháp lý riêng | Có | Không có trang đích cho từ khoá mua hàng |
| Không bảng HTML, không Google Maps, không video | 5–11 trang có bảng; Maps; video | Thiếu tín hiệu nội dung và trải nghiệm |
| Kỹ thuật (SSR, schema, canonical) tốt | — | **Không phải lỗi kỹ thuật** — thiếu là ở nội dung |

Chi tiết số liệu: [SEO-COMPETITOR-GAP-2026-11.md](SEO-COMPETITOR-GAP-2026-11.md).

---

## 2. Đã làm và lý do

### P0 — sửa cái thiếu nhiều nhất

| Việc | Lý do |
|---|---|
| Title/meta/H1 mới cho mọi trang, có “Phước Hải” + từ khoá chính (≤ 60 / 150–160 ký tự) | Title là tín hiệu xếp hạng mạnh nhất trên trang; 5/5 đối thủ đều có “Phước Hải” |
| Trang `/gia-ban` (bảng giá theo loại căn, ví dụ dòng tiền) | “giá bán qtopia” là từ khoá ý định mua cao nhất; 4/5 đối thủ có trang riêng |
| Trang `/faq` (34 câu, 7 nhóm, `FAQPage`) | Bắt câu hỏi dạng “qtopia … là gì / bao lâu / ở đâu”; có thể lên rich result |
| Viết dày 6 trang chi tiết (1.300–2.100 chữ, chữ nằm trong HTML) | Nội dung trong hiệu ứng JS bot đọc kém; đối thủ dày gấp 2–3 lần |
| Bảng HTML (thông số, diện tích, mã căn, tiến độ thanh toán, thời gian di chuyển) | Bảng dễ đọc trên mobile và dễ được Google trích thành snippet |
| Google Maps theo toạ độ dự án (không trỏ vào listing của môi giới khác) | Người tìm “vị trí qtopia” cần bản đồ; tránh dẫn khách sang đối thủ |
| FAQ riêng 3–6 câu cuối mỗi trang + schema | Mỗi trang trả lời câu hỏi của chính cụm từ khoá đó |

### P1 — mở rộng cụm trang

| Việc | Lý do |
|---|---|
| 4 trang căn hộ `/can-ho/*` (layout, mã căn, diện tích, giá, cho thuê, so sánh) | Từ khoá “căn hộ studio / 1pn / 2pn qtopia” cần trang đích riêng; đối thủ #1, #2, #4 đều có |
| `/phap-ly`, `/chu-dau-tu`, `/tien-do`, `/nha-mau-noi-that`, `/hinh-anh-video` | Mỗi trang là một cụm tìm kiếm riêng (“pháp lý qtopia”, “chủ đầu tư qtopia”…) |
| Mô tả căn hộ viết theo đúng bản vẽ layout (đã xem từng ảnh) | Chính xác, khác biệt với đối thủ — không sao chép |
| Breadcrumb 3 cấp, mục lục, `dateModified` | Giúp Google hiểu cấu trúc site; mục lục tạo sitelink “Chuyển tới” |
| Khung video YouTube dạng facade + `VideoObject` | Sẵn sàng nhận video của bạn mà không làm chậm trang |
| Thông tin dự án chuyển từ trang chủ vào `/tong-quan`, đặt ngay dưới số liệu | Trang chủ giữ nhịp landing (cuộn theo section); trang tổng quan thành trang “overview” đầy đủ |

### Giao diện (theo yêu cầu và tự audit)

| Việc | Lý do |
|---|---|
| Lightbox xem ảnh tại chỗ, nút ×, Esc, chạm để phóng 2× trên mobile | Không mở tab mới; layout nằm ngang rộng 375 px quá nhỏ để đọc |
| Nội dung và tiêu đề rộng bằng container, H1 tách 2 dòng tại “—” | Bỏ khoảng trắng lớn hai bên; tiêu đề dễ đọc, đúng ý nghĩa |
| Nền đầu trang xanh thương hiệu thay navy tối | Đồng bộ header, sáng và thân thiện hơn |
| Mũi tên mục lục dùng `arrow-sm.webp` | Đồng bộ với dropdown chọn tháp |
| Nút “Xem tiện ích chi tiết” trong section tiện ích trang chủ | Trước đó không có đường vào `/tien-ich` từ section này |
| Vùng chạm ≥ 44 px (chấm tin tức, marker bản đồ, link nội bộ) | Checklist 3.2 / Lighthouse target-size |
| Tách nội dung chữ ra khỏi bundle chính (430 KB → 324 KB) | Nội dung mới không được làm nặng lần tải đầu |
| Sửa section nội dung trên trang chủ bị script “snap” kéo đi | Người dùng không đọc được khối dài |

### Audit giao diện lần cuối (23 trang × mobile 375 / tablet 768 / desktop 1440)

| Phát hiện | Đã sửa |
|---|---|
| `/tin-tuc` tablet: ô ảnh bài nổi bật tràn, chữ bị cắt (do `aspect-ratio` + `h-full`) | ✅ Thêm `w-full` |
| Tiêu đề ngắt dòng giữa “Q5–” / “Q6” | ✅ Chặn ngắt tại “–” giữa hai từ + cân bằng dòng tiêu đề |
| OG image của 6 trang sai kích thước (layout 1600×1066, khai báo 1200×630) | ✅ Dùng ảnh OG 1200×630 có sẵn |
| Tràn ngang / ảnh lỗi / lỗi console / heading nhảy cấp / section trống | Không còn (0/69 lượt) |
| SVG vòng tròn trang trí tràn mép | Không phải lỗi — cố ý, đã bị cắt bởi `overflow-x: clip` |

---

## 3. Còn thiếu — cần bạn cung cấp hoặc quyết định

| # | Thiếu | Vì sao quan trọng | Ai làm |
|---|---|---|---|
| 1 | **Ảnh đại diện cho 4 bài tin tức** (đang hiện “Ảnh sẽ được cập nhật”) | Thẻ tin trống làm trang trông chưa hoàn thiện; ảnh còn dùng cho chia sẻ mạng xã hội | Bạn upload trên CMS |
| 2 | **Video YouTube** (layout 4 căn, tiện ích, flycam) | Đối thủ #1–#3 có video; video tăng thời gian ở trang và có thể hiện trong tab Video của Google | Bạn đưa lên YouTube, gửi ID → khai báo trong `src/data/videos.js` |
| 3 | **Bảng giá 1PN+, 2PN, 3PN** | Trang giá đang chỉ có Studio “từ 1,195 tỷ”; các căn khác “Nhận bảng giá” | Bảng giá CĐT có ngày hiệu lực |
| 4 | **Số liệu VITA tháp Q7 bị lệch**: sơ đồ 63,09 m², brochure 56,17–56,54 m² | Website đang dùng số brochure; sai diện tích là rủi ro pháp lý khi tư vấn | Xác nhận với CĐT |
| 5 | **Toạ độ Google Maps** (10.4043, 107.2758) lấy từ điểm trên Maps | Bản đồ trên 2 trang phụ thuộc toạ độ này | Xác nhận với CĐT |
| 6 | **Marker “Cần Giờ” và “Cảng Cái Mép” chồng nhau** trên bản đồ vị trí mobile | Khó bấm đúng; Lighthouse vẫn báo target-size | Quyết định dời toạ độ marker (lệch so với bản đồ gốc) hay ẩn bớt trên mobile |
| 7 | **CSP nginx trên VPS** chưa có Google Maps/YouTube | Không cập nhật → bản đồ bị chặn trên site thật | Cập nhật `$csp` theo `deploy/nginx-qtopia.conf` rồi reload nginx |
| 8 | **Nội dung CMS có thể đè title/H1 mới** | Nếu CMS đã sửa SEO/hero, bản build production sẽ dùng bản CMS | Kiểm tra mục SEO trên CMS trước khi build release |

---

## 4. Đề xuất tiếp theo (xếp theo ưu tiên)

| Ưu tiên | Đề xuất | Lý do | Công sức |
|---|---|---|---|
| **1** | **Deploy bản này + gửi sitemap lên Google Search Console**, Request indexing 23 URL | Chưa deploy thì chưa có tác động xếp hạng; 11 URL mới cần được Google phát hiện nhanh | Thấp |
| **2** | **Bổ sung mục 1–5 ở phần 3** (ảnh tin, video, bảng giá, số liệu Q7, toạ độ) | Đây là các chỗ “trống” người dùng nhìn thấy ngay, và là dữ liệu đối thủ đang có | Trung bình (phụ thuộc CĐT) |
| **3** | **Viết bài vệ tinh P2** theo [SEO-P2-KE-HOACH-NOI-DUNG.md](SEO-P2-KE-HOACH-NOI-DUNG.md) — 5 bài nhóm A trước (giá tháng, vay, Studio/1PN/2PN, đường đi, có nên mua) | Đối thủ thắng chủ yếu nhờ số lượng bài; mỗi bài nhắm một từ khoá dài và trỏ link về trang chính | Cao, đều đặn |
| **4** | **Cập nhật hằng tháng** trang giá và tiến độ (ngày “Cập nhật” đang hiển thị) | Google ưu tiên trang mới cho truy vấn giá/tiến độ; người mua cần số liệu có ngày | Thấp, định kỳ |
| **5** | **Backlink**: link từ rever.vn, fanpage, YouTube, tin đăng batdongsan/nhatot, 2–3 bài PR | `qtopia` là từ khoá ngắn, cạnh tranh — phụ thuộc chủ yếu vào độ uy tín domain, không chỉ nội dung | Trung bình |
| **6** | **Xem lại quyết định GA trong `<head>`** sau 4–6 tuần, dựa trên dữ liệu Core Web Vitals thực trong Search Console | Hiện TBT mobile ~1.200–1.700 ms (Performance ~70–75 thay vì ~95); nếu CWV thực bị đánh “Kém” thì nên chuyển sang nạp muộn | Thấp |
| **7** | **Cân nhắc domain riêng** chứa từ khoá (5/5 đối thủ đều dùng) | Subdomain `*.rever.io.vn` mới, ít backlink; nếu đổi phải 301 toàn bộ URL | Cao, cần quyết định kinh doanh |
| **8** | **Màu nút CTA cam** (`#ff5f00` chữ trắng ~3:1) — checklist 12.2 | Dưới chuẩn tương phản 4,5:1; ảnh hưởng khả năng đọc và điểm Accessibility | Thấp |

---

## 5. Kỳ vọng thực tế

| Từ khoá | Khả năng vào top 20 | Điều kiện |
|---|---|---|
| mặt bằng qtopia, tiện ích qtopia, layout / căn hộ studio qtopia | **Cao**, 3–6 tuần sau khi index | Deploy + Search Console |
| giá bán qtopia, chính sách bán hàng qtopia, pháp lý qtopia | **Khá** | Cập nhật bảng giá đầy đủ, hằng tháng |
| qtopia phước hải | **Trung bình** | Thêm bài P2 + backlink |
| qtopia | **Thấp nếu chỉ dựa nội dung** | Phụ thuộc backlink và uy tín domain |

Điểm Lighthouse và thứ hạng là hai việc khác nhau: SEO kỹ thuật đã đạt (0 lỗi `seo:check`, 100 SEO Lighthouse); thứ hạng giờ phụ thuộc chủ yếu vào **deploy, index, bài vệ tinh và backlink**.
