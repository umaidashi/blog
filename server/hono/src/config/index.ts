import type { Octokit } from '@octokit/rest'

type Env = {
  GITHUB_OWNER: string
  GITHUB_REPO: string
  GITHUB_TOKEN: string
  API_TOKEN: string
}

type Variables = {
  octokit: Octokit
}

export type HonoConfig = {
  Bindings: Env
  Variables: Variables
}
