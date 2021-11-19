import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import { UserService } from './user.service';
import { UserInfoResponse } from './vo/user-info.vo';
import { TokenResponse } from './vo/token.vo';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBody({ type: RegisterDto })
  @ApiOkResponse({ description: '注册', type: UserInfoResponse })
  @Post('register')
  async register(@Body() registerDTO: RegisterDto): Promise<UserInfoResponse> {
    return this.userService.register(registerDTO);
  }

  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ description: '登录', type: TokenResponse })
  @Post('login')
  async login(@Body() loginDTO: LoginDto): Promise<TokenResponse> {
    return this.userService.login(loginDTO);
  }
}
