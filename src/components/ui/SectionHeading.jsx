// Nhãn section: <h2> chứa TỪ KHOÁ nhưng hiển thị dạng chữ nhỏ màu xanh lá (không còn tiêu đề lớn
// nhiều chữ). `lead` là một câu ngắn trả lời thẳng câu hỏi chính của section.
export default function SectionHeading({ label, lead, align = 'left', light = false, className = '' }) {
  const alignCls = align === 'center' ? 'items-center text-center' : 'items-start text-left'
  return (
    <div className={`flex flex-col gap-2 ${alignCls} ${className}`}>
      <h2 className={`section-label ${light ? 'section-label-light' : ''}`}>{label}</h2>
      {lead ? (
        <p className={`prose-lead m-0 max-w-2xl ${light ? 'text-white' : 'text-q-muted'}`}>{lead}</p>
      ) : null}
    </div>
  )
}
