import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import './tailwind.css'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body className='border pt-8 pb-16 lg:pt-16 lg:pb-24 bg-primary-400 dark:bg-primary-900 antialiased'>
        <div className='border flex justify-between px-4 mx-auto max-w-screen-xl'>
          <div className='border mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert'>
            {children}
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
