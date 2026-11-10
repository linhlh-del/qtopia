/* ============================================================
   NỘI DUNG P1 (SEO): trang từng loại căn /can-ho/*, /phap-ly, /chu-dau-tu, /tien-do,
   /nha-mau-noi-that, /hinh-anh-video và khối nội dung bổ sung cho trang chủ.
   Gộp vào seoContent trong src/data/seo-content.js. Không import ngược seo-content.js (tránh vòng lặp).
   Nguồn số liệu: giống seo-content.js (pháp lý, CSBH, bản vẽ layout, mặt bằng tầng, bài tin tức đã đăng).
   ============================================================ */
import { unitTypes } from './unit-types'

export const CONTENT_UPDATED_P1 = '10/11/2026'

const STUDIO_PRICE = 1_195_000_000
const vnd = (ratio) => `${((STUDIO_PRICE * ratio) / 1_000_000).toLocaleString('vi-VN', { maximumFractionDigits: 2 })} triệu`

/* ---------- Trang chi tiết từng loại căn ---------- */
const unitExtra = {
  'ama-studio': {
    price: 'Từ 1,195 tỷ đồng',
    suits: [
      'Cặp đôi hoặc người đi một mình muốn có “nhà Sài Gòn có biển” để nghỉ cuối tuần.',
      'Người mua lần đầu, muốn bắt đầu với số vốn khoảng 10% giá trị căn (gần 120 triệu đồng).',
      'Nhà đầu tư muốn khai thác cho thuê ngắn ngày theo đêm – loại căn dễ cho thuê nhất với khách cặp đôi.',
    ],
    rent: 'Studio là dạng phòng phổ biến nhất trên các nền tảng đặt phòng nghỉ dưỡng: khách cặp đôi, khách công tác hoặc người đi biển cuối tuần. Bồn tắm nằm đặt mở giữa căn là điểm khác biệt dễ chụp ảnh, giúp tin đăng nổi bật hơn. Khi tính hiệu quả, hãy cộng đủ phí quản lý, phí vận hành, khấu hao nội thất và mùa thấp điểm; dự án không có cam kết lợi nhuận.',
    faqs: [
      { q: 'Căn Studio QTOPIA giá bao nhiêu?', a: 'Căn AMA Studio có giá từ 1,195 tỷ đồng theo chính sách bán hàng hiện hành; giá từng mã căn theo bảng giá chính thức của đợt bán.' },
      { q: 'Căn Studio QTOPIA có bồn tắm không?', a: 'Có. Theo bản vẽ layout, AMA Studio có bồn tắm nằm đặt mở giữa căn, cùng khu vệ sinh riêng có vòi sen đứng.' },
      { q: 'Một tầng có bao nhiêu căn Studio?', a: 'Tầng điển hình tháp Q5–Q6 có 34 căn AMA Studio trên tổng số 38 căn.' },
    ],
  },
  'mira-1pn': {
    price: 'Nhận bảng giá',
    suits: [
      'Gia đình trẻ ba người cần phòng ngủ riêng và góc sofa có thể làm chỗ ngủ phụ cho trẻ.',
      'Khách lưu trú dài ngày, làm việc từ xa, cần tách khu ngủ và khu sinh hoạt.',
      'Người muốn căn đầu hồi thoáng hơn Studio nhưng vẫn giữ tổng giá vừa phải.',
    ],
    rent: '1PN+ phù hợp khách gia đình nhỏ và khách ở dài ngày hơn khách Studio. Phần “+” linh hoạt cho phép bố trí thêm chỗ ngủ, giúp căn đáp ứng nhóm 3 người. Căn ở vị trí đầu hồi, số lượng ít (2 căn mỗi tầng điển hình Q5–Q6) nên nguồn cung cho thuê cùng loại trong dự án cũng hạn chế hơn.',
    faqs: [
      { q: 'Căn MIRA 1PN+ rộng bao nhiêu?', a: 'Tại Q5–Q6: diện tích sử dụng 41,67 m², tim tường 47,44 m². Tại Q7: sử dụng 44,65 m², tim tường 48,52 m².' },
      { q: 'Phần “+” trong căn 1PN+ dùng để làm gì?', a: 'Là góc sofa – phòng khách linh hoạt, có thể làm chỗ ngủ phụ cho trẻ, góc làm việc hoặc khu thư giãn.' },
      { q: 'Mỗi tầng có bao nhiêu căn MIRA 1PN+?', a: 'Tầng điển hình tháp Q5–Q6 có 2 căn MIRA 1PN+, đặt ở đầu hồi phía Tây (mã căn 31 và 32).' },
    ],
  },
  'vita-2pn': {
    price: 'Nhận bảng giá',
    suits: [
      'Gia đình bốn người đi nghỉ cuối tuần hoặc nghỉ hè.',
      'Nhóm bạn muốn ở chung một căn nhưng mỗi cặp có phòng riêng.',
      'Người muốn trải nghiệm kiểu “suite” với bồn tắm và lavabo đôi ngay trong phòng ngủ lớn.',
    ],
    rent: 'Căn 2 phòng ngủ đáp ứng nhóm khách gia đình và nhóm bạn 4 người – nhóm thường đặt trọn căn thay vì hai phòng khách sạn. Bàn ăn 4 chỗ và bếp giúp khách tự nấu, phù hợp kỳ nghỉ nhiều ngày. Tại Q5–Q6, VITA là căn góc đầu hồi phía Đông, chỉ có 2 căn mỗi tầng điển hình.',
    faqs: [
      { q: 'Căn VITA 2PN QTOPIA rộng bao nhiêu?', a: 'Tại Q5–Q6: sử dụng 61,49–63,09 m², tim tường 67,93–69,68 m². Tại Q7: sử dụng 56,17–56,54 m², tim tường 62,66–62,91 m².' },
      { q: 'Căn 2 phòng ngủ QTOPIA có mấy phòng vệ sinh?', a: 'Theo bản vẽ layout, VITA có hai khu vệ sinh riêng biệt; phòng ngủ lớn có thêm bồn tắm nằm và lavabo đôi.' },
      { q: 'Căn VITA nằm ở vị trí nào trên tầng?', a: 'Tại tầng điển hình Q5–Q6, 2 căn VITA (mã 11 và 12) nằm ở đầu hồi phía Đông.' },
    ],
  },
  'aria-3pn': {
    price: 'Nhận bảng giá',
    suits: [
      'Gia đình nhiều thế hệ cần ba phòng ngủ trong cùng một căn.',
      'Nhóm đông người đi nghỉ cùng nhau, muốn có không gian sinh hoạt chung rộng.',
      'Người mua muốn căn lớn nhất dự án, có hai ban công.',
    ],
    rent: 'ARIA phục vụ khách đoàn và gia đình đông người – nhóm khách thường khó tìm phòng phù hợp ở khu nghỉ dưỡng. Hai ban công, bàn ăn 4 chỗ và ba phòng ngủ giúp một căn thay được 2–3 phòng khách sạn. Căn 3PN chỉ có tại tháp Q7 nên nguồn cung hạn chế.',
    faqs: [
      { q: 'QTOPIA có căn 3 phòng ngủ không?', a: 'Có. Căn ARIA 3PN được giới thiệu tại tháp Q7, diện tích sử dụng 71,72–73,34 m², tim tường 79,18–80,96 m².' },
      { q: 'Căn ARIA 3PN có mấy ban công?', a: 'Theo bản vẽ layout, ARIA có hai ban công: một phía phòng khách và một lô gia nhỏ cạnh phòng ngủ thứ ba.' },
      { q: 'Căn ARIA phù hợp với ai?', a: 'Gia đình nhiều thế hệ hoặc nhóm đông người cần ba phòng ngủ và không gian sinh hoạt chung trong cùng một căn.' },
    ],
  },
}

