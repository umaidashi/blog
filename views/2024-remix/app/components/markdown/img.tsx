import type { ClassAttributes, HTMLAttributes } from 'react'

type ImgProps = ClassAttributes<HTMLImageElement> &
  HTMLAttributes<HTMLImageElement> & { src: string; alt: string }

export const Img = ({ alt, src }: ImgProps) => {
  return (
    <div className='flex items-center justify-center'>
      <img
        className='aspect-square object-cover max-w-md w-9/12 border-4 rounded-[--radius]'
        src={src}
        alt={alt}
      />
    </div>
  )
}
