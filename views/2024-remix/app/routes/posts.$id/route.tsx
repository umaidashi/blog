import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare'
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

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const postId = params.id
  return { id: postId }
}

export default function Index() {
  const data = useLoaderData<{ id: string }>()
  return (
    <div className='font-mono p-4 min-h-screen bg-slate-50'>
      <h1 className='text-3xl'>Post : {data.id}</h1>
    </div>
  )
}