const unitAreaRows = [
  ['AMA Studio', 'Q5–Q6', '25,23 – 30,05 m²', '28,60 – 33,47 m²'],
  ['AMA Studio', 'Q7', '25,10 – 29,28 m²', '28,35 – 32,94 m²'],
  ['MIRA 1PN+', 'Q5–Q6', '41,67 m²', '47,44 m²'],
  ['MIRA 1PN+', 'Q7', '44,65 m²', '48,52 m²'],
  ['VITA 2PN', 'Q5–Q6', '61,49 – 63,09 m²', '67,93 – 69,68 m²'],
  ['VITA 2PN', 'Q7', '56,17 – 56,54 m²', '62,66 – 62,91 m²'],
  ['ARIA 3PN', 'Q7', '71,72 – 73,34 m²', '79,18 – 80,96 m²'],
]

const compareTable = {
  t: 'table',
  caption: 'So sánh nhanh 4 loại căn hộ QTOPIA',
  head: ['Loại căn', 'Phòng ngủ', 'Diện tích sử dụng', 'Điểm nổi bật'],
  rows: [
    ['AMA Studio', 'Studio', '25–30 m²', 'Bồn tắm mở giữa căn, giá từ 1,195 tỷ'],
    ['MIRA 1PN+', '1 + góc linh hoạt', '42–45 m²', 'Căn đầu hồi, phòng ngủ riêng'],
    ['VITA 2PN', '2', '56–63 m²', 'Phòng ngủ lớn kiểu suite, 2 khu vệ sinh'],
    ['ARIA 3PN', '3', '72–73 m²', 'Hai ban công, chỉ có tại Q7'],
  ],
}

