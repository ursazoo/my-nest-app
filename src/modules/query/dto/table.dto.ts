import { IsNotEmpty } from 'class-validator';

export class TableDTO {
  @IsNotEmpty({ message: '数据库名称不可为空' })
  readonly database: string;

  @IsNotEmpty({ message: '表名称不可为空' })
  readonly table: string;
}
