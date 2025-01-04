import type { LoaderFunctionArgs } from '@remix-run/cloudflare'
import { createClient } from '~/client'
import { genOgp } from '~/libs/genOgp'

const width = 1200
const height = 630

export async function loader({ params, context, request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  if (url.pathname !== '/') {
    return new Response(null, { status: 404 })
  }

  const cache = await caches.open('ogp')
  const cacheKey = new Request(url.toString())
  const cachedResponse = await cache.match(cacheKey)
  if (cachedResponse) {
    return cachedResponse
  }
  const postId = params.id
  if (!postId) return { error: 'Post ID is required' }

  const client = createClient(context.cloudflare.env)
  const res = await client.v1.posts[':id'].$get({ param: { id: postId } })
  const data = await res.json()

  const ctx = context.cloudflare.ctx as ExecutionContext

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

  const ogpNode = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        padding: '16px 24px',
        overflow: 'hidden',
        fontFamily: 'NotoSansJP'
      }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          border: 'solid 16px #0044FF',
          borderRadius: '24px',
          boxSizing: 'border-box',
          background: 'linear-gradient(to bottom right, #ffffff, #d3eef9)'
        }}>
        <div
          style={{
            display: 'flex',
            flex: 1
          }}>
          <h1
            style={{
              display: 'block',
              flex: 1,
              fontSize: 72,
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 42px',
              wordBreak: 'break-all',
              textOverflow: 'ellipsis',
              lineClamp: 4,
              lineHeight: '64px'
            }}>
            {post.title}
          </h1>
        </div>
      </div>
    </div>
  )

  const png = await genOgp(ogpNode, {
    ctx: ctx,
    scale: 0.7,
    width,
    height,
    fonts: ['Itim', 'Noto Sans', 'Noto Sans Math', 'Noto Sans Symbols', 'Noto Sans JP']
  })
  const response = new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
      date: new Date().toUTCString()
    },
    cf: {
      cacheEverything: true,
      cacheTtl: 31536000
    }
  })

  ctx.waitUntil(cache.put(cacheKey, response.clone()))
  return response
}