function unitPage(u) {
  const x = unitExtra[u.type]
  const isAma = u.type === 'ama-studio'
  return {
    blocks: [
      { t: 'unit', ...u, hideMore: true, asSection: false },
      { t: 'videos', path: u.path },
      { t: 'h2', text: `Diện tích căn ${u.short} theo từng tháp` },
      {
        t: 'table',
        caption: `Diện tích căn ${u.short} QTOPIA (theo tài liệu dự án)`,
        head: ['Loại căn', 'Tháp', 'Diện tích sử dụng (SD)', 'Diện tích tim tường (TT)'],
        rows: unitAreaRows.filter((r) => r[0] === u.short),
      },
      ...(u.type === 'aria-3pn'
        ? [{ t: 'p', text: 'Căn ARIA 3PN chỉ có tại tháp Q7. Vị trí mã căn trên tầng và số lượng căn mỗi tầng sẽ được cập nhật theo mặt bằng chính thức của tháp Q7.' }]
        : [
            { t: 'h2', text: `Vị trí căn ${u.short} trên tầng điển hình Q5–Q6` },
            { t: 'p', text: `Bảng dưới liệt kê các mã căn ${u.short} trên tầng điển hình tháp Q5–Q6 kèm diện tích theo bản vẽ mặt bằng. Xem sơ đồ tương tác của toàn tầng tại trang mặt bằng.` },
            { t: 'floorTable', plan: 'q5-q6', type: u.type },
          ]),
      { t: 'h2', text: `Giá bán và thanh toán căn ${u.short}` },
      isAma
        ? {
            t: 'table',
            caption: 'Ví dụ thanh toán căn AMA Studio giá 1,195 tỷ đồng',
            head: ['Mốc', 'Thanh toán chuẩn', 'Vay ngân hàng'],
            rows: [
              ['Đặt cọc', '50 triệu', '50 triệu'],
              ['Ký HĐMB', `10% – ${vnd(0.1)}`, `15% – ${vnd(0.15)}`],
              ['Trong thời gian xây dựng', `60% – khoảng ${vnd(0.0375)}/tháng`, `Ngân hàng giải ngân 40% – ${vnd(0.4)}`],
              ['Nhận bàn giao', `25% – ${vnd(0.25)}`, 'Khách 10% + ngân hàng 30%'],
              ['Nhận sổ', `5% – ${vnd(0.05)}`, `5% – ${vnd(0.05)}`],
            ],
          }
        : {
            t: 'p',
            text: `Giá căn ${u.short} được công bố theo bảng giá từng đợt bán. Chính sách thanh toán áp dụng chung cho các loại căn: đặt cọc 50 triệu, ký hợp đồng mua bán 10% (hoặc 15% nếu vay), thanh toán theo tiến độ, thanh toán nhanh 70% hoặc vay ngân hàng tối đa 70% với hỗ trợ lãi suất 24 tháng và ân hạn nợ gốc 48 tháng (có điều kiện).`,
          },
      { t: 'p', text: `Giá tham khảo: ${x.price}. Xem bảng giá theo loại căn và ví dụ dòng tiền đầy đủ tại trang giá bán; chi tiết từng phương thức tại trang chính sách bán hàng.` },
      { t: 'h2', text: `Căn ${u.short} phù hợp với ai?` },
      { t: 'ul', items: x.suits },
      { t: 'h2', text: `Khai thác cho thuê căn ${u.short}` },
      { t: 'p', text: x.rent },
      { t: 'h2', text: 'So sánh các loại căn hộ QTOPIA' },
      compareTable,
      {
        t: 'links',
        title: 'Xem các loại căn khác và thông tin liên quan',
        items: [
          ...unitTypes.filter((o) => o.path !== u.path).map((o) => ({ to: o.path, label: `Căn ${o.short} QTOPIA` })),
          { to: '/mat-bang', label: 'Mặt bằng tầng QTOPIA' },
          { to: '/gia-ban', label: 'Giá bán căn hộ QTOPIA' },
          { to: '/chinh-sach-ban-hang', label: 'Chính sách thanh toán QTOPIA' },
          { to: '/nha-mau-noi-that', label: 'Nhà mẫu và nội thất QTOPIA' },
        ],
      },
    ],
    faqs: x.faqs,
  }
}
export const unitPages = Object.fromEntries(unitTypes.map((u) => [u.path, unitPage(u)]))
export const unitFaqs = unitTypes.flatMap((u) => unitExtra[u.type].faqs)

