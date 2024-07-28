import type { ClassAttributes, HTMLAttributes } from 'react'

export const Details = ({
  children
}: ClassAttributes<HTMLDetailsElement> & HTMLAttributes<HTMLDetailsElement>) => {
  return (
    <details className='bg-secondary text-secondary-foreground px-4 py-4 my-1 rounded-[--radius]'>
      {children}
    </details>
  )
}

export const Summary = ({
  children
}: ClassAttributes<HTMLElement> & HTMLAttributes<HTMLElement>) => {
  return <summary className='text-lg font-semibold'>{children}</summary>
}
