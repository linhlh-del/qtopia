import { registerCms } from "../cms/content";
import { amenityCatalog } from "./amenity-catalog";

// Nguồn dữ liệu duy nhất cho nội dung dự án QTOPIA.
// Thông tin tổng hợp từ bộ tài liệu brochure/brand guideline do CĐT cung cấp.
// Số liệu thương mại (giá, pháp lý, tiến độ) CHƯA có trong tài liệu gốc — cần xác nhận trước khi lên production.
//
// ẢNH: chỉ dùng ảnh gốc CĐT giao (thư mục "PC dự án" → /images/renders, "layout" → /images/layouts).
// Mọi ảnh cắt từ brochure PDF đã được gỡ bỏ: để `null` và trang hiển thị KHUNG TRỐNG chờ ảnh thật.
export const siteMeta = {
  projectName: "QTOPIA",
  tagline: "Thành phố cuối tuần của siêu đô thị TP. Hồ Chí Minh",
  hotline: "093 448 3138",
  hotlineHref: "tel:+84934483138",
  zalo: "https://zalo.me/1717736678695240623",
  email: "", // chưa có
  address: "Thửa đất số 08, tờ bản đồ số 38, xã Phước Hải, TP. Hồ Chí Minh", // theo phaply.qtopia.vn
  developer: "Phát Đạt Corporation",
};

export const faq = [
  {
    q: "QTOPIA là dự án gì và nằm ở đâu?",
    a: "Theo tài liệu dự án, QTOPIA là tổ hợp căn hộ và trải nghiệm giải trí, nghỉ dưỡng bên biển tại khu vực Phước Hải. Brochure định vị nơi đây là “thành phố cuối tuần” cách trung tâm TP.HCM khoảng 75 phút di chuyển.",
  },
  {
    q: "Từ TP.HCM đến QTOPIA mất bao lâu?",
    a: "Brochure nêu thời gian tham khảo khoảng 75 phút từ trung tâm TP.HCM, 30 phút từ sân bay Long Thành và 19 phút từ Hồ Tràm. Thời gian thực tế phụ thuộc điểm xuất phát, tuyến đường và giao thông.",
  },
  {
    q: "QTOPIA có những khu tiện ích nào?",
    a: "Ba khu trải nghiệm chính trong brochure là Quậy Station, Ocean Galaxy và Oasis Resort. Các điểm nổi bật gồm quảng trường biển, DJ Ocean, Aqua Funny Park, hồ bơi Oasis, khu thể thao và vườn Romantic Garden.",
  },
  {
    q: "Q5, Q6 và Q7 có những loại căn nào?",
    a: "Tầng điển hình Q5–Q6 có AMA Studio, MIRA 1PN+ và VITA 2PN. Q7 có thêm ARIA 3PN. Brochure thể hiện tầng điển hình từ tầng 4 đến tầng 10.",
  },
  {
    q: "Diện tích căn hộ QTOPIA được tính như thế nào?",
    a: "Tài liệu phân biệt diện tích sử dụng (SD) và diện tích tim tường (TT). Bản mặt bằng Q5–Q6 trên trang cho phép xem cả hai chỉ số theo từng mã căn; diện tích chính thức cần đối chiếu hồ sơ bán hàng.",
  },
  {
    q: "Căn hộ QTOPIA có thể dùng để ở hay cho thuê?",
    a: "Brochure giới thiệu định hướng “tài sản 2 trong 1”: sử dụng làm nơi nghỉ cuối tuần hoặc khai thác cho thuê. Khả năng vận hành, chi phí và doanh thu phụ thuộc phương án thực tế; tài liệu không đưa ra mức lợi nhuận bảo đảm.",
  },
  {
    q: "Làm sao nhận thông tin sản phẩm mới nhất?",
    a: "Bạn có thể để lại thông tin tại biểu mẫu tư vấn. Bảng giá, chính sách bán hàng, tiêu chuẩn bàn giao và hồ sơ pháp lý cần được xác nhận theo tài liệu chính thức ở thời điểm giao dịch.",
  },
];

