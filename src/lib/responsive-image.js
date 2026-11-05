import responsive from '../data/responsive-images.json'

export function responsiveImageProps(src, imageSizes) {
  const variants = responsive[src]?.variants
  return {
    src: variants ? variants[Math.max(0, variants.length - 2)].src : src,
    srcSet: variants?.map((item) => `${item.src} ${item.width}w`).join(', '),
    sizes: variants
      ? imageSizes || (src.includes('/location/') ? '250px' : src.includes('/brand/') ? '180px' : '100vw')
      : imageSizes,
  }
}
