import { registerCms } from '../cms/content'

// Dữ liệu cho carousel, trang danh sách và trang chi tiết Tin tức. Mọi trường chữ và ảnh sửa được trên CMS.
// Muốn thêm/bớt bài: sửa mảng này trong code (CMS giữ nguyên số bài).
//
// Trường:
//   id              đường dẫn bài: /tin-tuc/<id> (không sửa trên CMS)
//   date            ngày đăng, dạng YYYY-MM-DD
//   title           tiêu đề hiển thị (H1)
//   seoTitle        thẻ <title> (≤ 60 ký tự)
//   excerpt         tóm tắt trên thẻ bài và dưới tiêu đề
//   metaDescription mô tả cho Google (150–160 ký tự)
//   image / imageAlt  ảnh đại diện (tải lên trên CMS) và mô tả ảnh
//   body            nội dung: các đoạn cách nhau bằng 1 dòng trống; dòng bắt đầu "## " là tiêu đề H2, "### " là H3
//   cta             câu kêu gọi ở cuối bài (kèm nút mở form đăng ký)
//   sourceTitle / sourceUrl  tư liệu tham khảo (để trống thì không hiện)
export const newsItems = [
  {
    id: 'qtopia-phuoc-hai-2026-tong-quan-du-an',
    date: '2026-11-06',
    category: 'Tổng quan',
    title: 'QTopia Phước Hải 2026 có gì mới trong tổ hợp nghỉ dưỡng ven biển',
    seoTitle: 'QTopia Phước Hải 2026: tổng quan dự án ven biển',
    excerpt:
      'Cập nhật QTopia Phước Hải tháng 11/2026: vị trí, quy mô, loại căn hộ, tiện ích và những điều cần kiểm tra trước khi tìm mua.',
    metaDescription:
      'Cập nhật QTopia Phước Hải tháng 11/2026: vị trí, quy mô, loại căn hộ, tiện ích và những điều cần kiểm tra trước khi tìm mua. Xem bài tổng quan dự án mới nhất.',
    image: '',
    imageAlt: 'Phối cảnh tổ hợp căn hộ du lịch QTopia ven biển Phước Hải',
    body: `QTopia Phước Hải 2026 là tên thương mại được sử dụng để giới thiệu tổ hợp căn hộ du lịch, dịch vụ và giải trí ven biển tại xã Phước Hải, TP.HCM. Trong đợt truyền thông tháng 10 và đầu tháng 11/2026, dự án được định vị là “thành phố cuối tuần”, hướng đến khách đi biển ngắn ngày và người tìm hiểu bất động sản lưu trú. Bài viết này tổng hợp những dữ kiện quan trọng để bạn có hình dung ban đầu, đồng thời chỉ ra những mục cần xác nhận trực tiếp bằng hồ sơ dự án.

## QTopia Phước Hải nằm ở đâu

Vị trí được giới thiệu là mặt tiền đường Võ Thị Sáu, thuộc tuyến Tỉnh lộ 44A, xã Phước Hải, TP.HCM; địa danh cũ là thị trấn Phước Hải, huyện Đất Đỏ, tỉnh Bà Rịa – Vũng Tàu. Khu vực này kết nối hành trình du lịch Long Hải – Phước Hải – Hồ Tràm và có cảnh quan biển phía trước, núi Minh Đạm ở phía sau. Đây là lợi thế cảm nhận được của điểm đến, nhưng thời gian lái xe từ TP.HCM sẽ thay đổi theo điểm xuất phát, tuyến đường và thời điểm di chuyển.

## Quy mô và định vị mô hình dự án

Theo thông tin doanh nghiệp công bố qua báo chí, QTopia được giới thiệu với quy mô toàn khu hơn 7,3 ha, gồm 9 tháp cao 20 tầng trong phương án truyền thông. Sản phẩm được mô tả là căn hộ du lịch, thương mại dịch vụ cùng nhiều không gian vui chơi. Cần phân biệt diện tích quy mô toàn khu với diện tích đất cụ thể trong hồ sơ đăng ký đầu tư để tránh so sánh sai thông số.

Định vị Resort City kết hợp Entertainment Complex có nghĩa dự án muốn tạo hành trình trải nghiệm, từ nghỉ dưỡng, ẩm thực, vui chơi ban ngày đến các hoạt động giải trí buổi tối. Đây là định hướng quy hoạch và kinh doanh, không đồng nghĩa mọi hạng mục đã xây xong hoặc vận hành ở thời điểm hiện tại.

## Loại căn hộ và nhóm khách dự kiến

Danh mục giới thiệu trải từ Studio, căn một phòng ngủ, hai phòng ngủ đến ba phòng ngủ; ngoài ra có shophouse và concept Aqua Home gắn với trải nghiệm mặt nước. Căn nhỏ có thể phù hợp cặp đôi hoặc kỳ nghỉ ngắn, trong khi căn nhiều phòng ngủ có thể đáp ứng nhóm bạn, gia đình. Người mua cần xem mặt bằng, diện tích sử dụng, tiêu chuẩn bàn giao và điều kiện khai thác của đúng mã căn đang mở bán.

## Những thông tin cần kiểm tra trước khi đặt chỗ

Trước khi quyết định, hãy yêu cầu bảng giá có ngày hiệu lực, hồ sơ pháp lý của hạng mục sản phẩm, kế hoạch thanh toán, tiến độ bàn giao trong hợp đồng và quy định quản lý vận hành. QTopia là loại hình căn hộ du lịch trên đất thương mại dịch vụ; mục đích sở hữu để nghỉ cuối tuần không tự biến sản phẩm thành nhà ở lâu dài.

## Câu hỏi thường gặp

### QTopia có phải căn hộ để ở lâu dài không

Tên pháp lý và mục đích sử dụng đất cần được kiểm tra theo hồ sơ từng sản phẩm. Không nên tự suy diễn căn hộ du lịch là nhà ở sở hữu lâu dài.

### Nên bắt đầu tìm hiểu QTopia từ thông tin nào

Hãy bắt đầu từ vị trí, quy hoạch, loại căn phù hợp ngân sách, giá theo đợt bán và tài liệu pháp lý do bên bán cung cấp.`,
    cta: 'Đăng ký nhận bộ thông tin QTopia mới nhất gồm mặt bằng, bảng giá tham khảo và hồ sơ cần đối chiếu trước khi đặt chỗ.',
    sourceTitle: 'Qtopia hướng đến mô hình thành phố cuối tuần (VnExpress, 22/10/2026)',
    sourceUrl: 'https://vnexpress.net/qtopia-huong-den-mo-hinh-thanh-pho-cuoi-tuan-5135670.html',
  },
  {
    id: 'tien-do-qtopia-phuoc-hai-thang-11-2026',
    date: '2026-11-06',
    category: 'Tiến độ',
    title: 'Tiến độ QTopia Phước Hải tháng 11 năm 2026 cập nhật những hạng mục đang triển khai',
    seoTitle: 'Tiến độ QTopia Phước Hải tháng 11/2026',
    excerpt:
      'Tiến độ QTopia tháng 11/2026: Trạm Quậy, Q Mart, Club House và khu căn hộ mẫu. Phân biệt công trình hiện hữu với phối cảnh dự kiến.',
    metaDescription:
      'Tiến độ QTopia tháng 11/2026: Trạm Quậy, Q Mart, Club House và khu căn hộ mẫu. Phân biệt công trình hiện hữu với phối cảnh dự kiến trước khi đặt chỗ mua.',
    image: '',
    imageAlt: 'Hình ảnh cập nhật khu Trạm Quậy và hạng mục đang thi công tại QTopia Phước Hải',
    body: `Tiến độ QTopia Phước Hải là thông tin đặc biệt quan trọng với cả người mua để nghỉ dưỡng và nhà đầu tư dự kiến khai thác cho thuê. Tại thời điểm đầu tháng 11/2026, các nguồn phân phối đưa ra hình ảnh khu Trạm Quậy, Q Mart, Club House và khu giới thiệu căn hộ mẫu. Điều cần chú ý là mỗi hình ảnh phản ánh một hạng mục cụ thể; không nên dùng ảnh khu tiện ích đã mở để kết luận toàn bộ chín tháp căn hộ đã hoàn thành.

## Trạm Quậy và các tiện ích ở tầng mặt đất

Bản cập nhật ngày 03/11/2026 của REB mô tả Quảng trường Trạm Quậy đã hình thành phần lớn bề mặt, lối đi lát đá và cảnh quan đang hoàn thiện. Khu này được định hướng tổ chức hoạt động giải trí và sự kiện cuối tuần. Đây là tín hiệu về hoạt động tại điểm đến, nhưng không thể thay thế báo cáo giám sát tiến độ thi công nhà cao tầng.

Nguồn trên cũng ghi nhận Q Mart đã sẵn sàng cung cấp một số dịch vụ thương mại, trong khi Club House còn triển khai nội thất. Những hạng mục đã đưa vào sử dụng cần được phân biệt rõ với các tiện ích đang hoàn thiện hoặc mới tồn tại trên phối cảnh để nội dung truyền thông chính xác.

## Sa bàn và căn hộ mẫu đã được giới thiệu

Ngày 24/10/2026, dự án tổ chức hoạt động ra mắt sa bàn và căn hộ mẫu tại Sales Gallery ở phường Bình Trưng, TP.HCM. Sa bàn giúp quan sát tổng thể quy hoạch; căn hộ mẫu cho phép hình dung tỷ lệ không gian, công năng và cách bố trí nội thất. Tuy nhiên, thiết kế mẫu và danh mục bàn giao theo hợp đồng có thể khác nhau, vì vậy người mua nên yêu cầu bảng vật liệu, nội thất và điều khoản đính kèm.

## Cách đọc tiến độ xây dựng QTopia cho đúng

Một lịch theo dõi hữu ích nên tách ít nhất bốn nhóm: hạ tầng kỹ thuật, khối căn hộ, tiện ích mặt đất và khu khách sạn – thương mại. Mỗi nhóm cần mốc thời gian, tỷ lệ hoàn thành, hình thực tế có ngày chụp và đơn vị phát hành. Hình phối cảnh chỉ giúp hình dung sản phẩm tương lai, không phải minh chứng nghiệm thu.

Người tìm mua nên hỏi rõ tòa và mã căn đang chào bán, đối chiếu thông báo khởi công, hồ sơ thẩm định và lịch bàn giao trong hợp đồng. Khi so sánh tiến độ với cam kết quảng bá, hãy ưu tiên tài liệu pháp lý và văn bản từ đơn vị có trách nhiệm ký kết.

## Câu hỏi thường gặp

### Có thể tham quan QTopia lúc này không

Thông tin báo chí xác nhận khu sa bàn và căn hộ mẫu đã được giới thiệu từ ngày 24/10. Lịch tiếp khách và địa điểm cụ thể cần đặt hẹn với đơn vị tư vấn.

### Trạm Quậy hoạt động có nghĩa căn hộ đã bàn giao không

Không. Tiện ích mặt đất và khối căn hộ có tiến độ riêng; cần kiểm chứng từng hạng mục.`,
    cta: 'Nhận bộ ảnh tiến độ có ngày cập nhật và đặt lịch tham quan sa bàn, căn hộ mẫu QTopia.',
    sourceTitle: 'Tiến độ Qtopia Phước Hải mới nhất cập nhật tháng 11/2026 (REB, 03/11/2026)',
    sourceUrl: 'https://reb.vn/tien-do-qtopia-phuoc-hai-cap-nhat-moi-nhat/',
  },
]

registerCms('newsItems', newsItems)

export const getNewsHref = (id) => `/tin-tuc/${id}`

/** Bài mẫu/lorem ipsum: không index, không vào sitemap (checklist 5.3). Bài thật từ CMS có `sample: false`. */
export const isSampleNews = (item) => item.sample === true || (item.sample !== false && /lorem ipsum|bài viết mẫu/i.test(`${item.title} ${item.excerpt}`))
export const hasRealNews = () => newsItems.some((item) => !isSampleNews(item))

/** 2026-11-06 → 06/11/2026 */
export const formatNewsDate = (iso) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '')
  return m ? `${m[3]}/${m[2]}/${m[1]}` : ''
}

/** Tách body thành khối: { type: 'h2' | 'h3' | 'p', text } */
export function parseNewsBody(body = '') {
  return body
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const h = /^(#{2,3})\s+(.+)$/s.exec(block)
      if (h) return { type: h[1].length === 2 ? 'h2' : 'h3', text: h[2].trim() }
      return { type: 'p', text: block }
    })
}
