import {Component, OnInit} from '@angular/core';
import {ParticipantRestApiService} from '../../../../../../data/remote/rest-api/participant-rest-api.service';
import {PersonService} from '../../../service/person.service';
import {AppHelper} from '../../../../../../utils/app-helper';
import {ListRequest} from '../../../../../../data/remote/request/list-request';
import {ContactType} from '../../../../../../data/remote/model/contact/base/contact-type';
import {NgxModalService} from '../../../../../../components/ngx-modal/service/ngx-modal.service';
import {ContactNgxInput} from '../model/contact-ngx-input';
import {PersonActivationComponent} from '../../../../../../module/person/person-activation/person-activation/person-activation.component';
import {BaseContact} from '../../../../../../data/remote/model/contact/base/base-contact';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {

  public readonly contactTypeClass = ContactType;
  public contactNgxInputs: ContactNgxInput[] = [];
  public canEdit: boolean;
  public enabled: boolean;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _personService: PersonService,
              private _ngxModalService: NgxModalService,
              private _appHelper: AppHelper) {
  }

  async ngOnInit() {
    // this.canEdit = await this._personService.allowEdit();
    // this.enabled = await this._personService.personViewModel.data.user.enabled;
    //
    // const contacts = await this._participantRestApiService.getPersonContacts({personId: this._personService.personViewModel.data.id});
    // this.contactNgxInputs = this._convertContactsToContactNgxInputs(contacts);
  }

  public onSave = async () => {
    // await this._appHelper.trySave(async () => {
    //   const contacts = await this._participantRestApiService.updatePersonContacts(new ListRequest(this.contactNgxInputs.map(x => x.getResult())), {}, {personId: this._personService.personViewModel.data.id});
    //   this.contactNgxInputs = this._convertContactsToContactNgxInputs(contacts);
    // });
  };

  public onPersonActivation = async () => {
    let defaultEmail = '';
    const contactNgxInput = this.contactNgxInputs.find(x => x.contact.discriminator === ContactType.EMAIL);
    if (contactNgxInput) {
      defaultEmail = contactNgxInput.getResult().value;
    }
    // const modal = this._ngxModalService.open();
    // modal.componentInstance.titleKey = 'personActivation';
    // await modal.componentInstance.initializeBody(PersonActivationComponent, async component => {
    //   component.initialize(this._personService.personViewModel.data, defaultEmail);
    //   modal.componentInstance.splitButtonItems = [
    //     {
    //       nameKey: 'activate',
    //       callback: async data => {
    //         if (await component.onSave()) {
    //           modal.close();
    //         }
    //       }
    //     }
    //   ];
    // });
  };

  private _convertContactsToContactNgxInputs(contacts: BaseContact[]): ContactNgxInput[] {
    return contacts.map(x => {
      const contactNgxInput = new ContactNgxInput(x);
      if (!this.canEdit) {
        contactNgxInput.ngxInput.control.disable();
      }
      return contactNgxInput;
    });
  }

}
