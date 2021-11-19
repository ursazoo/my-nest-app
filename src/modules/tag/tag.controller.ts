import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import { FindAllDto } from './dto/find-all.dto';
import { FindByIdDto } from './dto/find-by-id.dto';
import { UpdateDto } from './dto/update.dto';
// import { ListDTO } from './dto/f.dto';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @Get('')
  findAll(@Query() findAllDto: FindAllDto) {
    return this.tagService.findAll(findAllDto);
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
  delete(@Body() findByIdDto: FindByIdDto) {
    return this.tagService.delete(findByIdDto);
  }
}
