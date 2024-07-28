import type { ClassAttributes, HTMLAttributes } from 'react'

export const P = ({
  ...props
}: ClassAttributes<HTMLParagraphElement> & HTMLAttributes<HTMLParagraphElement>) => {
  return <p className='text-foreground'>{props.children}</p>
}
