import { BaseDto } from './base.dto';
export class CreateDto extends BaseDto {
  /**
   * 图片md5
   * @example asdfghjkl
   */
  readonly signature?: string;
}
