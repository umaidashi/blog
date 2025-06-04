import {
  type ClassAttributes,
  type HTMLAttributes,
  isValidElement,
  useEffect,
  useState
} from 'react'

export const Pre = ({
  ...props
}: ClassAttributes<HTMLPreElement> & HTMLAttributes<HTMLPreElement>) => {
  const childProps = isValidElement(props.children) ? props.children.props : {}

  const match = /lang-(\w+)/.exec(childProps.className || '')
  const lang = match ? (match[1] ? match[1] : '') : ''
  const name = childProps.className.split(':')[1]

  const code = childProps.children

  if (!code) {
    return null
  }

  const [highlightedCode, setHighlightedCode] = useState<string>()
  useEffect(() => {
    if (!code) {
      return
    }

    // @ts-expect-error: import from esm.sh to avoid large worker bundle
    import('https://esm.sh/shiki@1.5.2').then(async ({ codeToHtml }) => {
      setHighlightedCode(await codeToHtml(code, { lang, theme: 'github-dark' }))
    })
  }, [code, lang])

  return (
    <div className='my-4'>
      <div className='flex justify-between items-center bg-primary text-primary-foreground py-1 px-4 h-8 rounded-t-[--radius]'>
        <span className='text-sm font-semibold'>{name}</span>
        <span className='text-xs text-primary-foreground font-semibold'>{lang.toUpperCase()}</span>
      </div>
      {highlightedCode ? (
        <div
          // biome-ignore lint/security/noDangerouslySetInnerHtml: output sanitized by Shiki
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      ) : (
        <div className='flex justify-center items-center h-24 bg-[#24292e] rounded-b-[--radius]'>
          <div className='animate-ping h-4 w-4 bg-primary rounded-full' />
        </div>
      )}
    </div>
  )
}
