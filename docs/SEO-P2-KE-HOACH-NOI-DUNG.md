# QTOPIA Phước Hải — Kế hoạch nội dung P2 (bài vệ tinh)

> Lập ngày 10/11/2026 · Site: `https://qtopia.rever.io.vn` · Áp dụng sau khi P0 + P1 đã deploy.
> Mục tiêu: nâng site từ 23 URL lên **khoảng 45–50 URL**, phủ cụm từ khoá dài, đẩy các trang chính (giá bán, mặt bằng, tiện ích, căn hộ, vị trí) vào **top 20** cho `qtopia`, `qtopia phước hải`, `tiện ích qtopia`, `mặt bằng qtopia`, `giá bán qtopia`, `căn hộ qtopia`…

---

## 1. Hiện trạng sau P0 + P1

| Nhóm | URL đã có | Ghi chú |
|---|---|---|
| Trang chính | `/`, `/tong-quan`, `/vi-tri`, `/tien-ich`, `/tien-ich-xung-quanh`, `/mat-bang`, `/gia-ban`, `/chinh-sach-ban-hang`, `/faq` | 1.300–2.600 chữ/trang, có bảng, FAQ, schema |
| Căn hộ | `/can-ho/studio-ama`, `/can-ho/1pn-mira`, `/can-ho/2pn-vita`, `/can-ho/3pn-aria` | Layout, diện tích, mã căn, FAQ |
| Thông tin dự án | `/phap-ly`, `/chu-dau-tu`, `/tien-do`, `/nha-mau-noi-that`, `/hinh-anh-video` | — |
| Tin tức | `/tin-tuc` + 4 bài | Tổng quan, tiến độ 11/2026, Trạm Quậy, vị trí |

**Đối thủ top 1–5:** q-topia.vn 54 URL, quay-complex.vn 68, topia.vn 34, thequays.vn 25, q-toppia.com 22. Mỗi bài vệ tinh của họ dài 1.000–2.400 chữ.

---

## 2. Nguyên tắc viết (bắt buộc)

1. **Không sao chép đối thủ.** Google lọc nội dung trùng lặp; dùng số liệu từ tài liệu CĐT (brochure, tờ gập, layout, pháp lý) + ảnh/video riêng.
2. **Chỉ công bố số liệu có nguồn** (checklist 2.6, 2.7): giá, pháp lý, tiến độ, lợi nhuận cho thuê phải có văn bản. Không viết “cam kết lợi nhuận”.
3. **Đúng thuật ngữ** (checklist 2.8): “căn hộ du lịch”, không diễn đạt thành căn hộ ở lâu dài.
4. **Một bài – một từ khoá chính.** Từ khoá đứng đầu title (≤ 60 ký tự), có trong H1, đoạn mở đầu, 1–2 H2 và alt ảnh.
5. **Mobile-first:** đoạn văn 2–4 câu, bảng khi có số liệu, ảnh có alt, mỗi bài 1 CTA giữa bài + 1 CTA cuối bài.
6. **Liên kết nội bộ:** mỗi bài ≥ 3 link trong thân bài về trang chính tương ứng (anchor có từ khoá) + khối “Bài liên quan”.
7. **Ngày đăng / cập nhật** hiển thị và khớp JSON-LD (`datePublished`, `dateModified`).
8. **FAQ cuối bài:** 2–4 câu hỏi thật người dùng hay hỏi (đã có cơ chế `## Câu hỏi thường gặp` trong `src/data/news.js`).

### Khung bài chuẩn

| Thành phần | Yêu cầu |
|---|---|
| Title | ≤ 60 ký tự, từ khoá đầu |
| Meta description | 150–160 ký tự, có số liệu + lời kêu gọi |
| H1 | Gần giống title, tự nhiên |
| Mở bài | 2–3 câu trả lời thẳng câu hỏi chính (dễ lên featured snippet) |
| Thân bài | 4–6 H2; bảng số liệu nếu có; 1–3 ảnh có alt |
| FAQ | 2–4 câu, dạng `### câu hỏi` |
| CTA | “Nhận bảng giá / mặt bằng / đặt lịch tham quan” |
| Độ dài | 1.200–2.000 chữ (bài trụ cột 2.000+) |

