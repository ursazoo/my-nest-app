import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ETagStatus } from '../interface';

export class CreateDto {
  @ApiProperty({ description: '标签名称', default: 'Javascript' })
  @IsNotEmpty({ message: '请输入标签名称' })
  readonly label: string;

  @ApiProperty({ description: '标签颜色', default: '#f0f0f0' })
  @IsNotEmpty({ message: '请选择标签颜色' })
  readonly color: string;

  @ApiProperty({ description: '标签状态', default: ETagStatus['启用中'] })
  @IsNotEmpty({ message: '请选择标签状态' })
  readonly status: ETagStatus;
}
