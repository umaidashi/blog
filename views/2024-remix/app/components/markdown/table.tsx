import type { ReactNode } from 'react'

export const Table = ({ children }: { children: ReactNode }) => {
  return (
    <div className='overflow-x-auto rounded-[--radius]'>
      <table className='w-full table-auto border-collapse'>{children}</table>
    </div>
  )
}

export const Tr = ({ children }: { children: ReactNode }) => {
  return <tr>{children}</tr>
}
export const Thead = ({ children }: { children: ReactNode }) => {
  return <thead className='bg-primary text-primary-foreground'>{children}</thead>
}
export const Th = ({ children }: { children: ReactNode }) => {
  return <th className='px-4 py-2 border'>{children}</th>
}

export const Tbody = ({ children }: { children: ReactNode }) => {
  return <tbody className='bg-secondary text-secondary-foreground'>{children}</tbody>
}
export const Td = ({ children }: { children: ReactNode }) => {
  return <td className='px-4 py-2 border'>{children}</td>
}
