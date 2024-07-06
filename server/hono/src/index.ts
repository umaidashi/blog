import { Octokit } from '@octokit/rest'
import { Hono } from 'hono'
import { bearerAuth } from 'hono/bearer-auth'
import { logger } from 'hono/logger'
import type { HonoConfig } from './config'
import { v1 } from './routes/v1'

const app = new Hono<HonoConfig>()

app
  .use(async (c, next) => {
    const start = Date.now()
    await next()
    const end = Date.now()
    c.res.headers.set('X-Response-Time', `${end - start}ms`)
  })
  .use(logger())
  .use(
    '*',
    bearerAuth({
      verifyToken: async (token, c) => {
        console.log(token, c.env.API_TOKEN)
        return token === c.env.API_TOKEN
      }
    })
  )
  .all('*', async (c, next) => {
    const octokit = new Octokit({ auth: c.env.GITHUB_TOKEN })
    c.set('octokit', octokit)

    await next()
  })
  .notFound(c => {
    return c.json({ message: 'Not Found' }, 404)
  })
  .onError((err, c) => {
    console.error(err)
    return c.json({ message: 'Internal Server Error' }, 500)
  })
  .route('/v1', v1)

export default {
  port: 8080,
  fetch: app.fetch
}

export type HC = typeof app
