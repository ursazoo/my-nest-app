import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';

import { UserService } from './user.service';
import { UserInfoResponse } from './vo/user-info.vo';
import { TokenResponse } from './vo/token.vo';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBody({ type: RegisterDTO })
  @ApiOkResponse({ description: '注册', type: UserInfoResponse })
  @Post('register')
  async register(@Body() registerDTO: RegisterDTO): Promise<UserInfoResponse> {
    return this.userService.register(registerDTO);
  }

  @ApiBody({ type: LoginDTO })
  @ApiOkResponse({ description: '登录', type: TokenResponse })
  @Post('login')
  async login(@Body() loginDTO: LoginDTO): Promise<TokenResponse> {
    return this.userService.login(loginDTO);
  }
}
