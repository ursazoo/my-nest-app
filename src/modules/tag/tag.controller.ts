import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import { FindAllDto } from './dto/find-all.dto';
import { FindByIdsDto } from './dto/find-by-ids.dto';
import { UpdateDto } from './dto/update.dto';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @Get('')
  findAll(@Query() findAllDto: FindAllDto) {
    return this.tagService.findAll(findAllDto);
  }

  @Post('ids')
  // 从路由中获取动态数据时，可以使用 :param 的形式，直接获取
  findByIds(@Body() findByIdsDto: FindByIdsDto) {
    return this.tagService.findByIds(findByIdsDto);
  }

  @Post('')
  create(@Body() createDto: CreateDto) {
    return this.tagService.create(createDto);
  }

  @Put('')
  update(@Body() updateDto: UpdateDto) {
    return this.tagService.update(updateDto);
  }

  @Delete('')
  delete(@Body() findByIdsDto: FindByIdsDto) {
    return this.tagService.delete(findByIdsDto);
  }
}
