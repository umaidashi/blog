# ディレクトリ構成ルール

[この記事](https://zenn.dev/gemcook/articles/80ae56b79f5825)を参考に

```
app/
├── routes/
│   ├── _index.tsx
│   ├── posts._index/
│   │   ├── index.tsx
│   │   ├── loader.ts
│   │   ├── action.ts
│   │   └── components/ # feature
│   ├── posts.$id/
│   │   ├── index.tsx
│   │   ├── loader.ts
│   │   ├── action.ts
│   │   └── components/ # feature
│   └── ...
├── components/ # common
...
```

action は基本ないはず
