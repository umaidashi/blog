import type { MetaFunction } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { Markdown } from '~/components/markdown'
import { Badge } from '~/components/ui/badge'
import config from '~/config'
import { getPostByIdLoader } from './loader'

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (typeof data !== 'object' || 'error' in data) {
    return []
  }

  const ogpurl = config.links.ogpurl.replace('{{ID}}', data.data.id.toString())

  return [
    { title: `${data.data.title} - ${config.app.sitename}` },
    {
      name: 'description',
      content: `${data.data.body.slice(0, 100)}...`
    },
    { property: 'og:title', content: config.app.sitename },
    {
      property: 'og:description',
      content: config.app.description
    },
    { property: 'og:site_name', content: config.app.sitename },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: config.links.homepage },
    {
      property: 'og:image',
      content: ogpurl
    },
    { name: 'twitter:title', content: config.app.sitename },
    {
      name: 'twitter:description',
      content: config.app.description
    },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:image',
      content: ogpurl
    },
    { name: 'twitter:site', content: config.links.x_name },
    { name: 'twitter:creator', content: config.links.x_name }
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
      <h1 className='text-3xl font-semibold'>{post.title}</h1>
      <div className='flex gap-8'>
        <div className='flex flex-col items-center gap-2'>
          <p className='text-muted-foreground text-xs font-semibold'>Published</p>
          <time dateTime={post.published_at} className='text-sm font-bold'>
            {new Date(post.published_at).toLocaleDateString('ja-JP')}
          </time>
        </div>
        <div className='flex flex-col items-center gap-2'>
          <p className='text-muted-foreground text-xs font-semibold'>Tags</p>
          <div className='flex gap-2 items-center'>
            {post.tags.map(tag => (
              <Badge key={tag.id}>#{tag.name}</Badge>
            ))}
          </div>
        </div>
      </div>
      <article className='w-full'>
        <Markdown body={post.body} />
      </article>
    </div>
  )
}
