import { ApiProperty } from '@nestjs/swagger';
import { Matches, IsNotEmpty, IsString } from 'class-validator';
import { regMobile } from 'src/utils/regex';

export class LoginDTO {
  @ApiProperty({
    description: '登录类型，昵称1，手机号2',
    example: '13399009900',
  })
  @IsNotEmpty({ message: '登录类型不可为空' })
  readonly type: string;

  @ApiProperty({
    description: '手机号，唯一',
    example: '13399009900',
  })
  // @Matches(regMobile, { message: '请输入正确的手机号' })
  // @IsNotEmpty({ message: '手机号不可为空' })
  readonly mobile?: string;

  @ApiProperty({
    description: '短信验证码',
    example: 'as2d',
  })
  // @IsNotEmpty({ message: '手机号不可为空' })
  readonly captcha?: string;

  @ApiProperty({
    description: '昵称，唯一',
    example: '昵称昵称',
  })
  // @IsNotEmpty({ message: '昵称不可为空' })
  readonly nickname?: string;

  @ApiProperty({
    description: '用户密码',
    example: '123456',
  })
  // @IsNotEmpty({ message: '用户密码不可为空' })
  readonly password?: string;
}
