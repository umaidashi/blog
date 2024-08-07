import type { MarkdownToJSX } from 'markdown-to-jsx'
import Md2JSX from 'markdown-to-jsx'
import { A } from './a'
import { Details, Summary } from './accordion'
import { Blockquote } from './blockquote'
import { Code } from './code'
import { H1, H2, H3, H4, H5, H6 } from './heading'
import { Img } from './img'
import { Li, Ol, Ul } from './list'
import { P } from './p'
import { Pre } from './pre'
import { Table, Tbody, Td, Th, Thead, Tr } from './table'

const componets: MarkdownToJSX.Overrides = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: P,
  img: Img,
  blockquote: Blockquote,
  code: Code,
  pre: Pre,
  a: A,
  ul: Ul,
  ol: Ol,
  li: Li,
  details: Details,
  summary: Summary,
  table: Table,
  thead: Thead,
  tbody: Tbody,
  tr: Tr,
  th: Th,
  td: Td
}

export function Markdown({ body }: { body: string }) {
  return (
    <Md2JSX
      className='flex flex-col gap-4 mb-8'
      options={{
        overrides: componets
      }}>
      {body}
    </Md2JSX>
  )
}
