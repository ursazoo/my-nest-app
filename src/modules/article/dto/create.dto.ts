import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Tag } from 'src/modules/tag/entity/tag.entity';

export class CreateDto {
  @ApiProperty({ description: '文章标题' })
  @IsNotEmpty({ message: '文章标题不可为空' })
  title: string;

  @ApiProperty({ description: '文章描述' })
  @IsNotEmpty({ message: '文章描述不可为空' })
  description: string;

  @ApiProperty({
    required: false,
    description: '文章内容',
  })
  @IsNotEmpty({ message: '文章内容不可为空' })
  content: string;

  /**
   * 标签 格式 [{id: 1}, {id: 2}]
   * @example  [{id: 1}]
   */
  @ApiProperty({ type: () => Tag })
  tags?: Tag[];
}
