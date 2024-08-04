import type { Context } from 'hono'
import type { HonoConfig } from '../config/hono'
import { Platforms, PostDTO } from '../dto/post.dto'
import type { ZennPost } from '../types/zenn'

export interface IPostDaoMock {
  one(c: Context<HonoConfig>, postId: number): Promise<PostDTO>
  list(c: Context<HonoConfig>): Promise<PostDTO[]>
}

export class PostDaoMock implements IPostDaoMock {
  private static async getZennPosts(c: Context<HonoConfig>) {
    const res = await fetch('https://zenn.dev/api/articles?username=umaidashi')
    const data: { articles: ZennPost[] } = await res.json()

    const zennPosts = data.articles.map(d => {
      return new PostDTO(
        d.id,
        d.title,
        '',
        new Date(d.published_at),
        new Date(d.body_updated_at),
        [],
        Platforms.Zenn,
        d
      )
    })

    return zennPosts
  }

  async one(c: Context<HonoConfig>, postId: number) {
    return new PostDTO(
      9,
      'テスト投稿',
      '# h1\r\n\r\n## h2\r\n\r\n### h3\r\n\r\n#### h4\r\n\r\n##### h5\r\n\r\n###### h6\r\n\r\n####### h7\r\n\r\n- a\r\n  - b\r\n    - c\r\n  - d\r\n\r\n1. a\r\n    2. b\r\n        3. c\r\n    4. d\r\n\r\n**bold**\r\n\r\n_italic_\r\n\r\n> quote\r\n\r\n`code`\r\n\r\n[link](https://github.com)\r\n\r\n- [ ] todo\r\n- [ ] todo\r\n  - [ ] todo\r\n\r\nimage\r\n![umaidashi](https://raw.githubusercontent.com/umaidashi/blog-contents/main/img/profile.png?token=GHSAT0AAAAAACLDKJNCJNJUBLU2PLPG6RCWZVGIFIQ)\r\n\r\nfile\r\n[biome.json](https://github.com/user-attachments/files/16310254/biome.json)\r\n\r\nreference\r\n#3 \r\n\r\n\r\n```go\r\npackage main\r\n\r\nimport "fmt"\r\n\r\nfunc main() {\r\n  fmt.Println("hello world")\r\n}\r\n``` \r\n\r\n```ts:index.ts\r\nconst text: string = "Hello World"\r\n\r\nconsole.log(text)\r\n```\r\n\r\n<details><summary>Details</summary>\r\n<p>\r\n\r\nconents\r\n\r\n</p>\r\n</details> \r\n\r\n\r\ndivide\r\n---\r\ndivide\r\n\r\n\r\nhello world\r\n\r\nparagraph\r\n\r\n| Header | Header | Header | Header |\r\n|--------|--------|--------|--------|\r\n| Cell | Cell | Cell | Cell |\r\n| Cell | Cell | Cell | Cell |\r\n| Cell | Cell | Cell | Cell | ',
      new Date('2024-07-19T09:44:14.000Z'),
      new Date('2024-07-28T04:24:29.000Z'),
      [
        {
          id: 7165537549,
          name: 'ブログ',
          color: 'f9d0c4'
        }
      ],
      Platforms.Personal
    )
  }

