import type { Context } from 'hono'
import type { HonoConfig } from '../config/hono'
import { Platforms, PostDTO } from '../dto/post.dto'
import type { ZennPost } from '../types/zenn'

export interface IPostDao {
  one(c: Context<HonoConfig>, postId: number): Promise<PostDTO>
  list(c: Context<HonoConfig>): Promise<PostDTO[]>
}

export class PostDao implements IPostDao {
  private static getOctokit(c: Context<HonoConfig>) {
    return c.var.octokit
  }

  private static async getZennPosts(c: Context<HonoConfig>) {
    const res = await fetch('https://zenn.dev/api/articles?username=umaidashi')
    const data: { articles: ZennPost[] } = await res.json()

    const zennPosts = data.articles.map(d => {
      return new PostDTO(
        d.id,
        d.title,
        '',
        new Date(d.published_at),
        new Date(d.published_at),
        new Date(d.body_updated_at),
        [],
        Platforms.Zenn,
        d
      )
    })

    return zennPosts
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
      new Date(d.closed_at ?? d.updated_at),
      new Date(d.updated_at),
      d.labels.map(l =>
        typeof l === 'string'
          ? { id: 0, name: l, color: '' }
          : { id: l.id ?? 0, name: l.name ?? '', color: l.color ?? '' }
      ),
      Platforms.Personal
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

    const zennPosts = await PostDao.getZennPosts(c)

    const personalPosts: PostDTO[] = completed.map(d => {
      return new PostDTO(
        d.number,
        d.title,
        d.body ?? '',
        new Date(d.created_at),
        new Date(d.closed_at ?? d.updated_at),
        new Date(d.updated_at),
        d.labels.map(l =>
          typeof l === 'string'
            ? { id: 0, name: l, color: '' }
            : { id: l.id ?? 0, name: l.name ?? '', color: l.color ?? '' }
        ),
        Platforms.Personal
      )
    })

    const posts = [...zennPosts, ...personalPosts].sort((a, b) => {
      return b.published_at.getTime() - a.published_at.getTime()
    })
    return posts
  }
}
