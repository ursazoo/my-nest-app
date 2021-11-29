import { IsNotEmpty } from 'class-validator';

export class FindAllByTagDto {
  @IsNotEmpty({ message: '标签id不可为空' })
  readonly tagId: string;

  // @Matches(regPositive, { message: 'page不可小于0' })
  readonly pageNo?: number;

  // @Matches(regPositive, { message: 'pageSize不可小于0' })
  readonly pageSize?: number;
}
