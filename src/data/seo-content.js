/* ============================================================
   NỘI DUNG CHỮ TĨNH CHO TRANG CHỦ ĐỀ (SEO) — render bởi src/components/RichContent.jsx
   Nằm bên dưới phần tương tác của từng trang, đã prerender vào HTML nên bot đọc được không cần JS.

   Nguồn số liệu (chỉ dùng thông tin đã có trong repo):
     - src/data/project.js (pháp lý, CSBH, diện tích layout, tiện ích, mốc di chuyển theo brochure)
     - src/data/qtopiaFloorPlan.js (mã căn, SD, TT tầng điển hình Q5–Q6)
     - qtopia/CONTENT-KEYWORDS.md (brochure: tầng mái Q7, đơn vị vận hành…)
     - Bài tin tức đã đăng (địa chỉ Võ Thị Sáu / TL44A)
   Mọi số tiền ví dụ được TÍNH từ giá Studio 1,195 tỷ × tỷ lệ % trong CSBH — cập nhật khi CĐT đổi giá.

   Kiểu khối:
     { t: 'h2' | 'h3' | 'p', text }       { t: 'ul' | 'ol', items: [] }
     { t: 'table', caption, head: [], rows: [[]] }
     { t: 'floorTable', plan: 'q5-q6' }   bảng mã căn sinh tự động từ dữ liệu mặt bằng
     { t: 'map' }                          Google Maps (lazy) theo PROJECT_GEO
     { t: 'links', title, items: [{ to, label }] }   liên kết nội bộ có từ khoá
     { t: 'note', text }                   ghi chú / disclaimer
   faqs: hiển thị cuối trang + FAQPage JSON-LD của trang đó.
   ============================================================ */

import { unitTypes } from './unit-types'
import { legalFaqs, p1Content, p1FaqGroups } from './seo-content-p1'

/** Toạ độ dự án theo Google Maps (điểm "Dự án Q Topia Phước Hải") — xác nhận lại với CĐT. */
import { PROJECT_GEO, mapEmbedUrl, mapLinkUrl } from './geo'
import { registerSeoContent } from '../seo/content-registry'
export { PROJECT_GEO, mapEmbedUrl, mapLinkUrl }
export const PROJECT_ADDRESS =
  'Mặt tiền đường Võ Thị Sáu (Tỉnh lộ 44A), xã Phước Hải, TP. Hồ Chí Minh (trước đây là thị trấn Phước Hải, huyện Đất Đỏ, tỉnh Bà Rịa – Vũng Tàu)'

/** Ngày cập nhật hiển thị trên trang giá / chính sách — đổi khi cập nhật số liệu. */
export const CONTENT_UPDATED = '10/11/2026'

/* ---------- Tính toán ví dụ thanh toán từ giá Studio ---------- */
const STUDIO_PRICE = 1_195_000_000
const vnd = (ratio) => {
  const million = (STUDIO_PRICE * ratio) / 1_000_000
  return `${million.toLocaleString('vi-VN', { maximumFractionDigits: 2 })} triệu`
}

const linksAll = [
  { to: '/tong-quan', label: 'Tổng quan dự án QTOPIA Phước Hải' },
  { to: '/vi-tri', label: 'Vị trí QTOPIA và bản đồ' },
  { to: '/tien-ich', label: 'Tiện ích nội khu QTOPIA' },
  { to: '/tien-ich-xung-quanh', label: 'Tiện ích xung quanh QTOPIA' },
  { to: '/mat-bang', label: 'Mặt bằng và layout căn hộ QTOPIA' },
  { to: '/gia-ban', label: 'Giá bán căn hộ QTOPIA' },
  { to: '/chinh-sach-ban-hang', label: 'Chính sách bán hàng QTOPIA' },
  { to: '/phap-ly', label: 'Pháp lý dự án QTOPIA' },
  { to: '/chu-dau-tu', label: 'Chủ đầu tư QTOPIA' },
  { to: '/tien-do', label: 'Tiến độ dự án QTOPIA' },
  { to: '/hinh-anh-video', label: 'Hình ảnh dự án QTOPIA' },
  { to: '/faq', label: 'Hỏi đáp về QTOPIA Phước Hải' },
]
const related = (self) => ({
  t: 'links',
  title: 'Xem thêm về QTOPIA Phước Hải',
  items: linksAll.filter((l) => l.to !== self),
})

/* ============================================================
   /tong-quan
   ============================================================ */
