import { Hono } from 'hono'
import type { HonoConfig } from '../../config'

export const v1 = new Hono<HonoConfig>()

v1.get('/', async c => {
  return c.json({ message: 'Hello, World!' })
}).get('/list', async c => {
  const data = await c.var.octokit.issues.listForRepo({
    owner: 'umaidashi',
    repo: 'blog-contents'
  })
  return c.json(data)
})
