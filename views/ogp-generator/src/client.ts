import type { HC } from '@server/hono'
import { hc } from 'hono/client'

type Env = { API_URL: string; API_TOKEN: string }

export const createClient = (env: Env) => {
  const url = env.API_URL
  const token = env.API_TOKEN
  return hc<HC>(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const client = hc<HC>('')
