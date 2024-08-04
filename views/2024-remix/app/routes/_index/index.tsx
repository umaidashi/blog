import type { MetaFunction } from '@remix-run/cloudflare'
import { Link } from '@remix-run/react'
import { IconContext } from 'react-icons'
import { LuMailbox } from 'react-icons/lu'
import { tv } from 'tailwind-variants'
import { Header } from '~/components/header'
import config from '~/config'

export const meta: MetaFunction = () => {
  return [
    { title: `${config.app.sitename}` },
    {
      name: 'description',
      content: `${config.app.description}`
    }
  ]
}

const bento = tv({
  slots: {
    wrapper: 'grid grid-cols-4 gap-4',
    item: 'p-4 rounded-[--radius] aspect-video bg-secondary',
    itemHeader: 'flex items-center gap-2',
    title: 'text-xl font-semibold text-secondary-foreground',
    icon: 'text-secondary-foreground text-3xl'
  },
  variants: {
    color: {
      amber: {
        item: 'bg-amber-500',
        title: 'text-amber-950',
        icon: 'text-amber-950'
      }
    }
  }
})

const { wrapper, item, title, itemHeader, icon } = bento()

export default function Index() {
  return (
    <div>
      <Header />
      <div className={wrapper()}>
        <Link className={item({ color: 'amber', class: 'col-span-3' })} to={'/posts'}>
          <div className={itemHeader()}>
            <IconContext.Provider value={{ className: icon({ color: 'amber' }) }}>
              <LuMailbox />
            </IconContext.Provider>
            <h3 className={title({ color: 'amber' })}>投稿一覧</h3>
          </div>
        </Link>
      </div>
    </div>
  )
}
