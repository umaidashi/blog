import { createClient } from '@/client'
import { ImageResponse } from 'next/og'
export const runtime = 'edge'
export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630
}
export const contentType = 'image/png'
export default async function Image({ params }: { params: { id: string } }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  console.log('baseUrl', baseUrl)
  const itimRegular = fetch(new URL(`${baseUrl}/Itim-Regular.ttf`)).then(res => res.arrayBuffer())
  const kiwiMaruRegular = fetch(new URL(`${baseUrl}/KiwiMaru-Regular.ttf`)).then(res =>
    res.arrayBuffer()
  )

  const API_URL = process.env.API_URL
  const API_TOKEN = process.env.API_TOKEN

  if (!API_URL || !API_TOKEN) {
    throw new Error('API_URL and API_TOKEN are required')
  }

  const client = createClient({ API_URL, API_TOKEN })
  const res = await client.v1.posts[':id'].$get({ param: { id: params.id } })
  const data = await res.json()

  if (!data) {
    throw new Error('Post not found')
  }

  if ('error' in data) throw new Error(data.error)

  const post = data.data

  return new ImageResponse(
    <div
      style={{
        fontSize: 72,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${baseUrl}/ogp_background.png)`
      }}>
      {post.title}
    </div>,
    {
      ...size,
      fonts: [
        {
          name: 'Itim',
          data: await itimRegular
        },
        {
          name: 'KiwiMaru',
          data: await kiwiMaruRegular
        }
      ]
    }
  )
}
