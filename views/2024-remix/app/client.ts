import type { HC } from '@server/hono'
import { hc } from 'hono/client'

export const createClient = (env: Env) => {
  const url = env.API_URL
  const token = env.API_TOKEN
  return hc<HC>(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
