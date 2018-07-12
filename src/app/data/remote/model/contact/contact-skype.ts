import {ContactType} from './base/contact-type';
import {BaseContact} from './base/base-contact';

export class ContactSkype extends BaseContact {

  constructor() {
    super();
    this.discriminator = ContactType.SKYPE;
  }

}
