import {IdentifiedObject} from '../../../base/identified-object';
import {ContactType} from './contact-type';
import {ContactPrivacyEnum} from './contact-privacy-enum';

export class BaseContact extends IdentifiedObject {
  public discriminator: ContactType;
  public contactPrivacyEnum: ContactPrivacyEnum;
  public value: string;
}
