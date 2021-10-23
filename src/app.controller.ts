import { Controller, Get, Post, Query, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller('main')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/add')
  addPerson(@Query() query) {
    const person = { name: query?.name ?? 'jack' };
    return person;
  }

  @Get()
  getHello(@Res() res: Response, @Query() query): any {
    console.log(query);
    const { name } = query;
    // 将传入的 query 中的 name 作为 cookie 的值进行保存
    res.cookie('name', name, { maxAge: 40000, httpOnly: true });

    // 需要注意的是！！ 在使用 res 参数之后，必须要使用 res.end 告知客户端返回结果，否则会一直处于没有返回值的状态
    // return `${this.appService.getHello()} ${name}！`;
    res.end('save cookie success');
  }

  @Get('/home')
  @Render('default/index')
  getHome(): {
    name: string;
  } {
    return {
      name: '张三',
    };
  }
}
