import type { MetaFunction } from '@remix-run/cloudflare'
import { Link, useLoaderData } from '@remix-run/react'
import { getPostsLoader } from './loader'

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: 'Posts - ' },
    {
      name: 'description',
      content: 'Welcome to Remix on Cloudflare!'
    }
  ]
}

export const loader = getPostsLoader

export default function Index() {
  const data = useLoaderData<typeof loader>()

  return (
    <div>
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
