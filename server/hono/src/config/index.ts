import type { Octokit } from '@octokit/rest'

export type Env = {
  GITHUB_TOKEN: string
  API_TOKEN: string
}
export type Variables = {
  octokit: Octokit
}
