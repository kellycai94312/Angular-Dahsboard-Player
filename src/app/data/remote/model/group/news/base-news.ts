import {IdentifiedObject} from '../../../base/identified-object';
import {NewsType} from './news-type';
import {Person} from '../../person';
import {NewsAppliedPoll} from '../../poll/applied/news-applied-poll';
import {Type} from 'class-transformer';

export class BaseNews extends IdentifiedObject {

  public discriminator: NewsType;
  public title?: string;
  public content?: string;

  @Type(() => Person)
  public person: Person;

  @Type(() => NewsAppliedPoll)
  public appliedPoll: NewsAppliedPoll;

}
