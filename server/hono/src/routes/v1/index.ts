import { Hono } from 'hono'
import type { HonoConfig } from '../../config'
import { posts } from './posts'

export const v1 = new Hono<HonoConfig>()

v1.route('/posts', posts)
