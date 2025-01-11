import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630
}

export const contentType = 'image/png'

export default async function Image({ params }: { params: { id: number } }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  console.log('baseUrl', baseUrl)

  const itimRegular = fetch(new URL(`${baseUrl}/Itim-Regular.ttf`)).then(res => res.arrayBuffer())
  const kiwiMaruRegular = fetch(new URL(`${baseUrl}/KiwiMaru-Regular.ttf`)).then(res =>
    res.arrayBuffer()
  )
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
      {params.id}
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
