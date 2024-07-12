import type { Context } from 'hono'
import type { IPostDao } from '../dao/post.dao'
import type { PostDTO } from '../dto/post.dto'

export interface IPostRepository {
  one(c: Context, postId: number): Promise<PostDTO>
  list(c: Context): Promise<PostDTO[]>
}

export class PostRepository implements IPostRepository {
  constructor(private postDao: IPostDao) {}

  one(c: Context, postId: number) {
    return this.postDao.one(c, postId)
  }

  list(c: Context) {
    return this.postDao.list(c)
  }
}
