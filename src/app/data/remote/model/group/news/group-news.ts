import {BaseGroupNews} from './base-group-news';
import {GroupNewsDiscriminator} from './group-news-discriminator';

export class GroupNews extends BaseGroupNews {
  title: string;
  content: string;

  constructor() {
    super();
    this.discriminator = GroupNewsDiscriminator.GROUP_NEWS;
  }
}
