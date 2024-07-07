import type { HC } from '@server/hono'
import { hc } from 'hono/client'

export const client = hc<HC>('http://localhost:8080', {
  headers: {
    Authorization: 'Bearer aiueo'
  }
})