const tongQuan = {
  blocks: [
    { t: 'h2', text: 'QTOPIA Phước Hải là dự án gì?' },
    {
      t: 'p',
      text: 'QTOPIA (còn được viết là Q Topia, QTopia) là tổ hợp căn hộ du lịch, thương mại dịch vụ và giải trí ven biển tại xã Phước Hải, TP. Hồ Chí Minh. Dự án được định vị là “Thành phố cuối tuần của siêu đô thị TP. Hồ Chí Minh”: một điểm đến để nghỉ ngắn ngày, vui chơi và thư giãn, cách trung tâm thành phố khoảng 75 phút theo tài liệu giới thiệu.',
    },
    {
      t: 'p',
      text: 'Khác với một khu căn hộ nghỉ dưỡng thông thường, QTOPIA đặt trọng tâm vào trải nghiệm: ban ngày là hồ bơi, công viên nước, khu thể thao và vườn cảnh quan; buổi tối là quảng trường biển, sàn DJ, quầy bar và phố thương mại. Thông điệp thương hiệu “Quậy your way” gợi tinh thần vui chơi tự do theo cách của mỗi người.',
    },
    { t: 'h2', text: 'Thông tin tổng quan dự án QTOPIA' },
    {
      t: 'table',
      caption: 'Bảng thông số chính của dự án QTOPIA Phước Hải',
      head: ['Hạng mục', 'Thông tin'],
      rows: [
        ['Tên thương mại', 'QTOPIA (Q Topia / QTopia Phước Hải)'],
        ['Vị trí', 'Mặt tiền đường Võ Thị Sáu (Tỉnh lộ 44A), xã Phước Hải, TP. Hồ Chí Minh'],
        ['Đơn vị phát triển', 'Phát Đạt Corporation'],
        ['Pháp nhân chủ đầu tư', 'Công ty Cổ phần Đầu tư Serenity'],
        ['Tổng diện tích khu đất', '73.842 m² (khoảng 7,38 ha)'],
        ['Mật độ xây dựng tối đa', '25%'],
        ['Hệ số sử dụng đất tối đa', '4,02'],
        ['Tổng vốn đầu tư', 'Khoảng 5.366,64 tỷ đồng (theo Giấy chứng nhận đăng ký đầu tư)'],
        ['Quy hoạch', 'Khu biển và khu núi; quy hoạch 1/500 phê duyệt theo QĐ 3636/QĐ-UBND ngày 24/12/2025'],
        ['Loại hình', 'Căn hộ du lịch, thương mại dịch vụ, khách sạn, biệt thự nghỉ dưỡng'],
        ['Sản phẩm căn hộ', 'AMA Studio, MIRA 1PN+, VITA 2PN, ARIA 3PN (tháp Q7), Aqua Home'],
        ['Cụm tiện ích', 'Quậy Station, Ocean Galaxy, Oasis Resort cùng tiện ích tầng mái'],
        ['Tiện ích nội khu', '29 hạng mục trong 3 khu: Quậy Station, Ocean Galaxy, Oasis Resort'],
        ['Giá tham khảo', 'Căn Studio từ 1,195 tỷ đồng'],
        ['Thanh toán', 'Ký HĐMB 10%, vay đến 70%, hỗ trợ lãi suất 24 tháng'],
        ['Kết nối', '75 phút tới trung tâm TP.HCM; 30 phút tới sân bay Long Thành và Bà Rịa – Vũng Tàu'],
      ],
    },
    { t: 'note', text: 'Số liệu theo văn bản pháp lý đã công bố và tài liệu giới thiệu dự án; vui lòng đối chiếu hồ sơ gốc khi giao dịch.' },
    { t: 'h2', text: 'Chủ đầu tư và các đơn vị đồng hành' },
    {
      t: 'p',
      text: 'Dự án do Phát Đạt Corporation (mã chứng khoán PDR) phát triển, thông qua pháp nhân chủ đầu tư là Công ty Cổ phần Đầu tư Serenity – đơn vị được Sở Tài chính TP.HCM cấp Giấy chứng nhận đăng ký đầu tư ngày 10/06/2026. Phát Đạt là doanh nghiệp bất động sản niêm yết có kinh nghiệm phát triển các dự án căn hộ và nghỉ dưỡng tại khu vực phía Nam.',
    },
    {
      t: 'p',
      text: 'Trong phần giới thiệu vận hành, brochure dự án nhắc tới các thương hiệu CBRE, Wyndham Hotels & Resorts và Vivora. Phạm vi vai trò cụ thể của từng đơn vị (quản lý toà nhà, vận hành khách sạn hay dịch vụ) sẽ được xác nhận trong hợp đồng và văn bản chính thức của chủ đầu tư.',
    },
    { t: 'h2', text: 'Ba khu trải nghiệm của thành phố cuối tuần' },
    {
      t: 'p',
      text: 'Toàn bộ tiện ích nội khu được tổ chức thành ba cụm, mỗi cụm phục vụ một “nhịp” khác nhau của kỳ nghỉ:',
    },
    {
      t: 'ul',
      items: [
        'Quậy Station – cụm hướng biển với Quậy Beach, nhà hàng Sunset, Q.Club, quảng trường biển và khách sạn quốc tế; nơi diễn ra sự kiện và hoạt động cộng đồng.',
        'Ocean Galaxy – trái tim giải trí với hồ bơi Galaxy, hồ bơi vô cực, sàn DJ Ocean, công viên nước Aqua Funny Park, biểu tượng Kraken, phố Wyndham và phố thương mại.',
        'Oasis Resort – ốc đảo thư giãn với hồ bơi Oasis, sân tắm nắng, sân chơi trẻ em Dolphin và Octo, tổ hợp thể thao, vườn hoa Romantic Garden và bồn sục Jacuzzi.',
      ],
    },
    { t: 'h2', text: 'Các dòng sản phẩm căn hộ' },
    {
      t: 'p',
      text: 'Căn hộ QTOPIA được thiết kế gọn, dễ ở và dễ khai thác cho thuê ngắn ngày. Tại tầng điển hình tháp Q5–Q6 có ba loại: AMA Studio (diện tích tim tường 28,60–33,47 m²), MIRA 1PN+ (47,44 m²) và VITA 2PN (67,93–69,68 m²). Tháp Q7 bổ sung căn ARIA 3PN (79,18–80,96 m² tim tường) cho gia đình nhiều thế hệ hoặc nhóm bạn. Ngoài ra, dự án giới thiệu dòng Aqua Home gắn với trải nghiệm mặt nước và các sản phẩm thương mại.',
    },
    { t: 'p', text: 'Cả bốn dòng căn đều có ban công và bồn tắm nằm. Chọn từng loại căn để xem bản vẽ layout, diện tích theo tháp và gợi ý sử dụng.' },
    { t: 'unitCards' },
    { t: 'h2', text: 'Pháp lý dự án QTOPIA' },
    {
      t: 'p',
      text: 'Khu đất 73.842 m² có nguồn gốc từ đấu giá quyền sử dụng đất (QĐ 817/QĐ-UBND ngày 08/4/2019 của UBND tỉnh Bà Rịa – Vũng Tàu, được điều chỉnh bởi QĐ 3594/QĐ-UBND và QĐ 1812/QĐ-UBND). Quy hoạch chi tiết 1/500 được UBND xã Phước Hải phê duyệt ngày 24/12/2025 và dự án được cấp Giấy chứng nhận đăng ký đầu tư ngày 10/06/2026. Giấy phép xây dựng, văn bản đủ điều kiện kinh doanh và mẫu hợp đồng mua bán sẽ được cập nhật khi chủ đầu tư công bố.',
    },
    {
      t: 'p',
      text: 'Căn hộ tại QTOPIA thuộc loại hình căn hộ du lịch trên đất thương mại dịch vụ. Người mua nên kiểm tra kỹ hình thức và thời hạn sở hữu ghi trong hợp đồng, quy định quản lý vận hành và các điều khoản cho thuê trước khi ký kết.',
    },
    { t: 'h2', text: 'QTOPIA phù hợp với ai?' },
    {
      t: 'ul',
      items: [
        'Gia đình ở TP.HCM muốn có “nhà Sài Gòn có biển” để nghỉ cuối tuần mà không phải đi xa.',
        'Cặp đôi và nhóm bạn trẻ thích giải trí về đêm, âm nhạc, hồ bơi và sự kiện.',
        'Người tìm tài sản “2 trong 1”: vừa dùng để nghỉ dưỡng, vừa có thể cho thuê khi không sử dụng (không có cam kết lợi nhuận).',
        'Người muốn bắt đầu sở hữu bất động sản ven biển với số vốn ban đầu khoảng 10% giá trị căn.',
      ],
    },
    { t: 'h2', text: 'Vì sao nên chọn QTOPIA Phước Hải?' },
    {
      t: 'ol',
      items: [
        'Vị trí trước biển, sau núi, gần rừng trên cung đường du lịch Long Hải – Phước Hải – Hồ Tràm, cách TP.HCM khoảng 75 phút.',
        'Mô hình “thành phố cuối tuần” với 29 tiện ích: hồ bơi vô cực, công viên nước, sàn DJ, phố thương mại, khu thể thao.',
        'Căn hộ nhỏ gọn, dễ dùng và dễ cho thuê; mọi căn đều có bồn tắm nằm và ban công.',
        'Ngưỡng vốn thấp: Studio từ 1,195 tỷ đồng, ký hợp đồng mua bán với 10%.',
        'Pháp lý đã có quyết định đấu giá đất, quy hoạch 1/500 và Giấy chứng nhận đăng ký đầu tư.',
      ],
    },
    { t: 'h2', text: 'Tiến độ mới nhất' },
    {
      t: 'p',
      text: 'Đầu tháng 11/2026, sa bàn và căn hộ mẫu đã ra mắt tại Sales Gallery ở phường Bình Trưng, TP.HCM; tại Phước Hải, Quảng trường Trạm Quậy, Q Mart và Club House đã hình thành, Trạm Quậy khai trương theo lịch ngày 07/11/2026. Xem dòng thời gian đầy đủ ở trang tiến độ.',
    },
    related('/tong-quan'),
  ],
  faqs: [
    {
      q: 'Chủ đầu tư dự án QTOPIA Phước Hải là ai?',
      a: 'Dự án do Phát Đạt Corporation phát triển; pháp nhân chủ đầu tư là Công ty Cổ phần Đầu tư Serenity, được cấp Giấy chứng nhận đăng ký đầu tư ngày 10/06/2026.',
    },
    {
      q: 'QTOPIA có quy mô bao nhiêu?',
      a: 'Tổng diện tích khu đất 73.842 m² (khoảng 7,38 ha), mật độ xây dựng tối đa 25%, hệ số sử dụng đất tối đa 4,02, tổ chức thành khu biển và khu núi.',
    },
    {
      q: 'QTOPIA có những loại căn hộ nào?',
      a: 'AMA Studio, MIRA 1PN+, VITA 2PN tại tháp Q5–Q6; tháp Q7 có thêm ARIA 3PN. Dự án còn giới thiệu dòng Aqua Home và sản phẩm thương mại.',
    },
    {
      q: 'Pháp lý QTOPIA đã có những văn bản nào?',
      a: 'Quyết định công nhận kết quả đấu giá đất (QĐ 817/QĐ-UBND năm 2019), quy hoạch chi tiết 1/500 (QĐ 3636/QĐ-UBND ngày 24/12/2025) và Giấy chứng nhận đăng ký đầu tư (10/06/2026). Giấy phép xây dựng đang được cập nhật.',
    },
  ],
}

/* ============================================================
   /vi-tri
   ============================================================ */