export const heroContent = {
  // Mỗi ảnh có một thông điệp; slide đầu là H1 mặc định trong HTML prerender.
  // Dùng \n hoặc <br> trong h1 để khóa điểm xuống dòng; mỗi cụm được giữ liền nhau.
  images: [
    {
      src: "/images/renders/view-from-sea.webp",
      alt: "Phối cảnh dự án căn hộ QTOPIA nhìn từ biển",
      h1: "QTOPIA — THÀNH PHỐ CUỐI TUẦN\nCỦA SIÊU ĐÔ THỊ TP.HCM",
      slogan: "Sở hữu rừng nguyên sinh, lưng tựa núi, mặt hướng biển",
    },
    {
      src: "/images/renders/ocean-galaxy.webp",
      alt: "Phối cảnh khu Ocean Galaxy về đêm với hồ bơi và sàn DJ tại QTOPIA",
      h1: "Sở hữu nhà Sài Gòn có biển\ngiá chỉ từ 1.195 tỷ",
      slogan:
        "Căn Studio QTOPIA tại Phước Hải — trước biển, sau núi, gần rừng.",
    },
    {
      src: "/images/renders/aqua-funny-park-night.webp",
      alt: "Phối cảnh công viên nước Aqua Funny Park về đêm tại QTOPIA",
      h1: "Thanh toán 10% đến khi\nnhận nhà",
      slogan: "Khởi đầu từ 120 triệu · Hỗ trợ lãi suất 0% đến 24 tháng.",
    },
  ],
  ctaPrimary: "Nhận thông tin dự án",
};

// Hai màn "story" toàn khung hình (ảnh nền + khối chữ ngắn).
export const stories = [
  {
    id: "tong-quan",
    image: "/images/renders/birdview.webp",
    alt: "Phối cảnh tổng thể dự án QTOPIA bên bờ biển với núi xanh phía sau",
    align: "left",
    label: "Thành phố cuối tuần của siêu độ thị TP. HỒ CHÍ MINH",
    lead: "Biển ở phía trước, núi và rừng ở phía sau. QTOPIA kết nối không gian nghỉ dưỡng với nhịp vui của một tổ hợp Entertainment Complex.",
    points: [
      "Ba khu trải nghiệm: Quậy Station · Ocean Galaxy · Oasis Resort",
      "Loại hình căn hộ Studio · 1PN+ · 2PN · 3PN · Aqua Home theo từng tháp",
    ],
    cta: {
      label: "Khám phá mặt bằng",
      to: "/#mat-bang",
      name: "story_tong_quan",
    },
  },
  {
    id: "nightlife",
    image: "/images/renders/ocean-galaxy.webp",
    alt: "Phối cảnh Nightlife Hub Ocean Galaxy về đêm với hồ bơi, sàn DJ và pháo hoa tại QTOPIA",
    align: "right",
    label: "Một ngày, nhiều nhịp vui",
    lead: "Ban ngày thư giãn bên hồ bơi, khám phá Aqua Funny Park. Khi đêm xuống, Ocean Galaxy tiếp nối bằng âm nhạc, ánh sáng và không gian giải trí bên biển.",
    points: [
      "DJ Ocean · phố thương mại dịch vụ",
      "Oasis Resort · khu thể thao · vườn cảnh quan",
    ],
    cta: {
      label: "Xem các khu tiện ích",
      to: "/#tien-ich",
      name: "story_nightlife",
    },
  },
];

