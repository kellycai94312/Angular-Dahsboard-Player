import { IdentifiedObject } from '../../base';
import { PersonPrivacyEnum } from './person-privacy-enum';

export class PersonPrivacyObject extends IdentifiedObject {
  public personPrivacyEnum: PersonPrivacyEnum;
}