const viTri = {
  blocks: [
    { t: 'h2', text: 'Địa chỉ dự án QTOPIA Phước Hải' },
    {
      t: 'p',
      text: `QTOPIA nằm tại ${PROJECT_ADDRESS}. Khi tìm trên bản đồ, nên tìm kèm từ khoá “Phước Hải”, “Võ Thị Sáu” hoặc “Tỉnh lộ 44A” để không nhầm với đường Võ Thị Sáu ở trung tâm TP.HCM.`,
    },
    { t: 'map' },
    { t: 'h2', text: 'Thế đất trước biển, sau núi, gần rừng' },
    {
      t: 'p',
      text: 'Phía trước dự án là biển Phước Hải với bãi cát dài và làng chài truyền thống; phía sau là núi Minh Đạm với rừng xanh. Thế đất “trước biển – sau núi – gần rừng” giúp QTOPIA có cả không khí biển lẫn cảnh quan núi rừng, điều hiếm thấy ở các khu nghỉ dưỡng gần TP.HCM. Tầm nhìn thực tế của từng căn phụ thuộc tháp, tầng và hướng căn.',
    },
    { t: 'h2', text: 'Thời gian di chuyển từ QTOPIA đến các điểm chính' },
    {
      t: 'table',
      caption: 'Thời gian di chuyển tham khảo từ QTOPIA (theo tài liệu giới thiệu dự án)',
      head: ['Điểm đến', 'Thời gian tham khảo', 'Ghi chú'],
      rows: [
        ['Quảng trường Phước Hải', 'Khoảng 2 phút', 'Trung tâm sinh hoạt, chợ và dịch vụ của Phước Hải'],
        ['Hồ Tràm', 'Khoảng 19 phút', 'Theo cung đường biển về phía Đông'],
        ['Sân bay quốc tế Long Thành', 'Khoảng 30 phút', 'Qua hệ thống cao tốc kết nối'],
        ['Bà Rịa – Vũng Tàu', 'Khoảng 30 phút', 'Theo Tỉnh lộ 44A và trục ven biển'],
        ['Trung tâm TP.HCM', 'Khoảng 75 phút', 'Qua cao tốc TP.HCM – Long Thành và cao tốc Biên Hòa – Vũng Tàu'],
      ],
    },
    { t: 'note', text: 'Thời gian là số liệu tham khảo; thực tế phụ thuộc điểm xuất phát, giờ cao điểm và tình trạng khai thác của từng đoạn đường.' },
    { t: 'h2', text: 'Từ TP.HCM đi QTOPIA Phước Hải bằng đường nào?' },
    { t: 'h3', text: 'Lộ trình 1: cao tốc TP.HCM – Long Thành và cao tốc Biên Hòa – Vũng Tàu' },
    {
      t: 'p',
      text: 'Từ trung tâm TP.HCM đi cao tốc TP.HCM – Long Thành – Dầu Giây, rẽ sang cao tốc Biên Hòa – Vũng Tàu hoặc Quốc lộ 51 hướng Bà Rịa. Từ Bà Rịa đi theo Tỉnh lộ 44A qua Long Hải đến Phước Hải. Đây là lộ trình thuận tiện nhất khi các đoạn cao tốc đã thông xe đồng bộ.',
    },
    { t: 'h3', text: 'Lộ trình 2: Quốc lộ 51 truyền thống' },
    {
      t: 'p',
      text: 'Đi theo Quốc lộ 51 qua Biên Hòa – Long Thành – Phú Mỹ đến Bà Rịa, sau đó nối vào Tỉnh lộ 44A ra biển Long Hải – Phước Hải. Lộ trình quen thuộc với người đi Vũng Tàu, phù hợp khi cần ghé các điểm dọc Quốc lộ 51.',
    },
    { t: 'h3', text: 'Lộ trình 3: qua cao tốc Bến Lức – Long Thành' },
    {
      t: 'p',
      text: 'Với khách xuất phát từ khu Nam và Tây Nam TP.HCM, có thể đi cao tốc Bến Lức – Long Thành để nối vào hướng Long Thành, sau đó tiếp tục theo cao tốc Biên Hòa – Vũng Tàu hoặc Quốc lộ 51 về Bà Rịa và Phước Hải, tránh đi xuyên nội đô.',
    },
    { t: 'h2', text: 'Hạ tầng giúp kéo biển Phước Hải lại gần thành phố' },
    {
      t: 'ul',
      items: [
        'Sân bay quốc tế Long Thành: cửa ngõ hàng không mới của vùng, cách dự án khoảng 30 phút.',
        'Cao tốc TP.HCM – Long Thành – Dầu Giây và cao tốc Biên Hòa – Vũng Tàu: rút ngắn thời gian từ TP.HCM và Đồng Nai ra biển.',
        'Tỉnh lộ 44A (đường Võ Thị Sáu): cung đường ven biển nối Long Hải – Phước Hải – Hồ Tràm.',
        'Cụm cảng Cái Mép – Thị Vải: cảng nước sâu của khu vực, thúc đẩy kinh tế và dịch vụ vùng.',
      ],
    },
    { t: 'h2', text: 'Tiện ích theo bán kính quanh QTOPIA' },
    {
      t: 'table',
      caption: 'Các điểm đến quanh QTOPIA theo khoảng cách',
      head: ['Bán kính', 'Điểm đến tiêu biểu'],
      rows: [
        ['Đi bộ / vài phút', 'Bãi biển Phước Hải, Quảng trường Phước Hải, chợ và hàng quán địa phương'],
        ['10–20 phút', 'Biển Long Hải, núi Minh Đạm, Hồ Tràm'],
        ['Khoảng 30 phút', 'Bà Rịa – Vũng Tàu, sân bay Long Thành'],
        ['Khoảng 75 phút', 'Trung tâm TP.HCM'],
      ],
    },
    {
      t: 'p',
      text: 'Nhờ vị trí trên cung đường du lịch ven biển, khách lưu trú tại QTOPIA có thể kết hợp trải nghiệm trong dự án với tắm biển, hải sản làng chài, leo núi Minh Đạm hay nghỉ dưỡng ở Hồ Tràm trong cùng một chuyến đi.',
    },
    related('/vi-tri'),
  ],
  faqs: [
    {
      q: 'Dự án QTOPIA nằm ở đâu?',
      a: `QTOPIA nằm tại ${PROJECT_ADDRESS}.`,
    },
    {
      q: 'Từ TP.HCM đến QTOPIA mất bao lâu?',
      a: 'Khoảng 75 phút từ trung tâm TP.HCM theo tài liệu giới thiệu, qua cao tốc TP.HCM – Long Thành và cao tốc Biên Hòa – Vũng Tàu. Thời gian thực tế tuỳ giờ đi và điểm xuất phát.',
    },
    {
      q: 'QTOPIA cách sân bay Long Thành bao xa?',
      a: 'Khoảng 30 phút di chuyển theo tài liệu giới thiệu dự án.',
    },
    {
      q: 'Từ QTOPIA ra biển có xa không?',
      a: 'Dự án nằm mặt tiền đường ven biển Võ Thị Sáu tại Phước Hải, cách Quảng trường Phước Hải khoảng 2 phút. Lối ra bãi tắm cụ thể nên khảo sát thực tế.',
    },
  ],
}

/* ============================================================
   /tien-ich
   ============================================================ */
