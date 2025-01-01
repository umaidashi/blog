import type { ZennPost } from '../types/zenn'

export class PostDTO {
  constructor(
    public id: number,
    public title: string,
    public body: string,
    public created_at: Date,
    public published_at: Date,
    public updated_at: Date,
    public tags: { id: number; name: string; color: string }[],
    public platform: Platforms,
    public zennObj?: ZennPost
  ) {}
}

export enum Platforms {
  Personal = 'Personal',
  Zenn = 'Zenn'
}
