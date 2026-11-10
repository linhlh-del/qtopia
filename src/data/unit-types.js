/* Dữ liệu 4 loại căn QTOPIA: dùng chung cho /mat-bang (khối tóm tắt) và các trang /can-ho/* (trang chi tiết).
   Mô tả công năng viết theo đúng bản vẽ layout trong public/images/layouts (đã đối chiếu từng ảnh).
   slug / path: đường dẫn trang chi tiết; type: khoá trong unitTypeInfo + dữ liệu mặt bằng. */
const raw = [
    {
            title: 'Căn AMA Studio (25–30 m² sử dụng)',
      intro: [
        'AMA là dòng căn chiếm số lượng lớn nhất (34/38 căn mỗi tầng điển hình Q5–Q6). Căn có dạng chữ nhật sâu, bố trí theo trục từ cửa vào ra ban công nên mọi khu vực đều nhận được ánh sáng tự nhiên. Layout có phiên bản đối xứng để ghép thành hai dãy hai bên hành lang.',
        'Với diện tích vừa phải và giá từ 1,195 tỷ đồng, AMA là lựa chọn dễ tiếp cận nhất để sở hữu căn hộ biển tại QTOPIA, phù hợp cặp đôi, khách nghỉ ngắn ngày và rất thuận tiện khi cho thuê theo đêm.',
      ],
      features: [
        'Ban công phía đầu căn, đủ đặt bàn ghế nhỏ ngồi hóng gió.',
        'Khu ngủ với giường đôi đặt sát ban công, có tầm nhìn ra ngoài.',
        'Bồn tắm nằm đặt mở giữa căn – điểm nhấn kiểu phòng khách sạn nghỉ dưỡng.',
        'Bàn làm việc / bàn trang điểm nhỏ cạnh khu ngủ.',
        'Kệ bếp gọn và tủ đồ chạy dọc tường gần cửa ra vào.',
        'Khu vệ sinh riêng có bồn cầu, lavabo và vòi sen đứng.',
      ],
      images: [
        {
          src: '/images/layouts/ama-studio-q5-q6.webp',
          alt: 'Layout căn hộ AMA Studio tháp Q5, Q6 dự án QTOPIA Phước Hải: ban công, giường đôi, bồn tắm nằm, kệ bếp và khu vệ sinh riêng; tim tường 28,60–33,47 m², sử dụng 25,23–30,05 m²',
          caption: 'AMA Studio – tháp Q5, Q6 · TT 28,60–33,47 m² · SD 25,23–30,05 m²',
        },
        {
          src: '/images/layouts/ama-studio-q7.webp',
          alt: 'Layout căn hộ AMA Studio tháp Q7 dự án QTOPIA Phước Hải: ban công, khu ngủ, bồn tắm nằm giữa căn, bếp và phòng vệ sinh; tim tường 28,35–32,94 m², sử dụng 25,10–29,28 m²',
          caption: 'AMA Studio – tháp Q7 · TT 28,35–32,94 m² · SD 25,10–29,28 m²',
        },
      ],
    },
    {
            title: 'Căn MIRA 1PN+ (khoảng 42–45 m² sử dụng)',
      intro: [
        'MIRA tách riêng phòng ngủ và khu sinh hoạt, với phần “+” là góc sofa – phòng khách linh hoạt có thể làm chỗ ngủ phụ cho trẻ, góc làm việc hoặc khu thư giãn. Tại Q5–Q6, MIRA nằm ở đầu hồi phía Tây nên có thêm mặt thoáng.',
        'Căn phù hợp gia đình trẻ ba người, cặp đôi muốn không gian riêng tư hơn Studio hoặc khách lưu trú dài ngày cần tách biệt khu ngủ và khu sinh hoạt.',
      ],
      features: [
        'Ban công rộng phía trước căn (tại Q7 ban công chạy suốt mặt tiền).',
        'Phòng khách với sofa và bàn trà, nối liền bàn ăn nhỏ cho 2 người.',
        'Bếp chạy dọc tường với bồn rửa và khu nấu.',
        'Phòng ngủ riêng với giường đôi và tủ quần áo.',
        'Phòng tắm có bồn tắm nằm, lavabo và bồn cầu.',
      ],
      images: [
        {
          src: '/images/layouts/mira-1pn-q5-q6.webp',
          alt: 'Layout căn hộ MIRA 1PN+ tháp Q5, Q6 dự án QTOPIA Phước Hải: ban công, phòng khách sofa, bàn ăn, bếp, phòng ngủ riêng và phòng tắm có bồn tắm nằm; tim tường 47,44 m², sử dụng 41,67 m²',
          caption: 'MIRA 1PN+ – tháp Q5, Q6 · TT 47,44 m² · SD 41,67 m²',
        },
        {
          src: '/images/layouts/mira-1pn-q7.webp',
          alt: 'Layout căn hộ MIRA 1PN+ tháp Q7 dự án QTOPIA Phước Hải: ban công dài, góc sofa, phòng ngủ giường đôi, bếp, bàn ăn và phòng tắm có bồn tắm nằm; tim tường 48,52 m², sử dụng 44,65 m²',
          caption: 'MIRA 1PN+ – tháp Q7 · TT 48,52 m² · SD 44,65 m²',
        },
      ],
    },
    {
            title: 'Căn VITA 2PN (khoảng 56–63 m² sử dụng)',
      intro: [
        'VITA gồm hai phòng ngủ, phòng khách, bàn ăn 4 chỗ và bếp, phù hợp gia đình bốn người hoặc nhóm bạn đi nghỉ cùng nhau. Tại Q5–Q6, VITA là căn góc đầu hồi phía Đông với diện tích sử dụng 61,49–63,09 m²; tại Q7 diện tích sử dụng 56,17–56,54 m².',
        'Điểm đặc biệt là phòng ngủ lớn có bồn tắm nằm và lavabo đôi đặt mở ngay trong phòng, tạo cảm giác như suite khách sạn; phòng ngủ còn lại hướng ra ban công.',
      ],
      features: [
        'Ban công chạy dọc mặt tiền, mở ra từ phòng khách và phòng ngủ.',
        'Phòng khách sofa kết hợp bàn ăn 4 ghế.',
        'Bếp dọc tường có bồn rửa và khu nấu.',
        'Phòng ngủ 1 hướng ban công, giường đôi.',
        'Phòng ngủ 2 (lớn) có bồn tắm nằm, lavabo đôi và lối vào khu vệ sinh.',
        'Hai khu vệ sinh riêng biệt.',
      ],
      images: [
        {
          src: '/images/layouts/vita-2pn-q5-q6.webp',
          alt: 'Layout căn hộ VITA 2PN tháp Q5, Q6 dự án QTOPIA Phước Hải: ban công, phòng khách, bàn ăn 4 chỗ, bếp, hai phòng ngủ, phòng ngủ lớn có bồn tắm nằm và lavabo đôi; tim tường 67,93–69,68 m², sử dụng 61,49–63,09 m²',
          caption: 'VITA 2PN – tháp Q5, Q6 · TT 67,93–69,68 m² · SD 61,49–63,09 m²',
        },
        {
          src: '/images/layouts/vita-2pn-q7.webp',
          alt: 'Layout căn hộ VITA 2PN tháp Q7 dự án QTOPIA Phước Hải: ban công, phòng khách sofa, bàn ăn, bếp, hai phòng ngủ và bồn tắm nằm trong phòng ngủ lớn; tim tường 62,66–62,91 m², sử dụng 56,17–56,54 m²',
          caption: 'VITA 2PN – tháp Q7 · TT 62,66–62,91 m² · SD 56,17–56,54 m²',
        },
      ],
    },
    {
            title: 'Căn ARIA 3PN tại tháp Q7 (khoảng 72–73 m² sử dụng)',
      intro: [
        'ARIA là dòng căn lớn nhất, chỉ có tại tháp Q7, dành cho gia đình nhiều thế hệ hoặc nhóm đông người cần không gian nghỉ dưỡng rộng rãi trong cùng một căn. Căn có hai ban công: một ban công phía phòng khách và một lô gia nhỏ cạnh phòng ngủ thứ ba.',
        'Bố cục tách khu sinh hoạt chung (phòng khách, bàn ăn, bếp) ở một bên và ba phòng ngủ ở bên còn lại, giúp các thành viên vừa có không gian chung vừa giữ được sự riêng tư.',
      ],
      features: [
        'Phòng khách sofa nối với ban công, bàn ăn 4 ghế và bếp.',
        'Phòng ngủ 1 với giường đôi và tủ quần áo.',
        'Phòng ngủ 3 nhỏ gọn, có lô gia riêng – có thể làm phòng ngủ trẻ em, phòng đọc hoặc làm việc.',
        'Phòng ngủ lớn có bồn tắm nằm và lavabo.',
        'Hai khu vệ sinh riêng biệt.',
      ],
      images: [
        {
          src: '/images/layouts/aria-3pn-q7.webp',
          alt: 'Layout căn hộ ARIA 3PN tháp Q7 dự án QTOPIA Phước Hải: hai ban công, phòng khách, bàn ăn 4 chỗ, bếp, ba phòng ngủ, bồn tắm nằm và hai khu vệ sinh; tim tường 79,18–80,96 m², sử dụng 71,72–73,34 m²',
          caption: 'ARIA 3PN – tháp Q7 · TT 79,18–80,96 m² · SD 71,72–73,34 m²',
        },
      ],
    },
]

const meta = [
  { slug: 'studio-ama', type: 'ama-studio', short: 'AMA Studio' },
  { slug: '1pn-mira', type: 'mira-1pn', short: 'MIRA 1PN+' },
  { slug: '2pn-vita', type: 'vita-2pn', short: 'VITA 2PN' },
  { slug: '3pn-aria', type: 'aria-3pn', short: 'ARIA 3PN' },
]

export const unitTypes = raw.map((u, i) => ({ ...u, ...meta[i], path: `/can-ho/${meta[i].slug}` }))
export const unitByPath = Object.fromEntries(unitTypes.map((u) => [u.path, u]))