const amenityDesc = {
  'Quậy Beach': 'Bãi biển hoạt động của dự án, nơi tổ chức trò chơi bãi biển, nhạc và sự kiện cuối tuần.',
  'Nhà hàng Sunset': 'Nhà hàng hướng biển để ngắm hoàng hôn, phục vụ bữa tối cho gia đình và nhóm bạn.',
  'Q.Club': 'Câu lạc bộ bãi biển với quầy bar và khu lounge, kết nối hoạt động ngày và đêm.',
  'Quảng trường biển': 'Không gian mở để tổ chức lễ hội, biểu diễn ngoài trời và hoạt động cộng đồng.',
  'Biểu tượng chụp ảnh': 'Điểm check-in mang nhận diện QTOPIA tại khu Quậy Station.',
  'Khách sạn quốc tế': 'Khối khách sạn mang thương hiệu quốc tế, phục vụ khách lưu trú ngắn ngày.',
  'Cổng chào Wonder Gate': 'Cổng chào biểu tượng dẫn vào cụm Ocean Galaxy.',
  'Đường dạo bộ cảnh quan': 'Lối dạo xuyên qua cây xanh và mặt nước, nối các khu tiện ích.',
  'Hồ bơi Galaxy': 'Hồ bơi trung tâm của Ocean Galaxy, sôi động cả ngày lẫn tối.',
  'Quậy bar Galaxy': 'Quầy bar cạnh hồ bơi phục vụ đồ uống và nhạc.',
  'Sàn DJ Ocean': 'Sân khấu DJ ngoài trời, điểm nhấn của nhịp sống đêm tại QTOPIA.',
  'Hồ bơi vô cực': 'Hồ bơi tràn bờ cho trải nghiệm thư giãn với tầm nhìn mở.',
  'Ocean Lounge': 'Khu lounge thư giãn với ghế nằm và không gian nghỉ ngơi.',
  'Tủ đồ cá nhân': 'Khu locker gửi đồ tiện lợi cho khách sử dụng hồ bơi và công viên nước.',
  'Con đường nước': 'Lối dạo có mặt nước và hiệu ứng, tạo cảnh quan vui mắt cho trẻ em và gia đình.',
  'Khu vui chơi Aqua Funny Park': 'Công viên nước với cầu trượt và khu chơi nước cho trẻ em và người lớn.',
  'Biểu tượng Kraken': 'Tác phẩm điêu khắc bạch tuộc khổng lồ – điểm chụp ảnh nổi bật của dự án.',
  'Phố Wyndham': 'Dãy dịch vụ gắn với khối khách sạn, phục vụ ẩm thực và mua sắm.',
  'Phố thương mại Ocean Galaxy': 'Phố mua sắm, ẩm thực và dịch vụ hoạt động đến khuya.',
  'Phố thương mại Oasis Resort': 'Dãy cửa hàng, quán cà phê và dịch vụ phục vụ cư dân, du khách khu Oasis.',
  'Hồ bơi Oasis': 'Hồ bơi thư giãn giữa vườn nhiệt đới, yên tĩnh hơn khu Galaxy.',
  'Quậy bar Oasis': 'Quầy bar cạnh hồ bơi Oasis cho những buổi chiều chậm rãi.',
  'Sân tắm nắng': 'Khu ghế tắm nắng bên hồ bơi.',
  'Sân chơi nước Dolphin': 'Sân chơi nước dành cho trẻ nhỏ, chủ đề cá heo.',
  'Sân chơi khô Octo': 'Sân chơi vận động không có nước cho trẻ em.',
  'Tổ hợp thể thao': 'Khu thể thao ngoài trời gồm Outdoor Gym, sân bóng rổ, sân Pickleball và sân đa năng.',
  'Vườn hoa Romantic Garden': 'Vườn hoa cảnh quan cho dạo bộ, chụp ảnh và các buổi hẹn hò.',
  'Quầy bar & sân hiên Green Terrace': 'Sân hiên xanh với quầy bar nhẹ để ngồi thư giãn.',
  'Bồn sục Jacuzzi': 'Bồn sục nước ấm kín đáo (Hidden Jacuzzi) để thư giãn sau một ngày vui chơi.',
}

const tienIch = {
  blocks: [
    { t: 'h2', text: 'Tổng quan hệ tiện ích QTOPIA Phước Hải' },
    {
      t: 'p',
      text: 'Theo mặt bằng tiện ích của dự án, QTOPIA có 29 hạng mục tiện ích ngoài trời chia vào ba cụm Quậy Station, Ocean Galaxy và Oasis Resort, cùng các không gian thư giãn trên tầng mái từng tháp. Mục tiêu là để khách “không cần rời dự án vẫn trọn một kỳ nghỉ”: buổi sáng bơi và tắm nắng, buổi chiều cho trẻ chơi công viên nước, buổi tối ra quảng trường biển, sàn DJ và phố ẩm thực.',
    },
    {
      t: 'table',
      caption: 'Danh mục tiện ích theo từng khu tại QTOPIA',
      head: ['Khu', 'Số hạng mục', 'Tiện ích tiêu biểu'],
      rows: [
        ['Quậy Station', '6', 'Quậy Beach, nhà hàng Sunset, Q.Club, quảng trường biển, khách sạn quốc tế'],
        ['Ocean Galaxy', '13', 'Hồ bơi Galaxy, hồ bơi vô cực, sàn DJ Ocean, Aqua Funny Park, biểu tượng Kraken'],
        ['Oasis Resort', '10', 'Hồ bơi Oasis, sân chơi Dolphin & Octo, tổ hợp thể thao, Romantic Garden, Jacuzzi'],
        ['Tầng mái', 'Theo từng tháp', 'Ocean Lounge (Q5), Galaxy Dome (Q6), Sunset Chill Lounge, Sunrise Yoga Deck (Q7)'],
      ],
    },
    {
      t: 'amenities',
      descriptions: amenityDesc,
      image: {
        src: '/images/mat-bang-tien-ich-tong-the.webp',
        alt: 'Mặt bằng tiện ích tổng thể dự án QTOPIA Phước Hải với 29 tiện ích đánh số thuộc ba khu Quậy Station ven biển, Ocean Galaxy ở trung tâm và Oasis Resort, cùng các điểm Drop Off, dòng Aqua River và đường ven biển 22 m',
        caption: 'Mặt bằng tiện ích tổng thể QTOPIA – số thứ tự trên ảnh tương ứng với danh sách 29 tiện ích bên dưới.',
      },
      intro: 'Trên mặt bằng tổng thể, Quậy Station nằm sát bãi biển, bên kia đường ven biển rộng 22 m; Ocean Galaxy là quần thể hồ bơi và giải trí ở trung tâm, được các tháp căn hộ bao quanh; Oasis Resort trải dọc phía trong với hồ bơi, sân chơi trẻ em, vườn và tổ hợp thể thao. Các điểm Drop Off bố trí quanh khu giúp xe đưa đón tiếp cận từng tháp, còn dòng Aqua River chạy quanh chân các toà tạo cảnh quan mặt nước.',
    },
    { t: 'h2', text: 'Tiện ích tầng mái các tháp căn hộ' },
    {
      t: 'p',
      text: 'Mỗi tháp có không gian thư giãn riêng trên tầng mái để ngắm biển và núi. Tài liệu dự án minh hoạ sân thượng Q5 với Ocean Lounge và Q6 với Galaxy Dome; tháp Q7 giới thiệu Sunset Chill Lounge để ngắm hoàng hôn, Sunrise Yoga Deck cho buổi tập sáng, Panorama Deck với tầm nhìn toàn cảnh và Reading Cabana cho những giờ đọc sách yên tĩnh.',
    },
    { t: 'h2', text: 'Một ngày ở QTOPIA: gợi ý lịch trải nghiệm' },
    {
      t: 'table',
      caption: 'Gợi ý lịch trải nghiệm một ngày tại QTOPIA',
      head: ['Khung giờ', 'Hoạt động gợi ý', 'Khu'],
      rows: [
        ['Sáng sớm', 'Yoga trên tầng mái, đi dạo biển Phước Hải', 'Tầng mái Q7, Quậy Beach'],
        ['Buổi sáng', 'Bơi, tắm nắng, cho trẻ chơi sân Dolphin và Octo', 'Oasis Resort'],
        ['Buổi trưa – chiều', 'Công viên nước Aqua Funny Park, thể thao', 'Ocean Galaxy, Oasis Resort'],
        ['Hoàng hôn', 'Ăn tối tại nhà hàng Sunset, ngồi lounge tầng mái', 'Quậy Station, tầng mái'],
        ['Buổi tối', 'Quảng trường biển, sàn DJ Ocean, phố thương mại', 'Quậy Station, Ocean Galaxy'],
      ],
    },
    { t: 'h2', text: 'Tiện ích cho từng nhóm khách' },
    { t: 'h3', text: 'Gia đình có trẻ nhỏ' },
    {
      t: 'p',
      text: 'Sân chơi nước Dolphin, sân chơi khô Octo và công viên nước Aqua Funny Park tập trung ở các khu gần nhau, giúp bố mẹ dễ quan sát con. Hồ bơi Oasis yên tĩnh hơn, phù hợp ông bà và trẻ nhỏ.',
    },
    { t: 'h3', text: 'Cặp đôi' },
    {
      t: 'p',
      text: 'Vườn hoa Romantic Garden, nhà hàng Sunset, bồn sục Jacuzzi và các lounge tầng mái tạo nên những khoảng riêng tư để hẹn hò bên biển.',
    },
    { t: 'h3', text: 'Nhóm bạn trẻ' },
    {
      t: 'p',
      text: 'Sàn DJ Ocean, Quậy bar Galaxy, Q.Club và quảng trường biển là nơi “quậy” đúng tinh thần thương hiệu, cùng hồ bơi Galaxy và phố ẩm thực mở đến khuya.',
    },
    { t: 'h3', text: 'Người cần nghỉ ngơi, chăm sóc sức khoẻ' },
    {
      t: 'p',
      text: 'Tổ hợp thể thao, Sunrise Yoga Deck, Reading Cabana và đường dạo bộ cảnh quan phù hợp với nhịp nghỉ chậm, tái tạo năng lượng.',
    },
    { t: 'note', text: 'Tên, vị trí và quy mô tiện ích theo mặt bằng tiện ích và tài liệu giới thiệu; có thể được chủ đầu tư điều chỉnh theo thực tế thi công và vận hành.' },
    related('/tien-ich'),
  ],
  faqs: [
    {
      q: 'QTOPIA có bao nhiêu tiện ích?',
      a: 'Mặt bằng tiện ích thể hiện 29 hạng mục ngoài trời chia vào ba khu Quậy Station (6), Ocean Galaxy (13) và Oasis Resort (10), cùng không gian tầng mái từng tháp.',
    },
    {
      q: 'QTOPIA có công viên nước không?',
      a: 'Có. Khu vui chơi Aqua Funny Park nằm trong cụm Ocean Galaxy, bên cạnh hồ bơi Galaxy và con đường nước.',
    },
    {
      q: 'Tiện ích nào dành cho trẻ em tại QTOPIA?',
      a: 'Aqua Funny Park, sân chơi nước Dolphin, sân chơi khô Octo và con đường nước.',
    },
    {
      q: 'Khu giải trí về đêm của QTOPIA ở đâu?',
      a: 'Tập trung tại Ocean Galaxy (sàn DJ Ocean, Quậy bar Galaxy, phố thương mại) và Quậy Station (Q.Club, quảng trường biển).',
    },
  ],
}

