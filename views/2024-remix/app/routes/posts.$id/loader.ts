import type { LoaderFunctionArgs } from '@remix-run/cloudflare'
import { createClient } from '~/client'

export const getPostByIdLoader = async ({ params, context }: LoaderFunctionArgs) => {
  const postId = params.id
  if (!postId) return { error: 'Post ID is required' }

  const client = createClient(context.cloudflare.env)
  return await client.v1.posts[':id'].$get({ param: { id: postId } })
}
