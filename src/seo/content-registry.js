/* Cầu nối giữa JSON-LD (bundle chính) và nội dung chữ dài của trang chủ đề (src/data/seo-content.js).
   seo-content.js tự đăng ký khi được nạp — ở prerender (entry-server import sẵn) và ở trình duyệt
   (nằm trong chunk của RichContent). Nhờ vậy ~90 KB nội dung chữ KHÔNG nằm trong bundle chính.
   Ở trình duyệt, nếu chưa nạp thì JSON-LD khi chuyển trang trong SPA bỏ qua FAQ/dateModified:
   không ảnh hưởng SEO vì Google đọc HTML prerender của từng URL (đã có đủ JSON-LD). */
let source = { pageFaqs: () => [], hasContent: () => false, updatedIso: '' }

export function registerSeoContent(next) {
  source = next
}

export const contentSource = () => source