/* ============================================================
   /tien-ich-xung-quanh
   ============================================================ */
const tienIchXungQuanh = {
  blocks: [
    { t: 'h2', text: 'Phước Hải – thị trấn biển yên bình trên cung đường du lịch' },
    {
      t: 'p',
      text: 'Phước Hải là vùng biển có làng chài lâu đời, nổi tiếng với hải sản tươi và nhịp sống chậm. Nằm giữa Long Hải và Hồ Tràm, khu vực này là một phần của hành trình du lịch ven biển phía Đông TP.HCM. Từ QTOPIA, khách có thể dễ dàng tiếp cận các điểm đến biển, núi, ẩm thực địa phương cũng như các đô thị dịch vụ của vùng.',
    },
    { t: 'map' },
    { t: 'h2', text: 'Điểm đến biển và du lịch quanh QTOPIA' },
    {
      t: 'table',
      caption: 'Điểm đến biển và du lịch gần QTOPIA',
      head: ['Điểm đến', 'Thời gian tham khảo', 'Trải nghiệm'],
      rows: [
        ['Quảng trường Phước Hải', 'Khoảng 2 phút', 'Trung tâm sinh hoạt, chợ, quán ăn địa phương'],
        ['Bãi biển và làng chài Phước Hải', 'Liền kề', 'Tắm biển, xem thuyền về, mua hải sản tươi'],
        ['Biển Long Hải', 'Gần, theo TL44A', 'Bãi tắm quen thuộc, khu nghỉ dưỡng và hàng quán'],
        ['Núi Minh Đạm', 'Phía sau dự án', 'Leo núi, ngắm toàn cảnh biển, khu di tích'],
        ['Hồ Tràm', 'Khoảng 19 phút', 'Dải biển nghỉ dưỡng với nhiều resort'],
        ['Bà Rịa – Vũng Tàu', 'Khoảng 30 phút', 'Thành phố biển, ẩm thực, giải trí và dịch vụ đô thị'],
      ],
    },
    { t: 'h2', text: 'Đô thị và dịch vụ trong vùng' },
    {
      t: 'ul',
      items: [
        'Bà Rịa: đô thị hành chính – dịch vụ của khu vực với bệnh viện, trường học, trung tâm thương mại.',
        'Thị trấn Phước Hải và Long Hải: chợ, ngân hàng, trạm y tế, cửa hàng tiện lợi phục vụ nhu cầu hằng ngày.',
        'Biên Hòa: đô thị công nghiệp – dịch vụ phía Bắc tuyến kết nối.',
        'Cần Giờ: vùng sinh thái ven biển phía Tây, kết nối trong tương lai theo quy hoạch hạ tầng vùng.',
      ],
    },
    { t: 'h2', text: 'Giao thông và đầu mối kết nối' },
    {
      t: 'table',
      caption: 'Đầu mối giao thông quanh QTOPIA',
      head: ['Đầu mối', 'Vai trò với QTOPIA'],
      rows: [
        ['Sân bay quốc tế Long Thành (khoảng 30 phút)', 'Đón khách du lịch trong nước và quốc tế'],
        ['Cao tốc TP.HCM – Long Thành – Dầu Giây', 'Trục chính từ TP.HCM ra phía Đông'],
        ['Cao tốc Biên Hòa – Vũng Tàu', 'Rút ngắn thời gian về Bà Rịa và biển'],
        ['Quốc lộ 51', 'Tuyến truyền thống TP.HCM – Bà Rịa – Vũng Tàu'],
        ['Tỉnh lộ 44A (Võ Thị Sáu)', 'Cung đường ven biển Long Hải – Phước Hải – Hồ Tràm'],
        ['Cảng Cái Mép – Thị Vải', 'Cụm cảng nước sâu, động lực kinh tế vùng'],
      ],
    },
    { t: 'h2', text: 'Gợi ý hành trình 2 ngày 1 đêm từ QTOPIA' },
    {
      t: 'ol',
      items: [
        'Ngày 1 – sáng: khởi hành từ TP.HCM, nhận phòng, bơi tại Oasis Resort.',
        'Ngày 1 – chiều: dạo biển Phước Hải, ghé làng chài mua hải sản; hoàng hôn tại nhà hàng Sunset.',
        'Ngày 1 – tối: quảng trường biển và sàn DJ Ocean tại QTOPIA.',
        'Ngày 2 – sáng: leo núi Minh Đạm ngắm bình minh hoặc yoga tầng mái.',
        'Ngày 2 – trưa: ghé Long Hải hoặc Hồ Tràm, sau đó trở về TP.HCM.',
      ],
    },
    { t: 'note', text: 'Thời gian di chuyển là số liệu tham khảo theo brochure hoặc ước lượng theo tuyến đường; vui lòng kiểm tra thực tế trước chuyến đi.' },
    related('/tien-ich-xung-quanh'),
  ],
  faqs: [
    {
      q: 'Gần QTOPIA có những điểm du lịch nào?',
      a: 'Bãi biển và làng chài Phước Hải, biển Long Hải, núi Minh Đạm, Hồ Tràm và thành phố Vũng Tàu.',
    },
    {
      q: 'QTOPIA cách Hồ Tràm bao xa?',
      a: 'Khoảng 19 phút di chuyển theo tài liệu giới thiệu dự án.',
    },
    {
      q: 'Từ QTOPIA đi Vũng Tàu mất bao lâu?',
      a: 'Khoảng 30 phút tới khu vực Bà Rịa – Vũng Tàu theo mặt bằng tiện ích tổng thể của dự án; thời gian thực tế tuỳ điểm đến và giao thông.',
    },
    {
      q: 'Gần QTOPIA có chợ và dịch vụ hằng ngày không?',
      a: 'Có. Quảng trường Phước Hải cách khoảng 2 phút, quanh đó là chợ, quán ăn, ngân hàng và cửa hàng tiện lợi; Bà Rịa là đô thị dịch vụ lớn gần nhất.',
    },
  ],
}

/* ============================================================
   /mat-bang
   ============================================================ */
