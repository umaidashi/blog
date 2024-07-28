import type { ClassAttributes, HTMLAttributes } from 'react'

type ImgProps = ClassAttributes<HTMLImageElement> &
  HTMLAttributes<HTMLImageElement> & { src: string; alt: string }

export const Img = ({ alt, src }: ImgProps) => {
  return (
    <div className='flex justify-center items-center rounded-[--radius] bg-secondary min-h-16'>
      <img className='max-w-full' src={src} alt={alt} />
    </div>
  )
}
