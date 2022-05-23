// import { Matches } from 'class-validator';
// import { regPositive } from 'src/utils/regex';
import {
  EArticleIsPublic,
  EArticleStatus,
} from '../interface/article.interface';

export class FindAllDto {
  // @Matches(regPositive, { message: 'page不可小于0' })
  pageNo?: number;

  // @Matches(regPositive, { message: 'pageSize不可小于0' })
  pageSize?: number;

  readonly tagIds?: string;

  readonly status?: EArticleStatus;

  readonly isPublic?: EArticleIsPublic;

  readonly isDelete?: number;

  readonly createTime?: string;

  readonly updateTime?: string;
}
