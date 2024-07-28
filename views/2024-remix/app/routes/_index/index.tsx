import type { MetaFunction } from '@remix-run/cloudflare'
import { Link } from '@remix-run/react'
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

export default function Index() {
  return (
    <div>
      <Link className='border-b-2 border-primary text-primary' to='/posts'>
        posts
      </Link>
    </div>
  )
}
