import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { createClient } from '~/client'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    {
      name: 'description',
      content: 'Welcome to Remix on Cloudflare!'
    }
  ]
}

export const loader = async ({ params, context }: LoaderFunctionArgs) => {
  const postId = params.id
  if (!postId) return { error: 'Post ID is required' }

  const client = createClient(context.cloudflare.env)
  return await client.v1.posts[':id'].$get({ param: { id: postId } })
}

export default function Index() {
  const data = useLoaderData<typeof loader>()

  if (typeof data !== 'object') {
    return (
      <div>
        <h1 className='text-3xl'>Loading...</h1>
      </div>
    )
  }

  if ('error' in data) {
    return (
      <div>
        <h1 className='text-3xl'>Error: {data.error}</h1>
      </div>
    )
  }

  return (
    <div>
      <h1 className='text-3xl'>Post : {data.data.title}</h1>
    </div>
  )
}
