import { Octokit } from '@octokit/rest'
import { Hono } from 'hono'

const app = new Hono()

const octokit = new Octokit()

app.get('/', c => {
  const data = octokit.repos.get({
    owner: 'umaidashi',
    repo: 'til'
  })
  console.log(data)
  return c.text('Hello Hono!')
})

export default {
  port: 8080,
  fetch: app.fetch
}
