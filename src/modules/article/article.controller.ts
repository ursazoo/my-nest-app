import {
  Controller,
  UseGuards,
  Body,
  Query,
  Get,
  Post,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ArticleService } from './article.service';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { FindByIdDto } from './dto/find-by-id.dto';
import { FindAllDto } from './dto/find-all.dto';
import { FindAllByTagDto } from './dto/find-all-by-tag.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  // @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('')
  findAll(@Query() findAllDto: FindAllDto) {
    return this.articleService.findAll(findAllDto);
  }

  @ApiBearerAuth()
  @Get('tag')
  findAllByTag(@Query() findAllByTagDto: FindAllByTagDto) {
    return this.articleService.findAllByTag(findAllByTagDto);
  }

  @Get(':id')
  findById(@Param() findByIdDto: FindByIdDto) {
    return this.articleService.findById(findByIdDto);
  }

  // @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('')
  create(@Body() createDto: CreateDto) {
    return this.articleService.create(createDto as any);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Put(':id')
  update(@Body() updateDto: UpdateDto) {
    return this.articleService.update(updateDto as any);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete(':id')
  delete(@Body() findByIdDto: FindByIdDto) {
    return this.articleService.delete(findByIdDto);
  }
}
