import { Column, Entity } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

import { Common } from 'src/common/entity/common.entity';
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
  @Column('int')
  @IsNotEmpty()
  status: ETagStatus;
}
