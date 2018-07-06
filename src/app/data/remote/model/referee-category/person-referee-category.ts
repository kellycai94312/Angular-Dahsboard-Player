import {IdentifiedObject} from '../../base/identified-object';
import {Person} from '../person';
import {RefereeCategory} from './referee-category';

export class PersonRefereeCategory extends IdentifiedObject {
  public refereeCategory: RefereeCategory;
  public personAssignedBy: Person;
  public assignDate: Date;
  public certificationNumber: string;
}
