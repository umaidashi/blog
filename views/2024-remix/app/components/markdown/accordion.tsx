import type { ClassAttributes, HTMLAttributes } from 'react'
import type { ExtraProps } from 'react-markdown'

export const Details = ({
  children
}: ClassAttributes<HTMLDetailsElement> & HTMLAttributes<HTMLDetailsElement> & ExtraProps) => {
  return <details className='border-2 px-4 py-4 my-1 rounded-[--radius]'>{children}</details>
}

export const Summary = ({
  children
}: ClassAttributes<HTMLElement> & HTMLAttributes<HTMLElement> & ExtraProps) => {
  return <summary className='text-lg font-semibold'>{children}</summary>
}
