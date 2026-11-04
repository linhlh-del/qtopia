import { useEffect, useRef, useState } from 'react'

// Dropdown chọn (tháp / loại căn). Khoá bề rộng cố định để đổi lựa chọn không làm nhảy layout.
export default function Dropdown({ options, value, onChange, widthClass = 'w-[210px]', variant = 'light' }) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('click', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const current = options.find((o) => o.id === value) || options[0]
  const dark = variant === 'dark'

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation()
          setOpen((o) => !o)
        }}
        className={`inline-flex h-12 ${widthClass} items-center justify-between gap-2 rounded-full border px-4 font-display text-sm font-semibold shadow-soft transition-colors ${
          dark
            ? 'border-q-navy bg-q-navy text-white'
            : 'border-q-navy/20 bg-white text-q-navy hover:border-q-navy/40'
        }`}
      >
        <span className="flex min-w-0 items-center gap-2 truncate">
          {current?.swatch ? (
            <span className="h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-black/10" style={{ background: current.swatch }} />
          ) : null}
          <span className="truncate">{current?.label}</span>
        </span>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open ? (
        <ul
          role="listbox"
          className="absolute left-0 top-full z-30 mt-2 min-w-full overflow-hidden rounded-2xl border border-q-navy/10 bg-white py-1.5 shadow-card"
        >
          {options.map((o) => (
            <li key={o.id} role="option" aria-selected={o.id === value}>
              <button
                type="button"
                onClick={() => {
                  onChange(o.id)
                  setOpen(false)
                }}
                className={`flex min-h-11 w-full items-center gap-2 px-4 py-2.5 text-left font-display text-sm font-semibold transition-colors ${
                  o.id === value ? 'bg-q-navy text-white' : 'text-q-ink hover:bg-q-sand'
                }`}
              >
                {o.swatch ? (
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-black/10" style={{ background: o.swatch }} />
                ) : null}
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
