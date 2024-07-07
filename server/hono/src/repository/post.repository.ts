import type { Context } from 'hono'
import type { IPostDao } from '../dao/post.dao'
import type { PostDTO } from '../dto/post.dto'

export interface IPostRepository {
  list(c: Context): Promise<PostDTO[]>
}

export class PostRepository implements IPostRepository {
  constructor(private postDao: IPostDao) {}

  list(c: Context) {
    return this.postDao.list(c)
  }
}
