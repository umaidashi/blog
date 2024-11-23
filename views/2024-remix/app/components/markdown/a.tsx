import type { AnchorHTMLAttributes, ClassAttributes } from 'react'

export const A = ({
  href,
  children
}: ClassAttributes<HTMLAnchorElement> & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a href={href} target="_blank" className='text-primary border-b-2 border-primary hover:border-none'>
      {children}
    </a>
  )
}
