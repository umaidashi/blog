import { type IPostRepository, PostRepository } from '../repository/post.repository'
import { type IPostService, PostService } from '../service/post.service'
import { DIContainer } from './container'

export interface DependencyTypes {
  PostRepository: IPostRepository
  PostService: IPostService
}

const diContainer = new DIContainer<DependencyTypes>()

diContainer.register('PostRepository', PostRepository)

diContainer.register('PostService', PostService, diContainer.get('PostRepository'))

export { diContainer }
