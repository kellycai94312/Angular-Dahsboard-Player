import {Component, OnInit} from '@angular/core';
import {BaseContact} from '../../../../../../data/remote/model/contact/base/base-contact';
import {ParticipantRestApiService} from '../../../../../../data/remote/rest-api/participant-rest-api.service';
import {PersonService} from '../../../service/person.service';
import {AppHelper} from '../../../../../../utils/app-helper';
import {ListRequest} from '../../../../../../data/remote/request/list-request';
import {ContactType} from '../../../../../../data/remote/model/contact/base/contact-type';
import {NgxModalService} from '../../../../../../components/ngx-modal/service/ngx-modal.service';
import {PersonActivationComponent} from '../../../../../../module/person/person-activation/person-activation/person-activation.component';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {

  public readonly contactTypeClass = ContactType;

  public allowEdit: boolean;
  public enabled: boolean;
  public contacts: BaseContact[];

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _personService: PersonService,
              private _ngxModalService: NgxModalService,
              private _appHelper: AppHelper) {
  }

  async ngOnInit() {
    this.allowEdit = await this._personService.allowEdit();
    this.enabled = await this._personService.personViewModel.data.user.enabled;
    this.contacts = await this._participantRestApiService.getPersonContacts({personId: this._personService.personViewModel.data.id});
    this.contacts.forEach(value => {
      value.visible = value.visible || false;
    });
  }

  public onSave = async () => {
    await this._appHelper.trySave(async () => {
      this.contacts = await this._participantRestApiService.updatePersonContacts(new ListRequest(this.contacts), {}, {personId: this._personService.personViewModel.data.id});
    });
  };

  public onPersonActivation = async () => {
    let defaultEmail = '';
    const emailContacts = this.contacts.filter(contact => contact.discriminator == ContactType.EMAIL);
    if (emailContacts.length) {
      defaultEmail = emailContacts[0].value;
    }
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'personActivation';
    await modal.componentInstance.initializeBody(PersonActivationComponent, async component => {
      component.initialize(this._personService.personViewModel.data, defaultEmail);
      modal.componentInstance.splitButtonItems = [
        {
          nameKey: 'activate',
          callback: async data => {
            if (await component.onSave()) {
              modal.close();
            }
          }
        }
      ];
    });
  };

}
