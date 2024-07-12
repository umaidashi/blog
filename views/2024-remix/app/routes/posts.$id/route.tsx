import { type ResPost, client } from '@common/rpc'
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    {
      name: 'description',
      content: 'Welcome to Remix on Cloudflare!'
    }
  ]
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const postId = params.id
  if (!postId) throw new Error('Post ID is required')
  return await client.v1.posts[':id'].$get({ param: { id: postId } })
}

export default function Index() {
  const data = useLoaderData<ResPost>()

  if ('error' in data) {
    return (
      <div className='font-mono p-4 min-h-screen bg-slate-50'>
        <h1 className='text-3xl'>Error: {data.error}</h1>
      </div>
    )
  }

  return (
    <div className='font-mono p-4 min-h-screen bg-slate-50'>
      <h1 className='text-3xl'>Post : {data.data.title}</h1>
    </div>
  )
}
