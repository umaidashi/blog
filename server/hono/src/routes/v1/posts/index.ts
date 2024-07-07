import { Hono } from 'hono'
import type { HonoConfig } from '../../../config'

// 改行して posts.get() と書くと、型推論が効かないのでつなげる
const posts = new Hono<HonoConfig>().get('/list', async c => {
  const res = await c.var.octokit.issues.listForRepo({
    owner: c.env.GITHUB_OWNER,
    repo: c.env.GITHUB_REPO,
    state: 'closed'
  })
  if (res.status !== 200) {
    c.json({ globalError: 'Fetch was failed.' }, 500)
  }
  const data = res.data
  const completed = data.filter(d => d.state_reason === 'completed')
  return c.json({ data: completed }, 200)
})

export default posts
