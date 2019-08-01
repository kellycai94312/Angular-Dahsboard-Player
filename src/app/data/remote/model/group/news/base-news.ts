import {IdentifiedObject} from '../../../base/identified-object';
import {NewsType} from './news-type';
import {Person} from '../../person';

export class BaseNews extends IdentifiedObject {
  public discriminator: NewsType;
  public title?: string;
  public content?: string;
  public person: Person;
}
