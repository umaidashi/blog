import { Link } from '@remix-run/react'
import { ModeToggle } from './mode-toggle'

export function Header() {
  return (
    <header className='flex justify-between items-center py-4 border-b-2'>
      <h1 className='text-xl'>
        <Link to='/'>oidon.</Link>
      </h1>
      <Link to='/posts'>posts</Link>
      <ModeToggle />
    </header>
  )
}
