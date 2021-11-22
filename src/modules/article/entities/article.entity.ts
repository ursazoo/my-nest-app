import { Entity, Column } from 'typeorm';

import { Common } from 'src/common/entity/common.entity';

@Entity()
export class ArticleEntity extends Common {
  // 文章标题
  @Column('text')
  title: string;

  // 文章描述
  @Column('text')
  description: string;

  // 文章内容
  @Column('text')
  content: string;
}
