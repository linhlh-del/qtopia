import { useId, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { leadFormContent } from '../data/project'
import { submitLead } from '../lib/lead'
import { track } from '../lib/analytics'

// Số di động Việt Nam: 03/05/07/08/09 + 8 số (hoặc +84 / 84)
const VN_PHONE = /^(?:\+?84|0)(?:3|5|7|8|9)\d{8}$/

function validate(values) {
  const errors = {}
  if (values.name.trim().length < 2) errors.name = 'Vui lòng nhập họ và tên'
  if (!VN_PHONE.test(values.phone.replace(/[\s.-]/g, ''))) errors.phone = 'Số điện thoại chưa đúng (vd. 0912 345 678)'
  return errors
}

// Form 3 trường (họ tên, SĐT, nút gửi) — dùng chung cho section đăng ký và popup tư vấn.
export default function LeadFormFields({ formLocation, onSuccess, submitLabel = 'Nhận thông tin', tone = 'light' }) {
  const uid = useId()
  const [values, setValues] = useState({ name: '', phone: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [message, setMessage] = useState('')
  const nameRef = useRef(null)
  const phoneRef = useRef(null)
  const formRef = useRef(null)
  const navigate = useNavigate()

  const dark = tone === 'dark'
  const input = `w-full rounded-2xl border px-4 py-3.5 text-base outline-none transition-colors ${
    dark
      ? 'border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-white'
      : 'border-q-navy/15 bg-white text-q-ink placeholder:text-q-muted/70 focus:border-q-blue'
  }`
  const labelCls = `text-sm font-semibold ${dark ? 'text-white' : 'text-q-ink'}`
  const errCls = dark ? 'text-amber-300' : 'text-q-red'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    const next = validate(values)
    setErrors(next)
    if (next.name) return nameRef.current?.focus()
    if (next.phone) return phoneRef.current?.focus()

    setStatus('sending')
    setMessage('')
    try {
      await submitLead({ ...values, formLocation })
      setStatus('success')
      setValues({ name: '', phone: '' })
      track('generate_lead', { form_location: formLocation }) // không gửi tên / SĐT vào analytics
      onSuccess?.()
      // Chuyển sang trang cảm ơn; đóng popup nếu form nằm trong <dialog>.
      formRef.current?.closest('dialog')?.close()
      navigate('/cam-on', { state: { formLocation } })
    } catch (err) {
      setStatus('error')
      setMessage(err.message)
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${uid}-name`} className={labelCls}>
          Họ và tên <span className={errCls}>*</span>
        </label>
        <input
          ref={nameRef}
          id={`${uid}-name`}
          type="text"
          autoComplete="name"
          placeholder="vd. Nguyễn Văn An"
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${uid}-name-err` : undefined}
          className={input}
        />
        {errors.name ? (
          <p id={`${uid}-name-err`} className={`text-sm ${errCls}`}>
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${uid}-phone`} className={labelCls}>
          Số điện thoại <span className={errCls}>*</span>
        </label>
        <input
          ref={phoneRef}
          id={`${uid}-phone`}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="vd. 0912 345 678"
          value={values.phone}
          onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? `${uid}-phone-err` : undefined}
          className={input}
        />
        {errors.phone ? (
          <p id={`${uid}-phone-err`} className={`text-sm ${errCls}`}>
            {errors.phone}
          </p>
        ) : null}
      </div>

      <button type="submit" disabled={status === 'sending'} className="btn-base btn-primary w-full disabled:opacity-60">
        {status === 'sending' ? 'Đang gửi…' : submitLabel}
      </button>

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-sm">
        {status === 'success' ? (
          <span className={dark ? 'text-q-lime' : 'text-green-700'}>Đã gửi thành công! Chúng tôi sẽ liên hệ sớm nhất.</span>
        ) : null}
        {status === 'error' ? <span className={errCls}>{message}</span> : null}
      </p>

      <p className={`text-xs ${dark ? 'text-white/65' : 'text-q-muted'}`}>{leadFormContent.consentNote}</p>
    </form>
  )
}
