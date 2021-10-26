import { IsNotEmpty } from 'class-validator';

export class CreateArticleDTO {
  @IsNotEmpty({ message: '文章标题不可为空' })
  readonly title: string;

  @IsNotEmpty({ message: '文章描述不可为空' })
  readonly description: string;

  @IsNotEmpty({ message: '文章内容不可为空' })
  readonly content: string;
}
