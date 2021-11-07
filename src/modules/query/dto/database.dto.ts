import { IsNotEmpty } from 'class-validator';

export class DataBaseDTO {
  @IsNotEmpty({ message: '数据库名称不可为空' })
  readonly database: string;
}
