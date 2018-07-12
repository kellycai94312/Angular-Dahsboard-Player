import {ContactType} from './base/contact-type';
import {BaseContact} from './base/base-contact';

export class ContactPhone extends BaseContact {

  constructor() {
    super();
    this.discriminator = ContactType.PHONE;
  }

}
