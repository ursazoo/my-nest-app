import { Entity, Column } from 'typeorm';

import { Common } from 'src/common/entity/common.entity';

@Entity()
export class UserEntity extends Common {
  // 昵称
  @Column('text')
  nickname: string;

  // 手机号
  @Column('text')
  mobile: string;

  // 加密后的密码
  @Column('text', { select: false })
  password: string;

  // 加密盐
  @Column('text', { select: false })
  salt: string;
}
