import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';
import { regPositive } from 'src/utils/regex';
import { ETagStatus } from '../interface';

export class UpdateDto {
  @ApiProperty({ description: '标签id' })
  @IsNotEmpty({ message: '请输入id' })
  @Matches(regPositive, { message: '请输入有效的id' })
  readonly id: number;

  @ApiProperty({ description: '标签名称' })
  @IsNotEmpty({ message: '请输入标签名称' })
  readonly label: string;

  @ApiProperty({ description: '标签颜色' })
  @IsNotEmpty({ message: '请输入标签颜色' })
  readonly color: string;

  @ApiProperty({ description: '标签状态' })
  @IsNotEmpty({ message: '请输入标签状态' })
  readonly status: ETagStatus;
}
