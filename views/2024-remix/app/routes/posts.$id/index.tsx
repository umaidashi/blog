import type { MetaFunction } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import ReactMarkdown from 'react-markdown'
import config from '~/config'
import { getPostByIdLoader } from './loader'

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (typeof data !== 'object' || 'error' in data) {
    return []
  }

  return [
    { title: `${data.data.title} - ${config.app.sitename}` },
    {
      name: 'description',
      content: `${data.data.body.slice(0, 100)}...`
    }
  ]
}

export const loader = getPostByIdLoader

export default function Index() {
  const data = useLoaderData<typeof loader>()

  if (typeof data !== 'object') {
    return (
      <div>
        <h1 className='text-3xl'>Loading...</h1>
      </div>
    )
  }

  if ('error' in data) {
    return (
      <div>
        <h1 className='text-3xl'>Error: {data.error}</h1>
      </div>
    )
  }

  const post = data.data

  return (
    <div className='flex flex-col gap-4 items-center'>
      <h1 className='text-3xl'>{post.title}</h1>
      <div className='flex gap-4'>
        <p>published: {new Date(post.created_at).toDateString()}</p>
        <p>last edited: {new Date(post.updated_at).toDateString()}</p>
        <p>
          {post.tags.map(tag => (
            <span
              key={tag}
              className='border-2 p-1 rounded-full bg-primary text-primary-foreground'>
              {tag}
            </span>
          ))}
        </p>
      </div>
      <article className='w-full'>
        <p className='text-2xl'>TOC</p>
        <ul className='flex flex-col ml-4'>
          <ReactMarkdown
            allowedElements={['h1', 'h2', 'h3']}
            components={{
              h1: ({ node, ...props }) => (
                <li className='list-disc list-inside'>
                  <a
                    href={`#${node?.position?.start.line}`}
                    id={node?.position?.start.line.toString()}>
                    {props.children}
                  </a>
                </li>
              ),
              h2: ({ node, ...props }) => (
                <li className='list-disc list-inside ml-4'>
                  <a
                    href={`#${node?.position?.start.line}`}
                    id={node?.position?.start.line.toString()}>
                    {props.children}
                  </a>
                </li>
              ),
              h3: ({ node, ...props }) => (
                <li className='list-disc list-inside ml-8'>
                  <a
                    href={`#${node?.position?.start.line}`}
                    id={node?.position?.start.line.toString()}>
                    {props.children}
                  </a>
                </li>
              )
            }}>
            {post.body}
          </ReactMarkdown>
        </ul>
        <hr />
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => (
              <h1 className='text-5xl' id={node?.position?.start.line.toString()}>
                # {props.children}
              </h1>
            ),
            h2: ({ node, ...props }) => (
              <h2 className='text-4xl' id={node?.position?.start.line.toString()}>
                ## {props.children}
              </h2>
            ),
            h3: ({ node, ...props }) => (
              <h3 className='text-3xl' id={node?.position?.start.line.toString()}>
                ### {props.children}
              </h3>
            ),
            h4: ({ children }) => <h4 className='text-2xl'>#### {children}</h4>,
            h5: ({ children }) => <h5 className='text-xl'>##### {children}</h5>,
            h6: ({ children }) => <h6 className='text-lg'>###### {children}</h6>
          }}>
          {post.body}
        </ReactMarkdown>
      </article>
    </div>
  )
}
