import { GlobalFonts, SKRSContext2D, createCanvas, loadImage } from '@napi-rs/canvas'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { createClient } from '~/client'

import fs from 'node:fs'

import path, { join } from 'node:path'
import { cwd } from 'node:process'

/** 画像のwidth */
const width = 1200
/** 画像のheight */
const height = 630

export async function loader({ params, context }: LoaderFunctionArgs) {
  const postId = params.id
  if (!postId) return { error: 'Post ID is required' }

  const client = createClient(context.cloudflare.env)
  const res = await client.v1.posts[':id'].$get({ param: { id: postId } })
  const data = await res.json()

  if (typeof data !== 'object') {
    return new Response(null, {
      status: 404,
      statusText: 'Not Found'
    })
  }

  if ('error' in data) {
    return new Response(null, {
      status: 404,
      statusText: 'Not Found'
    })
  }

  const post = data.data

  // ※1 Fontの設定
  GlobalFonts.registerFromPath(join(cwd(), 'app', 'assets', 'fonts', 'Itim-Regular.ttf'), 'Itim')
  GlobalFonts.registerFromPath(
    join(cwd(), 'app', 'assets', 'fonts', 'NotoSansJP-Medium.ttf'),
    'Noto'
  )
  GlobalFonts.registerFromPath(join(cwd(), 'app', 'assets', 'fonts', 'KiwiMaru-Medium.ttf'), 'Kiwi')

  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  // ※2 背景画像の取得
  const ogpArticle = path.resolve(process.cwd(), 'app/assets/images/ogp_background.png')
  const image = await loadImage(fs.readFileSync(ogpArticle))
  ctx.drawImage(image, 0, 0, width, height)

  ctx.font = '72px "Itim", "Kiwi", "Noto"'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#0a0805'

  const wrappedText = wrapText(ctx, post.title, width / 2, height / 2, 1200, 72)

  wrappedText.forEach(function (item) {
    ctx.fillText(item[0] as string, item[1] as number, item[2] as number)
  })
  //// ※3 文字のセット
  //ctx.fillText(title, width / 2, height / 2)

  return new Response(canvas.toBuffer('image/png'), {
    headers: {
      'Content-Type': 'image/png'
    }
  })
}

const wrapText = function (
  ctx: SKRSContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  let words = text.split(' ')
  let line = ''
  let testLine = ''
  let lineArray = []

  for (var n = 0; n < words.length; n++) {
    testLine += `${words[n]} `
    let metrics = ctx.measureText(testLine)
    let testWidth = metrics.width
    if (testWidth > maxWidth && n > 0) {
      lineArray.push([line, x, y])
      y += lineHeight
      line = `${words[n]} `
      testLine = `${words[n]} `
    } else {
      line += `${words[n]} `
    }
    if (n === words.length - 1) {
      lineArray.push([line, x, y])
    }
  }
  return lineArray
}