const matBang = {
  blocks: [
    { t: 'h2', text: 'Tổng mặt bằng dự án QTOPIA' },
    {
      t: 'p',
      text: 'QTOPIA được quy hoạch trên khu đất 73.842 m², chia thành khu biển và khu núi theo quy hoạch chi tiết 1/500. Mật độ xây dựng tối đa 25% giúp phần lớn diện tích dành cho hồ bơi, cảnh quan và tiện ích. Các tháp căn hộ được bố trí bao quanh ba cụm tiện ích Quậy Station, Ocean Galaxy và Oasis Resort, để từ mỗi tháp đều có thể đi bộ tới hồ bơi và khu giải trí.',
    },
    { t: 'h2', text: 'Mặt bằng tầng điển hình tháp Q5 và Q6' },
    {
      t: 'p',
      text: 'Tầng điển hình tháp Q5–Q6 có 38 căn bố trí theo hai dãy hai bên hành lang: 34 căn AMA Studio, 2 căn MIRA 1PN+ ở đầu hồi phía Tây và 2 căn VITA 2PN ở đầu hồi phía Đông. Căn đầu hồi có diện tích lớn hơn và thường có hai mặt thoáng. Bảng dưới đây liệt kê toàn bộ mã căn kèm diện tích sử dụng (SD) và diện tích tim tường (TT).',
    },
    { t: 'floorTable', plan: 'q5-q6' },
    { t: 'note', text: 'SD: diện tích sử dụng (thông thủy). TT: diện tích tính theo tim tường. Số liệu theo bản vẽ mặt bằng tầng điển hình; diện tích chính thức theo hợp đồng mua bán.' },
    { t: 'h2', text: 'Các loại căn hộ QTOPIA và diện tích' },
    {
      t: 'table',
      caption: 'Diện tích các loại căn hộ QTOPIA theo tháp (tài liệu dự án)',
      head: ['Loại căn', 'Tháp', 'Diện tích sử dụng (SD)', 'Diện tích tim tường (TT)'],
      rows: [
        ['AMA Studio', 'Q5–Q6', '25,23 – 30,05 m²', '28,60 – 33,47 m²'],
        ['MIRA 1PN+', 'Q5–Q6', '41,67 m²', '47,44 m²'],
        ['VITA 2PN', 'Q5–Q6', '61,49 – 63,09 m²', '67,93 – 69,68 m²'],
        ['AMA Studio', 'Q7', '25,10 – 29,28 m²', '28,35 – 32,94 m²'],
        ['MIRA 1PN+', 'Q7', '44,65 m²', '48,52 m²'],
        ['VITA 2PN', 'Q7', '56,17 – 56,54 m²', '62,66 – 62,91 m²'],
        ['ARIA 3PN', 'Q7', '71,72 – 73,34 m²', '79,18 – 80,96 m²'],
      ],
    },
    { t: 'h2', text: 'Layout chi tiết từng loại căn hộ QTOPIA' },
    {
      t: 'p',
      text: 'Dưới đây là bản vẽ layout tham khảo của từng loại căn tại tháp Q5–Q6 và Q7 theo tài liệu chủ đầu tư, kèm mô tả công năng từng không gian. Tất cả các loại căn đều có ban công và bồn tắm nằm, một điểm nhấn nghỉ dưỡng của QTOPIA. Bố trí nội thất trong bản vẽ chỉ để minh hoạ; danh mục bàn giao theo hợp đồng.',
    },
    ...unitTypes.map((u) => ({ t: 'unit', ...u })),
    { t: 'note', text: 'Hình ảnh layout, sơ đồ kỹ thuật và bố trí nội thất mang tính minh hoạ theo tài liệu chủ đầu tư, không phải cam kết bàn giao. Thông tin chính thức căn cứ trên hợp đồng mua bán.' },
    { t: 'h2', text: 'Cách đọc mặt bằng và chọn căn phù hợp' },
    {
      t: 'ul',
      items: [
        'So sánh cùng một loại diện tích: SD để biết không gian sử dụng thực, TT để đối chiếu với cách tính trên hợp đồng.',
        'Căn đầu hồi (MIRA, VITA) thường có nhiều mặt thoáng hơn căn giữa dãy.',
        'Xem hướng căn và tầng để đánh giá tầm nhìn biển, núi hoặc hồ bơi; tầm nhìn thực tế cần kiểm tra trên mặt bằng tầng cụ thể.',
        'Nếu mua để cho thuê, căn nhỏ (AMA) dễ khai thác theo đêm; căn 2PN–3PN phù hợp khách gia đình, nhóm.',
      ],
    },
    related('/mat-bang'),
  ],
  faqs: [
    {
      q: 'Một tầng điển hình tháp Q5–Q6 có bao nhiêu căn?',
      a: '38 căn: 34 căn AMA Studio, 2 căn MIRA 1PN+ và 2 căn VITA 2PN.',
    },
    {
      q: 'Căn Studio QTOPIA rộng bao nhiêu m²?',
      a: 'Tại Q5–Q6, AMA Studio có diện tích sử dụng 25,23–30,05 m² (tim tường 28,60–33,47 m²); tại Q7 là 25,10–29,28 m² sử dụng.',
    },
    {
      q: 'Căn 3 phòng ngủ QTOPIA có ở tháp nào?',
      a: 'Căn ARIA 3PN được giới thiệu tại tháp Q7, diện tích sử dụng 71,72–73,34 m² (tim tường 79,18–80,96 m²).',
    },
    {
      q: 'Diện tích SD và TT khác nhau thế nào?',
      a: 'SD là diện tích sử dụng (thông thủy) bên trong căn; TT là diện tích tính theo tim tường, luôn lớn hơn SD. Diện tích chính thức ghi trong hợp đồng mua bán.',
    },
  ],
}

/* ============================================================
   /chinh-sach-ban-hang
   ============================================================ */
