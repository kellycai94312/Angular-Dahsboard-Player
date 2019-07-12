import {Group} from '../base/group';
import {Person} from '../../person';
import {IdentifiedObject} from '../../../base/identified-object';
import {NewsType} from './news-type';
import {BaseEvent} from '../../event/base/base-event';

export class GroupNews extends IdentifiedObject {
  discriminator: NewsType = NewsType.GROUP_NEWS;
  title: string;
  content: string;
  group: Group;
  person: Person;
  // TODO: Rename to event
  training: BaseEvent;
}
