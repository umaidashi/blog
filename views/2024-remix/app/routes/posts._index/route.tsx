import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare'
import { Link, useLoaderData } from '@remix-run/react'
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

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const client = createClient(context.cloudflare.env)
  return await client.v1.posts.list.$get()
}

export default function Index() {
  const data = useLoaderData<typeof loader>()

  return (
    <div className='font-sans p-4 min-h-screen bg-slate-50'>
      <h1 className='text-3xl'>Posts</h1>
      <ul className='list-disc mt-4 pl-6 space-y-2'>
        {data.data.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
