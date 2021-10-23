import { Controller, Post, Body, Query, Get } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get('findAll')
  async findAll() {
    return await this.usersService.findAll();
  }
}
