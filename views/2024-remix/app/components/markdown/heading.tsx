import type { ClassAttributes, HTMLAttributes } from 'react'
import type { ExtraProps } from 'react-markdown'

export const H1 = ({
  node,
  ...props
}: ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement> & ExtraProps) => {
  return (
    <h1 className='text-5xl' id={node?.position?.start.line.toString()}>
      # {props.children}
    </h1>
  )
}

export const H2 = ({
  node,
  ...props
}: ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement> & ExtraProps) => {
  return (
    <h2 className='text-4xl' id={node?.position?.start.line.toString()}>
      ## {props.children}
    </h2>
  )
}

export const H3 = ({
  node,
  ...props
}: ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement> & ExtraProps) => {
  return (
    <h3 className='text-3xl' id={node?.position?.start.line.toString()}>
      ### {props.children}
    </h3>
  )
}

export const H4 = ({
  children
}: ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement> & ExtraProps) => {
  return <h4 className='text-2xl'>#### {children}</h4>
}

export const H5 = ({
  children
}: ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement> & ExtraProps) => {
  return <h5 className='text-xl'>##### {children}</h5>
}

export const H6 = ({
  children
}: ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement> & ExtraProps) => {
  return <h6 className='text-lg'>###### {children}</h6>
}