// 8 ô số liệu — mỗi ô 1 con số (chạy hiệu ứng đếm) + đơn vị + chú thích ngắn.
export const facts = [
  { value: "7,5", unit: "ha", label: "Quy mô" },
  { value: "9", unit: "Tháp", label: "Q5 · Q6 · Q7" },
  {
    value: "5",
    unit: "Loại căn",
    label: "Studio · 1PN+ · 2PN · 3PN · Aqua Home",
  },
  {
    value: "3",
    unit: "Cụm tiện ích",
    label: "Quậy Station · Ocean Galaxy · Oasis Resort",
  },
  { value: "20", unit: "Tầng căn hộ", label: "Tầng 4 đến tầng 10" },
  { value: "75", unit: "Phút", label: "Từ trung tâm TP.HCM (tham khảo)" },
  { value: "30", unit: "Phút", label: "Từ sân bay Long Thành (tham khảo)" },
  { value: "19", unit: "Phút", label: "Từ Hồ Tràm (tham khảo)" },
];

export const featuredAmenityGroups = [
  {
    id: "nightlife",
    label: "Nhịp vui đêm",
    items: [
      {
        image: "/images/renders/ocean-galaxy.webp",
        caption: "Ocean Galaxy",
        span: "big",
      },
      { image: "/images/renders/dj-ocean.webp", caption: "Sàn DJ Ocean" },
      {
        image: "/images/renders/aqua-funny-park-night.webp",
        caption: "Aqua Funny Park về đêm",
      },
      { image: "/images/renders/ocean-galaxy-2.webp", caption: "Beach club" },
      {
        image: "/images/renders/ocean-galaxy-3.webp",
        caption: "Phố TMDV Ocean Galaxy",
      },
    ],
  },
  {
    id: "resort",
    label: "Ngày bên biển",
    items: [
      {
        image: "/images/renders/aqua-funny-park.webp",
        caption: "Aqua Funny Park",
        span: "big",
      },
      { image: "/images/renders/oasis-pool.webp", caption: "Hồ bơi Oasis" },
      {
        image: "/images/renders/cong-chao.webp",
        caption: "Cổng chào Wonder Gate",
      },
      { image: "/images/renders/tien-ich-1.webp", caption: "Tổ hợp thể thao" },
      {
        image: "/images/renders/tien-ich-3.webp",
        caption: "Cảnh quan nội khu",
      },
    ],
  },
  {
    id: "rooftop",
    label: "Không gian tầng mái",
    items: [
      {
        image: "/images/renders/roof-q5.webp",
        caption: "Tầng mái Q5 — Ocean Lounge",
        span: "big",
      },
      {
        image: "/images/renders/roof-q6.webp",
        caption: "Tầng mái Q6 — Galaxy Dome",
      },
      {
        image: "/images/renders/tien-ich-2.webp",
        caption: "Khu thư giãn ngoài trời",
      },
      {
        image: "/images/renders/tien-ich-5.webp",
        caption: "Sân sinh hoạt chung",
      },
      {
        image: "/images/renders/interior-studio.webp",
        caption: "Nội thất căn Studio",
      },
    ],
  },
];

export const locationContent = {
  label: "Vị trí QTOPIA",
  lead: "Phía trước là biển, phía sau là núi và rừng. Brochure giới thiệu QTOPIA như điểm đến cuối tuần cách trung tâm TP.HCM khoảng 75 phút.",
  mapImage: "/images/position-map.webp",
  highlights: [
    { label: "Trung tâm TP.HCM", value: "75" },
    { label: "Sân bay quốc tế Long Thành", value: "30" },
    { label: "Hồ Tràm", value: "19" },
    { label: "Quảng trường Phước Hải", value: "2" },
  ],
};

// Ảnh mặt bằng tiện ích được dùng trong section ba khu trải nghiệm.
// Tên tiện ích dùng cho danh sách bên phải; vị trí nhãn nằm ở amenity-label-positions.js.
export const masterPlan = {
  image: "/images/matbangtienich.webp",
  zones: amenityCatalog,
};

