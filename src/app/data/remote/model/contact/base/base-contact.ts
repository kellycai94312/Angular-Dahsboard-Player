import {IdentifiedObject} from '../../../base/identified-object';
import {ContactType} from './contact-type';

export class BaseContact extends IdentifiedObject {
  public discriminator: ContactType;
  public visible: boolean;
  public value: string;
}
