import { type ResPostsList, client } from '@common/rpc'
import type { MetaFunction } from '@remix-run/cloudflare'
import { Link, useLoaderData } from '@remix-run/react'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    {
      name: 'description',
      content: 'Welcome to Remix on Cloudflare!'
    }
  ]
}

export const loader = async () => {
  return await client.v1.posts.list.$get()
}

export default function Index() {
  const data = useLoaderData<ResPostsList>()
  console.log(data.data.map(post => post.title))
  return (
    <div className='font-sans p-4 min-h-screen bg-slate-50'>
      <h1 className='text-3xl'>Posts</h1>
      <ul className='list-disc mt-4 pl-6 space-y-2'>
        {data.data.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`} prefetch='viewport'>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
