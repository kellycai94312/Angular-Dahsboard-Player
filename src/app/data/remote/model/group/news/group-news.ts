import { Type } from 'class-transformer';
import { Group } from '../base';
import { BaseNews } from './base-news';
import { NewsType } from './news-type';

export class GroupNews extends BaseNews {

  @Type(() => Group)
  public group: Group;

  constructor() {
    super();
    this.discriminator = NewsType.GROUP_NEWS;
  }

}
