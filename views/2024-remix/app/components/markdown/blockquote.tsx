import type { ClassAttributes, HTMLAttributes } from 'react'
import type { ExtraProps } from 'react-markdown'

export const Blockquote = ({
  node,
  ...props
}: ClassAttributes<HTMLQuoteElement> & HTMLAttributes<HTMLQuoteElement> & ExtraProps) => {
  return (
    <blockquote className='border-l-2 border-primary bg-accent p-2'>{props.children}</blockquote>
  )
}
