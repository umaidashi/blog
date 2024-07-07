import type { Octokit } from '@octokit/rest'
import type { DependencyTypes } from '../di/config'
import type { DIContainer } from '../di/container'

type Env = {
  GITHUB_OWNER: string
  GITHUB_REPO: string
  GITHUB_TOKEN: string
  API_TOKEN: string
}

type Variables = {
  octokit: Octokit
  diContainer: DIContainer<DependencyTypes>
}

export type HonoConfig = {
  Bindings: Env
  Variables: Variables
}
