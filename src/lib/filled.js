// Giá trị đã được điền thật chưa? Chuỗi rỗng / placeholder (xxxx, 0000, example, "[...]") coi là chưa điền,
// để không đưa số điện thoại / địa chỉ giả vào JSON-LD hay nội dung SEO.
export function isFilled(value) {
  if (typeof value !== 'string') return false
  const v = value.trim()
  if (!v) return false
  return !/xxxx|0000|example|\[.*\]|chờ cập nhật|theo công bố/i.test(v)
}
