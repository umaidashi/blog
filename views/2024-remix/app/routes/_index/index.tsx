import type { MetaFunction } from '@remix-run/cloudflare'
import { Link } from '@remix-run/react'
import { IconContext } from 'react-icons'
import { FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { LuMailbox } from 'react-icons/lu'
import { tv } from 'tailwind-variants'
import { Header } from '~/components/header'
import config from '~/config'
import { getPostsLoader } from '../posts._index/loader'

export const meta: MetaFunction = () => {
  return [
    { title: `${config.app.sitename}` },
    {
      name: 'description',
      content: `${config.app.description}`
    }
  ]
}

export const loader = getPostsLoader

const bento = tv({
  slots: {
    wrapper: 'grid grid-cols-10 grid-rows-10 gap-4 aspect-square',
    item: 'p-4 rounded-[--radius] bg-secondary transition hover:opacity-70',
    itemHeader: 'flex items-center gap-2',
    title: 'text-xl font-semibold text-secondary-foreground',
    text: 'text-lg text-secondary-foreground font-medium',
    icon: 'text-secondary-foreground text-3xl'
  },
  variants: {
    color: {
      amber: {
        item: 'bg-amber-500',
        title: 'text-amber-950',
        text: 'text-amber-950',
        icon: 'text-amber-950'
      },
      github: {
        item: 'bg-[#2b3137]'
      }
    },
    size: {
      xl: {
        icon: 'text-6xl'
      }
    },
    layout: {
      center: {
        item: 'flex items-center justify-center'
      }
    }
  }
})

const { wrapper, item, title, text, itemHeader, icon } = bento()

export default function Index() {
  return (
    <div>
      <Header />
      <div className={wrapper()}>
        <Link className={item({ color: 'amber', class: 'col-span-6 row-span-6' })} to={'/posts'}>
          <div className={itemHeader()}>
            <IconContext.Provider value={{ className: icon({ color: 'amber' }) }}>
              <LuMailbox />
            </IconContext.Provider>
            <h3 className={title({ color: 'amber' })}>投稿一覧</h3>
          </div>
        </Link>
        <Link
          className={item({ class: 'col-span-4 row-span-4 p-0', layout: 'center' })}
          to={'/profile'}>
          <img
            className='aspect-square object-cover rounded-[--radius]'
            src='profile.png'
            alt='prifile'
          />
        </Link>
        <Link
          className={item({
            color: 'github',
            class: 'col-span-2 row-span-2',
            layout: 'center'
          })}
          to='https://github.com/umaidashi'>
          <IconContext.Provider value={{ className: icon({ size: 'xl' }) }}>
            <FaGithub />
          </IconContext.Provider>
        </Link>
        <Link
          className={item({ class: 'col-span-2 row-span-2', layout: 'center' })}
          to={'https://x.com/umaidashi18'}>
          <IconContext.Provider value={{ className: icon({ size: 'xl' }) }}>
            <FaXTwitter />
          </IconContext.Provider>
        </Link>
      </div>
    </div>
  )
}
