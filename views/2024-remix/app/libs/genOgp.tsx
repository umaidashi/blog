import satori, { init } from 'satori/wasm'
import initYoga from 'yoga-wasm-web'

import { svg2png, initialize } from 'svg2png-wasm'

type Weight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
type FontStyle = 'normal' | 'italic'
type FontSrc = {
  data: ArrayBuffer | string
  name: string
  weight?: Weight
  style?: FontStyle
  lang?: string
}
type Font = Omit<FontSrc, 'data'> & { data: ArrayBuffer }

const downloadFont = async (fontName: string) => {
  return await fetch(`https://fonts.googleapis.com/css2?family=${encodeURI(fontName)}`)
    .then(res => res.text())
    .then(css => css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)?.[1])
    .then(async url => {
      return url !== undefined
        ? fetch(url).then(v => (v.status === 200 ? v.arrayBuffer() : undefined))
        : undefined
    })
}

const getFonts = async (fontList: string[], ctx: ExecutionContext): Promise<Font[]> => {
  //const cache = await caches.open('fonts')
  const fonts: Font[] = []
  for (const fontName of fontList) {
    //const cacheKey = `http://font/${encodeURI(fontName)}`

    //const response = await cache.match(cacheKey)
    //if (response) {
    //fonts.push({
    //  name: fontName,
    //  data: await response.arrayBuffer(),
    //  weight: 400,
    //  style: 'normal'
    //})
    //} else {
    const data = await downloadFont(fontName)

    if (data) {
      //    ctx.waitUntil(cache.put(cacheKey, new Response(data)))
      fonts.push({ name: fontName, data, weight: 400, style: 'normal' })
    }
    //}
  }
  return fonts.flatMap((v): Font[] => (v ? [v] : []))
}

let initialized = false

export const genOgp = async (
  element: JSX.Element,
  {
    fonts,
    ctx,
    width,
    height,
    scale
  }: {
    ctx: ExecutionContext
    fonts: string[]
    width: number
    height?: number
    scale?: number
  }
) => {
  console.log('genOgp start')
  if (!initialized) {
    initialized = true
    const wasm = await fetch('https://unpkg.com/svg2png-wasm/svg2png_wasm_bg.wasm').then(res =>
      res.arrayBuffer()
    )
    await initialize(wasm)
  }
  const yoga = await initYoga(
    await fetch('https://cdn.jsdelivr.net/npm/yoga-wasm-web@0.3.3/dist/yoga.wasm').then(res =>
      res.arrayBuffer()
    )
  )
  init(yoga)
  console.log('genOgp initialized')

  const fontList = await getFonts(fonts, ctx)
  const svg = await satori(element, {
    width,
    height,
    fonts: fontList
  })
  return await svg2png(svg, { scale })
}
