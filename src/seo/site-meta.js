import { cmsSeo } from "../cms/content";
import { hasRealNews, isSampleNews, newsItems } from "../data/news";

/* ============================================================
   SEO — MỘT NGUỒN DUY NHẤT cho title, description, H1, intro, snippet của từng trang và menu.
   Dùng chung cho: <Seo> (đổi <head> khi chuyển route), bước prerender (ghi <head> tĩnh vào dist/<route>/index.html),
   sitemap.xml và JSON-LD.

   Bảng snippet (checklist v2 mục 10.2): URL | Từ khoá chính | Title (≤ 60) | Description (150–160) | H1 | OG image
   Quy ước: từ khoá chính đứng đầu title; description có từ khoá + số liệu + CTA. Đo lại bằng `npm run seo:check`.
   ============================================================ */

/* Tên miền chính thức — PHẢI đổi khi có domain thật (canonical, og:url, sitemap, JSON-LD đều dựa vào đây).
   Đặt VITE_SITE_URL trong .env.production. Mặc định chỉ là placeholder, bước build sẽ cảnh báo. */
export const SITE_URL_PLACEHOLDER = "https://qtopia.example.com";
export const SITE_URL = (
  import.meta.env?.VITE_SITE_URL || SITE_URL_PLACEHOLDER
).replace(/\/+$/, "");

export const SITE = {
  name: "QTOPIA Phước Hải",
  alternateName: "QTOPIA — Thành phố cuối tuần của siêu đô thị TP. Hồ Chí Minh",
  locale: "vi_VN",
  lang: "vi",
  themeColor: "#050a2e",
  published: "2026-11-01", // datePublished của trang chủ
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitterImage: "/images/thumb-twitter-image.jpg",
  twitterImageAlt:
    "Phối cảnh tòa căn hộ QTOPIA bên biển về đêm, Thành phố cuối tuần",
  logo: "/images/brand/logo-horizontal-white.png",
};

/**
 * Trang (route). changefreq / priority dùng cho sitemap.xml.
 * h1 / intro: hiển thị ở trang con (src/pages/Topic.jsx). Trang chủ có H1 riêng trong Hero.
 * menu: mô tả ngắn cho thuộc tính `title` của link menu / footer (≤ 70 ký tự).
 */
