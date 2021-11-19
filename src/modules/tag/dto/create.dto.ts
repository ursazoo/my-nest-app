import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateDto {
  @ApiProperty({ description: '标签名称', default: 'Javascript' })
  @IsNotEmpty({ message: '请输入标签名称' })
  readonly label: string;

  @ApiProperty({ description: '标签颜色', default: '#f0f0f0' })
  @IsNotEmpty({ message: '请选择标签颜色' })
  readonly color: string;
}
