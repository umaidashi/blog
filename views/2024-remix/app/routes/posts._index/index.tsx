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
    }
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
