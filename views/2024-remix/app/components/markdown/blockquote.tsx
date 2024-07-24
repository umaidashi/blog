import type { ClassAttributes, HTMLAttributes } from 'react'
import type { ExtraProps } from 'react-markdown'

export const Blockquote = ({
  node,
  ...props
}: ClassAttributes<HTMLQuoteElement> & HTMLAttributes<HTMLQuoteElement> & ExtraProps) => {
  return (
    <blockquote className='border-l-2 border-primary bg-secondary text-secondary-foreground p-4 my-2 rounded-r-[--radius]'>
      {props.children}
    </blockquote>
  )
}
