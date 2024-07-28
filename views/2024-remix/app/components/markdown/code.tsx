import type { ClassAttributes, HTMLAttributes } from 'react'

export const Code = ({ ...props }: ClassAttributes<HTMLElement> & HTMLAttributes<HTMLElement>) => {
  return <code className='bg-gray-100 text-red-500 p-1 text-sm rounded'>{props.children}</code>
}
