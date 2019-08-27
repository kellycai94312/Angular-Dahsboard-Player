import {IdentifiedObject} from '../../base/identified-object';
import {PersonPrivacyEnum} from './person-privacy-enum';

export abstract class PersonPrivacyObject extends IdentifiedObject {
  public personPrivacyEnum: PersonPrivacyEnum;
}
