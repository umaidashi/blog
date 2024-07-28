import {
  type ClassAttributes,
  type HTMLAttributes,
  isValidElement,
  useEffect,
  useState
} from 'react'
import { codeToHtml } from 'shiki'

export const Pre = ({
  ...props
}: ClassAttributes<HTMLPreElement> & HTMLAttributes<HTMLPreElement>) => {
  const [code, setCode] = useState<string>('')

  const childProps = isValidElement(props.children) ? props.children.props : {}
  const match = /lang-(\w+)/.exec(childProps.className || '')
  const lang = match ? (match[1] ? match[1] : '') : ''
  const name = childProps.className.split(':')[1]

  useEffect(() => {
    const genCode = async () => {
      const code = await codeToHtml(String(childProps.children).replace(/\n$/, '') as string, {
        lang: lang,
        theme: 'github-dark'
      })
      setCode(code)
    }

    genCode()
  }, [childProps.children, lang])
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