/* ---------- /phap-ly ---------- */
const phapLy = {
  blocks: [
    { t: 'h2', text: 'Tóm tắt pháp lý dự án QTOPIA Phước Hải' },
    { t: 'p', text: 'QTOPIA được phát triển trên khu đất 73.842 m² tại xã Phước Hải, TP. Hồ Chí Minh. Đến tháng 11/2026, dự án đã có quyết định công nhận kết quả đấu giá quyền sử dụng đất, quy hoạch chi tiết tỷ lệ 1/500 và Giấy chứng nhận đăng ký đầu tư. Giấy phép xây dựng, văn bản đủ điều kiện kinh doanh và mẫu hợp đồng mua bán sẽ được cập nhật khi chủ đầu tư công bố.' },
    {
      t: 'table',
      caption: 'Các văn bản pháp lý chính của dự án QTOPIA',
      head: ['Văn bản', 'Số hiệu / ngày', 'Nội dung chính'],
      rows: [
        ['Công nhận kết quả đấu giá quyền sử dụng đất', 'QĐ 817/QĐ-UBND ngày 08/4/2019', 'UBND tỉnh Bà Rịa – Vũng Tàu công nhận kết quả đấu giá khu đất 73.842 m² tại thị trấn Phước Hải (nay là xã Phước Hải)'],
        ['Điều chỉnh quyết định đấu giá', 'QĐ 3594/QĐ-UBND ngày 27/12/2019 và QĐ 1812/QĐ-UBND ngày 06/7/2020', 'Điều chỉnh nội dung quyết định công nhận kết quả đấu giá'],
        ['Quy hoạch chi tiết tỷ lệ 1/500', 'QĐ 3636/QĐ-UBND ngày 24/12/2025', 'UBND xã Phước Hải phê duyệt: mật độ xây dựng tối đa 25%, hệ số sử dụng đất tối đa 4,02; khu biển và khu núi'],
        ['Giấy chứng nhận đăng ký đầu tư', 'Sở Tài chính TP.HCM cấp ngày 10/06/2026', 'Cấp cho Công ty Cổ phần Đầu tư Serenity; tổng vốn đầu tư khoảng 5.366,64 tỷ đồng'],
        ['Giấy phép xây dựng, đủ điều kiện kinh doanh', 'Đang cập nhật', 'Cập nhật khi chủ đầu tư công bố'],
      ],
    },
    { t: 'h2', text: 'Căn hộ du lịch là gì và sở hữu như thế nào?' },
    { t: 'p', text: 'Sản phẩm tại QTOPIA là căn hộ du lịch xây dựng trên đất thương mại dịch vụ, khác với căn hộ chung cư để ở trên đất ở. Theo quy định hiện hành (Nghị định 10/2023/NĐ-CP), công trình căn hộ du lịch đủ điều kiện có thể được cấp Giấy chứng nhận quyền sở hữu; thời hạn sở hữu gắn với thời hạn sử dụng đất của dự án. Hình thức, thời hạn và điều kiện cấp giấy chứng nhận cụ thể của QTOPIA phải căn cứ hồ sơ dự án và hợp đồng mua bán.' },
    { t: 'p', text: 'Vì là căn hộ du lịch, sản phẩm phù hợp mục đích nghỉ dưỡng, lưu trú ngắn ngày và khai thác cho thuê theo quy chế quản lý vận hành của dự án. Người mua không nên mặc định căn hộ du lịch được dùng như nhà ở lâu dài.' },
    { t: 'h2', text: 'Người mua cần kiểm tra gì về pháp lý?' },
    {
      t: 'ol',
      items: [
        'Văn bản thông báo đủ điều kiện kinh doanh của cơ quan quản lý cho đúng toà, hạng mục đang chào bán.',
        'Giấy phép xây dựng của toà căn hộ có mã căn bạn chọn.',
        'Pháp nhân ký hợp đồng và tài khoản nhận tiền đứng tên chủ đầu tư hoặc đơn vị được uỷ quyền hợp pháp.',
        'Bảo lãnh ngân hàng cho nghĩa vụ bàn giao, nếu thuộc trường hợp phải bảo lãnh theo luật.',
        'Hình thức sở hữu, thời hạn sử dụng đất và lộ trình cấp giấy chứng nhận ghi trong hợp đồng.',
        'Quy chế quản lý vận hành, phí dịch vụ và điều khoản cho thuê.',
      ],
    },
    { t: 'h2', text: 'Nguồn đối chiếu thông tin pháp lý' },
    { t: 'p', text: 'Thông tin trên trang được tổng hợp từ các văn bản đã công bố. Chủ đầu tư công khai thông tin pháp lý tại trang phaply.qtopia.vn; số liệu tại đó có thể áp dụng cho từng giai đoạn hoặc từng nhóm tháp, vì vậy hãy đối chiếu đúng phạm vi hạng mục bạn quan tâm và yêu cầu bản sao văn bản khi giao dịch.' },
    {
      t: 'links',
      title: 'Thông tin liên quan',
      items: [
        { to: '/chu-dau-tu', label: 'Chủ đầu tư dự án QTOPIA' },
        { to: '/tien-do', label: 'Tiến độ dự án QTOPIA' },
        { to: '/chinh-sach-ban-hang', label: 'Chính sách bán hàng QTOPIA' },
        { to: '/tong-quan', label: 'Tổng quan dự án QTOPIA' },
        { to: '/faq', label: 'Hỏi đáp về QTOPIA Phước Hải' },
      ],
    },
  ],
  faqs: [
    { q: 'Pháp lý dự án QTOPIA đến đâu?', a: 'Dự án đã có quyết định công nhận kết quả đấu giá đất (2019), quy hoạch 1/500 (24/12/2025) và Giấy chứng nhận đăng ký đầu tư (10/06/2026). Giấy phép xây dựng và văn bản đủ điều kiện kinh doanh đang được cập nhật.' },
    { q: 'Căn hộ QTOPIA có sổ hồng không?', a: 'Căn hộ du lịch đủ điều kiện có thể được cấp Giấy chứng nhận quyền sở hữu theo Nghị định 10/2023/NĐ-CP. Lộ trình cấp và thời hạn cụ thể căn cứ hồ sơ dự án và hợp đồng mua bán.' },
    { q: 'Ai là pháp nhân chủ đầu tư QTOPIA?', a: 'Công ty Cổ phần Đầu tư Serenity, được Sở Tài chính TP.HCM cấp Giấy chứng nhận đăng ký đầu tư ngày 10/06/2026.' },
  ],
}

