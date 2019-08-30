import {IdentifiedObject} from '../../base/identified-object';
import {Person} from '../person';
import {Type} from 'class-transformer';
import {BaseAppliedPoll} from './applied/base/base-applied-poll';

export class PollPerson extends IdentifiedObject {

  @Type(() => BaseAppliedPoll)
  public appliedPoll: BaseAppliedPoll;

  @Type(() => Person)
  public person: Person;

  public completed?: boolean;

  //region Transient

  public totalScore?: number;

  //endregion

}
