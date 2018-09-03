import {IdentifiedObject} from '../../base/identified-object';
import {Person} from '../person';

export class GroupPersonLog extends IdentifiedObject {
  public joinDate: Date;
  public leaveDate: Date;
  public mentor: Person;
  public comment: string;
}
