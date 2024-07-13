import { Octokit } from '@octokit/rest'
import { Hono } from 'hono'
import { bearerAuth } from 'hono/bearer-auth'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import type { HonoConfig } from '../config/hono'
import { diContainer } from '../di/config'

export const middleware = new Hono<HonoConfig>()
  .use('*', logger())
  .use(cors())
  .use('*', (c, next) => {
    c.set('diContainer', diContainer)
    return next()
  })
  .use('*', (c, next) => {
    const octokit = new Octokit({ auth: c.env.GITHUB_TOKEN })
    c.set('octokit', octokit)
    return next()
  })
  .use(
    bearerAuth({
      verifyToken: async (token, c) => {
        return token === c.env.API_TOKEN
      }
    })
  )
  .use(async (c, next) => {
    const start = Date.now()
    await next()
    const end = Date.now()
    c.res.headers.set('X-Response-Time', `${end - start}ms`)
  })
  .notFound(c => {
    return c.json({ message: 'Not Found' }, 404)
  })
  .onError((err, c) => {
    console.error(err)
    return c.json({ message: 'Internal Server Error' }, 500)
  })
