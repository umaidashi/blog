import { Octokit } from '@octokit/rest'
import type { Context } from 'hono'
import { PostDTO } from '../dto/post.dto'

export interface IPostDao {
  list(c: Context): Promise<PostDTO[]>
}

export class PostDao implements IPostDao {
  async list(c: Context) {
    const octokit = new Octokit({ auth: c.env.GITHUB_TOKEN })

    const res = await octokit.issues.listForRepo({
      owner: c.env.GITHUB_OWNER,
      repo: c.env.GITHUB_REPO,
      state: 'closed'
    })

    if (res.status !== 200) throw new Error('Failed to fetch posts')

    const data = res.data
    const completed = data.filter(d => d.state_reason === 'completed')

    const posts: PostDTO[] = completed.map(d => {
      return new PostDTO(
        d.number,
        d.title,
        d.body ?? '',
        new Date(d.created_at),
        new Date(d.updated_at),
        d.labels.map(l => (typeof l === 'string' ? l : l.name ?? ''))
      )
    })
    return posts
  }
}
