import type { ClassAttributes, HTMLAttributes } from 'react'

export const Ul = ({
  ...props
}: ClassAttributes<HTMLUListElement> & HTMLAttributes<HTMLUListElement>) => {
  return <ul className='list-disc ml-4'>{props.children}</ul>
}

export const Ol = ({
  ...props
}: ClassAttributes<HTMLOListElement> & HTMLAttributes<HTMLOListElement>) => {
  return <ol className='list-roman ml-4'>{props.children}</ol>
}

export const Li = ({
  ...props
}: ClassAttributes<HTMLLIElement> & HTMLAttributes<HTMLLIElement>) => {
  return <li className='marker:text-primary'>{props.children}</li>
}
