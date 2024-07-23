import type { ClassAttributes, HTMLAttributes } from 'react'
import type { ExtraProps } from 'react-markdown'

export const Ul = ({
  node,
  ...props
}: ClassAttributes<HTMLUListElement> & HTMLAttributes<HTMLUListElement> & ExtraProps) => {
  return <ul className='list-disc ml-4'>{props.children}</ul>
}

export const Ol = ({
  node,
  ...props
}: ClassAttributes<HTMLOListElement> & HTMLAttributes<HTMLOListElement> & ExtraProps) => {
  return <ol className='list-roman ml-4'>{props.children}</ol>
}

export const Li = ({
  node,
  ...props
}: ClassAttributes<HTMLLIElement> & HTMLAttributes<HTMLLIElement> & ExtraProps) => {
  return <li className='marker:text-primary'>{props.children}</li>
}
