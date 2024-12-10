import type { ClassAttributes, HTMLAttributes } from 'react'

const HeadingPrefix = ({ num }: { num: number }) => {
  const sharps = Array(num).fill('#').join('')
  return <span className='text-neutral-500'>{sharps}</span>
}

export const H1 = ({
  ...props
}: ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement>) => {
  return <h1 className='text-4xl font-bold'><HeadingPrefix num={1} /> {props.children}</h1>
}

export const H2 = ({
  ...props
}: ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement>) => {
  return <h2 className='text-3xl font-bold'><HeadingPrefix num={2} /> {props.children}</h2>
}

export const H3 = ({
  ...props
}: ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement>) => {
  return <h3 className='text-2xl font-bold'><HeadingPrefix num={3} /> {props.children}</h3>
}

export const H4 = ({
  children
}: ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement>) => {
  return <h4 className='text-xl font-bold'><HeadingPrefix num={4} /> {children}</h4>
}

export const H5 = ({
  children
}: ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement>) => {
  return <h5 className='text-lg font-bold'><HeadingPrefix num={5} /> {children}</h5>
}

export const H6 = ({
  children
}: ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement>) => {
  return <h6 className='text-base font-bold'><HeadingPrefix num={6} /> {children}</h6>
}
