import { ApiProperty } from '@nestjs/swagger';
import { Matches, IsNotEmpty, IsString } from 'class-validator';
import { regMobile } from 'src/utils/regex';

export class RegisterDto {
  @ApiProperty({
    description: '手机号，唯一',
    example: '13399009900',
  })
  @Matches(regMobile, { message: '请输入正确的手机号' })
  @IsNotEmpty({ message: '手机号不可为空' })
  readonly mobile: string;

  @ApiProperty({
    description: '用户名',
    example: '一个用户的名称',
  })
  @IsNotEmpty({ message: '用户名不可为空' })
  @IsString({ message: '用户名必须为字符串' })
  readonly nickname: string;

  @ApiProperty({
    description: '用户密码',
    example: '123456',
  })
  @IsNotEmpty({ message: '用户密码不可为空' })
  readonly password: string;

  @ApiProperty({
    description: '二次确认密码',
    example: '123456',
  })
  @IsNotEmpty({ message: '二次确认密码不可为空' })
  readonly passwordRepeat: string;
}
