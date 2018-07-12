import {BaseContact} from './base/base-contact';
import {ContactType} from './base/contact-type';

export class ContactEmail extends BaseContact {

  constructor() {
    super();
    this.discriminator = ContactType.EMAIL;
  }

}
