import { Link, useMatches } from '@remix-run/react'
import { IconContext } from 'react-icons'
import { LiaHandPointLeftSolid } from 'react-icons/lia'
import { tv } from 'tailwind-variants'
import { cn } from '~/libs/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from './ui/navigation-menu'

const header = tv({
  slots: {
    base: 'flex items-center py-4 mb-8',
    sitename: 'font-medium',
    divider: 'mx-2 text-sm text-gray-500',
    menu: 'font-medium'
  }
})

const { base, sitename, divider, menu } = header()

type LinkItem = {
  name: string
  path: string
}

const Links: LinkItem[] = [
  {
    name: 'home',
    path: '/'
  },
  {
    name: 'posts',
    path: '/posts'
  },
  {
    name: 'profile',
    path: '/profile'
  }
]

export function Header() {
  const matches = useMatches()
  const { pathname } = matches[1]
  const current = Links.find(link => link.path === pathname)?.name
  return (
    <header className={base()}>
      <h1 className={sitename()}>
        <Link to='/'>oidon.</Link>
      </h1>
      <span className={divider()}>/</span>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>{current}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='p-1 w-24'>
                {Links.map(link => (
                  <li
                    key={link.path}
                    className={cn(
                      'p-2 rounded-sm hover:bg-secondary',
                      link.name === current && 'font-semibold'
                    )}>
                    <NavigationMenuLink className='flex items-center gap-2'>
                      <Link to={link.path}>{link.name}</Link>
                      {link.name === current && (
                        <IconContext.Provider value={{ className: 'text-xl' }}>
                          <LiaHandPointLeftSolid />
                        </IconContext.Provider>
                      )}
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}
