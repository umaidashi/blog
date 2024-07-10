import { type ResPostsList, client } from '@common/rpc'
import type { MetaFunction } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    {
      name: 'description',
      content: 'Welcome to Remix on Cloudflare!'
    }
  ]
}

export const loader = async () => {
  const res = await client.v1.posts.list.$get()
  const data = await res.json()
  return data
}

export default function Index() {
  const data = useLoaderData<ResPostsList>()
  console.log(data.data.map(post => post.title))
  return (
    <div className='font-sans p-4 min-h-screen bg-slate-50'>
      <h1 className='text-3xl'>Welcome to Remix on Cloudflare</h1>
      <ul className='list-disc mt-4 pl-6 space-y-2'>
        {data.data.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
        <li>
          <a
            className='text-blue-700 underline visited:text-purple-900'
            target='_blank'
            href='https://remix.run/docs'
            rel='noreferrer'>
            Remix Docs
          </a>
        </li>
        <li>
          <a
            className='text-blue-700 underline visited:text-purple-900'
            target='_blank'
            href='https://developers.cloudflare.com/pages/framework-guides/deploy-a-remix-site/'
            rel='noreferrer'>
            Cloudflare Pages Docs - Remix guide
          </a>
        </li>
      </ul>
    </div>
  )
}