/* ---------- /chu-dau-tu ---------- */
const chuDauTu = {
  blocks: [
    { t: 'h2', text: 'Ai là chủ đầu tư QTOPIA Phước Hải?' },
    { t: 'p', text: 'QTOPIA do Phát Đạt Corporation phát triển. Pháp nhân chủ đầu tư đứng tên trên hồ sơ là Công ty Cổ phần Đầu tư Serenity, được Sở Tài chính TP.HCM cấp Giấy chứng nhận đăng ký đầu tư ngày 10/06/2026 với tổng vốn đầu tư khoảng 5.366,64 tỷ đồng.' },
    {
      t: 'table',
      caption: 'Các đơn vị tham gia dự án QTOPIA',
      head: ['Vai trò', 'Đơn vị', 'Ghi chú'],
      rows: [
        ['Đơn vị phát triển', 'Phát Đạt Corporation', 'Doanh nghiệp bất động sản niêm yết, mã chứng khoán PDR'],
        ['Pháp nhân chủ đầu tư', 'Công ty Cổ phần Đầu tư Serenity', 'Đứng tên Giấy chứng nhận đăng ký đầu tư'],
        ['Vận hành, dịch vụ (theo brochure)', 'CBRE, Wyndham Hotels & Resorts, Vivora', 'Phạm vi vai trò theo văn bản chính thức'],
      ],
    },
    { t: 'h2', text: 'Phát Đạt Corporation (PDR)' },
    { t: 'p', text: 'Phát Đạt (Công ty Cổ phần Phát triển Bất động sản Phát Đạt) là doanh nghiệp bất động sản niêm yết trên Sở Giao dịch Chứng khoán TP.HCM với mã PDR, phát triển các dự án căn hộ, khu đô thị và nghỉ dưỡng tại khu vực phía Nam. QTOPIA là dự án nghỉ dưỡng – giải trí ven biển được định vị theo mô hình “thành phố cuối tuần” của siêu đô thị TP.HCM.' },
    { t: 'p', text: 'Khi đánh giá chủ đầu tư, người mua nên xem báo cáo tài chính công bố, tiến độ bàn giao các dự án trước, nghĩa vụ nợ và mức độ hoàn thiện pháp lý của chính dự án đang quan tâm, thay vì chỉ dựa vào thương hiệu.' },
    { t: 'h2', text: 'Đơn vị vận hành và đối tác' },
    { t: 'p', text: 'Brochure dự án nhắc tới CBRE (dịch vụ bất động sản), Wyndham Hotels & Resorts (thương hiệu khách sạn quốc tế; trên mặt bằng có hạng mục “Phố Wyndham”) và Vivora trong phần vận hành. Vai trò cụ thể – quản lý toà nhà, vận hành khách sạn hay chương trình cho thuê – sẽ được xác nhận trong hợp đồng và quy chế quản lý vận hành do chủ đầu tư ban hành.' },
    { t: 'h2', text: 'Vì sao đơn vị vận hành quan trọng với căn hộ du lịch?' },
    {
      t: 'ul',
      items: [
        'Quyết định chất lượng dịch vụ: dọn phòng, an ninh, bảo trì tiện ích chung.',
        'Ảnh hưởng tới khả năng khai thác cho thuê: kênh bán phòng, giá phòng, công suất.',
        'Quy định phí quản lý, phí dịch vụ và cách chia doanh thu nếu tham gia chương trình cho thuê.',
      ],
    },
    {
      t: 'links',
      title: 'Thông tin liên quan',
      items: [
        { to: '/phap-ly', label: 'Pháp lý dự án QTOPIA' },
        { to: '/tong-quan', label: 'Tổng quan dự án QTOPIA' },
        { to: '/tien-do', label: 'Tiến độ dự án QTOPIA' },
        { to: '/gia-ban', label: 'Giá bán căn hộ QTOPIA' },
      ],
    },
  ],
  faqs: [
    { q: 'Chủ đầu tư QTOPIA có uy tín không?', a: 'Dự án do Phát Đạt (mã PDR) phát triển qua pháp nhân Công ty CP Đầu tư Serenity. Nên tự đánh giá qua báo cáo tài chính công bố, lịch sử bàn giao và pháp lý của chính dự án.' },
    { q: 'Ai vận hành QTOPIA sau bàn giao?', a: 'Brochure nhắc tới CBRE, Wyndham Hotels & Resorts và Vivora; vai trò cụ thể theo hợp đồng và quy chế vận hành chính thức.' },
  ],
}