export const pages = {
  "/": {
    title: "QTOPIA Phước Hải – Giá bán, Mặt bằng, Tiện ích 2026",
    description:
      "Dự án QTOPIA Phước Hải – thành phố cuối tuần bên biển, cách TP.HCM 75 phút. Căn Studio từ 1,195 tỷ, thanh toán 10%, 29 tiện ích, mặt bằng Q5–Q7. Xem chi tiết.",
    ogTitle: "QTOPIA Phước Hải — Thành phố cuối tuần của siêu đô thị TP.HCM",
    ogDescription:
      "Dự án QTOPIA Phước Hải – thành phố cuối tuần bên biển, cách TP.HCM 75 phút. Căn Studio từ 1,195 tỷ, thanh toán 10%, 29 tiện ích, mặt bằng Q5–Q7. Xem chi tiết.",
    breadcrumb: "Trang chủ",
    changefreq: "weekly",
    priority: 1.0,
    ogImage: "/images/thumbnail-opengraph-image.jpg",
    ogImageAlt:
      "Phối cảnh tòa căn hộ QTOPIA bên biển về đêm, Thành phố cuối tuần",
    menu: "Tổng quan dự án căn hộ QTOPIA",
  },
  "/tong-quan": {
    title: "Tổng quan dự án QTOPIA Phước Hải – Quy mô, CĐT, pháp lý",
    description:
      "Tổng quan dự án QTOPIA Phước Hải: khu đất 73.842 m², chủ đầu tư Phát Đạt – Serenity, căn Studio đến 3PN, 3 cụm tiện ích và pháp lý 1/500. Xem bảng thông số.",
    breadcrumb: "Tổng quan",
    h1: "Tổng quan dự án QTOPIA Phước Hải — thành phố cuối tuần bên biển",
    intro: [
      "QTOPIA là tổ hợp căn hộ và trải nghiệm giải trí, nghỉ dưỡng bên biển tại khu vực Phước Hải: phía trước là biển, phía sau là núi và rừng.",
      "Trang này tóm tắt số liệu chính của dự án, ba khu trải nghiệm và các văn bản pháp lý đã công bố, để bạn nắm nhanh QTOPIA trước khi đi vào vị trí, tiện ích và mặt bằng.",
    ],
    changefreq: "monthly",
    priority: 0.9,
    ogImage: "/images/og-qtopia-trang-chu.webp",
    ogImageAlt:
      "Phối cảnh tổng thể dự án QTOPIA bên bờ biển với núi xanh phía sau",
    menu: "Tổng quan dự án QTOPIA: số liệu, tiện ích, pháp lý",
  },
  "/vi-tri": {
    title: "Vị trí QTOPIA Phước Hải – Bản đồ & thời gian di chuyển",
    description:
      "Vị trí QTOPIA Phước Hải trên đường Võ Thị Sáu (TL44A): bản đồ Google Maps, 75 phút từ TP.HCM, 30 phút tới sân bay Long Thành, 3 lộ trình đi từ thành phố.",
    breadcrumb: "Vị trí",
    h1: "Vị trí QTOPIA Phước Hải — trước biển, sau núi, gần rừng",
    intro: [
      "Theo brochure, QTOPIA được phát triển tại khu vực Phước Hải với địa thế trước biển, sau núi, gần rừng — một bối cảnh cho những chuyến nghỉ cuối tuần.",
      "Các mốc kết nối được tài liệu giới thiệu gồm khoảng 75 phút từ trung tâm TP.HCM, 30 phút từ sân bay Long Thành, 19 phút từ Hồ Tràm và 2 phút từ Quảng trường Phước Hải. Thời gian thực tế có thể thay đổi.",
    ],
    changefreq: "monthly",
    priority: 0.8,
    ogImage: "/images/og-qtopia-vi-tri.webp",
    ogImageAlt:
      "Góc nhìn từ trên cao vị trí dự án QTOPIA giữa biển, núi và khu dân cư",
    menu: "Bản đồ vị trí và cự ly kết nối từ QTOPIA",
  },
  "/tien-ich": {
    title: "Tiện ích QTOPIA Phước Hải – 29 tiện ích nội khu bên biển",
    description:
      "Tiện ích QTOPIA Phước Hải: 29 hạng mục tại Quậy Station, Ocean Galaxy, Oasis Resort – sàn DJ Ocean, Aqua Funny Park, hồ bơi vô cực, tầng mái. Xem chi tiết.",
    breadcrumb: "Tiện ích",
    h1: "Tiện ích QTOPIA Phước Hải — ba khu trải nghiệm bên biển",
    intro: [
      "Quậy Station hướng ra biển, Ocean Galaxy sôi động về đêm, Oasis Resort dành cho hồ bơi, thể thao và thư giãn.",
      "Nổi bật có sàn DJ Ocean, công viên nước Aqua Funny Park, hồ bơi Oasis, vườn hoa và sân thượng. Chọn từng khu trên sơ đồ để xem chi tiết.",
    ],
    changefreq: "monthly",
    priority: 0.8,
    ogImage: "/images/og-qtopia-tien-ich.webp",
    ogImageAlt:
      "Phối cảnh khu Ocean Galaxy về đêm với hồ bơi và sàn DJ tại QTOPIA",
    menu: "Ba khu tiện ích và khu giải trí đêm của QTOPIA",
  },
  "/mat-bang": {
    title: "Mặt bằng QTOPIA Phước Hải – Layout Studio, 1PN+, 2PN, 3PN",
    description:
      "Mặt bằng QTOPIA Phước Hải: 38 căn mỗi tầng tháp Q5–Q6, bảng mã căn và diện tích SD/TT, layout AMA Studio, MIRA 1PN+, VITA 2PN, ARIA 3PN tháp Q7. Xem ngay.",
    breadcrumb: "Mặt bằng",
    h1: "Mặt bằng QTOPIA Phước Hải — căn hộ Q5, Q6 và các loại căn Q7",
    intro: [
      "Tầng điển hình Q5–Q6 trong brochure gồm AMA Studio, MIRA 1PN+ và VITA 2PN. Trên sơ đồ tương tác, chọn mã căn để xem diện tích sử dụng (SD) và diện tích tim tường (TT).",
      "Brochure Q7 giới thiệu thêm ARIA 3PN bên cạnh AMA, MIRA và VITA. Bên dưới sơ đồ Q5–Q6 là ảnh layout tham khảo và khoảng diện tích theo từng loại căn Q7.",
    ],
    changefreq: "monthly",
    priority: 0.8,
    ogImage: "/images/og-qtopia-mat-bang.webp",
    ogImageAlt: "Phối cảnh tiện ích sân thượng tháp Q5 thuộc dự án QTOPIA",
    menu: "Sơ đồ căn Q5–Q6 và các loại căn tháp Q7",
  },
  "/chinh-sach-ban-hang": {
    title: "Chính sách bán hàng QTOPIA Phước Hải – Thanh toán 10%",
    description:
      "Chính sách bán hàng QTOPIA Phước Hải: cọc 50 triệu, ký HĐMB 10%, thanh toán nhanh 70% hoặc vay 70% hỗ trợ lãi suất 24 tháng. Xem bảng tiến độ thanh toán.",
    breadcrumb: "Chính sách bán hàng",
    h1: "Chính sách bán hàng QTOPIA Phước Hải — 3 phương thức thanh toán",
    intro: [
      "Căn Studio QTOPIA có giá chỉ từ 1.195 tỷ đồng. Khách hàng chọn một trong ba phương thức: thanh toán chuẩn theo tiến độ, thanh toán nhanh 70% hoặc vay ngân hàng.",
      "Với phương thức vay, chính sách hỗ trợ lãi suất 24 tháng hoặc đến khi bàn giao và ân hạn nợ gốc 48 tháng (áp dụng có điều kiện). Chính sách áp dụng theo văn bản chính thức của Chủ đầu tư.",
    ],
    changefreq: "weekly",
    priority: 0.9,
    ogImage: "/images/og-qtopia-trang-chu.webp",
    ogImageAlt: "Chính sách bán hàng và phương thức thanh toán căn hộ QTOPIA",
    menu: "Giá, tiến độ thanh toán và hỗ trợ vay QTOPIA",
  },
  "/tien-ich-xung-quanh": {
    title: "Tiện ích xung quanh QTOPIA Phước Hải – Biển, Hồ Tràm",
    description:
      "Tiện ích xung quanh QTOPIA Phước Hải: 2 phút tới Quảng trường Phước Hải, gần biển Long Hải, núi Minh Đạm, 19 phút tới Hồ Tràm, 30 phút tới sân bay Long Thành.",
    breadcrumb: "Tiện ích xung quanh",
    h1: "Tiện ích xung quanh QTOPIA Phước Hải — biển, đô thị và sân bay",
    intro: [
      "Ngoài ba khu tiện ích nội khu, QTOPIA nằm gần các điểm đến biển như Hồ Tràm, Vũng Tàu và trung tâm Phước Hải, cùng các đầu mối giao thông của khu vực.",
      "Danh sách dưới đây tổng hợp các mốc trên bản đồ kết nối của dự án; thời gian di chuyển là số liệu tham khảo theo brochure.",
    ],
    changefreq: "monthly",
    priority: 0.8,
    ogImage: "/images/og-qtopia-vi-tri.webp",
    ogImageAlt:
      "Góc nhìn từ trên cao vị trí dự án QTOPIA giữa biển, núi và khu dân cư",
    menu: "Các điểm đến và kết nối quanh QTOPIA",
  },
  "/gia-ban": {
    title: "Giá bán QTOPIA Phước Hải 2026 – Bảng giá căn hộ từ 1,195 tỷ",
    description:
      "Giá bán QTOPIA Phước Hải: căn Studio từ 1,195 tỷ, bảng giá theo loại căn Studio, 1PN+, 2PN, 3PN, ví dụ dòng tiền khi vay và thanh toán chuẩn. Nhận bảng giá.",
    breadcrumb: "Giá bán",
    h1: "Giá bán QTOPIA Phước Hải — bảng giá căn hộ theo loại căn",
    intro: [
      "Căn hộ AMA Studio tại QTOPIA Phước Hải có giá từ 1,195 tỷ đồng, thanh toán 10% khi ký hợp đồng mua bán. Trang này tổng hợp bảng giá theo loại căn, ví dụ dòng tiền và các chi phí cần dự trù.",
      "Giá từng mã căn phụ thuộc tháp, tầng, hướng và tầm nhìn; bảng giá chính thức do chủ đầu tư phát hành theo từng đợt bán.",
    ],
    changefreq: "weekly",
    priority: 0.9,
    ogImage: "/images/og-qtopia-trang-chu.webp",
    ogImageAlt: "Bảng giá căn hộ QTOPIA Phước Hải theo loại căn",
    menu: "Bảng giá căn hộ QTOPIA theo loại căn",
  },
  "/faq": {
    title: "Hỏi đáp QTOPIA Phước Hải – Câu hỏi thường gặp (FAQ)",
    description:
      "Hỏi đáp QTOPIA Phước Hải: chủ đầu tư, vị trí, tiện ích, diện tích căn hộ, giá bán, thanh toán, pháp lý và lịch tham quan nhà mẫu – giải đáp ngắn gọn, dễ hiểu.",
    breadcrumb: "Hỏi đáp",
    h1: "Câu hỏi thường gặp về QTOPIA Phước Hải — giải đáp nhanh trước khi mua",
    intro: [
      "Giải đáp nhanh những thắc mắc phổ biến nhất về QTOPIA: dự án ở đâu, ai là chủ đầu tư, căn hộ rộng bao nhiêu, giá và cách thanh toán, pháp lý và cách đặt lịch tham quan.",
    ],
    changefreq: "monthly",
    priority: 0.7,
    ogImage: "/images/og-qtopia-trang-chu.webp",
    ogImageAlt: "Câu hỏi thường gặp về dự án QTOPIA Phước Hải",
    menu: "Câu hỏi thường gặp về QTOPIA Phước Hải",
  },
  "/can-ho/studio-ama": {
    title: "Căn hộ Studio QTOPIA Phước Hải – Layout AMA 25–30 m²",
    description:
      "Căn hộ AMA Studio QTOPIA Phước Hải: layout chi tiết tháp Q5–Q6 và Q7, diện tích 25–30 m² sử dụng, bồn tắm nằm, ban công, giá từ 1,195 tỷ. Xem bản vẽ ngay.",
    breadcrumb: "AMA Studio",
    parent: "/mat-bang",
    h1: "Căn hộ AMA Studio QTOPIA Phước Hải — layout và diện tích",
    intro: ["AMA Studio là dòng căn phổ biến nhất của QTOPIA: không gian mở với giường đôi sát ban công, bồn tắm nằm đặt giữa căn, kệ bếp gọn và khu vệ sinh riêng.", "Trang này có bản vẽ layout tháp Q5–Q6 và Q7, bảng mã căn trên tầng, ví dụ thanh toán căn giá từ 1,195 tỷ đồng và gợi ý khai thác cho thuê."],
    changefreq: "monthly",
    priority: 0.8,
    ogImage: "/images/og-qtopia-mat-bang.webp",
    ogImageAlt: "Phối cảnh tiện ích sân thượng tháp Q5 dự án QTOPIA Phước Hải",
    menu: "Layout, diện tích và giá căn Studio AMA",
  },
  "/can-ho/1pn-mira": {
    title: "Căn hộ 1PN+ QTOPIA Phước Hải – Layout MIRA 42–45 m²",
    description:
      "Căn hộ MIRA 1PN+ QTOPIA Phước Hải: layout tháp Q5–Q6 và Q7, diện tích sử dụng 41,67–44,65 m², phòng ngủ riêng, góc sofa linh hoạt, bồn tắm nằm. Xem chi tiết.",
    breadcrumb: "MIRA 1PN+",
    parent: "/mat-bang",
    h1: "Căn hộ MIRA 1PN+ QTOPIA Phước Hải — layout và diện tích",
    intro: ["MIRA 1PN+ có phòng ngủ riêng, góc sofa linh hoạt (phần “+”), bàn ăn nhỏ, bếp dọc tường và phòng tắm có bồn tắm nằm; căn nằm ở đầu hồi nên thoáng hơn.", "Xem bản vẽ layout tháp Q5–Q6 và Q7, vị trí mã căn trên tầng và căn này phù hợp với ai."],
    changefreq: "monthly",
    priority: 0.8,
    ogImage: "/images/og-qtopia-mat-bang.webp",
    ogImageAlt: "Phối cảnh tiện ích sân thượng tháp Q5 dự án QTOPIA Phước Hải",
    menu: "Layout và diện tích căn MIRA 1PN+",
  },
  "/can-ho/2pn-vita": {
    title: "Căn hộ 2PN QTOPIA Phước Hải – Layout VITA 56–63 m²",
    description:
      "Căn hộ VITA 2PN QTOPIA Phước Hải: layout tháp Q5–Q6 và Q7, diện tích sử dụng 56–63 m², phòng ngủ lớn có bồn tắm và lavabo đôi, 2 khu vệ sinh. Xem bản vẽ.",
    breadcrumb: "VITA 2PN",
    parent: "/mat-bang",
    h1: "Căn hộ VITA 2PN QTOPIA Phước Hải — layout và diện tích",
    intro: ["VITA 2PN gồm phòng khách, bàn ăn 4 chỗ, bếp và hai phòng ngủ; phòng ngủ lớn có bồn tắm nằm và lavabo đôi như một suite khách sạn, căn có hai khu vệ sinh.", "Xem bản vẽ layout tháp Q5–Q6 và Q7, vị trí căn góc trên tầng và gợi ý cho gia đình, nhóm bạn."],
    changefreq: "monthly",
    priority: 0.8,
    ogImage: "/images/og-qtopia-mat-bang.webp",
    ogImageAlt: "Phối cảnh tiện ích sân thượng tháp Q5 dự án QTOPIA Phước Hải",
    menu: "Layout và diện tích căn VITA 2PN",
  },
  "/can-ho/3pn-aria": {
    title: "Căn hộ 3PN QTOPIA Phước Hải – Layout ARIA tháp Q7",
    description:
      "Căn hộ ARIA 3PN QTOPIA Phước Hải tại tháp Q7: diện tích sử dụng 71,72–73,34 m², ba phòng ngủ, hai ban công, bồn tắm nằm, hai khu vệ sinh. Xem layout chi tiết.",
    breadcrumb: "ARIA 3PN",
    parent: "/mat-bang",
    h1: "Căn hộ ARIA 3PN QTOPIA Phước Hải — căn lớn nhất tháp Q7",
    intro: ["ARIA 3PN là dòng căn lớn nhất của QTOPIA, chỉ có tại tháp Q7: ba phòng ngủ, hai ban công, bàn ăn 4 chỗ, bồn tắm nằm và hai khu vệ sinh.", "Phù hợp gia đình nhiều thế hệ hoặc nhóm đông người cần không gian nghỉ dưỡng rộng trong cùng một căn."],
    changefreq: "monthly",
    priority: 0.8,
    ogImage: "/images/og-qtopia-mat-bang.webp",
    ogImageAlt: "Phối cảnh tiện ích sân thượng tháp Q5 dự án QTOPIA Phước Hải",
    menu: "Layout và diện tích căn ARIA 3PN",
  },
  "/phap-ly": {
    title: "Pháp lý QTOPIA Phước Hải – Quy hoạch 1/500, GCN đầu tư",
    description:
      "Pháp lý dự án QTOPIA Phước Hải: quyết định đấu giá đất 2019, quy hoạch 1/500 ngày 24/12/2025, Giấy chứng nhận đăng ký đầu tư 10/06/2026 và checklist người mua.",
    breadcrumb: "Pháp lý",
    h1: "Pháp lý dự án QTOPIA Phước Hải — văn bản và hình thức sở hữu",
    intro: ["QTOPIA đã có quyết định công nhận kết quả đấu giá đất, quy hoạch chi tiết 1/500 và Giấy chứng nhận đăng ký đầu tư. Trang này tổng hợp từng văn bản, giải thích loại hình căn hộ du lịch và những gì người mua cần kiểm tra."],
    changefreq: "monthly",
    priority: 0.7,
    ogImage: "/images/og-qtopia-trang-chu.webp",
    ogImageAlt: "Pháp lý dự án QTOPIA Phước Hải",
    menu: "Văn bản pháp lý và loại hình sở hữu QTOPIA",
  },
  "/chu-dau-tu": {
    title: "Chủ đầu tư QTOPIA Phước Hải – Phát Đạt, Serenity",
    description:
      "Chủ đầu tư QTOPIA Phước Hải: Phát Đạt Corporation (PDR) phát triển, pháp nhân Công ty CP Đầu tư Serenity, vốn khoảng 5.366 tỷ; đơn vị vận hành theo brochure.",
    breadcrumb: "Chủ đầu tư",
    h1: "Chủ đầu tư dự án QTOPIA Phước Hải — Phát Đạt và đơn vị vận hành",
    intro: ["QTOPIA do Phát Đạt Corporation phát triển thông qua pháp nhân chủ đầu tư là Công ty Cổ phần Đầu tư Serenity. Trang này giới thiệu các đơn vị tham gia dự án và vai trò của đơn vị vận hành với căn hộ du lịch."],
    changefreq: "monthly",
    priority: 0.7,
    ogImage: "/images/og-qtopia-trang-chu.webp",
    ogImageAlt: "Chủ đầu tư dự án QTOPIA Phước Hải",
    menu: "Chủ đầu tư và đơn vị vận hành QTOPIA",
  },
  "/tien-do": {
    title: "Tiến độ QTOPIA Phước Hải – Cập nhật mới nhất 11/2026",
    description:
      "Tiến độ QTOPIA Phước Hải: dòng thời gian pháp lý, sa bàn và căn hộ mẫu 24/10/2026, Trạm Quậy, Q Mart, Club House tại công trường và mốc bàn giao dự kiến.",
    breadcrumb: "Tiến độ",
    h1: "Tiến độ dự án QTOPIA Phước Hải — cập nhật mới nhất",
    intro: ["Dòng thời gian các mốc chính của QTOPIA từ đấu giá đất năm 2019 đến các hạng mục đang hình thành tại Phước Hải, cùng cách theo dõi tiến độ cho đúng."],
    changefreq: "weekly",
    priority: 0.7,
    ogImage: "/images/og-qtopia-trang-chu.webp",
    ogImageAlt: "Tiến độ dự án QTOPIA Phước Hải",
    menu: "Dòng thời gian và tiến độ xây dựng QTOPIA",
  },
  "/nha-mau-noi-that": {
    title: "Nhà mẫu QTOPIA Phước Hải – Sa bàn và nội thất căn hộ",
    description:
      "Nhà mẫu QTOPIA Phước Hải: sa bàn và căn hộ mẫu tại Sales Gallery Bình Trưng, phối cảnh nội thất, bồn tắm nằm theo từng loại căn và lưu ý nội thất bàn giao.",
    breadcrumb: "Nhà mẫu",
    h1: "Nhà mẫu QTOPIA Phước Hải — sa bàn và nội thất căn hộ",
    intro: ["Sa bàn và căn hộ mẫu QTOPIA được giới thiệu tại Sales Gallery ở phường Bình Trưng, TP.HCM. Xem phong cách nội thất, điểm nhấn từng loại căn và những câu nên hỏi về nội thất bàn giao."],
    changefreq: "monthly",
    priority: 0.7,
    ogImage: "/images/og-qtopia-trang-chu.webp",
    ogImageAlt: "Phối cảnh tổng thể dự án QTOPIA Phước Hải bên bờ biển",
    menu: "Nhà mẫu, sa bàn và nội thất QTOPIA",
  },
  "/hinh-anh-video": {
    title: "Hình ảnh QTOPIA Phước Hải – Phối cảnh, mặt bằng, layout",
    description:
      "Hình ảnh QTOPIA Phước Hải: phối cảnh dự án và tiện ích, mặt bằng tổng thể, mặt bằng tầng Q5–Q6, Q7 và layout 4 loại căn hộ. Bấm ảnh để xem phóng to trên trang.",
    breadcrumb: "Hình ảnh",
    h1: "Hình ảnh dự án QTOPIA Phước Hải — phối cảnh, mặt bằng, layout",
    intro: ["Thư viện phối cảnh, mặt bằng và layout căn hộ QTOPIA theo tài liệu chủ đầu tư."],
    changefreq: "monthly",
    priority: 0.7,
    ogImage: "/images/og-qtopia-trang-chu.webp",
    ogImageAlt: "Phối cảnh tổng thể dự án QTOPIA Phước Hải bên bờ biển",
    menu: "Thư viện hình ảnh và video QTOPIA",
  },
  "/tin-tuc": {
    title: "Tin tức QTOPIA Phước Hải – Tiến độ & sự kiện mới nhất",
    description:
      "Tin tức QTOPIA Phước Hải: cập nhật tiến độ, tổng quan dự án, tiện ích và những thông tin cần kiểm tra trước khi tìm mua căn hộ du lịch ven biển. Đọc ngay.",
    breadcrumb: "Tin tức & sự kiện",
    h1: "Tin tức & sự kiện QTOPIA",
    intro: ["Cập nhật thông tin và những câu chuyện xoay quanh QTOPIA."],
    changefreq: "weekly",
    priority: 0.7,
    ogImage: "/images/og-qtopia-trang-chu.webp",
    ogImageAlt: "Thông tin và bài viết về dự án QTOPIA",
    menu: "Tin tức và sự kiện QTOPIA",
    noindex: !hasRealNews(),
  },
  ...Object.fromEntries(
    newsItems.map((item) => {
      const sample = isSampleNews(item);
      let description = sample
        ? `${item.excerpt} Bài viết mẫu về ${item.category.toLowerCase()} tại QTOPIA.`
        : item.metaDescription ||
          `${item.excerpt} ${item.category} QTOPIA — đọc chi tiết bài viết.`;
      if (sample)
        while (description.length < 150)
          description += " Lorem ipsum dolor sit amet.";
      if (description.length > 160) {
        description =
          description.slice(0, description.lastIndexOf(" ", 157)) + "…";
      }

      const path = `/tin-tuc/${item.id}`;
      return [
        path,
        {
          title: item.seoTitle || `${item.title} — Tin tức QTOPIA`,
          description,
          breadcrumb: item.category,
          changefreq: "monthly",
          priority: 0.5,
          ogImage: item.image || "/images/og-qtopia-trang-chu.webp",
          ogImageAlt: sample
            ? "Bài viết mẫu về dự án QTOPIA"
            : item.imageAlt || item.title,
          // Bài viết thật: thêm JSON-LD NewsArticle + breadcrumb 3 cấp (Trang chủ › Tin tức › bài)
          article: sample
            ? undefined
            : {
                headline: item.title,
                datePublished: item.date,
                image: item.image,
              },
          menu: item.title,
          // Bài mẫu (chưa có nội dung thật) không được index và không vào sitemap.
          noindex: sample,
        },
      ];
    }),
  ),
};

