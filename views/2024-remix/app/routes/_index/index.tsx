import type { MetaFunction } from '@remix-run/cloudflare'
import { Link } from '@remix-run/react'
import { IconContext } from 'react-icons'
import { FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
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
    },
    { property: 'og:title', content: 'チエっと！ | TOP' },
    {
      property: 'og:description',
      content:
        'チエっと！は、あらゆる知恵を学べるサイトです！あなたの暮らしをちょっと便利にする知恵を紹介します！'
    },
    { property: 'og:site_name', content: 'チエっと！' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://chietto.yu-ta-9.com' },
    { property: 'og:image', content: 'https://chietto.yu-ta-9.com/ogp.png' },
    { name: 'twitter:title', content: 'チエっと！ | TOP' },
    {
      name: 'twitter:description',
      content:
        'チエっと！は、あらゆる知恵を学べるサイトです！あなたの暮らしをちょっと便利にする知恵を紹介します！'
    },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: 'https://chietto.yu-ta-9.com/ogp.png' },
    { name: 'twitter:site', content: '@yuta9_drumming' },
    { name: 'twitter:creator', content: '@yuta9_drumming' },
    { property: 'fb:app_id', content: 'xxx' }
  ]
}

const bento = tv({
  slots: {
    wrapper: 'grid grid-cols-10 grid-rows-10 md:gap-4 gap-2 aspect-square',
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
      },
      x: {
        item: 'bg-black border-2'
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
          className={item({
            class: 'col-span-4 row-span-4 p-0',
            layout: 'center'
          })}
          to={'/profile'}>
          <img
            className='h-full w-full object-cover rounded-[--radius]'
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
          target='_blank'
          to='https://github.com/umaidashi'>
          <IconContext.Provider value={{ className: icon({ size: 'xl', class: 'text-white' }) }}>
            <FaGithub />
          </IconContext.Provider>
        </Link>
        <Link
          className={item({
            color: 'x',
            class: 'col-span-2 row-span-2',
            layout: 'center'
          })}
          target='_blank'
          to={'https://x.com/umaidashi18'}>
          <IconContext.Provider value={{ className: icon({ size: 'xl', class: 'text-white' }) }}>
            <FaXTwitter />
          </IconContext.Provider>
        </Link>
      </div>
    </div>
  )
}
