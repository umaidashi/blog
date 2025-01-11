import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630
}

export const contentType = 'image/png'

export default async function Image({ params }: { params: { id: number } }) {
  const itimRegular = fetch(new URL('http://localhost:3000/Itim-Regular.ttf')).then(res =>
    res.arrayBuffer()
  )
  const kiwiMaruRegular = fetch(new URL('http://localhost:3000/KiwiMaru-Regular.ttf')).then(res =>
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
        backgroundImage: 'url(http://localhost:3000/ogp_background.png)'
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
