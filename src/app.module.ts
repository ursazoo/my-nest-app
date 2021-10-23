/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...await getConnectionOptions(),
        autoLoadEntities: true,
       })
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   // consumer.apply(InitMiddleware)
  //   //   .forRoutes('*') // 标识匹配所有路由

  //   consumer.apply(UserMiddleware)
  //     .forRoutes('user')

  //     // 表示用 InitMiddleware 去匹配所有路由
  //   // 在匹配完 InitMiddleware 之后，再用 UserMiddleware 去匹配 user 路由（所以对于 user 路由来说，会经过两个中间件）
    
  //     // .forRoutes({ path: 'article', method: RequestMethod.ALL})  // 标识匹配单个路由（对象写法）
  //     // .forRoutes('article') // 标识匹配一个路由，字符串写法
  //     // .forRoutes(UserController) 标识匹配传入的controller下的所有路由
  //     // .forRoutes({ path: 'article', method: RequestMethod.ALL }, { path: 'user', method: RequestMethod.GET }) // 标识匹配多个指定请求方式的路由，
  // }
}
