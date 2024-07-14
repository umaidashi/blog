import type { MetaFunction } from '@remix-run/cloudflare'
import { Link } from '@remix-run/react'

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
    <div className='font-sans p-4 min-h-screen bg-slate-50'>
      <h1 className='text-3xl'>Top</h1>
      <Link to='/posts'>posts</Link>
    </div>
  )
}
