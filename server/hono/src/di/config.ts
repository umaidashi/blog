import { type IPostDao, PostDao } from '../dao/post.dao'
import { type IPostRepository, PostRepository } from '../repository/post.repository'
import { DIContainer } from './container'

export interface DependencyTypes {
  PostDao: IPostDao
  PostRepository: IPostRepository
}

const diContainer = new DIContainer<DependencyTypes>()
diContainer.register('PostDao', PostDao)
diContainer.register('PostRepository', PostRepository, diContainer.get('PostDao'))

export { diContainer }
