import type { ClassAttributes, HTMLAttributes } from 'react'
import type { ExtraProps } from 'react-markdown'

export const Code = ({
  node,
  ...props
}: ClassAttributes<HTMLElement> & HTMLAttributes<HTMLElement> & ExtraProps) => {
  return <code className='bg-gray-100 text-red-500 p-1 text-sm rounded'>{props.children}</code>
}
