import { Hono } from 'hono'
import type { HonoConfig } from '../../../config/hono'

// 改行して posts.get() と書くと、型推論が効かないのでつなげる
const posts = new Hono<HonoConfig>()
  .get('/:id', async c => {
    const di = c.var.diContainer
    const postIdStr = c.req.param('id')

    if (!postIdStr) {
      return c.json({ error: 'Invalid post ID' }, 404)
    }

    const postId = Number.parseInt(postIdStr, 10)

    const postRepository = di.get('PostRepository')
    const post = await postRepository.one(c, postId)

    return c.json({ data: post })
  })
  .get('/list', async c => {
    const di = c.var.diContainer

    const postRepository = di.get('PostRepository')
    const posts = await postRepository.list(c)

    return c.json({ data: posts })
  })

export default posts
