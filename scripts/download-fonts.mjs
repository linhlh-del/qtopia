import { mkdir, writeFile } from 'node:fs/promises'
const url = 'https://fonts.googleapis.com/css2?family=Inter:wght@400..800&family=Poppins:wght@500;600;700;800&display=swap'
const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36' } })
if (!response.ok) throw new Error(`Font CSS: ${response.status}`)
let css = await response.text()
// Only subsets used by the Vietnamese/English site.
const blocks = css.match(/\/\*[^*]*\*\/\s*@font-face\s*\{[^}]+\}/g) || []
css = blocks.filter(block => /\/\* (latin|latin-ext|vietnamese) \*\//.test(block)).join('\n')
if (!css) throw new Error('No supported font subsets returned')
await mkdir('public/fonts', { recursive: true })
for (const url of new Set([...css.matchAll(/url\((https:[^)]+)\)/g)].map(match => match[1]))) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Font download: ${response.status}`)
  const name = new URL(url).pathname.split('/').pop()
  await writeFile(`public/fonts/${name}`, Buffer.from(await response.arrayBuffer()))
  css = css.replaceAll(url, `/fonts/${name}`)
}
await writeFile('src/fonts.css', css)