/** Mặc định SEO trong code (trước khi CMS đè) — dùng cho cms-schema.json */
export const pageDefaults = JSON.parse(JSON.stringify(pages));

// SEO sửa trên CMS (title / description / ảnh OG) đè lên mặc định
for (const [path, meta] of Object.entries(pages)) {
  const o = cmsSeo(path);
  if (o.title) meta.title = o.title;
  if (o.description) {
    meta.description = o.description;
    if (meta.ogDescription) meta.ogDescription = o.description;
  }
  if (o.title && meta.ogTitle) meta.ogTitle = o.title;
  if (o.ogImage) meta.ogImage = o.ogImage;
}

/** Trang con theo chủ đề (liên kết nội bộ ở footer + CTA trong section) */
export const topicPaths = [
  "/tong-quan",
  "/vi-tri",
  "/tien-ich",
  "/tien-ich-xung-quanh",
  "/mat-bang",
  "/gia-ban",
  "/chinh-sach-ban-hang",
  "/faq",
  "/can-ho/studio-ama",
  "/can-ho/1pn-mira",
  "/can-ho/2pn-vita",
  "/can-ho/3pn-aria",
  "/phap-ly",
  "/chu-dau-tu",
  "/tien-do",
  "/nha-mau-noi-that",
  "/hinh-anh-video",
];

