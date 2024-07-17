import { Outlet } from '@remix-run/react'
import { Header } from '~/components/header'

export default function PostsLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}