---

## 3. Danh sách bài vệ tinh (26 bài)

Ưu tiên: **A** = viết trước (từ khoá có nhu cầu mua cao), **B** = tháng 2, **C** = tháng 3.

### 3.1. Cụm Giá bán & tài chính → link về `/gia-ban`, `/chinh-sach-ban-hang`

| # | Ưu tiên | Slug đề xuất | Title (≤ 60 ký tự) | Từ khoá chính | Dàn ý H2 | Số chữ | Nguồn dữ liệu cần có |
|---|---|---|---|---|---|---|---|
| 1 | A | `gia-ban-qtopia-thang-12-2026` | Giá bán QTopia Phước Hải tháng 12/2026 mới nhất | giá bán qtopia | Giá theo loại căn · Thay đổi so với tháng trước · Chính sách đang áp dụng · Ví dụ dòng tiền | 1.300 | Bảng giá CĐT có ngày hiệu lực (**cập nhật hằng tháng**) |
| 2 | A | `vay-mua-can-ho-qtopia` | Vay mua căn hộ QTopia: hỗ trợ lãi suất, ân hạn gốc | vay mua qtopia | Tỷ lệ vay 70% · Hỗ trợ lãi suất 24 tháng · Ân hạn gốc 48 tháng · Ví dụ trả nợ · Hồ sơ vay | 1.600 | Ngân hàng liên kết, lãi suất sau ưu đãi |
| 3 | A | `chi-phi-so-huu-can-ho-qtopia` | Chi phí sở hữu căn hộ QTopia ngoài giá bán | chi phí mua căn hộ qtopia | Giá căn · Kinh phí bảo trì · Thuế phí sang tên · Phí quản lý · Nội thất | 1.400 | Phí quản lý dự kiến, tỷ lệ KPBT |
| 4 | B | `thanh-toan-qtopia-10-phan-tram` | Thanh toán 10% sở hữu QTopia: lộ trình từng đợt | thanh toán qtopia | 3 phương thức · Lịch từng đợt · So sánh · Lưu ý hợp đồng | 1.300 | CSBH hiện hành |
| 5 | B | `can-ho-bien-gan-tphcm-duoi-1-5-ty` | Căn hộ biển gần TP.HCM dưới 1,5 tỷ: có QTopia | căn hộ biển gần tphcm giá rẻ | Tiêu chí chọn · QTopia Studio · So sánh khoảng cách/giá vùng · Rủi ro cần xem | 1.600 | Giá Studio, khoảng cách tham khảo |

### 3.2. Cụm Căn hộ & mặt bằng → link về `/mat-bang`, `/can-ho/*`

| # | Ưu tiên | Slug đề xuất | Title | Từ khoá chính | Dàn ý H2 | Số chữ | Nguồn |
|---|---|---|---|---|---|---|---|
| 6 | A | `nen-chon-studio-1pn-hay-2pn-qtopia` | Nên chọn Studio, 1PN+ hay 2PN tại QTopia? | căn hộ qtopia | So sánh diện tích · Theo nhu cầu ở · Theo cho thuê · Bảng quyết định | 1.800 | Layout, diện tích (đã có) |
| 7 | A | `dien-tich-can-ho-qtopia` | Diện tích căn hộ QTopia: SD và tim tường từng loại | diện tích căn hộ qtopia | SD vs TT · Bảng 7 loại căn · Cách đọc mặt bằng | 1.200 | Đã có |
| 8 | B | `view-bien-qtopia-chon-can` | View biển QTopia: cách chọn tháp, tầng, hướng | view biển qtopia | Vị trí tháp so với biển · Tầng cao · Hướng · Câu hỏi khi chọn căn | 1.400 | Mặt bằng tổng thể, hướng tháp |
| 9 | B | `noi-that-ban-giao-qtopia` | Nội thất bàn giao QTopia gồm những gì? | nội thất bàn giao qtopia | Danh mục bàn giao · Bồn tắm từng loại căn · Gói nội thất tuỳ chọn | 1.200 | **Danh mục bàn giao CĐT** |
| 10 | C | `mat-bang-thap-q7-qtopia` | Mặt bằng tháp Q7 QTopia: căn ARIA 3PN, VITA, MIRA | mặt bằng q7 qtopia | Tầng điển hình Q7 · Mã căn · So sánh Q5–Q6 | 1.200 | Bảng mã căn Q7 chính thức (**hiện số liệu VITA Q7 đang lệch**) |
| 11 | C | `aqua-home-qtopia` | Aqua Home QTopia là gì? Dòng căn hộ mặt nước | aqua home qtopia | Khái niệm · Vị trí · Diện tích · Đối tượng | 1.200 | Tài liệu Aqua Home |

