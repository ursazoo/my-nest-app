import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Article } from './entity/article.entity';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TagModule } from '../tag/tag.module';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), TagModule],
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
