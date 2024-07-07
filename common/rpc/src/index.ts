import type { HC } from '@server/hono'
import { type InferResponseType, hc } from 'hono/client'

export const client = hc<HC>('http://localhost:8080', {
  headers: {
    Authorization: 'Bearer aiueo'
  }
})

export type ResPostsList = InferResponseType<typeof client.v1.posts.list.$get>
