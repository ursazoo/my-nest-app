import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

// import { InitMiddleware } from './middleware/init.middleware';

async function bootstrap() {
  // 在 create 方法中指定泛型 NestExpressApplication ，表示使用的是 express 平台
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new Logger(),
  });
  app.useStaticAssets('public', {
    prefix: '/static/', // 配置虚拟目录之后，就无法通过 localhost:3000/rule.png 来访问图片，必须使用 localhost:3000/static/rule.png
  });

  // 配置模板引擎文件的位置
  app.setBaseViewsDir('views');

  // 配置使用的模板引擎
  app.setViewEngine('ejs');

  // 配置 cookie 中间件
  app.use(cookieParser());

  // 配置 session 中间件
  app.use(
    // 设置 rolling 是为了在每次返回的请求的时候，都重置保存在客户端中 cookie
    session({ secret: 'keyboard', cookie: { maxAge: 10 }, rolling: true }),
  );

  app.useGlobalPipes(new ValidationPipe());

  // 如果需要使用全局中间件，则必须使用函数式中间件！
  // app.use(InitMiddleware);

  await app.listen(7788);
}

bootstrap();
