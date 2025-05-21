import { Hono } from 'hono'
import type { HonoConfig } from './config/hono'
import { middleware } from './middleware'
import v1 from './routes/v1'
import llms from './routes/llms'

const app = new Hono<HonoConfig>().route('*', middleware).route('/v1', v1).route('/llms.txt', llms)

export default app

export type HC = typeof app
