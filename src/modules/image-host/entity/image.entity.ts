import { Common } from 'src/common/entity/common.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Image extends Common {
  // 图片路径
  @Column('text')
  path: string;

  // 文件签名
  @Column('text')
  signature: string;
}
