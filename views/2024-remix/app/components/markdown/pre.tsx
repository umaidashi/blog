import { type ClassAttributes, type HTMLAttributes, isValidElement } from 'react'
import { bundledLanguages, bundledThemes, createHighlighter } from 'shiki'

const highlighter = await createHighlighter({
  themes: Object.keys(bundledThemes),
  langs: Object.keys(bundledLanguages)
})

export const Pre = ({
  ...props
}: ClassAttributes<HTMLPreElement> & HTMLAttributes<HTMLPreElement>) => {
  const childProps = isValidElement(props.children) ? props.children.props : {}
  const match = /lang-(\w+)/.exec(childProps.className || '')
  const lang = match ? (match[1] ? match[1] : '') : ''
  const name = childProps.className.split(':')[1]
  const code = highlighter.codeToHtml(String(childProps.children).replace(/\n$/, '') as string, {
    lang: lang,
    theme: 'github-dark'
  })
  return (
    <div className='my-4'>
      <div className='flex justify-between items-center bg-primary text-primary-foreground py-1 px-4 h-8 rounded-t-[--radius]'>
        <span className='text-sm font-semibold'>{name}</span>
        <span className='text-xs text-primary-foreground font-semibold'>{lang}</span>
      </div>
      <div
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: code }}
      />
    </div>
  )
}
