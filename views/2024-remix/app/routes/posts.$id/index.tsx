import type { MetaFunction } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import Markdown from 'markdown-to-jsx'
import { componets } from '~/components/markdown'
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
    <div className='flex flex-col gap-4 items-center'>
      <h1 className='text-3xl'>{post.title}</h1>
      <div className='flex gap-4'>
        <p>published: {new Date(post.created_at).toDateString()}</p>
        <p>last edited: {new Date(post.updated_at).toDateString()}</p>
        <p>
          {post.tags.map(tag => (
            <span
              key={tag}
              className='border-2 p-1 rounded-full bg-primary text-primary-foreground'>
              {tag}
            </span>
          ))}
        </p>
      </div>
      <article className='w-full'>
        <Markdown
          className='flex flex-col gap-4 mb-8'
          options={{
            overrides: componets
          }}>
          {post.body}
        </Markdown>
      </article>
    </div>
  )
}