  async list(c: Context<HonoConfig>) {
    const zennPosts = await PostDaoMock.getZennPosts(c)

    const personalPosts: PostDTO[] = [
      {
        id: 12,
        title: 'reactmarkdown から markdown-to-jsx への移行',
        body: 'remix で開発しているブログで、マークダウンをhtmlに変換する際に `reactmarkdown` を使用していたが、よくわからないレンダリングの問題（深く調査できていないが、関連したissueが2年前からOpenになっていて諦めた）で、使用できなかった。\r\n\r\n厳密には、　reactmarkdown のコンポーネントを使用しているブログの詳細ページへのリンクを踏んだ際に、 504 error になる。　Remix　で SSR しているからか、 node　ではなく bun を使っているからか、考えられる原因が多く調査に乗り気になれなかった。（そこまで reactmarkdown にこだわりなかったし）\r\n\r\nreactmarkdown の代わりに、issue で動作すると言及されていた markdown-to-jsx を使うことにした。 reactmarkdown では、タグごとにカスタムコンポーネントを割り当てていたので、同等の機能が欲しかったが、 markdown-to-jsx もオプションでそれができた\r\n\r\n結果的に、 reactmarkdown で用意していたカスタムコンポーネントをほぼそのまま使えたが、一点だけ注意点があった。\r\n\r\nmd の codeblock について、 reactmarkdown では、　言語部分をクラスに `language-js` などと prefix に `language` とつけるが、 markdown-to-jsx は、 `lang-js` と、 `lang` だけなので、そこだけ注意する。',
        created_at: new Date('2024-07-28T01:51:42.000Z'),
        updated_at: new Date('2024-07-28T01:51:48.000Z'),
        tags: [
          {
            id: 7258653119,
            name: 'React',
            color: '65E6FE'
          }
        ],
        platform: Platforms.Personal
      },
      {
        id: 9,
        title: 'テスト投稿',
        body: '# h1\r\n\r\n## h2\r\n\r\n### h3\r\n\r\n#### h4\r\n\r\n##### h5\r\n\r\n###### h6\r\n\r\n####### h7\r\n\r\n- a\r\n  - b\r\n    - c\r\n  - d\r\n\r\n1. a\r\n    2. b\r\n        3. c\r\n    4. d\r\n\r\n**bold**\r\n\r\n_italic_\r\n\r\n> quote\r\n\r\n`code`\r\n\r\n[link](https://github.com)\r\n\r\n- [ ] todo\r\n- [ ] todo\r\n  - [ ] todo\r\n\r\nimage\r\n![umaidashi](https://raw.githubusercontent.com/umaidashi/blog-contents/main/img/profile.png?token=GHSAT0AAAAAACLDKJNCJNJUBLU2PLPG6RCWZVGIFIQ)\r\n\r\nfile\r\n[biome.json](https://github.com/user-attachments/files/16310254/biome.json)\r\n\r\nreference\r\n#3 \r\n\r\n\r\n```go\r\npackage main\r\n\r\nimport "fmt"\r\n\r\nfunc main() {\r\n  fmt.Println("hello world")\r\n}\r\n``` \r\n\r\n```ts:index.ts\r\nconst text: string = "Hello World"\r\n\r\nconsole.log(text)\r\n```\r\n\r\n<details><summary>Details</summary>\r\n<p>\r\n\r\nconents\r\n\r\n</p>\r\n</details> \r\n\r\n\r\ndivide\r\n---\r\ndivide\r\n\r\n\r\nhello world\r\n\r\nparagraph\r\n\r\n| Header | Header | Header | Header |\r\n|--------|--------|--------|--------|\r\n| Cell | Cell | Cell | Cell |\r\n| Cell | Cell | Cell | Cell |\r\n| Cell | Cell | Cell | Cell | ',
        created_at: new Date('2024-07-19T09:44:14.000Z'),
        updated_at: new Date('2024-07-28T04:24:29.000Z'),
        tags: [
          {
            id: 7165537549,
            name: 'ブログ',
            color: 'f9d0c4'
          }
        ],
        platform: Platforms.Personal
      },
      {
        id: 4,
        title: 'GitHubのIssueをCMSとして使用したブログを構築する',
        body: 'これまで `umaidashi/til` プロジェクトや、 `umaidashi/me` プロジェクトでブログコンテンツを管理していたが、もっと楽に書けるように構成を考え直したいと思った\r\n\r\nこれまでも GitHub　上のコンテンツをAPIで取得し、mdに変換する方法をとっていたが、管理がなあなあになっていた\r\n',
        created_at: new Date('2024-07-05T04:04:52.000Z'),
        updated_at: new Date('2024-07-06T08:13:17.000Z'),
        tags: [],
        platform: Platforms.Personal
      }
    ]
    const posts = [...zennPosts, ...personalPosts].sort((a, b) => {
      return b.updated_at.getTime() - a.updated_at.getTime()
    })
    return posts
  }
}