export const unitTypeInfo = {
  "ama-studio": {
    id: "ama-studio",
    name: "AMA",
    subtitle: "Studio",
    color: "#ff9c57",
  },
  "mira-1pn": {
    id: "mira-1pn",
    name: "MIRA",
    subtitle: "1PN+",
    color: "#aee15a",
  },
  "vita-2pn": {
    id: "vita-2pn",
    name: "VITA",
    subtitle: "2PN",
    color: "#5fd4e0",
  },
  "aria-3pn": {
    id: "aria-3pn",
    name: "ARIA",
    subtitle: "3PN",
    color: "#c79bf0",
  },
};

// Ảnh mặt bằng từng loại căn theo tháp (ảnh gốc CĐT giao, giữ đúng tỉ lệ thật của từng ảnh).
export const unitLayoutImages = {
  "q5-q6": {
    "ama-studio": {
      image: "/images/layouts/ama-studio-q5-q6.webp",
      area: "SD 25,23 - 30,05 m² · TT 28,60 - 33,47 m²",
    },
    "mira-1pn": {
      image: "/images/layouts/mira-1pn-q5-q6.webp",
      area: "SD 41,67 m² · TT 47,44 m²",
    },
    "vita-2pn": {
      image: "/images/layouts/vita-2pn-q5-q6.webp",
      area: "SD 61,49 - 63,09 m² · TT 67,93 - 69,68 m²",
    },
  },
  q7: {
    "ama-studio": {
      image: "/images/layouts/ama-studio-q7.webp",
      area: "SD 25,10 - 29,28 m² · TT 28,35 - 32,94 m²",
    },
    "mira-1pn": {
      image: "/images/layouts/mira-1pn-q7.webp",
      area: "SD 44,65 m² · TT 48,52 m²",
    },
    "vita-2pn": {
      image: "/images/layouts/vita-2pn-q7.webp",
      area: "SD 56,17 - 56,54 m² · TT 62,66 - 62,91 m²",
    },
    "aria-3pn": {
      image: "/images/layouts/aria-3pn-q7.webp",
      area: "SD 71,72 - 73,34 m² · TT 79,18 - 80,96 m²",
    },
  },
};

export const leadFormContent = {
  label: "Tìm hiểu QTOPIA",
  heading: "Nhận thông tin dự án QTOPIA",
  description:
    "Để lại thông tin để nhận tài liệu sản phẩm và được liên hệ khi có cập nhật chính thức về bảng giá, chính sách bán hàng.",
  image: "/images/renders/view-from-sea.webp",
  consentNote:
    "Bằng việc gửi biểu mẫu, bạn đồng ý để bộ phận tư vấn liên hệ về thông tin dự án QTOPIA.",
};

// Section Pháp lý — các văn bản pháp lý chính theo thông tin đã công bố.
// Mục chưa có văn bản để `subtitle: 'Đang cập nhật'`; khi CĐT công bố thì thay bằng số hiệu thật.
export const legalContent = {
  label: "Pháp lý dự án QTOPIA",
  lead: "Các văn bản pháp lý chính của dự án theo thông tin đã công bố. Khách hàng nên đối chiếu bản gốc khi ký kết giao dịch.",
  items: [
    {
      title: "Đấu giá quyền sử dụng đất",
      subtitle: "QĐ 817/QĐ-UBND ngày 08/4/2019",
      body: "UBND tỉnh Bà Rịa – Vũng Tàu công nhận kết quả đấu giá quyền sử dụng đất và tài sản gắn liền với đất đối với khu đất 73.842 m² tại thị trấn Phước Hải (nay là xã Phước Hải). Quyết định được điều chỉnh bởi QĐ 3594/QĐ-UBND ngày 27/12/2019 và QĐ 1812/QĐ-UBND ngày 06/7/2020.",
    },
    {
      title: "Quy hoạch chi tiết tỷ lệ 1/500",
      subtitle: "QĐ 3636/QĐ-UBND ngày 24/12/2025",
      body: "UBND xã Phước Hải phê duyệt quy hoạch chi tiết 1/500 Khu thương mại dịch vụ, căn hộ du lịch, biệt thự nghỉ dưỡng và khách sạn cao cấp: tổng diện tích 73.842 m², mật độ xây dựng tối đa 25%, hệ số sử dụng đất tối đa 4,02; khu đất tổ chức thành khu biển và khu núi.",
    },
    {
      title: "Giấy chứng nhận đăng ký đầu tư",
      subtitle: "Sở Tài chính TP.HCM cấp ngày 10/06/2026",
      body: "Cấp cho Công ty Cổ phần Đầu tư Serenity – pháp nhân chủ đầu tư dự án. Tổng vốn đầu tư khoảng 5.366,64 tỷ đồng.",
    },
    {
      title: "Giấy phép xây dựng & điều kiện mở bán",
      subtitle: "Đang cập nhật",
      body: "Website sẽ cập nhật giấy phép xây dựng, văn bản đủ điều kiện kinh doanh và mẫu Hợp đồng mua bán khi chủ đầu tư công bố. Chỉ đặt cọc, thanh toán theo văn bản do chủ đầu tư phát hành.",
    },
  ],
  cta: "Nhận bộ hồ sơ pháp lý",
};

