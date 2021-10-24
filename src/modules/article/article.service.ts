import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IdDTO } from './dto/id.dto';
import { ListDTO } from './dto/list.dto';
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
  async getAll(listDTO: ListDTO) {
    const { page = 1, pageSize = 10 } = listDTO;

    return await this.articleRepository
      // .query(`
      //   SELECT
      //     *
      //   FROM
      //     article
      // `);
      .createQueryBuilder('article')
      .where({ isDelete: false })
      .select()
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getMany();
  }

  // 获取单条
  async getOne(idDto: IdDTO) {
    const { id } = idDto;

    return await this.articleRepository
      .createQueryBuilder('article')
      .where({ id })
      .select()
      .getOne();
  }

  // 创建文章
  async create(article: Article) {
    const result = await this.articleRepository
      .createQueryBuilder('article')
      .insert()
      .into(Article)
      .values(article)
      .execute();

    if (result) {
      return {
        data: null,
        msg: '创建成功',
        code: 200,
      };
    } else {
      return result;
    }
  }

  // 更新文章
  async update(article: Article) {
    const result = await this.articleRepository
      .createQueryBuilder('article')
      .update(Article)
      .set(article)
      .where('id = :id', { id: article.id })
      .execute();
    if (result) {
      return {
        data: null,
        msg: '修改成功',
        code: 200,
      };
    } else {
      return result;
    }
  }

  // 删除文章
  async delete({ id }) {
    const result = await this.articleRepository
      .createQueryBuilder()
      .delete()
      .from(Article)
      .where('id = :id', { id })
      .execute();

    if (result) {
      return '删除成功';
    }

    return result;
  }
}
