import type { Context } from 'hono'
import type { PostDTO } from '../dto/post.dto'
import type { IPostRepository } from '../repository/post.repository'

export interface IPostService {
  list(c: Context): Promise<PostDTO[]>
}

export class PostService implements IPostService {
  constructor(private postRepository: IPostRepository) {}

  list(c: Context) {
    return this.postRepository.list(c)
  }
}