export const legalNotice = {
  disclaimer:
    "Thông tin, hình ảnh, các tiện ích trong tài liệu bán hàng chỉ mang tính tương đối và có thể được điều chỉnh theo quyết định của Chủ đầu tư từng thời điểm đảm bảo phù hợp quy hoạch và thực tế thi công dự án. Các thông tin, cam kết chính thức sẽ được quy định cụ thể tại Hợp đồng mua bán. Việc quản lý, vận hành và kinh doanh khu đô thị sẽ do theo quy định của Ban quản lý.",
};

/* ── Chính sách bán hàng (theo bảng CSBH của chủ đầu tư) ───────────────────
   Mỗi mốc: label (mốc thời gian), top (ghi chú nhỏ phía trên), amount + unit (số lớn),
   note (ghi chú dưới số), bank (khoản ngân hàng giải ngân), between (chữ trên đoạn line
   từ mốc này tới mốc kế tiếp), flex (độ rộng tương đối của khoảng trên timeline). */
export const salesPolicy = {
  label: "Chính sách bán hàng QTOPIA",
  lead: "Chỉ từ 120 triệu, thanh toán 10% đến khi nhận nhà, lãi suất 0% đến 24 tháng, ân hạn nợ gốc 48 tháng.",
  price: { prefix: "Căn Studio chỉ từ", value: "1.195", unit: "tỷ đồng" },
  cta: "Nhận bảng tính dòng tiền",
  methods: [
    {
      id: "chuan",
      tab: "Thanh toán chuẩn",
      tabShort: "Chuẩn",
      title: "Phương thức thanh toán chuẩn",
      milestones: [
        { label: "T", amount: "50", unit: "triệu", note: "Ký TTĐC", flex: 0.8 },
        {
          label: "T+7",
          amount: "10",
          unit: "%",
          note: "Ký HĐMB",
          between: "Thanh toán TB 3,75%/tháng",
          flex: 2.6,
        },
        {
          label: "T+540",
          top: "Nhận bàn giao",
          amount: "25",
          unit: "%",
          note: "+ KPBT",
          flex: 1,
        },
        { label: "Nhận sổ", amount: "5", unit: "%", flex: 0.8 },
      ],
    },
    {
      id: "nhanh-70",
      tab: "Thanh toán nhanh 70%",
      tabShort: "Nhanh 70%",
      title: "Phương thức thanh toán nhanh 70%",
      milestones: [
        { label: "T", amount: "50", unit: "triệu", note: "Ký TTĐC", flex: 0.8 },
        { label: "T+7", amount: "10", unit: "%", note: "Ký HĐMB", flex: 1 },
        { label: "T+30", amount: "60", unit: "%", flex: 1.8 },
        {
          label: "T+540",
          top: "Nhận bàn giao",
          amount: "25",
          unit: "%",
          flex: 1,
        },
        { label: "Nhận sổ", amount: "5", unit: "%", flex: 0.8 },
      ],
    },
    {
      id: "vay-ngan-hang",
      tab: "Vay ngân hàng",
      tabShort: "Vay NH",
      title: "Phương thức vay ngân hàng",
      milestones: [
        { label: "T", amount: "50", unit: "triệu", note: "Ký TTĐC", flex: 0.8 },
        { label: "T+7", amount: "15", unit: "%", note: "Ký HĐMB", flex: 1 },
        { label: "T+30", bank: "40%", flex: 1.8 },
        {
          label: "T+540",
          top: "Nhận bàn giao",
          amount: "10",
          unit: "%",
          bank: "30%",
          flex: 1,
        },
        { label: "Nhận sổ", amount: "5", unit: "%", note: "+ KPBT", flex: 0.8 },
      ],
      perks: [
        "Hỗ trợ lãi suất 24 tháng hoặc đến khi bàn giao",
        "Ân hạn nợ gốc 48 tháng",
      ],
      perksNote: "*Áp dụng có điều kiện",
    },
  ],
  glossary:
    "TTĐC: thoả thuận đặt cọc · HĐMB: hợp đồng mua bán · KPBT: kinh phí bảo trì.",
  disclaimer:
    "Chính sách được áp dụng theo văn bản ban hành chính thức của Chủ đầu tư và có thể thay đổi theo từng thời điểm.",
};

