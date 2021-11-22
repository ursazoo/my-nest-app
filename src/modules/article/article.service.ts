import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getPagination } from 'src/utils';
import { Repository } from 'typeorm';

import { CreateDto } from './dto/create.dto';
import { FindByIdDto } from './dto/find-by-id.dto';
import { FindAllDto } from './dto/find-all.dto';
import { UpdateDto } from './dto/update.dto';
import { ArticleEntity } from './entities/article.entity';

@Injectable()
export class ArticleService {
  list: any[];
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {
    this.list = [];
  }

  // 获取列表
  async findAll(findAllDto: FindAllDto) {
    const { pageNo = 1, pageSize = 10 } = findAllDto;

    const result = await this.articleRepository.find({
      select: ['id', 'title', 'description', 'updateTime'],
      where: { isDelete: false },
      skip: (pageNo - 1) * pageSize,
      take: pageSize,
    });

    const pagination = getPagination(result?.length, pageSize, pageNo);

    return {
      result,
      pagination,
    };
  }

  // 获取单条
  async findById(findByIdDto: FindByIdDto) {
    // const { id } = findByIdDto;

    // const result = await this.articleRepository
    //   .createQueryBuilder('article')
    //   .where({ id })
    //   .select()
    //   .getOne();

    const result = await this.articleRepository.findOne(findByIdDto.id);

    if (!result) {
      throw new NotFoundException('找不到该文章');
    }

    return result;
  }

  // 创建文章
  async create(createDto: CreateDto) {
    const article = await this.articleRepository.create(createDto);
    const result = await this.articleRepository.save(article);
    // .createQueryBuilder('article')
    // .insert()
    // .into(Article)
    // .values(article)
    // .execute();

    if (!result) {
      throw new NotFoundException('创建文章失败');
    }

    return result;
  }

  // 更新文章
  async update(updateDto: UpdateDto) {
    let article = await this.articleRepository.findOne(updateDto.id);

    article = {
      ...article,
      ...updateDto,
      id: article.id,
    };

    // const article = {
    //   ...(await this.articleRepository.findOne(updateDto.id)),
    //   ...updateDto,
    // };

    // delete article.id;

    // .createQueryBuilder('article')
    // .update(Article)
    // .set(article)
    // .where('id = :id', { id: article.id })
    // .execute();

    const result = await this.articleRepository.save(article);

    if (!result) {
      throw new NotFoundException('更新文章失败');
    }

    return result;
  }

  // 删除文章
  async delete({ id }) {
    const article = await this.articleRepository.findOne(id);

    article.isDelete = true;

    const result = await this.articleRepository.save(article);

    if (!result) {
      throw new NotFoundException('删除文章失败');
    }

    return null;
  }
}
