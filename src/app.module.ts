/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

import loadConfig from 'config/configurations';

import { ArticleModule } from './modules/article/article.module';
import { UserModule } from './modules/user/user.module';
import { QueryModule } from './modules/query/query.module';
import { TagModule } from './modules/tag/tag.module';

// 依赖模块
const libModules = [
  ConfigModule.forRoot({
    load: [loadConfig],
    // envFilePath: [DOCKER_ENV ? '.docker.env' : '.env'],
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const { type, host, port, username, password, database } = configService.get('db')
      
      return {
        // .env 获取
        type,
        host,
        port,
        username,
        password,
        database,
        // 同步更新数据库
        synchronize: true,
        // 自动加载实体
        autoLoadEntities: true,
      }
    }
  }),
]

// 业务模块
const businessModules = [
  ArticleModule,
  UserModule,
  QueryModule,
  TagModule
]

@Module({
  imports: [
    ...libModules,
    ...businessModules,
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
