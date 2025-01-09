import fs from 'node:fs'
import path from 'node:path'
import { ImageResponse } from 'next/og'

export const size = {
  width: 1200,
  height: 630
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // ?title=<title>
  const hasTitle = searchParams.has('title')
  const title = hasTitle ? searchParams.get('title')?.slice(0, 100) : 'My default title'

  const itimRegular = await fs.readFileSync(path.join(process.cwd(), 'public/Itim-Regular.ttf'))
  const kiwiMaruRegular = await fs.readFileSync(
    path.join(process.cwd(), 'public/KiwiMaru-Regular.ttf')
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
      {title}
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