### 3.3. Cụm Vị trí & di chuyển → link về `/vi-tri`, `/tien-ich-xung-quanh`

| # | Ưu tiên | Slug đề xuất | Title | Từ khoá chính | Dàn ý H2 | Số chữ | Nguồn |
|---|---|---|---|---|---|---|---|
| 12 | A | `tu-tphcm-di-qtopia-phuoc-hai` | Từ TP.HCM đi QTopia Phước Hải bằng đường nào? | đường đi qtopia | 3 lộ trình · Thời gian từng tuyến · Xe khách/xe riêng · Mẹo tránh kẹt | 1.600 | Khảo sát thực tế (ghi ngày) |
| 13 | B | `qtopia-den-san-bay-long-thanh` | QTopia cách sân bay Long Thành bao xa? | qtopia sân bay long thành | Khoảng cách · Tuyến kết nối · Ý nghĩa với khách du lịch | 1.100 | Tiến độ sân bay (nguồn báo chí) |
| 14 | B | `du-lich-phuoc-hai-co-gi` | Du lịch Phước Hải có gì? Cẩm nang cuối tuần | du lịch phước hải | Biển & làng chài · Núi Minh Đạm · Ẩm thực · Lịch trình 2N1Đ | 1.800 | Ảnh tự chụp |
| 15 | C | `cao-toc-bien-hoa-vung-tau-qtopia` | Cao tốc Biên Hòa – Vũng Tàu và QTopia Phước Hải | cao tốc biên hòa vũng tàu | Tiến độ tuyến · Thời gian tiết kiệm · Tác động khu vực | 1.200 | Báo chí có ngày |
| 16 | C | `qtopia-gan-ho-tram-long-hai` | QTopia gần Hồ Tràm, Long Hải: kết nối du lịch | qtopia hồ tràm | Khoảng cách · Điểm đến · Kết hợp hành trình | 1.100 | Brochure (19 phút Hồ Tràm) |

### 3.4. Cụm Tiện ích & trải nghiệm → link về `/tien-ich`

| # | Ưu tiên | Slug đề xuất | Title | Từ khoá chính | Dàn ý H2 | Số chữ | Nguồn |
|---|---|---|---|---|---|---|---|
| 17 | A | `aqua-funny-park-qtopia` | Aqua Funny Park QTopia: công viên nước bên biển | aqua funny park qtopia | Vị trí · Hạng mục · Cho trẻ em · Giờ hoạt động | 1.200 | Mặt bằng tiện ích (đã có) |
| 18 | B | `ocean-galaxy-qtopia-giai-tri-dem` | Ocean Galaxy QTopia: sàn DJ, hồ bơi vô cực về đêm | ocean galaxy qtopia | 13 tiện ích · Lịch một tối · Quy định | 1.300 | Đã có |
| 19 | B | `qtopia-cho-gia-dinh-co-tre-nho` | QTopia cho gia đình có trẻ nhỏ: chơi gì, ở căn nào | qtopia gia đình | Tiện ích trẻ em · Căn phù hợp · Lịch 2N1Đ | 1.400 | Đã có |
| 20 | C | `qtopia-cho-cap-doi` | QTopia cho cặp đôi: căn Studio và lịch hẹn hò | qtopia cặp đôi | Studio bồn tắm · Romantic Garden · Hoàng hôn | 1.100 | Đã có |
| 21 | C | `tien-ich-tang-mai-qtopia` | Tiện ích tầng mái QTopia: yoga, lounge, ngắm biển | tầng mái qtopia | Q5 Ocean Lounge · Q6 Galaxy Dome · Q7 Sunrise Yoga | 1.000 | Brochure |

