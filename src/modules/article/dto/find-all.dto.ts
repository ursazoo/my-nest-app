import { Matches } from 'class-validator';
import { regPositive } from 'src/utils/regex';

export class FindAllDto {
  @Matches(regPositive, { message: 'page不可小于0' })
  readonly pageNo?: number;

  @Matches(regPositive, { message: 'pageSize不可小于0' })
  readonly pageSize?: number;
}
