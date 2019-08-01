import {NewsType} from './news-type';
import {BaseNews} from './base-news';
import {Group} from '../base/group';
import {Type} from 'class-transformer';

export class GroupNews extends BaseNews {

  @Type(() => Group)
  public group: Group;

  constructor() {
    super();
    this.discriminator = NewsType.GROUP_NEWS;
  }

}
