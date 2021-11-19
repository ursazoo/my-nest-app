import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getPagination } from 'src/utils';
import { Repository } from 'typeorm';

import { CreateDto } from './dto/create.dto';
import { FindByIdDto } from './dto/find-by-id.dto';
import { FindAllDto } from './dto/find-all.dto';
import { UpdateDto } from './dto/update.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  list: any[];
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {
    this.list = [];
  }

  // 获取列表
  async findAll(findAllDto: FindAllDto) {
    const { pageNo = 1, pageSize = 10 } = findAllDto;

    const result = await this.articleRepository
      // .query(`
      //   SELECT
      //     *
      //   FROM
      //     article
      // `);
      .createQueryBuilder('article')
      .where({ isDelete: false })
      .select([
        'article.id',
        'article.title',
        'article.description',
        'article.createTime',
        'article.updateTime',
      ])
      .skip((pageNo - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    const [list, total] = result;

    const pagination = getPagination(total, pageSize, pageNo);

    return {
      list,
      pagination,
    };
  }

  // 获取单条
  async findById(findByIdDto: FindByIdDto) {
    const { id } = findByIdDto;

    const result = await this.articleRepository
      .createQueryBuilder('article')
      .where({ id })
      .select()
      .getOne();

    if (!result) {
      throw new NotFoundException('找不到该文章');
    }

    return result;
  }

  // 创建文章
  async create(createDto: CreateDto) {
    const article = new Article();

    article.title = createDto.title;
    article.description = createDto.description;
    article.content = createDto.content;

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

    // if (result) {
    //   return {
    //     data: null,
    //     msg: '创建成功',
    //     code: 200,
    //   };
    // } else {
    //   return result;
    // }
  }

  // 更新文章
  async update(updateDto: UpdateDto) {
    // const article = await this.articleRepository.findOne(updateDto.id);

    const article = {
      ...(await this.articleRepository.findOne(updateDto.id)),
      ...updateDto,
    };

    delete article.id;

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
    // .createQueryBuilder()
    // .delete()
    // .from(Article)
    // .where('id = :id', { id })
    // .execute();

    if (!result) {
      throw new NotFoundException('删除文章失败');
    }

    return null;
  }
}