const chinhSach = {
  blocks: [
    { t: 'updated' },
    { t: 'h2', text: 'Tóm tắt chính sách bán hàng QTOPIA' },
    {
      t: 'ul',
      items: [
        'Giá căn Studio từ 1,195 tỷ đồng.',
        'Đặt cọc (ký thoả thuận đặt cọc) 50 triệu đồng.',
        'Ký hợp đồng mua bán: thanh toán đủ 10% (phương thức chuẩn và nhanh) hoặc 15% (phương thức vay).',
        'Ba phương thức: thanh toán chuẩn theo tiến độ, thanh toán nhanh 70%, vay ngân hàng.',
        'Vay ngân hàng: hỗ trợ lãi suất 24 tháng hoặc đến khi bàn giao, ân hạn nợ gốc 48 tháng (áp dụng có điều kiện).',
      ],
    },
    { t: 'h2', text: 'Phương thức 1: thanh toán chuẩn theo tiến độ' },
    {
      t: 'table',
      caption: 'Tiến độ thanh toán chuẩn – ví dụ căn Studio 1,195 tỷ',
      head: ['Đợt', 'Thời điểm', 'Tỷ lệ', 'Số tiền ví dụ'],
      rows: [
        ['Đặt cọc', 'T (ký TTĐC)', '50 triệu', '50 triệu'],
        ['Ký HĐMB', 'T+7 ngày', 'Đủ 10%', `${vnd(0.1)} (đã gồm tiền cọc)`],
        ['Các đợt theo tiến độ', 'Từ sau ký HĐMB đến trước bàn giao', 'Bình quân 3,75%/tháng, tổng 60%', `khoảng ${vnd(0.0375)}/tháng`],
        ['Nhận bàn giao', 'Khoảng T+540 ngày', '25% + kinh phí bảo trì', vnd(0.25)],
        ['Nhận sổ', 'Khi bàn giao giấy chứng nhận', '5%', vnd(0.05)],
      ],
    },
    {
      t: 'p',
      text: 'Phương thức chuẩn phù hợp người mua muốn chia nhỏ dòng tiền theo tháng trong thời gian xây dựng, không cần vay ngân hàng.',
    },
    { t: 'h2', text: 'Phương thức 2: thanh toán nhanh 70%' },
    {
      t: 'table',
      caption: 'Tiến độ thanh toán nhanh 70% – ví dụ căn Studio 1,195 tỷ',
      head: ['Đợt', 'Thời điểm', 'Tỷ lệ', 'Số tiền ví dụ'],
      rows: [
        ['Đặt cọc', 'T', '50 triệu', '50 triệu'],
        ['Ký HĐMB', 'T+7 ngày', 'Đủ 10%', vnd(0.1)],
        ['Thanh toán nhanh', 'T+30 ngày', '60%', vnd(0.6)],
        ['Nhận bàn giao', 'Khoảng T+540 ngày', '25%', vnd(0.25)],
        ['Nhận sổ', 'Khi bàn giao giấy chứng nhận', '5%', vnd(0.05)],
      ],
    },
    {
      t: 'p',
      text: 'Phương thức nhanh dành cho khách có sẵn nguồn tiền, thanh toán 70% giá trị trong khoảng một tháng đầu. Mức chiết khấu đi kèm (nếu có) được công bố trong văn bản chính sách của từng đợt bán.',
    },
    { t: 'h2', text: 'Phương thức 3: vay ngân hàng' },
    {
      t: 'table',
      caption: 'Tiến độ thanh toán khi vay ngân hàng – ví dụ căn Studio 1,195 tỷ',
      head: ['Đợt', 'Thời điểm', 'Khách thanh toán', 'Ngân hàng giải ngân'],
      rows: [
        ['Đặt cọc', 'T', '50 triệu', '—'],
        ['Ký HĐMB', 'T+7 ngày', `Đủ 15% (${vnd(0.15)})`, '—'],
        ['Giải ngân đợt 1', 'T+30 ngày', '—', `40% (${vnd(0.4)})`],
        ['Nhận bàn giao', 'Khoảng T+540 ngày', `10% (${vnd(0.1)})`, `30% (${vnd(0.3)})`],
        ['Nhận sổ', 'Khi bàn giao giấy chứng nhận', `5% + KPBT (${vnd(0.05)})`, '—'],
      ],
    },
    {
      t: 'p',
      text: `Với phương thức vay, ngân hàng giải ngân tổng cộng 70% giá trị căn (${vnd(0.7)} với căn Studio 1,195 tỷ). Trong thời gian xây dựng, khách chỉ cần chuẩn bị 15% giá trị căn (${vnd(0.15)}), được hỗ trợ lãi suất 24 tháng hoặc đến khi bàn giao và ân hạn nợ gốc 48 tháng. Điều kiện vay, ngân hàng liên kết và lãi suất sau thời gian hỗ trợ theo thông báo chính thức.`,
    },
    { t: 'h2', text: 'So sánh nhanh ba phương thức' },
    {
      t: 'table',
      caption: 'So sánh ba phương thức thanh toán QTOPIA',
      head: ['Tiêu chí', 'Thanh toán chuẩn', 'Thanh toán nhanh 70%', 'Vay ngân hàng'],
      rows: [
        ['Vốn khi ký HĐMB', '10%', '10%', '15%'],
        ['Vốn tự có trước bàn giao', '70%', '70%', '15%'],
        ['Phù hợp với', 'Dòng tiền đều hằng tháng', 'Có sẵn tiền, muốn ưu đãi', 'Muốn dùng đòn bẩy tài chính'],
        ['Hỗ trợ đi kèm', 'Theo chính sách đợt bán', 'Chiết khấu (nếu có)', 'Hỗ trợ lãi suất, ân hạn gốc'],
      ],
    },
    { t: 'h2', text: 'Cần kiểm tra gì trước khi đặt cọc?' },
    {
      t: 'ul',
      items: [
        'Văn bản chính sách bán hàng có ngày hiệu lực, do chủ đầu tư hoặc đơn vị được uỷ quyền phát hành.',
        'Tài khoản nhận tiền đứng tên chủ đầu tư (hoặc đơn vị được uỷ quyền hợp pháp).',
        'Mẫu thoả thuận đặt cọc, hợp đồng mua bán và điều kiện hoàn cọc.',
        'Giá đã hoặc chưa gồm VAT, kinh phí bảo trì và danh mục nội thất bàn giao.',
        'Quy định cho thuê, phí quản lý và đơn vị vận hành sau bàn giao.',
      ],
    },
    { t: 'note', text: 'Số tiền ví dụ được tính trên giá Studio 1,195 tỷ đồng theo tỷ lệ của chính sách; số liệu chính thức theo văn bản do chủ đầu tư ban hành tại thời điểm giao dịch.' },
    related('/chinh-sach-ban-hang'),
  ],
  faqs: [
    {
      q: 'Mua căn hộ QTOPIA cần bao nhiêu tiền ban đầu?',
      a: `Đặt cọc 50 triệu, khi ký hợp đồng mua bán thanh toán đủ 10% (khoảng ${vnd(0.1)} với căn Studio 1,195 tỷ), hoặc 15% nếu chọn vay ngân hàng.`,
    },
    {
      q: 'QTOPIA có hỗ trợ vay ngân hàng không?',
      a: 'Có. Ngân hàng giải ngân tối đa 70% giá trị căn, hỗ trợ lãi suất 24 tháng hoặc đến khi bàn giao, ân hạn nợ gốc 48 tháng (áp dụng có điều kiện).',
    },
    {
      q: 'Khi nào phải thanh toán 25%?',
      a: 'Đợt 25% được thanh toán khi nhận bàn giao căn hộ, dự kiến khoảng 540 ngày kể từ ngày đặt cọc theo bảng chính sách.',
    },
  ],
}

/* ============================================================
   /gia-ban (trang mới)
   ============================================================ */
