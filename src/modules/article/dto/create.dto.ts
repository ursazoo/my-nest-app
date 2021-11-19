import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDto {
  @ApiProperty({ description: '文章标题' })
  @IsNotEmpty({ message: '文章标题不可为空' })
  readonly title: string;

  @ApiProperty({ description: '文章描述' })
  @IsNotEmpty({ message: '文章描述不可为空' })
  readonly description: string;

  @ApiProperty({
    required: false,
    description:
      '[用户角色]: 0-超级管理员 | 1-管理员 | 2-开发&测试&运营 | 3-普通用户（只能查看）',
  })
  @IsNotEmpty({ message: '文章内容不可为空' })
  readonly content: string;
}
