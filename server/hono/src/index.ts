import { Hono } from 'hono'
import type { HonoConfig } from './config/hono'
import { middleware } from './middleware'
import v1 from './routes/v1'

const app = new Hono<HonoConfig>().route('*', middleware).route('/v1', v1)

export default app

export type HC = typeof app
