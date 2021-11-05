import { Controller, Body, Query, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ArticleService } from './article.service';
import { CreateArticleDTO } from './dto/create-article.dto';
import { UpdateArticleDTO } from './dto/update-article.dto';
import { IdDTO } from './dto/id.dto';
import { ListDTO } from './dto/list.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get('databases')
  getDatabases() {
    return this.articleService.getDatabases();
  }

  @Get('tables')
  getTables(@Query() database: string) {
    return this.articleService.getTables(database);
  }

  @Get('columns')
  getColumns(@Query() columnsDTO: { database: string; table: string }) {
    return this.articleService.getColumns(columnsDTO);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('list')
  getAll(@Query() listDTO: ListDTO) {
    return this.articleService.getAll(listDTO);
  }

  @Get('info')
  getOne(@Query() idDto: IdDTO) {
    return this.articleService.getOne(idDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('create')
  create(@Body() createArticleDTO: CreateArticleDTO) {
    return this.articleService.create(createArticleDTO as any);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('update')
  update(@Body() updateArticleDTO: UpdateArticleDTO) {
    return this.articleService.update(updateArticleDTO as any);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('delete')
  delete(@Body() idDto: IdDTO) {
    return this.articleService.delete(idDto);
  }
}
