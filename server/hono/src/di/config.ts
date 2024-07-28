import { type IPostDao, PostDao } from '../dao/post.dao'
import { PostDaoMock } from '../dao/post.dao.mock'
import { type IPostRepository, PostRepository } from '../repository/post.repository'
import { DIContainer } from './container'

export interface DependencyTypes {
  PostDao: IPostDao
  PostRepository: IPostRepository
}

export const NewDiContainer = (ENV: string) => {
  const diContainer = new DIContainer<DependencyTypes>()
  if (ENV === 'dev') {
    diContainer.register('PostDao', PostDaoMock)
  } else {
    diContainer.register('PostDao', PostDao)
  }
  diContainer.register('PostRepository', PostRepository, diContainer.get('PostDao'))

  return diContainer
}
