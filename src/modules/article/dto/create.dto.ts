import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Tag } from 'src/modules/tag/entity/tag.entity';
import { EArticleIsPublic } from '../interface/article.interface';

export class CreateDto {
  @ApiProperty({ description: '文章标题' })
  @IsNotEmpty({ message: '文章标题不可为空' })
  title: string;

  @ApiProperty({ description: '文章描述' })
  @IsNotEmpty({ message: '文章描述不可为空' })
  description: string;

  @ApiProperty({ description: '文章内容' })
  @IsNotEmpty({ message: '文章内容不可为空' })
  content: string;

  @ApiProperty({
    required: true,
    description: '文章是否公开',
  })
  @IsNotEmpty({ message: '文章是否公开不可为空' })
  isPublic: EArticleIsPublic;

  @ApiProperty({ description: '标签id', example: [1, 2] })
  tagIds?: number[];

  @ApiProperty({ description: '关联标签' })
  tags?: Tag[];
}
