import type { LoaderFunctionArgs } from '@remix-run/cloudflare'
import { createClient } from '~/client'

export const getPostsLoader = async ({ context }: LoaderFunctionArgs) => {
  const client = createClient(context.cloudflare.env)
  return await client.v1.posts.list.$get()
}
