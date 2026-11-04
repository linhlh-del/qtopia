export default function Container({ className = '', children }) {
  return <div className={`mx-auto w-full px-5 sm:px-8 lg:w-[78%] lg:px-0 ${className}`}>{children}</div>
}
