import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';

import { getPagination } from 'src/utils';
import { CreateDto } from './dto/create.dto';
import { FindAllDto } from './dto/find-all.dto';
import { FindByIdDto } from './dto/find-by-id.dto';
import { UpdateDto } from './dto/update.dto';
import { Tag } from './entities/tag.entity';
import { ETagStatus } from './interface';

@Injectable()
export class TagService {
  list: any[];
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {
    this.list = [];
  }
  // 获取列表
  async findAll(findAllDto: FindAllDto) {
    const { pageNo = 1, pageSize = 10, label, status } = findAllDto;

    // const result = await this.tagRepository
    //   .createQueryBuilder('tag')
    //   .where({ isDelete: false })
    //   .select(['tag.id', 'tag.label', 'tag.color'])
    //   .skip((pageNo - 1) * pageSize)
    //   .take(pageSize)
    //   .getManyAndCount();

    const condition = {
      isDelete: false,
      label,
      status,
    };

    if (+status === ETagStatus['全部']) {
      delete condition.status;
    }

    if (!label || label.trim() === '') {
      delete condition.label;
    }

    const result = await this.tagRepository.findAndCount({
      select: ['id', 'label', 'color', 'status'],
      where: condition,
      skip: (pageNo - 1) * pageSize,
      take: pageSize,
    });

    if (!result) {
      throw new NotFoundException('查询标签失败');
    }
    const [list, total] = result;

    const pagination = getPagination(total, pageSize, pageNo);

    return {
      list,
      pagination,
    };
  }

  // 创建标签
  async create(createDto: CreateDto) {
    const tag = await this.tagRepository.create(createDto);
    const result = await this.tagRepository.save(tag);

    if (!result) {
      throw new NotFoundException('创建标签失败');
    }

    return result;
  }

  // 更新标签
  async update(updateDto: UpdateDto) {
    console.log(updateDto);
    // const result = await getConnection()
    //   .createQueryBuilder()
    //   .update(Tag)
    //   .set(updateDto)
    //   .where('id = :id', { id: updateDto.id })
    //   .execute();

    // return result;
    const tag = await this.tagRepository.findOne(updateDto.id);

    // tag.color = updateDto.color;
    // tag.label = updateDto.label;

    const modifyTag = {
      ...tag,
      ...updateDto,
      id: tag.id,
    };

    const result = await this.tagRepository.save(modifyTag);

    if (!result) {
      throw new NotFoundException('更新标签失败');
    }

    const { id, label, color, status } = result;

    return {
      id,
      label,
      color,
      status,
    };
  }

  // 删除标签
  async delete(findByIdDto: FindByIdDto) {
    /**
     * 物理删除
     * 
     * const tag = await this.tagRepository.findOne(findByIdDto.id);

        if (!tag) {
        throw new Error('未找到指定标签');
        }

        const result = await this.tagRepository.remove(tag);

        if (!result) {
        throw new Error('删除标签失败');
        }

        return result;
     */

    //  逻辑删除
    const tag = await this.tagRepository.findOne(findByIdDto.id);

    tag.isDelete = true;

    const result = await this.tagRepository.save(tag);

    if (!result) {
      throw new NotFoundException('删除标签失败');
    }

    return result;
  }
}
