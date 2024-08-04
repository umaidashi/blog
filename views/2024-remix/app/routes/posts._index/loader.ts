import type { LoaderFunctionArgs } from '@remix-run/cloudflare'
import type { InferResponseType } from 'hono'
import { type client, createClient } from '~/client'

export const getPostsLoader = async ({ context }: LoaderFunctionArgs) => {
  const client = createClient(context.cloudflare.env)
  return await client.v1.posts.list.$get()
}

export type getPostsLoaderType = InferResponseType<typeof client.v1.posts.list.$get>
