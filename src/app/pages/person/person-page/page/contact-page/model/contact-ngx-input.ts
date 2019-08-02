import {NgxInput} from '../../../../../../module/ngx/ngx-input/model/ngx-input';
import {BaseContact} from '../../../../../../data/remote/model/contact/base/base-contact';
import {ContactPrivacyEnum} from '../../../../../../data/remote/model/contact/base/contact-privacy-enum';

export class ContactNgxInput {
  public readonly ngxInput = new NgxInput();

  constructor(public contact: BaseContact) {
    this.contact.contactPrivacyEnum = this.contact.contactPrivacyEnum || ContactPrivacyEnum.GROUP_MANAGEMENT;
    this.ngxInput.labelTranslation = `contactTypeEnum.${contact.discriminator}`;
    this.ngxInput.control.setValue(contact.value);
  }

  public getResult(): BaseContact {
    this.contact.value = this.ngxInput.control.value;
    return this.contact;
  }
}
