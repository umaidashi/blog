import type { MetaFunction } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import config from '~/config'
import { getPostByIdLoader } from './loader'

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (typeof data !== 'object' || 'error' in data) {
    return []
  }

  return [
    { title: `${data.data.title} - ${config.app.sitename}` },
    {
      name: 'description',
      content: `${data.data.body.slice(0, 100)}...`
    }
  ]
}

export const loader = getPostByIdLoader

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

  const post = data.data

  return (
    <div>
      <h1 className='text-3xl'>{post.title}</h1>
      <p>published: {new Date(post.created_at).toLocaleDateString()}</p>
      <p>last edited: {new Date(post.updated_at).toLocaleDateString()}</p>
      <p>
        {post.tags.map(tag => (
          <span key={tag} className='border-2'>
            {tag}
          </span>
        ))}
      </p>
      <article>{post.body}</article>
    </div>
  )
}
