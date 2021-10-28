import { Matches } from 'class-validator';
import { regPositive } from 'src/utils/regex';

export class ListDTO {
  @Matches(regPositive, { message: 'page不可小于0' })
  readonly page?: number;

  @Matches(regPositive, { message: 'pageSize不可小于0' })
  readonly pageSize?: number;
}