/** Link ở footer (mobile-first: giữ danh sách ngắn; trang căn hộ đã có link từ /mat-bang và trang chủ). */
export const footerTopicPaths = [
  "/tong-quan",
  "/vi-tri",
  "/tien-ich",
  "/mat-bang",
  "/gia-ban",
  "/chinh-sach-ban-hang",
  "/phap-ly",
  "/tien-do",
  "/faq",
];

/** Trang chính muốn Google hiển thị dạng sitelinks (snippet con) dưới kết quả trang chủ. */
export const sitelinkPaths = [
  "/gia-ban",
  "/mat-bang",
  "/tien-ich",
  "/vi-tri",
  "/tong-quan",
  "/chinh-sach-ban-hang",
];

/** Trang không đưa vào sitemap, noindex */
export const hiddenPages = {
  // Trang cảm ơn sau khi gửi form: được prerender (có file HTML) nhưng noindex, không vào sitemap.
  "/cam-on": {
    title: "Cảm ơn bạn đã đăng ký — QTOPIA",
    description:
      "Cảm ơn bạn đã để lại thông tin. Chuyên viên tư vấn QTOPIA sẽ liên hệ trong thời gian sớm nhất.",
    breadcrumb: "Cảm ơn",
  },
  "/404": {
    title: "Không tìm thấy trang — QTOPIA",
    description:
      "Trang bạn tìm không tồn tại. Quay về trang chủ QTOPIA để xem tổng quan dự án, vị trí, tiện ích và mặt bằng.",
    breadcrumb: "404",
  },
};

