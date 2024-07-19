import { Link } from '@remix-run/react'

export function Header() {
  return (
    <header className='flex justify-between items-center py-4 mb-8'>
      <h1 className='text-xl'>
        <Link to='/'>oidon.</Link>
      </h1>
      <Link to='/posts'>posts</Link>
    </header>
  )
}
