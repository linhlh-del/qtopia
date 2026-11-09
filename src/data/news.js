import { registerCms } from "../cms/content";

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
  // news 1
  {
    id: "qtopia-phuoc-hai-2026-tong-quan-du-an",
    date: "2026-11-06",
    category: "Tổng quan",
    title: "QTopia Phước Hải 2026 có gì mới trong tổ hợp nghỉ dưỡng ven biển",
    seoTitle: "QTopia Phước Hải 2026: tổng quan dự án ven biển",
    excerpt:
      "Cập nhật QTopia Phước Hải tháng 11/2026: vị trí, quy mô, loại căn hộ, tiện ích và những điều cần kiểm tra trước khi tìm mua.",
    metaDescription:
      "Cập nhật QTopia Phước Hải tháng 11/2026: vị trí, quy mô, loại căn hộ, tiện ích và những điều cần kiểm tra trước khi tìm mua. Xem bài tổng quan dự án mới nhất.",
    image: "",
    imageAlt: "Phối cảnh tổ hợp căn hộ du lịch QTopia ven biển Phước Hải",
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
    cta: "Đăng ký nhận bộ thông tin QTopia mới nhất gồm mặt bằng, bảng giá tham khảo và hồ sơ cần đối chiếu trước khi đặt chỗ.",
    sourceTitle:
      "Qtopia hướng đến mô hình thành phố cuối tuần (VnExpress, 22/10/2026)",
    sourceUrl:
      "https://vnexpress.net/qtopia-huong-den-mo-hinh-thanh-pho-cuoi-tuan-5135670.html",
  },
  // news 2
  {
    id: "tien-do-qtopia-phuoc-hai-thang-11-2026",
    date: "2026-11-06",
    category: "Tiến độ",
    title:
      "Tiến độ QTopia Phước Hải tháng 11 năm 2026 cập nhật những hạng mục đang triển khai",
    seoTitle: "Tiến độ QTopia Phước Hải tháng 11/2026",
    excerpt:
      "Tiến độ QTopia tháng 11/2026: Trạm Quậy, Q Mart, Club House và khu căn hộ mẫu. Phân biệt công trình hiện hữu với phối cảnh dự kiến.",
    metaDescription:
      "Tiến độ QTopia tháng 11/2026: Trạm Quậy, Q Mart, Club House và khu căn hộ mẫu. Phân biệt công trình hiện hữu với phối cảnh dự kiến trước khi đặt chỗ mua.",
    image: "",
    imageAlt:
      "Hình ảnh cập nhật khu Trạm Quậy và hạng mục đang thi công tại QTopia Phước Hải",
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
    cta: "Nhận bộ ảnh tiến độ có ngày cập nhật và đặt lịch tham quan sa bàn, căn hộ mẫu QTopia.",
    sourceTitle:
      "Tiến độ Qtopia Phước Hải mới nhất cập nhật tháng 11/2026 (REB, 03/11/2026)",
    sourceUrl: "https://reb.vn/tien-do-qtopia-phuoc-hai-cap-nhat-moi-nhat/",
  },
  // news 3
  {
    id: "tram-quay-qtopia-phuoc-hai-khai-truong-7-11",
    date: "2026-11-09",
    category: "Sự kiện",
    title:
      "Trạm Quậy QTopia Phước Hải dự kiến khai trương ngày 7 tháng 11 có gì đáng chú ý",
    seoTitle: "Trạm Quậy QTopia Phước Hải khai trương 7/11/2026",
    excerpt:
      "Trạm Quậy QTopia dự kiến khai trương 7/11/2026: hoạt động, ẩm thực, âm nhạc và ý nghĩa với người tìm hiểu căn hộ du lịch.",
    metaDescription:
      "Trạm Quậy QTopia Phước Hải dự kiến khai trương 7/11/2026. Xem hoạt động, ẩm thực, âm nhạc và vai trò của khu này trong mô hình thành phố cuối tuần của dự án.",
    image: "",
    imageAlt:
      "Phối cảnh không gian trải nghiệm và giải trí tại QTopia Phước Hải",
    body: `Trạm Quậy QTopia được giới thiệu như một không gian clubhouse, ẩm thực và sự kiện tại khu biển Phước Hải. Theo thông tin đăng trên VnExpress cuối tháng 10/2026, dự án dự kiến khai trương khu trải nghiệm này ngày 07/11/2026, nối tiếp hoạt động cộng đồng diễn ra ngày 31/10. Đây là lịch dự kiến tại thời điểm viết bài 06/11; khách muốn tham dự cần kiểm tra lại thông báo tổ chức cập nhật trước khi di chuyển.

## Trạm Quậy là gì trong quy hoạch QTopia

Nếu phần căn hộ phục vụ nhu cầu lưu trú, Trạm Quậy được định hướng giữ vai trò không gian kết nối của điểm đến: nơi có thể ăn uống, tham gia hoạt động ngoài trời, thưởng thức âm nhạc hoặc gặp gỡ bạn bè. Với một tổ hợp nghỉ dưỡng ven biển, những điểm chạm như vậy có thể giúp khách có thêm hoạt động bên ngoài phòng nghỉ.

Trạm Quậy cũng là cách đơn vị phát triển giới thiệu sớm tinh thần của mô hình Entertainment Complex. Tuy nhiên, một sự kiện khai trương không thể đại diện cho lịch hoạt động dài hạn; tần suất sự kiện, dịch vụ thường xuyên và phí sử dụng cần được công bố riêng.

## Những hoạt động được truyền thông cho ngày 7 tháng 11

Theo lịch giới thiệu, chương trình dự kiến có xiếc đường phố, Lô tô show, Random Dance, âm nhạc và hoạt động ẩm thực, bên cạnh các phần trình diễn buổi tối. Danh sách hoạt động hoặc giờ bắt đầu có thể thay đổi theo điều kiện thực tế, thời tiết và quyết định của đơn vị tổ chức.

Nếu đi cùng gia đình có trẻ nhỏ, nên ưu tiên các khung giờ ban ngày và kiểm tra tình trạng khu vực sát biển. Với nhóm bạn, phần âm nhạc và ẩm thực có thể là trải nghiệm đáng quan tâm. Khách tới tham dự nên xác nhận trước quy định gửi xe, lối vào và điều kiện đăng ký nếu có.

## Trạm Quậy có ý nghĩa gì với nhà đầu tư căn hộ du lịch

Đối với người đang nghiên cứu phương án cho thuê, hoạt động trải nghiệm tại dự án là một yếu tố nên quan sát vì nó giúp đánh giá sức hút của điểm đến. Tuy vậy, lượng người tham dự sự kiện miễn phí không bằng công suất phòng trả tiền, và chưa đủ để suy ra giá thuê hay lợi nhuận. Bài toán đầu tư cần dữ liệu vận hành sau khi sản phẩm bàn giao, bao gồm tỷ lệ lấp đầy, giá phòng, phí dịch vụ và chi phí marketing kênh thuê.

## Câu hỏi thường gặp

### Trạm Quậy đã khai trương chưa

Theo thông tin đến 06/11/2026, thời điểm khai trương được thông báo là ngày 07/11. Vui lòng xác nhận với ban tổ chức trước khi đến.

### Có cần sở hữu căn hộ để tham dự không

Quyền tham gia từng hoạt động phụ thuộc quy định của chương trình và đơn vị vận hành; không nên mặc định tất cả sự kiện đều mở cửa miễn phí.`,
    cta: "Nhận lịch sự kiện Trạm Quậy và thông tin cập nhật về các tiện ích đang được triển khai tại QTopia.",
    sourceTitle:
      "Mô hình nghỉ dưỡng kết hợp giải trí, ẩm thực tại Qtopia (VnExpress, 30/10/2026)",
    sourceUrl:
      "https://vnexpress.net/mo-hinh-nghi-duong-ket-hop-giai-tri-am-thuc-tai-qtopia-5138769.html",
  },
  // news 4
  {
    id: "vi-tri-qtopia-phuoc-hai",
    date: "2026-11-09",
    category: "Vị trí",
    title:
      "Vị trí QTopia Phước Hải trên đường Võ Thị Sáu và kết nối du lịch ven biển",
    seoTitle: "Vị trí QTopia Phước Hải: đường Võ Thị Sáu, kết nối",
    excerpt:
      "Vị trí QTopia Phước Hải trên đường Võ Thị Sáu: kết nối Long Hải, Hồ Tràm, thời gian di chuyển và cách khảo sát thực tế.",
    metaDescription:
      "Vị trí QTopia Phước Hải trên đường Võ Thị Sáu, xã Phước Hải, TP.HCM: kết nối Long Hải, Hồ Tràm, thời gian di chuyển và cách khảo sát thực tế trước khi mua.",
    image: "",
    imageAlt:
      "Sơ đồ kết nối vị trí QTopia Phước Hải và các điểm đến khu vực phía Nam",
    body: `Vị trí QTopia Phước Hải được giới thiệu tại mặt tiền đường Võ Thị Sáu, tuyến ven biển thuộc xã Phước Hải, TP.HCM. Trước khi sắp xếp đơn vị hành chính, địa điểm này thuộc thị trấn Phước Hải, huyện Đất Đỏ, tỉnh Bà Rịa – Vũng Tàu. Khi tìm đường trên bản đồ, bạn nên tìm đồng thời các tên Phước Hải, Võ Thị Sáu và Tỉnh lộ 44A để tránh nhầm với đường cùng tên tại khu vực trung tâm TP.HCM.

## Lợi thế cảnh quan trước biển sau núi

Phước Hải có bãi tắm, làng chài và không gian núi Minh Đạm. Với QTopia, địa thế được truyền thông theo hướng trước biển, sau núi, gần rừng. Đây là điểm khác biệt về trải nghiệm cảnh quan, nhất là với khách muốn đi nghỉ cuối tuần mà không phải di chuyển đến điểm đến quá xa. Tuy nhiên, view thực tế của từng căn còn tùy tầng, hướng và các công trình lân cận.

## Kết nối đến Long Hải Hồ Tràm và Vũng Tàu

Từ cung đường ven biển Võ Thị Sáu, du khách có thể kết hợp hành trình qua Long Hải, Phước Hải và Hồ Tràm. Những địa điểm này mang các sắc thái du lịch khác nhau: tắm biển, ẩm thực địa phương, nghỉ dưỡng và tham quan thiên nhiên. Với nhóm khách lưu trú nhiều ngày, đây là các hoạt động bổ trợ cho chương trình trải nghiệm ngay trong dự án.

## Thời gian di chuyển từ TP HCM có cố định không

Một số tài liệu giới thiệu đưa ra mốc khoảng 75 phút từ khu vực TP.HCM và hơn 60 phút từ Đồng Nai khi sử dụng các tuyến cao tốc. Những con số này chỉ mang tính minh họa cho phương án kết nối, không phải thời gian cam kết. Thực tế phụ thuộc điểm xuất phát, giờ cao điểm, các nút giao và điều kiện khai thác từng đoạn đường.

Sân bay Long Thành được doanh nghiệp đề cập như động lực kết nối trong tương lai. Ở thời điểm đầu tháng 11/2026, không nên viết rằng sân bay đã vận hành thương mại toàn diện; lịch khai thác cần đối chiếu thông tin mới từ cơ quan và doanh nghiệp hàng không.

## Gợi ý khảo sát vị trí trước khi mua

Bạn nên đi thực tế vào cả ngày thường và cuối tuần để cảm nhận giao thông, độ ồn, gió biển và tiện ích hiện hữu. Hãy kiểm tra tuyến đi bộ ra bãi tắm, ranh dự án, lối vào khu căn hộ và phạm vi sử dụng bãi biển. Vị trí tốt cho nghỉ dưỡng không tự động bảo đảm công suất cho thuê; còn cần phân tích nguồn khách, mùa vụ và mô hình vận hành.

## Câu hỏi thường gặp

### Địa chỉ QTopia theo hành chính mới là gì

Mặt tiền đường Võ Thị Sáu, xã Phước Hải, TP.HCM. Số nhà cụ thể cần xác nhận từ đơn vị phát triển hoặc hồ sơ địa chính.

### Có phải mọi căn tại QTopia đều nhìn ra biển

Không thể kết luận như vậy từ vị trí toàn khu. Cần xem hướng căn, mặt bằng tầng và tầm nhìn thực tế.`,
    cta: "Nhận sơ đồ vị trí, bản đồ kết nối và mặt bằng các hướng căn QTopia Phước Hải.",
    sourceTitle:
      "Qtopia đón nhu cầu nghỉ dưỡng và giải trí cuối tuần tại phía Nam (VnExpress, 31/10/2026)",
    sourceUrl:
      "https://vnexpress.net/qtopia-don-nhu-cau-nghi-duong-va-giai-tri-cuoi-tuan-tai-phia-nam-5138875.html",
  },
];

registerCms("newsItems", newsItems);

export const getNewsHref = (id) => `/tin-tuc/${id}`;

/** Bài mẫu/lorem ipsum: không index, không vào sitemap (checklist 5.3). Bài thật từ CMS có `sample: false`. */
export const isSampleNews = (item) =>
  item.sample === true ||
  (item.sample !== false &&
    /lorem ipsum|bài viết mẫu/i.test(`${item.title} ${item.excerpt}`));
export const hasRealNews = () => newsItems.some((item) => !isSampleNews(item));

/** 2026-11-06 → 06/11/2026 */
export const formatNewsDate = (iso) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
  return m ? `${m[3]}/${m[2]}/${m[1]}` : "";
};

/** Tách body thành khối: { type: 'h2' | 'h3' | 'p', text } */
export function parseNewsBody(body = "") {
  return body
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const h = /^(#{2,3})\s+(.+)$/s.exec(block);
      if (h)
        return { type: h[1].length === 2 ? "h2" : "h3", text: h[2].trim() };
      return { type: "p", text: block };
    });
}
