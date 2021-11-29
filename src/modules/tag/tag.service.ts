import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { getPagination } from 'src/utils';
import { CreateDto } from './dto/create.dto';
import { FindAllDto } from './dto/find-all.dto';
import { FindByIdsDto } from './dto/find-by-ids.dto';
import { UpdateDto } from './dto/update.dto';
import { Tag } from './entity/tag.entity';
import { ETagStatus } from './interface';

@Injectable()
export class TagService {
  list: any[];
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepo: Repository<Tag>,
  ) {
    this.list = [];
  }
  // 获取列表
  async findAll(findAllDto: FindAllDto) {
    const { pageNo = 1, pageSize = 10, label, status } = findAllDto;

    // const result = await this.tagRepo
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

    if (+status === ETagStatus['全部'] || !status) {
      delete condition.status;
    }

    if (!label || label.trim() === '') {
      delete condition.label;
    }

    // const result = await this.tagRepo.findAndCount({
    //   select: ['id', 'label', 'color', 'status'],
    //   where: condition,
    //   skip: (pageNo - 1) * pageSize,
    //   take: pageSize,
    // });

    const result = await this.tagRepo
      .createQueryBuilder('tag')
      .where('tag.isDelete = :isDelete', { isDelete: false })
      .leftJoin('tag.articles', 'article')
      .select(['tag.id', 'tag.label', 'tag.color'])
      .addSelect(['article.id', 'article.title'])
      .skip((pageNo - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    console.log(`result: `, result);
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

  // 根据id获取多个标签
  async findByIds(findByIdsDto: FindByIdsDto) {
    const { ids } = findByIdsDto;
    const result = await this.tagRepo
      .createQueryBuilder('tag')
      .where('tag.id IN (:...ids)', { ids })
      .select(['tag.id', 'tag.label', 'tag.color'])
      // .skip(10)
      // .take(10)
      .getManyAndCount();
    // const tag = await this.tagRepo.findOne(findByIdDto.ids);
    const [list, total] = result;
    const pagination = getPagination(total, 10, 1);

    console.log(result);
    return {
      list,
      pagination,
    };
  }

  // 创建标签
  async create(createDto: CreateDto) {
    const tag = await this.tagRepo.create(createDto);
    const result = await this.tagRepo.save(tag);

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
    const tag = await this.tagRepo.findOne(updateDto.id);

    // tag.color = updateDto.color;
    // tag.label = updateDto.label;

    const modifyTag = {
      ...tag,
      ...updateDto,
      id: tag.id,
    };

    const result = await this.tagRepo.save(modifyTag);

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
  async delete(findByIdDto: FindByIdsDto) {
    /**
     * 物理删除
     * 
     * const tag = await this.tagRepo.findOne(findByIdDto.id);

        if (!tag) {
        throw new Error('未找到指定标签');
        }

        const result = await this.tagRepo.remove(tag);

        if (!result) {
        throw new Error('删除标签失败');
        }

        return result;
     */

    //  逻辑删除
    const tag = await this.tagRepo.findOne(findByIdDto.ids[0]);

    tag.isDelete = true;

    const result = await this.tagRepo.save(tag);

    if (!result) {
      throw new NotFoundException('删除标签失败');
    }

    return result;
  }
}