const giaBan = {
  blocks: [
    { t: 'updated' },
    { t: 'h2', text: 'Giá bán căn hộ QTOPIA Phước Hải bao nhiêu?' },
    {
      t: 'p',
      text: 'Theo chính sách bán hàng hiện hành, căn hộ AMA Studio tại QTOPIA Phước Hải có giá từ 1,195 tỷ đồng. Giá từng căn phụ thuộc tháp, tầng, hướng, tầm nhìn và diện tích; bảng giá chi tiết theo mã căn được chủ đầu tư phát hành theo từng đợt bán. Bạn có thể để lại thông tin để nhận bảng giá mới nhất kèm giỏ hàng còn trống.',
    },
    { t: 'h2', text: 'Bảng giá căn hộ QTOPIA theo loại căn' },
    {
      t: 'table',
      caption: `Bảng giá tham khảo căn hộ QTOPIA (cập nhật ${CONTENT_UPDATED})`,
      head: ['Loại căn', 'Tháp', 'Diện tích sử dụng', 'Diện tích tim tường', 'Giá tham khảo'],
      rows: [
        ['AMA Studio', 'Q5–Q6', '25,23 – 30,05 m²', '28,60 – 33,47 m²', 'Từ 1,195 tỷ'],
        ['MIRA 1PN+', 'Q5–Q6', '41,67 m²', '47,44 m²', 'Nhận bảng giá'],
        ['VITA 2PN', 'Q5–Q6', '61,49 – 63,09 m²', '67,93 – 69,68 m²', 'Nhận bảng giá'],
        ['AMA Studio', 'Q7', '25,10 – 29,28 m²', '28,35 – 32,94 m²', 'Nhận bảng giá'],
        ['MIRA 1PN+', 'Q7', '44,65 m²', '48,52 m²', 'Nhận bảng giá'],
        ['VITA 2PN', 'Q7', '56,17 – 56,54 m²', '62,66 – 62,91 m²', 'Nhận bảng giá'],
        ['ARIA 3PN', 'Q7', '71,72 – 73,34 m²', '79,18 – 80,96 m²', 'Nhận bảng giá'],
      ],
    },
    { t: 'note', text: 'Giá “từ” là mức thấp nhất đã công bố cho loại căn. Các loại căn ghi “Nhận bảng giá” sẽ được cập nhật khi chủ đầu tư công bố; giá chính thức theo bảng giá có hiệu lực tại thời điểm giao dịch.' },
    { t: 'h2', text: 'Chi phí sở hữu căn Studio 1,195 tỷ: ví dụ tính toán' },
    {
      t: 'table',
      caption: 'Dòng tiền ví dụ cho căn AMA Studio giá 1,195 tỷ đồng',
      head: ['Khoản', 'Tỷ lệ', 'Thanh toán chuẩn', 'Vay ngân hàng'],
      rows: [
        ['Đặt cọc', '—', '50 triệu', '50 triệu'],
        ['Ký HĐMB (gồm cọc)', '10% / 15%', vnd(0.1), vnd(0.15)],
        ['Trong thời gian xây dựng', '60% / 40% ngân hàng', `${vnd(0.6)} (≈ ${vnd(0.0375)}/tháng)`, `${vnd(0.4)} do ngân hàng giải ngân`],
        ['Nhận bàn giao', '25% / 10% + 30% ngân hàng', vnd(0.25), `${vnd(0.1)} khách + ${vnd(0.3)} ngân hàng`],
        ['Nhận sổ', '5%', vnd(0.05), vnd(0.05)],
        ['Vốn tự có tới khi bàn giao', '', vnd(0.95), vnd(0.25)],
      ],
    },
    {
      t: 'p',
      text: 'Ngoài giá căn, người mua cần dự trù kinh phí bảo trì (thanh toán khi bàn giao), thuế phí khi nhận giấy chứng nhận và phí quản lý vận hành hằng tháng. Nếu vay, cần tính thêm lãi vay sau thời gian được hỗ trợ lãi suất.',
    },
    { t: 'h2', text: 'Yếu tố ảnh hưởng đến giá từng căn' },
    {
      t: 'ul',
      items: [
        'Tháp và vị trí trong khu: gần biển, gần cụm tiện ích Ocean Galaxy hay Oasis Resort.',
        'Tầng và tầm nhìn: tầng cao, hướng biển hoặc hướng núi Minh Đạm thường có giá cao hơn.',
        'Loại căn và diện tích: căn đầu hồi (MIRA, VITA) có nhiều mặt thoáng.',
        'Thời điểm mua: các đợt mở bán đầu thường có chính sách ưu đãi tốt hơn.',
        'Phương thức thanh toán: thanh toán nhanh có thể kèm chiết khấu theo từng đợt.',
      ],
    },
    { t: 'h2', text: 'So sánh mức vốn đầu tư căn hộ biển' },
    {
      t: 'p',
      text: 'Với giá từ 1,195 tỷ đồng và vốn ban đầu khoảng 10% (gần 120 triệu đồng), căn Studio QTOPIA là một trong những lựa chọn có ngưỡng vốn thấp để sở hữu căn hộ du lịch ven biển cách TP.HCM khoảng 75 phút. Khi so sánh với các dự án khác, nên đặt cạnh nhau cùng loại diện tích (SD hoặc TT), tiêu chuẩn bàn giao, pháp lý và phí vận hành, thay vì chỉ so tổng giá.',
    },
    { t: 'h2', text: 'Cách nhận bảng giá QTOPIA mới nhất' },
    {
      t: 'ol',
      items: [
        'Để lại họ tên và số điện thoại ở biểu mẫu bên dưới hoặc gọi hotline.',
        'Nhận bảng giá theo mã căn, giỏ hàng còn trống và chính sách thanh toán hiện hành.',
        'Đặt lịch tham quan sa bàn, căn hộ mẫu và khu dự án tại Phước Hải.',
      ],
    },
    { t: 'note', text: 'Website là trang thông tin giới thiệu dự án, chưa phải website chính thức của chủ đầu tư. Giá và chính sách áp dụng theo văn bản chính thức tại thời điểm giao dịch.' },
    related('/gia-ban'),
  ],
  faqs: [
    {
      q: 'Giá căn hộ QTOPIA Phước Hải bao nhiêu?',
      a: 'Căn AMA Studio có giá từ 1,195 tỷ đồng. Giá các loại 1PN+, 2PN, 3PN và từng mã căn theo bảng giá chính thức của từng đợt bán.',
    },
    {
      q: 'Giá QTOPIA đã gồm VAT và nội thất chưa?',
      a: 'Cần đối chiếu bảng giá chính thức: bảng giá sẽ ghi rõ giá đã hoặc chưa gồm VAT, kinh phí bảo trì và tiêu chuẩn nội thất bàn giao.',
    },
    {
      q: 'Cần bao nhiêu tiền để mua căn Studio QTOPIA?',
      a: `Khoảng ${vnd(0.1)} (10%, đã gồm 50 triệu tiền cọc) khi ký hợp đồng mua bán; nếu vay ngân hàng thì cần 15% (${vnd(0.15)}) trước bàn giao.`,
    },
    {
      q: 'Làm sao nhận bảng giá QTOPIA theo từng căn?',
      a: 'Để lại thông tin ở biểu mẫu hoặc gọi hotline để nhận bảng giá theo mã căn, giỏ hàng và chính sách mới nhất.',
    },
  ],
}

/* ============================================================
   /faq (trang mới) — nhóm câu hỏi; mỗi nhóm có h2, câu hỏi là h3
   ============================================================ */
export const faqGroups = [
  {
    title: 'Tổng quan dự án QTOPIA',
    items: [
      ...tongQuan.faqs,
      {
        q: 'QTOPIA có phải tên mới của Quậy Complex không?',
        a: 'Dự án từng được truyền thông với tên gọi liên quan đến “Quậy” (Quậy Complex); tên thương mại hiện tại là QTOPIA, với thông điệp “Quậy your way”.',
      },
      {
        q: 'Vì sao QTOPIA được gọi là “thành phố cuối tuần”?',
        a: 'Vì dự án tập trung vào trải nghiệm nghỉ ngắn ngày cho người TP.HCM: cách trung tâm khoảng 75 phút, có đủ hồ bơi, công viên nước, giải trí đêm, ẩm thực và lưu trú trong một tổ hợp.',
      },
    ],
  },
  { title: 'Vị trí và kết nối', items: [...viTri.faqs, ...tienIchXungQuanh.faqs] },
  { title: 'Tiện ích', items: tienIch.faqs },
  { title: 'Mặt bằng và căn hộ', items: matBang.faqs },
  { title: 'Giá bán và thanh toán', items: [...giaBan.faqs, ...chinhSach.faqs] },
  ...p1FaqGroups,
  {
    title: 'Pháp lý, sở hữu và vận hành',
    items: [
      ...legalFaqs,
      {
        q: 'Căn hộ QTOPIA là loại hình gì?',
        a: 'Căn hộ du lịch trên đất thương mại dịch vụ. Hình thức và thời hạn sở hữu cụ thể được ghi trong hợp đồng mua bán và hồ sơ pháp lý của dự án.',
      },
      {
        q: 'Có thể cho thuê căn hộ QTOPIA không?',
        a: 'Dự án hướng tới “tài sản 2 trong 1”: vừa nghỉ dưỡng, vừa cho thuê. Phương án vận hành và phí dịch vụ theo quy định của đơn vị vận hành; không có cam kết lợi nhuận.',
      },
      {
        q: 'Đơn vị nào sẽ vận hành QTOPIA?',
        a: 'Brochure dự án nhắc tới CBRE, Wyndham Hotels & Resorts và Vivora trong phần vận hành; phạm vi vai trò từng đơn vị theo văn bản chính thức của chủ đầu tư.',
      },
    ],
  },
  {
    title: 'Tham quan và tư vấn',
    items: [
      {
        q: 'Có thể tham quan nhà mẫu QTOPIA ở đâu?',
        a: 'Sa bàn và căn hộ mẫu được giới thiệu tại Sales Gallery ở phường Bình Trưng, TP.HCM từ ngày 24/10/2026; vui lòng đặt lịch trước qua hotline.',
      },
      {
        q: 'Làm sao nhận tài liệu và bảng giá QTOPIA?',
        a: 'Để lại thông tin ở biểu mẫu đăng ký hoặc liên hệ hotline để nhận brochure, mặt bằng, bảng giá và chính sách mới nhất.',
      },
    ],
  },
]

const faqPage = {
  blocks: [
    {
      t: 'p',
      text: 'Trang tổng hợp các câu hỏi thường gặp về dự án QTOPIA Phước Hải, chia theo chủ đề: tổng quan, vị trí, tiện ích, mặt bằng, giá bán, pháp lý và tham quan. Cuối trang có liên kết tới các trang chi tiết để bạn tìm hiểu sâu hơn.',
    },
    { t: 'faqGroups' },
    related('/faq'),
  ],
}

export const seoContent = {
  '/tong-quan': tongQuan,
  '/vi-tri': viTri,
  '/tien-ich': tienIch,
  '/tien-ich-xung-quanh': tienIchXungQuanh,
  '/mat-bang': matBang,
  '/chinh-sach-ban-hang': chinhSach,
  '/gia-ban': giaBan,
  '/faq': faqPage,
  ...p1Content,
}

/** Danh sách FAQ dùng cho FAQPage JSON-LD của từng trang (khớp nội dung hiển thị). */
export function pageFaqs(path) {
  if (path === '/faq') return faqGroups.flatMap((g) => g.items)
  return seoContent[path]?.faqs || []
}

// Đăng ký cho JSON-LD (src/seo/content-registry.js) — xem giải thích ở file đó.
registerSeoContent({
  pageFaqs,
  hasContent: (path) => Boolean(seoContent[path]),
  updatedIso: CONTENT_UPDATED.split('/').reverse().join('-'),
})
