import type { MetaFunction } from '@remix-run/cloudflare'
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

export default function Index() {
  return (
    <div>
      <Header />
    </div>
  )
}
