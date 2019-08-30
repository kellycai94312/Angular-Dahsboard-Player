import {BaseAppliedPoll} from './base/base-applied-poll';
import {Type} from 'class-transformer';
import {AppliedPollType} from './base/applied-poll-type';
import {BaseNews} from '../../group/news/base-news';

export class NewsAppliedPoll extends BaseAppliedPoll {

  @Type(() => BaseNews)
  public news: BaseNews;

  constructor() {
    super();
    this.discriminator = AppliedPollType.NEWS;
  }

}
