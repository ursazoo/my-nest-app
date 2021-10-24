import { Controller, Body, Query, Get, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDTO } from './dto/create-article.dto';
import { UpdateArticleDTO } from './dto/update-article.dto';
import { IdDTO } from './dto/id.dto';
import { ListDTO } from './dto/list.dto';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get('list')
  getAll(@Query() listDTO: ListDTO) {
    return this.articleService.getAll(listDTO);
  }

  @Get('info')
  getOne(@Query() idDto: IdDTO) {
    return this.articleService.getOne(idDto);
  }

  @Post('create')
  create(@Body() createArticleDTO: CreateArticleDTO) {
    return this.articleService.create(createArticleDTO as any);
  }

  @Post('update')
  update(@Body() updateArticleDTO: UpdateArticleDTO) {
    return this.articleService.update(updateArticleDTO as any);
  }

  @Post('delete')
  delete(@Body() idDto: IdDTO) {
    return this.articleService.delete(idDto);
  }
}
