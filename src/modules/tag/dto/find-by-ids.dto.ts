import { IsNotEmpty, Matches } from 'class-validator';
import { regPositive } from 'src/utils/regex';

export class FindByIdsDto {
  // @IsNotEmpty({ message: '标签id不可为空' })
  // @Matches(regPositive, { message: '请输入有效的id' })
  readonly ids: number[];
}
