import {IdentifiedObject} from '../../../base/identified-object';
import {GroupNewsDiscriminator} from './group-news-discriminator';
import {Person} from '../../person';
import {Group} from '../base/group';

export class BaseGroupNews extends IdentifiedObject {
  discriminator: GroupNewsDiscriminator;
  group: Group;
  person: Person;
}
