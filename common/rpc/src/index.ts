import type { HC } from '@server/hono'
import { type InferResponseType, hc } from 'hono/client'

export const client = hc<HC>('http://localhost:8080', {
  headers: {
    Authorization: 'Bearer aiueo'
  }
})

export type ResPosts = InferResponseType<typeof client.v1.posts.list.$get>

const $get = client.v1.posts[':id'].$get
export type ResPost = InferResponseType<typeof $get>