/* ---------- /tien-do ---------- */
const tienDo = {
  blocks: [
    { t: 'updated' },
    { t: 'h2', text: 'Dòng thời gian dự án QTOPIA' },
    {
      t: 'table',
      caption: 'Các mốc chính của dự án QTOPIA Phước Hải',
      head: ['Thời điểm', 'Mốc', 'Nguồn'],
      rows: [
        ['08/4/2019', 'Công nhận kết quả đấu giá quyền sử dụng đất 73.842 m²', 'QĐ 817/QĐ-UBND'],
        ['24/12/2025', 'Phê duyệt quy hoạch chi tiết 1/500', 'QĐ 3636/QĐ-UBND'],
        ['10/06/2026', 'Cấp Giấy chứng nhận đăng ký đầu tư', 'Sở Tài chính TP.HCM'],
        ['Cuối 10/2026', 'Dự án được giới thiệu với định vị “thành phố cuối tuần”', 'VnExpress, 22/10/2026'],
        ['24/10/2026', 'Ra mắt sa bàn và căn hộ mẫu tại Sales Gallery, phường Bình Trưng, TP.HCM', 'Báo chí'],
        ['03/11/2026', 'Quảng trường Trạm Quậy hình thành phần lớn bề mặt; Q Mart sẵn sàng phục vụ; Club House hoàn thiện nội thất', 'REB, 03/11/2026'],
        ['07/11/2026', 'Trạm Quậy khai trương theo lịch dự kiến', 'VnExpress, 30/10/2026'],
        ['Đang cập nhật', 'Giấy phép xây dựng, khởi công và tiến độ các tháp căn hộ', 'Chủ đầu tư'],
      ],
    },
    { t: 'h2', text: 'Tiến độ hiện tại tại công trường' },
    { t: 'p', text: 'Ở thời điểm đầu tháng 11/2026, các hạng mục mặt đất phục vụ trải nghiệm đã xuất hiện trước: Quảng trường Trạm Quậy với lối đi lát đá và cảnh quan đang hoàn thiện, Q Mart đã sẵn sàng phục vụ, Club House đang làm nội thất. Đây là tín hiệu về hoạt động của điểm đến, nhưng không phản ánh tiến độ xây dựng các tháp căn hộ.' },
    { t: 'h2', text: 'Cách theo dõi tiến độ cho đúng' },
    {
      t: 'ul',
      items: [
        'Tách riêng bốn nhóm: hạ tầng kỹ thuật, khối căn hộ, tiện ích mặt đất, khu khách sạn – thương mại.',
        'Ưu tiên ảnh thực tế có ngày chụp; phối cảnh chỉ là hình minh hoạ sản phẩm tương lai.',
        'Đối chiếu tiến độ với mốc bàn giao trong hợp đồng mua bán (khoảng T+540 ngày theo chính sách thanh toán).',
        'Hỏi rõ toà và mã căn đang chào bán đã có giấy phép xây dựng và thông báo đủ điều kiện kinh doanh chưa.',
      ],
    },
    { t: 'h2', text: 'Bài cập nhật tiến độ hằng tháng' },
    { t: 'p', text: 'Mỗi tháng, website đăng bài cập nhật tiến độ kèm hình ảnh có ngày chụp trong mục Tin tức. Bài mới nhất: tiến độ QTopia Phước Hải tháng 11/2026.' },
    {
      t: 'links',
      title: 'Đọc thêm',
      items: [
        { to: '/tin-tuc/tien-do-qtopia-phuoc-hai-thang-11-2026', label: 'Tiến độ QTopia Phước Hải tháng 11/2026' },
        { to: '/tin-tuc/tram-quay-qtopia-phuoc-hai-khai-truong-7-11', label: 'Trạm Quậy QTopia khai trương 7/11' },
        { to: '/phap-ly', label: 'Pháp lý dự án QTOPIA' },
        { to: '/nha-mau-noi-that', label: 'Nhà mẫu và sa bàn QTOPIA' },
      ],
    },
  ],
  faqs: [
    { q: 'QTOPIA bao giờ bàn giao?', a: 'Theo chính sách thanh toán, mốc nhận bàn giao dự kiến khoảng 540 ngày kể từ ngày đặt cọc; thời hạn chính thức ghi trong hợp đồng mua bán của từng căn.' },
    { q: 'Hiện tại QTOPIA đã xây dựng đến đâu?', a: 'Đầu tháng 11/2026, các hạng mục mặt đất như Trạm Quậy, Q Mart và Club House đã hình thành; tiến độ các tháp căn hộ sẽ được cập nhật khi có giấy phép xây dựng và thông báo khởi công.' },
  ],
}

