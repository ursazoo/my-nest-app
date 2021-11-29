import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

import { Common } from 'src/common/entity/common.entity';
import { Article } from 'src/modules/article/entity/article.entity';

import { ETagStatus } from '../interface';

@Entity()
export class Tag extends Common {
  // 标签名称
  @Column('text')
  @IsNotEmpty()
  label: string;

  // 标签颜色
  @Column('text')
  @IsNotEmpty()
  color: string;

  // 标签状态
  @Column({
    type: 'enum',
    enum: ETagStatus,
    default: ETagStatus['启用中'],
  })
  @IsNotEmpty()
  status: ETagStatus;

  // 标签关联的文章
  @ManyToMany((type) => Article, (article) => article.tags)
  articles: Article[];
}
