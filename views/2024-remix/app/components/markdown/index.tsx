import type { Components } from 'react-markdown'
import { A } from './a'
import { Details, Summary } from './accordion'
import { Blockquote } from './blockquote'
import { Code } from './code'
import { H1, H2, H3, H4, H5, H6 } from './heading'
import { Li, Ol, Ul } from './list'

export const componets: Partial<Components> = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  blockquote: Blockquote,
  code: Code,
  a: A,
  ul: Ul,
  ol: Ol,
  li: Li,
  details: Details,
  summary: Summary
}
