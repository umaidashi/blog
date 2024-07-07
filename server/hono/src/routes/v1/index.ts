import { Hono } from 'hono'
import type { HonoConfig } from '../../config'
import posts from './posts'

const v1 = new Hono<HonoConfig>().route('/posts', posts)

export default v1
