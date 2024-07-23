import type { AnchorHTMLAttributes, ClassAttributes } from 'react'
import type { ExtraProps } from 'react-markdown'

export const Link = ({
  href,
  children
}: ClassAttributes<HTMLAnchorElement> & AnchorHTMLAttributes<HTMLAnchorElement> & ExtraProps) => {
  return <a href={href} className='text-primary border-b-2 border-primary hover:border-none'>{children}</a>
}
