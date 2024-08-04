import { Link } from '@remix-run/react'
import { tv } from 'tailwind-variants'

const header = tv({
  slots: {
    base: 'flex items-center py-4 mb-8',
    sitename: 'font-medium',
    divider: 'mx-2 text-sm text-gray-500',
    menu: 'font-medium'
  }
})

const { base, sitename, divider, menu } = header()

export function Header() {
  return (
    <header className={base()}>
      <h1 className={sitename()}>
        <Link to='/'>oidon.</Link>
      </h1>
      <span className={divider()}>/</span>
      <Link to='/posts' className={menu()}>
        posts
      </Link>
    </header>
  )
}