export const routes = Object.keys(pages);
/** Route được index (đưa vào sitemap) */
export const indexableRoutes = routes.filter((r) => !pages[r].noindex);

/** Menu chính (anchor nhảy tới section trên trang chủ) */
export const mainNav = [
  {
    to: "/#tong-quan",
    label: "Tổng quan",
    title: "Tổng quan dự án căn hộ QTOPIA",
  },
  { to: "/#vi-tri", label: "Vị trí", title: pages["/vi-tri"].menu },
  { to: "/#tien-ich", label: "Tiện ích", title: pages["/tien-ich"].menu },
  { to: "/#mat-bang", label: "Mặt bằng", title: pages["/mat-bang"].menu },
  {
    to: "/#chinh-sach",
    label: "Chính sách",
    title: "Chính sách bán hàng và phương thức thanh toán QTOPIA",
  },
  {
    to: "/#tin-tuc",
    label: "Tin tức",
    title: "Tin tức và thông tin dự án QTOPIA",
  },
  {
    to: "/#phap-ly",
    label: "Pháp lý",
    title: "Thông tin pháp lý dự án QTOPIA",
  },
  {
    to: "/#lien-he",
    label: "Liên hệ",
    title: "Liên hệ nhận thông tin dự án QTOPIA",
  },
];

export const absUrl = (path) => SITE_URL + (path === "/" ? "/" : path);
export const absAsset = (src) => (/^https?:/.test(src) ? src : SITE_URL + src);

export function pageMeta(path) {
  return pages[path] || hiddenPages[path] || pages["/"];
}