### 3.5. Cụm Đầu tư & pháp lý → link về `/phap-ly`, `/chu-dau-tu`, `/gia-ban`

| # | Ưu tiên | Slug đề xuất | Title | Từ khoá chính | Dàn ý H2 | Số chữ | Nguồn |
|---|---|---|---|---|---|---|---|
| 22 | A | `co-nen-mua-can-ho-qtopia` | Có nên mua căn hộ QTopia Phước Hải? Ưu và nhược | có nên mua qtopia | 5 điểm mạnh · Rủi ro · Phù hợp với ai · Checklist trước cọc | 2.000 | Tổng hợp (không hứa lợi nhuận) |
| 23 | A | `so-hong-can-ho-du-lich-qtopia` | Sổ hồng căn hộ du lịch QTopia: sở hữu bao lâu? | sổ hồng qtopia | Căn hộ du lịch là gì · NĐ 10/2023 · Thời hạn · Câu hỏi cần hỏi CĐT | 1.500 | Văn bản pháp lý dự án |
| 24 | B | `cho-thue-can-ho-qtopia` | Cho thuê căn hộ QTopia: cách tính hiệu quả thực | cho thuê căn hộ qtopia | Nguồn khách · Chi phí vận hành · Ví dụ giả định (ghi rõ giả định) | 1.600 | Phí vận hành (cần CĐT) |
| 25 | B | `quy-hoach-1-500-qtopia` | Quy hoạch 1/500 QTopia: mật độ 25%, khu biển – núi | quy hoạch qtopia | QĐ 3636 · Chỉ tiêu · Ý nghĩa với người mua | 1.100 | Đã có |
| 26 | C | `don-vi-van-hanh-qtopia` | Đơn vị vận hành QTopia: CBRE, Wyndham làm gì? | vận hành qtopia | Vai trò từng đơn vị · Phí dịch vụ · Chương trình cho thuê | 1.200 | **Xác nhận vai trò từ CĐT** |

### 3.6. Bài định kỳ (không tính vào 26 bài)

| Tần suất | Bài | Link về | Ghi chú |
|---|---|---|---|
| Hằng tháng | Tiến độ QTopia tháng MM/YYYY | `/tien-do` | Ảnh công trường **có ngày chụp**; cập nhật bảng mốc trên `/tien-do` |
| Hằng tháng | Giá bán QTopia tháng MM/YYYY | `/gia-ban` | Cập nhật `CONTENT_UPDATED` trong `src/data/seo-content.js` |
| Theo sự kiện | Sự kiện tại Trạm Quậy, mở bán đợt mới, khởi công | `/tin-tuc` | Đăng trong 24 giờ sau sự kiện |

---

## 4. Lịch triển khai

| Tuần | Việc | Số bài |
|---|---|---|
| Tuần 1 (sau deploy P1) | Deploy, gửi sitemap lên Search Console, Request indexing 23 URL | — |
| Tuần 1–2 | Bài A: #1, #2, #6, #12, #22 | 5 |
| Tuần 3–4 | Bài A: #3, #7, #17, #23 + bài tiến độ tháng | 5 |
| Tuần 5–6 | Bài B: #4, #5, #8, #9, #13 | 5 |
| Tuần 7–8 | Bài B: #14, #18, #19, #24, #25 + bài giá tháng | 6 |
| Tuần 9–12 | Bài C: #10, #11, #15, #16, #20, #21, #26 | 7 |

