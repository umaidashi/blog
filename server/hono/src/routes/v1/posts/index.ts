import { Hono } from 'hono'
import type { HonoConfig } from '../../../config/hono'

// 改行して posts.get() と書くと、型推論が効かないのでつなげる
const posts = new Hono<HonoConfig>().get('/list', async c => {
  const di = c.var.diContainer

  const postService = di.get('PostService')
  const posts = await postService.list(c)

  return c.json({ data: posts })
})

export default posts
