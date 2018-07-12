import {Person} from '../model/person';
import {IdRequest} from './id-request';

export class PersonTemplateRequest {
  public person: Person;
  public userRoleIds: Array<IdRequest>;
  public sportTypeIds: Array<IdRequest>;
  public groupIds: Array<IdRequest>;
}
