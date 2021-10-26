import { IsNotEmpty, Matches } from 'class-validator';
import { regPositive } from 'src/utils';

export class UpdateArticleDTO {
  @IsNotEmpty({ message: 'id不可为空' })
  @Matches(regPositive, { message: '请输入有效的id' })
  readonly id: number;

  readonly title: string;
  readonly description: string;
  readonly content: string;
}
