import type { MetaFunction } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { tv } from 'tailwind-variants'
import PageTitle from '~/components/page_title'
import config from '~/config'
import { Card } from './card'
import { getPostsLoader } from './loader'

export const meta: MetaFunction = () => {
  return [
    { title: `投稿一覧 - ${config.app.sitename}` },
    {
      name: 'description',
      content: '投稿一覧'
    },
    { property: 'og:title', content: `投稿一覧 - ${config.app.sitename}` },
    {
      property: 'og:description',
      content: config.app.description
    },
    { property: 'og:site_name', content: config.app.sitename },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: config.links.homepage },
    { property: 'og:image', content: config.links.ogptop },
    { name: 'twitter:title', content: config.app.sitename },
    {
      name: 'twitter:description',
      content: config.app.description
    },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: config.links.ogptop },
    { name: 'twitter:site', content: config.links.x_name },
    { name: 'twitter:creator', content: config.links.x_name }
  ]
}

const postList = tv({
  slots: {
    wrapper: 'flex flex-col gap-4'
  }
})

const { wrapper } = postList()

export const loader = getPostsLoader

export default function Index() {
  const data = useLoaderData<typeof loader>()

  return (
    <div>
      <PageTitle title={'投稿一覧'} />
      <ul className={wrapper()}>
        {data.data.map(post => (
          <Card key={post.id} post={post} />
        ))}
      </ul>
    </div>
  )
}
