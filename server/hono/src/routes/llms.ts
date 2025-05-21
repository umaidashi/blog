import { Hono } from 'hono';

const app = new Hono();

const markdownContent = `
# oidon. - umaidashi

## About

| key          | value                     |
|--------------|---------------------------|
| Name         | Oishi Yuma                |
| Birth Day    | 2002.11.18                |
| Hometown     | Fukuoka                   |
| University   | Meiji.univ                |
| Workplace    | BuySell Technologies      |
| Display Name | ['umaidashi', 'oidon', 'yoishi'] |

## Skills

### Languages

Go, TypeScript, JavaScript, C, Python, Ruby, Zsh, Dart, Swift, R, Pug, Sass, Rust, Terraform

### Frameworks

Gin, React, Next.js, Hono, Astro, Remix, Django, Flask, Ruby on Rails, Flutter

### Libraries

Prisma, Drizzle, Zod, MUI, shadcn/ui, GraphQL, styled-components

### RDBMS / BaaS

PostgreSQL, PlanetScale, Supabase, MySQL

### Others

Neovim, Vim, Vercel, Render, Sentry, Datadog, New Relic, Debian, Linux, Slack, Discord, Sketch, Figma, GitHub, GitHub Actions, Docker, Google Cloud, Google BigQuery, Google Cloud Storage, Postman, Jira, Jira Software
`;

app.get('/', (c) => {
  c.header('Content-Type', 'text/markdown; charset=UTF-8');
  return c.text(markdownContent);
});

export default app;
