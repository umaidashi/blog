import type { SerializeFrom } from '@remix-run/cloudflare'
import { Link } from '@remix-run/react'
import { Platforms } from '@server/hono/src/dto/post.dto'
import { IconContext } from 'react-icons'
import { SiZenn } from 'react-icons/si'
import { TbAlignBoxLeftTop } from 'react-icons/tb'
import { tv } from 'tailwind-variants'
import type { getPostsLoaderType } from './loader'

type props = SerializeFrom<getPostsLoaderType['data'][0]>

const card = tv({
  slots: {
    base: 'md:px-4 sm:px-2 py-2 rounded-[--radius] transition hover:opacity-60',
    title: 'pb-1 md:text-lg sm:text-md font-semibold',
    date: 'text-sm text-gray-500',
    wrapper: 'flex items-center gap-2 '
  }
})
const { base, title, date, wrapper } = card()

export function Card({
  post
}: {
  post: props
}) {
  if (post.platform === Platforms.Zenn) {
    return <ZennPostCard post={post} />
  }
  return (
    <li className={base()}>
      <Link to={`/posts/${post.id}`} className=''>
        <h2 className={title()}>{post.title}</h2>
        <div className={wrapper()}>
          <p className={date()}>{new Date(post.created_at).toLocaleDateString('ja-JP')}</p>
          <IconContext.Provider value={{ className: '' }}>
            <TbAlignBoxLeftTop />
          </IconContext.Provider>
        </div>
      </Link>
    </li>
  )
}

function ZennPostCard({ post }: { post: props }) {
  if (!post.zennObj) return null
  return (
    <li className={base()}>
      <Link to={`https://zenn.dev${post.zennObj.path}`} className=''>
        <h2 className={title()}>{post.title}</h2>
        <div className={wrapper()}>
          <p className={date()}>{new Date(post.created_at).toLocaleDateString('ja-JP')}</p>
          <IconContext.Provider value={{ color: '#3EA8FF' }}>
            <SiZenn />
          </IconContext.Provider>
        </div>
      </Link>
    </li>
  )
}
