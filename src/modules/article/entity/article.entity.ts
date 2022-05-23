import { Entity, Column, JoinTable, ManyToMany } from 'typeorm';

import { Common } from 'src/common/entity/common.entity';
import { Tag } from 'src/modules/tag/entity/tag.entity';
import {
  EArticleIsPublic,
  EArticleStatus,
} from '../interface/article.interface';

@Entity()
export class Article extends Common {
  // 文章标题
  @Column('text')
  title: string;

  // 文章描述
  @Column('text')
  description: string;

  // 文章内容
  @Column('text')
  content: string;

  // 是否公开
  @Column({
    type: 'enum',
    enum: EArticleIsPublic,
    default: EArticleIsPublic['公开'],
  })
  isPublic: EArticleIsPublic;

  // 文章状态
  @Column({
    type: 'enum',
    enum: EArticleStatus,
    default: EArticleStatus['创作中'],
  })
  status: EArticleStatus;

  // 标签
  @ManyToMany((type) => Tag, (tag) => tag.articles)
  @JoinTable()
  tags: Tag[];
}
