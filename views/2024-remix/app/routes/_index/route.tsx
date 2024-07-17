import type { MetaFunction } from '@remix-run/cloudflare'
import { Link } from '@remix-run/react'
import { Header } from '~/components/header'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    {
      name: 'description',
      content: 'Welcome to Remix on Cloudflare!'
    }
  ]
}

export default function Index() {
  return (
    <div>
      <Header />
      <Link to='/posts'>posts</Link>
    </div>
  )
}
