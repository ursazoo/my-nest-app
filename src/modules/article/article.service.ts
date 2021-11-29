import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getPagination } from 'src/utils';
import { Repository } from 'typeorm';

import { CreateDto } from './dto/create.dto';
import { FindByIdDto } from './dto/find-by-id.dto';
import { FindAllDto } from './dto/find-all.dto';
import { FindAllByTagDto } from './dto/find-all-by-tag.dto';
import { UpdateDto } from './dto/update.dto';
import { Article } from './entity/article.entity';

import { TagService } from '../tag/tag.service';

@Injectable()
export class ArticleService {
  list: any[];
  constructor(
    @InjectRepository(Article)
    private readonly articleRepo: Repository<Article>,
    private readonly tagService: TagService,
  ) {
    this.list = [];
  }

  // 获取列表
  async findAll(findAllDto: FindAllDto) {
    const { pageNo = 1, pageSize = 10 } = findAllDto;

    // const result = await this.articleRepo.find({
    //   select: ['id', 'title', 'description', 'updateTime'],
    //   where: { isDelete: false },
    //   join: {
    //     alias: 'tag',
    //     leftJoinAndSelect: {
    //       id: 'tag.id',
    //       label: 'tag.label',
    //       color: 'tag.color',
    //     },
    //   },
    //   skip: (pageNo - 1) * pageSize,
    //   take: pageSize,
    // });
    const result = await this.articleRepo
      .createQueryBuilder('article')
      .where('article.isDelete = :isDelete', { isDelete: false })
      .leftJoin('article.tags', 'tag')
      .select([
        'article.id',
        'article.title',
        'article.description',
        'article.updateTime',
      ])
      .addSelect(['tag.id', 'tag.label', 'tag.color'])
      .skip((pageNo - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    const [list, total] = result;

    const pagination = getPagination(total, pageSize, pageNo);

    return {
      result: list,
      pagination,
    };
  }

  // 获取单条
  async findById(findByIdDto: FindByIdDto) {
    const { id } = findByIdDto;

    const result = await this.articleRepo
      .createQueryBuilder('article')
      .where({ id })
      .select()
      .getOne();

    // const result = await this.articleRepo.findOne(findByIdDto.id);

    if (!result) {
      throw new NotFoundException('找不到该文章');
    }

    return result;
  }

  // 使用标签id查询文章列表
  async findAllByTag(findAllByTagDto: FindAllByTagDto) {
    const { tagId, pageNo = 1, pageSize = 10 } = findAllByTagDto;

    const result = await this.articleRepo
      .createQueryBuilder('article')
      .where('article.isDelete = :isDelete', { isDelete: false })
      .andWhere('tag.id = :id', { id: tagId })
      .andWhere('tag.isDelete = :isDelete', { isDelete: false })
      .leftJoin('article.tags', 'tag')
      .select([
        'article.id',
        'article.title',
        'article.description',
        'article.updateTime',
      ])
      .addSelect(['tag.id', 'tag.label', 'tag.color'])
      .skip((pageNo - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    console.log(result);

    const [list, total] = result;

    const pagination = getPagination(total, pageSize, pageNo);

    return {
      result: list,
      pagination,
    };
  }

  // 创建文章
  async create(createDto: CreateDto) {
    // const article = await this.articleRepo.create(createDto);
    // const result = await this.articleRepo.save(article);
    const article = new CreateDto();
    const tagsResult = await this.tagService.findByIds({
      ids: createDto.tags.map((item) => item.id),
    });

    const { list } = tagsResult;
    article.title = createDto.title;
    article.description = createDto.description;
    article.content = createDto.content;
    article.tags = list;

    const result = await this.articleRepo.save(article);

    // .createQueryBuilder('article')
    // .insert()
    // .into(Article)
    // .values(article)
    // .execute();

    // if (!result) {
    //   throw new NotFoundException('创建文章失败');
    // }

    return result;
  }

  // 更新文章
  async update(updateDto: UpdateDto) {
    let article = await this.articleRepo.findOne(updateDto.id);

    article = {
      ...article,
      ...updateDto,
      id: article.id,
    };

    // const article = {
    //   ...(await this.articleRepo.findOne(updateDto.id)),
    //   ...updateDto,
    // };

    // delete article.id;

    // .createQueryBuilder('article')
    // .update(Article)
    // .set(article)
    // .where('id = :id', { id: article.id })
    // .execute();

    const result = await this.articleRepo.save(article);

    if (!result) {
      throw new NotFoundException('更新文章失败');
    }

    return result;
  }

  // 删除文章
  async delete({ id }) {
    const article = await this.articleRepo.findOne(id);

    article.isDelete = true;

    const result = await this.articleRepo.save(article);

    if (!result) {
      throw new NotFoundException('删除文章失败');
    }

    return null;
  }
}