/* ---------- /nha-mau-noi-that ---------- */
const nhaMau = {
  blocks: [
    { t: 'h2', text: 'Nhà mẫu và sa bàn QTOPIA ở đâu?' },
    { t: 'p', text: 'Ngày 24/10/2026, dự án ra mắt sa bàn và căn hộ mẫu tại Sales Gallery ở phường Bình Trưng, TP.HCM. Sa bàn giúp quan sát tổng thể quy hoạch, ba cụm tiện ích và vị trí từng tháp; căn hộ mẫu giúp hình dung tỷ lệ không gian, công năng và cách bố trí nội thất. Nên đặt lịch trước qua hotline để được hướng dẫn.' },
    {
      t: 'gallery',
      items: [
        { src: '/images/renders/interior-studio.webp', alt: 'Phối cảnh nội thất căn Studio QTOPIA Phước Hải với giường đôi, bồn tắm nằm và ban công', caption: 'Phối cảnh nội thất căn Studio' },
        { src: '/images/renders/interior-studio-2.webp', alt: 'Phối cảnh không gian nội thất căn hộ du lịch QTOPIA Phước Hải tông màu sáng', caption: 'Phối cảnh nội thất căn hộ' },
      ],
    },
    { t: 'h2', text: 'Phong cách nội thất căn hộ QTOPIA' },
    { t: 'p', text: 'Theo phối cảnh và bản vẽ layout, căn hộ QTOPIA hướng tới phong cách nghỉ dưỡng nhiệt đới: tông màu sáng, gỗ tự nhiên, điểm nhấn xanh lá và cam. Điểm chung của mọi loại căn là ban công đón gió và bồn tắm nằm – ở Studio bồn tắm đặt mở giữa căn, ở VITA và ARIA đặt trong phòng ngủ lớn như một suite khách sạn.' },
    {
      t: 'table',
      caption: 'Điểm nhấn nội thất theo loại căn (theo bản vẽ layout)',
      head: ['Loại căn', 'Khu sinh hoạt', 'Phòng tắm'],
      rows: [
        ['AMA Studio', 'Giường đôi sát ban công, bàn nhỏ, kệ bếp dọc tường', 'Bồn tắm nằm mở giữa căn và khu vệ sinh vòi sen'],
        ['MIRA 1PN+', 'Sofa, bàn ăn 2 chỗ, bếp dọc tường', 'Bồn tắm nằm, lavabo, bồn cầu'],
        ['VITA 2PN', 'Sofa, bàn ăn 4 chỗ, bếp', 'Bồn tắm và lavabo đôi trong phòng ngủ lớn, 2 khu vệ sinh'],
        ['ARIA 3PN', 'Sofa, bàn ăn 4 chỗ, bếp, 2 ban công', 'Bồn tắm trong phòng ngủ lớn, 2 khu vệ sinh'],
      ],
    },
    { t: 'h2', text: 'Nội thất bàn giao: cần hỏi gì?' },
    { t: 'p', text: 'Tài liệu dự án nhắc tới phương án bàn giao nội thất linh hoạt. Nội thất trong nhà mẫu và phối cảnh chỉ để minh hoạ; danh mục bàn giao chính thức (thiết bị vệ sinh, bếp, tủ, sàn, điều hoà, đồ rời) được đính kèm hợp đồng mua bán.' },
    {
      t: 'ul',
      items: [
        'Xin bảng danh mục vật liệu và thiết bị bàn giao, có thương hiệu và mã sản phẩm.',
        'Hỏi rõ đồ rời (giường, sofa, bàn ghế) thuộc gói bàn giao hay gói nội thất tuỳ chọn.',
        'Nếu tham gia chương trình cho thuê, hỏi tiêu chuẩn nội thất bắt buộc của đơn vị vận hành.',
        'So sánh căn mẫu với bản vẽ mã căn bạn chọn: diện tích, vị trí cửa sổ, hướng ban công.',
      ],
    },
    {
      t: 'links',
      title: 'Xem thêm',
      items: [
        ...unitTypes.map((o) => ({ to: o.path, label: `Căn ${o.short} QTOPIA` })),
        { to: '/hinh-anh-video', label: 'Hình ảnh và phối cảnh QTOPIA' },
        { to: '/tien-do', label: 'Tiến độ dự án QTOPIA' },
      ],
    },
  ],
  faqs: [
    { q: 'Có thể xem nhà mẫu QTOPIA ở đâu?', a: 'Sa bàn và căn hộ mẫu được giới thiệu tại Sales Gallery ở phường Bình Trưng, TP.HCM từ ngày 24/10/2026; nên đặt lịch trước qua hotline.' },
    { q: 'Căn hộ QTOPIA bàn giao nội thất gì?', a: 'Danh mục bàn giao chính thức được đính kèm hợp đồng mua bán; nội thất nhà mẫu và phối cảnh chỉ mang tính minh hoạ.' },
  ],
}