Tổng: 26 bài vệ tinh + 2 bài định kỳ/tháng → khoảng **50 URL** sau 3 tháng.

---

## 5. Video (song song P2)

Đưa video layout, tiện ích lên YouTube, rồi khai báo trong `src/data/videos.js`. Website tự hiển thị video dạng facade (bấm mới tải iframe, không ảnh hưởng PageSpeed) và tự sinh `VideoObject`.

| Video | Tiêu đề YouTube gợi ý | Gắn vào trang |
|---|---|---|
| Layout AMA Studio | Layout căn AMA Studio – QTOPIA Phước Hải | `/can-ho/studio-ama`, `/hinh-anh-video` |
| Layout MIRA 1PN+ | Layout căn MIRA 1PN+ – QTOPIA Phước Hải | `/can-ho/1pn-mira` |
| Layout VITA 2PN | Layout căn VITA 2PN – QTOPIA Phước Hải | `/can-ho/2pn-vita` |
| Layout ARIA 3PN | Layout căn ARIA 3PN tháp Q7 – QTOPIA | `/can-ho/3pn-aria` |
| Tiện ích tổng thể | 29 tiện ích QTOPIA Phước Hải – Ocean Galaxy, Oasis | `/tien-ich` (cần thêm khối `videos` cho trang này) |
| Flycam / tiến độ | Tiến độ QTOPIA Phước Hải tháng MM/YYYY | `/tien-do` |

Mô tả video trên YouTube: 2–3 câu có từ khoá, kèm link về trang tương ứng trên website.

---

## 6. Ngoài website (P3, làm song song)

| Việc | Mục tiêu |
|---|---|
| Google Search Console | Xác minh domain, gửi sitemap, theo dõi Pages/Queries hằng tuần |
| Backlink | Link từ rever.vn (trang dự án), fanpage, YouTube, TikTok; đăng tin batdongsan.com.vn / nhatot có link; 2–3 bài PR |
| Google Business Profile | Hồ sơ văn phòng bán hàng / sa bàn (nếu được phép) |
| Domain riêng | Cân nhắc domain chứa từ khoá; nếu đổi phải 301 toàn bộ URL |

---

## 7. Đo lường

| Chỉ số | Công cụ | Mốc kiểm tra |
|---|---|---|
| Số URL được index | Search Console > Pages | Hằng tuần |
| Thứ hạng 6 từ khoá chính | Search Console > Queries (vị trí trung bình) | 2 tuần/lần |
| CTR snippet | Search Console | Sau 4 tuần, sửa title/description các trang CTR < 2% |
| Lead theo trang đích | GA4 `generate_lead` + `form_location` | Hằng tháng |
| PageSpeed mobile | PageSpeed Insights, 3 lần/trang | Sau mỗi đợt deploy |

**Kỳ vọng:** các từ khoá dài (mặt bằng, tiện ích, căn hộ studio, layout) vào top 20 trong 3–6 tuần sau khi được index; `qtopia phước hải` cần thêm bài vệ tinh và backlink; riêng `qtopia` phụ thuộc chủ yếu vào backlink và uy tín domain.

---

## 8. Việc cần bên dự án cung cấp trước khi viết

- [ ] Bảng giá theo mã căn có ngày hiệu lực (bài #1, #4, #5 và trang `/gia-ban`)
- [ ] Danh mục nội thất bàn giao (bài #9)
- [ ] Bảng mã căn tháp Q7 chính thức — số liệu VITA Q7 đang lệch giữa sơ đồ (63,09 m²) và brochure (56,17–56,54 m²) (bài #10)
- [ ] Phí quản lý, phương án vận hành – cho thuê, vai trò CBRE/Wyndham/Vivora (bài #3, #24, #26)
- [ ] Ngân hàng liên kết và lãi suất sau ưu đãi (bài #2)
- [ ] Ảnh công trường có ngày chụp hằng tháng; video layout và tiện ích
- [ ] Xác nhận toạ độ Google Maps (10.4043, 107.2758) và hotline/Zalo chính thức
