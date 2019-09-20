import { BaseNews } from './base-news';
import { NewsType } from './news-type';

export class PersonNews extends BaseNews {
  constructor() {
    super();
    this.discriminator = NewsType.PERSON_NEWS;
  }
}