/* ---------- /hinh-anh-video ---------- */
const galleryRenders = [
  ['/images/renders/view-from-sea.webp', 'Phối cảnh dự án QTOPIA Phước Hải nhìn từ biển với các tháp căn hộ dưới chân núi', 'Toàn cảnh QTOPIA nhìn từ biển'],
  ['/images/renders/birdview.webp', 'Phối cảnh tổng thể QTOPIA Phước Hải từ trên cao bên bờ biển, núi xanh phía sau', 'Phối cảnh tổng thể từ trên cao'],
  ['/images/renders/ocean-galaxy.webp', 'Khu Ocean Galaxy về đêm với hồ bơi, sàn DJ và ánh sáng tại QTOPIA', 'Ocean Galaxy về đêm'],
  ['/images/renders/dj-ocean.webp', 'Sàn DJ Ocean ngoài trời tại khu Ocean Galaxy, QTOPIA Phước Hải', 'Sàn DJ Ocean'],
  ['/images/renders/aqua-funny-park.webp', 'Công viên nước Aqua Funny Park ban ngày tại QTOPIA Phước Hải', 'Aqua Funny Park'],
  ['/images/renders/aqua-funny-park-night.webp', 'Công viên nước Aqua Funny Park về đêm tại QTOPIA', 'Aqua Funny Park về đêm'],
  ['/images/renders/oasis-pool.webp', 'Hồ bơi Oasis giữa vườn nhiệt đới tại khu Oasis Resort, QTOPIA', 'Hồ bơi Oasis'],
  ['/images/renders/cong-chao.webp', 'Cổng chào Wonder Gate dẫn vào khu Ocean Galaxy, QTOPIA', 'Cổng chào Wonder Gate'],
  ['/images/renders/ocean-galaxy-2.webp', 'Câu lạc bộ bãi biển cạnh hồ bơi tại QTOPIA Phước Hải', 'Câu lạc bộ bãi biển'],
  ['/images/renders/ocean-galaxy-3.webp', 'Phố thương mại Ocean Galaxy với cửa hàng và quán ăn tại QTOPIA', 'Phố thương mại Ocean Galaxy'],
  ['/images/renders/roof-q5.webp', 'Sân thượng tháp Q5 Ocean Lounge nhìn ra biển tại QTOPIA', 'Sân thượng Q5 – Ocean Lounge'],
  ['/images/renders/roof-q6.webp', 'Sân thượng tháp Q6 Galaxy Dome tại QTOPIA Phước Hải', 'Sân thượng Q6 – Galaxy Dome'],
  ['/images/renders/tien-ich-1.webp', 'Tổ hợp thể thao ngoài trời tại khu Oasis Resort, QTOPIA', 'Tổ hợp thể thao'],
  ['/images/renders/tien-ich-2.webp', 'Khu thư giãn ngoài trời giữa cây xanh tại QTOPIA', 'Khu thư giãn ngoài trời'],
  ['/images/renders/tien-ich-3.webp', 'Cảnh quan nội khu với lối dạo và cây xanh tại QTOPIA', 'Cảnh quan nội khu'],
  ['/images/renders/tien-ich-5.webp', 'Sân sinh hoạt chung ngoài trời tại QTOPIA Phước Hải', 'Sân sinh hoạt chung'],
].map(([src, alt, caption]) => ({ src, alt, caption }))

const hinhAnh = {
  blocks: [
    { t: 'p', text: 'Thư viện phối cảnh, mặt bằng và layout dự án QTOPIA Phước Hải theo tài liệu chủ đầu tư. Bấm vào ảnh để xem phóng to ngay trên trang. Phối cảnh mang tính minh hoạ; hình ảnh thực tế công trường được cập nhật trong mục Tiến độ.' },
    { t: 'videos' },
    { t: 'h2', text: 'Phối cảnh dự án và tiện ích' },
    { t: 'gallery', items: galleryRenders },
    { t: 'h2', text: 'Mặt bằng tổng thể và mặt bằng tầng' },
    {
      t: 'gallery',
      items: [
        { src: '/images/mat-bang-tien-ich-tong-the.webp', alt: 'Mặt bằng tiện ích tổng thể QTOPIA Phước Hải với 29 tiện ích thuộc Quậy Station, Ocean Galaxy và Oasis Resort', caption: 'Mặt bằng tiện ích tổng thể' },
        { src: '/images/mat-bangq5-q6.webp', alt: 'Mặt bằng tầng điển hình tháp Q5, Q6 QTOPIA với 38 căn AMA Studio, MIRA 1PN+ và VITA 2PN', caption: 'Mặt bằng tầng điển hình Q5–Q6' },
        { src: '/images/mat-bangq7.webp', alt: 'Mặt bằng tầng điển hình tháp Q7 QTOPIA Phước Hải', caption: 'Mặt bằng tầng điển hình Q7' },
        { src: '/images/position-map.webp', alt: 'Bản đồ vị trí và cự ly kết nối từ QTOPIA Phước Hải tới TP.HCM, sân bay Long Thành và Hồ Tràm', caption: 'Bản đồ vị trí và kết nối' },
      ],
    },
    { t: 'h2', text: 'Layout căn hộ QTOPIA' },
    { t: 'gallery', items: unitTypes.flatMap((u) => u.images) },
    {
      t: 'links',
      title: 'Xem thêm',
      items: [
        { to: '/tien-ich', label: 'Tiện ích QTOPIA' },
        { to: '/mat-bang', label: 'Mặt bằng QTOPIA' },
        { to: '/nha-mau-noi-that', label: 'Nhà mẫu và nội thất' },
        { to: '/tien-do', label: 'Tiến độ dự án' },
      ],
    },
  ],
  noToc: true,
}

export const p1Content = {
  ...unitPages,
  '/phap-ly': phapLy,
  '/chu-dau-tu': chuDauTu,
  '/tien-do': tienDo,
  '/nha-mau-noi-that': nhaMau,
  '/hinh-anh-video': hinhAnh,
}

export const p1FaqGroups = [
  { title: 'Các loại căn hộ', items: unitFaqs },
  // Bỏ các câu trùng ý với nhóm "Pháp lý, sở hữu và vận hành" / "Tham quan" sẵn có trong seo-content.js
  { title: 'Chủ đầu tư và tiến độ', items: [chuDauTu.faqs[0], ...tienDo.faqs, nhaMau.faqs[1]] },
]
export const legalFaqs = phapLy.faqs
