/* ============================================================
   DANH SÁCH SỬA ĐƯỢC TRÊN CMS (thêm / xoá / đổi thứ tự / thay từng ảnh) — QTOPIA.
   key = "<tên object đã registerCms>.<đường dẫn mảng>" (khớp khoá phẳng cũ, vd. featuredAmenityGroups.0.items.0.image).
   section = id section trong src/cms/schema.js (= tên object). Lõi xử lý: ./lists-core.js.
   Mảng không tồn tại trong dữ liệu (vd. nhóm thứ 5 chưa có) được bỏ qua.
   ============================================================ */
const range = (n) => Array.from({ length: n }, (_, i) => i);

export const CMS_LISTS = [
  ...range(6).map((i) => ({
    section: 'featuredAmenityGroups', key: `featuredAmenityGroups.${i}.items`, label: `Nhóm ${i + 1} — ảnh`, itemLabel: 'Ảnh', max: 30,
    fields: [['caption', 'Chú thích']],
    images: [{ key: 'image', label: 'Ảnh', ratio: '4/3' }],
    blank: ['span'], // ô lớn ("big") chỉ giữ cho phần tử có sẵn
  })),
  ...range(4).map((i) => ({
    section: 'stories', key: `stories.${i}.points`, label: `Màn ${i + 1} — gạch đầu dòng`, itemLabel: 'Dòng', scalar: true, valueLabel: 'Nội dung', max: 8,
  })),
  { section: 'facts', key: 'facts', label: 'Số liệu', itemLabel: 'Số liệu', max: 10,
    fields: [['value', 'Giá trị'], ['unit', 'Đơn vị'], ['label', 'Nhãn']] },
  { section: 'locationContent', key: 'locationContent.highlights', label: 'Thời gian di chuyển', itemLabel: 'Địa điểm', max: 8,
    fields: [['label', 'Địa điểm'], ['value', 'Số phút']] },
  ...range(4).map((i) => ({
    section: 'nearbyContent', key: `nearbyContent.groups.${i}.items`, label: `Nhóm ${i + 1} — địa điểm`, itemLabel: 'Địa điểm', max: 15,
    fields: [['name', 'Tên'], ['minutes', 'Số phút (để trống nếu không có)'], ['note', 'Ghi chú']],
  })),
  { section: 'faq', key: 'faq', label: 'Câu hỏi thường gặp', itemLabel: 'Câu hỏi', max: 20,
    fields: [['q', 'Câu hỏi'], ['a', 'Trả lời', 'textarea']] },
];
