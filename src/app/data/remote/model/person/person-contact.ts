import {PersonPrivacyObject} from '../base/person-privacy-object';
import {PersonContactTypeEnum} from './person-contact-type-enum';

export class PersonContact extends PersonPrivacyObject {
  public personContactTypeEnum: PersonContactTypeEnum;
  public value: string;
}
