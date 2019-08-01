import {NgxInput} from '../../../../../../module/ngx/ngx-input/model/ngx-input';
import {BaseContact} from '../../../../../../data/remote/model/contact/base/base-contact';

export class ContactNgxInput {
  public readonly ngxInput = new NgxInput();

  constructor(public contact: BaseContact) {
    this.contact.visible = this.contact.visible || false;
    this.ngxInput.labelTranslation = `contactTypeEnum.${contact.discriminator}`;
    this.ngxInput.control.setValue(contact.value);
  }

  public getResult(): BaseContact {
    this.contact.value = this.ngxInput.control.value;
    return this.contact;
  }
}