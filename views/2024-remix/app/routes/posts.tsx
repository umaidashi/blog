import { Outlet } from '@remix-run/react'

export default function PostsLayout() {
  return (
    <div>
      <h1>Posts Layout</h1>
      <Outlet />
    </div>
  )
}
