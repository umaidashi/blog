import ReactMarkdown from 'react-markdown'

export const Toc = ({ markdown }: { markdown: string }) => {
  return (
    <ul className='flex flex-col ml-4'>
      <ReactMarkdown
        allowedElements={['h1', 'h2', 'h3']}
        components={{
          h1: ({ node, ...props }) => (
            <li className='list-disc list-inside'>
              <a href={`#${node?.position?.start.line}`} id={node?.position?.start.line.toString()}>
                {props.children}
              </a>
            </li>
          ),
          h2: ({ node, ...props }) => (
            <li className='list-disc list-inside ml-4'>
              <a href={`#${node?.position?.start.line}`} id={node?.position?.start.line.toString()}>
                {props.children}
              </a>
            </li>
          ),
          h3: ({ node, ...props }) => (
            <li className='list-disc list-inside ml-8'>
              <a href={`#${node?.position?.start.line}`} id={node?.position?.start.line.toString()}>
                {props.children}
              </a>
            </li>
          )
        }}>
        {markdown}
      </ReactMarkdown>
    </ul>
  )
}
