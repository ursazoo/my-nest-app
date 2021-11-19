import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';
import { regPositive } from 'src/utils/regex';

export class FindAllDto {
  @Matches(regPositive, { message: 'pageNo必须大于0' })
  readonly pageNo?: number;

  @Matches(regPositive, { message: 'pageSize必须大于0' })
  readonly pageSize?: number;

  @ApiProperty({ description: '标签名称' })
  readonly label?: string;

  @ApiProperty({ description: '标签id' })
  readonly id?: string;

  @ApiProperty({ description: '标签是否被删除' })
  readonly isDelete?: boolean;
}
