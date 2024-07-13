import type { Context } from 'hono'
import type { HonoConfig } from '../config/hono'
import { PostDTO } from '../dto/post.dto'

export interface IPostDao {
  one(c: Context<HonoConfig>, postId: number): Promise<PostDTO>
  list(c: Context<HonoConfig>): Promise<PostDTO[]>
}

export class PostDao implements IPostDao {
  private static getOctokit(c: Context<HonoConfig>) {
    return c.var.octokit
  }

  async one(c: Context<HonoConfig>, postId: number) {
    const octokit = PostDao.getOctokit(c)

    if (Number.isNaN(postId)) throw new Error('Invalid post ID')

    const res = await octokit.issues.get({
      owner: c.env.GITHUB_OWNER,
      repo: c.env.GITHUB_REPO,
      issue_number: postId
    })

    if (res.status !== 200) throw new Error('Failed to fetch post')

    const d = res.data
    if (d.state_reason !== 'completed') throw new Error('Post is not public')

    return new PostDTO(
      d.number,
      d.title,
      d.body ?? '',
      new Date(d.created_at),
      new Date(d.updated_at),
      d.labels.map(l => (typeof l === 'string' ? l : l.name ?? ''))
    )
  }

  async list(c: Context<HonoConfig>) {
    const octokit = PostDao.getOctokit(c)
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
