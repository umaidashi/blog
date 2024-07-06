import { type HC, api_url } from '@server/hono'
import { hc } from 'hono/client'

export const client = hc<HC>(api_url)
