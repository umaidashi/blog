import data from '../../package.json'

export default {
  app: {
    name: data.name,
    sitename: data.author.name,
    author: data.author.name,
    description: data.description
  },
  links: {
    github: data.author.github,
    x: data.author.x,
    zenn: data.author.zenn
  }
}
