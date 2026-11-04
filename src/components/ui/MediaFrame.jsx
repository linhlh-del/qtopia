import Img from './Img'

/* Khung ảnh. Có ảnh → hiện ảnh. CHƯA có ảnh (src rỗng) → giữ nguyên khung với tỉ lệ đã định
   và hiện placeholder, để bố cục không đổi khi CĐT gửi ảnh thật về sau. */
export default function MediaFrame({
  src,
  alt,
  ratio = '16 / 10',
  priority = false,
  note = 'Ảnh sẽ được cập nhật',
  className = '',
  imgClassName = 'h-full w-full object-cover',
  light = false,
  notePosition = 'center', // 'bottom' khi có lớp phủ (zone, nhãn) vẽ đè lên khung
}) {
  const bottom = notePosition === 'bottom'
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: ratio }}>
      {src ? (
        <Img src={src} alt={alt} priority={priority} className={imgClassName} />
      ) : (
        <div
          role="img"
          aria-label={`${alt} — ${note.toLowerCase()}`}
          className={`flex h-full w-full flex-col items-center gap-2 border border-dashed p-3 text-center ${
            bottom ? 'justify-end' : 'justify-center p-4'
          } ${light ? 'border-white/30 bg-white/5 text-white/65' : 'border-q-navy/20 bg-q-sand text-q-muted'}`}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={`opacity-55 ${bottom ? 'hidden' : ''}`}>
            <rect x="3" y="4" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="8.5" cy="9.5" r="1.6" fill="currentColor" />
            <path d="M4 17l4.5-4.5 3 3 3.5-3.5L20 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-display text-xs font-semibold">{note}</span>
        </div>
      )}
    </div>
  )
}
