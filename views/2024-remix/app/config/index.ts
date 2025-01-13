import data from '../../package.json'

export default {
  app: {
    name: data.name,
    sitename: `${data.author.name} のブログ`,
    author: data.author.name,
    description: data.description
  },
  links: {
    github: data.author.github,
    x: data.author.x,
    x_name: data.author.x_name,
    zenn: data.author.zenn,
    homepage: data.homepage,
    ogptop: `${data.homepage}ogp.png`
    //ogpurl: 'https://blog-ogp-generator.vercel.app/posts/{{ID}}/opengraph-image'
  }
}
