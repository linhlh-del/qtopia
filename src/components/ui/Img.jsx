import { useCallback } from 'react'
import sizes from '../../data/image-sizes.json'
import responsive from '../../data/responsive-images.json'
import { responsiveImageProps } from '../../lib/responsive-image'

// <img> có sẵn width/height (chống CLS) và lazy mặc định; ảnh above-the-fold truyền priority.
// Ảnh hiện dần khi tải xong: data-img-fade + data-loaded (CSS chỉ áp dụng sau khi JS chạy,
// nên bản prerender / bot vẫn thấy ảnh bình thường).
export default function Img({ src, alt, priority = false, fade = true, className = '', sizes: imageSizes, ...rest }) {
  const dim = sizes[src]
  const optimized = responsive[src]
  const imageProps = responsiveImageProps(src, imageSizes)

  // ảnh có thể đã tải xong trước khi React gắn onLoad (cache) → đánh dấu ngay trong ref
  const mark = useCallback((el) => {
    if (el?.complete) el.dataset.loaded = '1'
  }, [])

  return (
    <img
      ref={fade ? mark : undefined}
      {...imageProps}
      alt={alt}
      aria-hidden={alt === '' ? true : undefined}
      width={dim?.[0] || optimized?.width}
      height={dim?.[1] || optimized?.height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : undefined}
      data-img-fade={fade ? '' : undefined}
      onLoad={fade ? (e) => (e.currentTarget.dataset.loaded = '1') : undefined}
      className={className}
      {...rest}
    />
  )
}
