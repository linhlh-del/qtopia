import sharp from 'sharp'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

const sizes = JSON.parse(await readFile('src/data/image-sizes.json', 'utf8'))
sizes['/images/matbangtienich.webp'] = [1672, 941]
const manifest = {}
await mkdir('public/images/optimized', { recursive: true })
for (const [src, dimensions] of Object.entries(sizes)) {
  if (!/\.(webp|png)$/.test(src)) continue
  const icon = /\/(location|brand)\//.test(src)
  const map = /map|matbang|mat-bang/.test(src)
  const widths = (icon ? [96, 192, 384, 512] : [480, 800, 1080, 1280, 1600, 1920]).filter(w => w < dimensions[0])
  widths.push(Math.min(dimensions[0], icon ? 512 : 1920))
  const variants = []
  for (const width of [...new Set(widths)]) {
    const name = `${path.basename(src, path.extname(src))}-${width}.webp`
    await sharp(`public${src}`).resize({ width, withoutEnlargement: true }).webp({ quality: map ? 84 : 70, effort: 6 }).toFile(`public/images/optimized/${name}`)
    variants.push({ src: `/images/optimized/${name}`, width })
  }
  manifest[src] = { width: dimensions[0], height: dimensions[1], variants }
}
await writeFile('src/data/responsive-images.json', JSON.stringify(manifest))
console.log(`Optimized ${Object.keys(manifest).length} images`)