/* ── Tiện ích xung quanh (trang /tien-ich-xung-quanh) ─────────────────────────
   Chỉ dùng các mốc có trên bản đồ vị trí / brochure; thời gian là tham khảo. */
export const nearbyContent = {
  label: "Tiện ích xung quanh QTOPIA",
  lead: "Từ QTOPIA, các điểm đến biển, đô thị và đầu mối giao thông của khu vực đều nằm trong bán kính một chuyến đi ngắn. Thời gian di chuyển dưới đây là số liệu tham khảo theo brochure.",
  groups: [
    {
      title: "Kết nối giao thông",
      icon: "pin",
      items: [
        { name: "Trung tâm TP.HCM", minutes: "75", note: "Qua hệ thống cao tốc kết nối khu vực phía Đông" },
        { name: "Sân bay Quốc tế Long Thành", minutes: "30", note: "Cửa ngõ hàng không quốc tế của vùng" },
        { name: "Cảng Cái Mép – Thị Vải", note: "Cụm cảng nước sâu trên bản đồ kết nối vùng" },
        { name: "Biên Hòa", note: "Đô thị công nghiệp – dịch vụ phía Bắc tuyến kết nối" },
      ],
    },
    {
      title: "Điểm đến biển & du lịch",
      icon: "star",
      items: [
        { name: "Quảng trường Phước Hải", minutes: "2", note: "Trung tâm sinh hoạt ngay cạnh dự án" },
        { name: "Hồ Tràm", minutes: "19", note: "Dải biển nghỉ dưỡng lân cận" },
        { name: "Vũng Tàu", note: "Thành phố biển trên trục kết nối ven biển" },
        { name: "Bà Rịa", note: "Đô thị hành chính – dịch vụ của khu vực" },
        { name: "Cần Giờ", note: "Vùng sinh thái ven biển phía Tây" },
      ],
    },
  ],
};

/* ── Đăng ký với CMS: nội dung đã publish đè lên các object này lúc build (xem src/cms/content.js) ── */
for (const [name, obj] of Object.entries({
  siteMeta, heroContent, stories, facts, locationContent, nearbyContent,
  featuredAmenityGroups, salesPolicy, legalContent, legalNotice, faq, leadFormContent,
})) registerCms(name, obj);

// Sau khi CMS đã đè nội dung
export const legalDisclaimer = legalNotice.disclaimer;
