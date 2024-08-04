import { tv } from 'tailwind-variants'

const pageTitle = tv({
  base: 'text-2xl font-bold pb-8'
})

export default function PageTitle({ title }: { title: string }) {
  return <h1 className={pageTitle()}>{title}</h1>
}
