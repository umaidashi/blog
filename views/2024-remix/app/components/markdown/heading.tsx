import type { ClassAttributes, HTMLAttributes } from 'react'

export const H1 = ({
  ...props
}: ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement>) => {
  return <h1 className='text-5xl'># {props.children}</h1>
}

export const H2 = ({
  ...props
}: ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement>) => {
  return <h2 className='text-4xl'>## {props.children}</h2>
}

export const H3 = ({
  ...props
}: ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement>) => {
  return <h3 className='text-3xl'>### {props.children}</h3>
}

export const H4 = ({
  children
}: ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement>) => {
  return <h4 className='text-2xl'>#### {children}</h4>
}

export const H5 = ({
  children
}: ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement>) => {
  return <h5 className='text-xl'>##### {children}</h5>
}

export const H6 = ({
  children
}: ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement>) => {
  return <h6 className='text-lg'>###### {children}</h6>
}
