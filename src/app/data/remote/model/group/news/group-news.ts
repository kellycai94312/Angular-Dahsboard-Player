import { Type } from 'class-transformer';
import { Group, GROUP_TYPE_OPTIONS } from '../base';
import { BaseNews } from './base-news';
import { NewsType } from './news-type';

export class GroupNews extends BaseNews {

  @Type(() => Group, GROUP_TYPE_OPTIONS)
  public group: Group;

  constructor() {
    super();
    this.discriminator = NewsType.GROUP_NEWS;
  }

}
