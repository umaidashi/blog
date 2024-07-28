import type { ClassAttributes, HTMLAttributes } from 'react'

export const Blockquote = ({
  ...props
}: ClassAttributes<HTMLQuoteElement> & HTMLAttributes<HTMLQuoteElement>) => {
  return (
    <blockquote className='border-l-2 border-primary bg-secondary text-secondary-foreground p-4 my-2 rounded-r-[--radius]'>
      {props.children}
    </blockquote>
  )
}
