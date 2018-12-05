import {BaseGroupNews} from './base-group-news';
import {BaseTraining} from '../../training/base/base-training';
import {GroupNewsDiscriminator} from './group-news-discriminator';

export class EventGroupNews extends BaseGroupNews {
  training: BaseTraining;

  constructor() {
    super();
    this.discriminator = GroupNewsDiscriminator.EVENT_GROUP_NEWS;
  }
}
