import {Component, OnInit} from '@angular/core';
import {PersonService} from '../person.service';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {BaseContact} from '../../../../data/remote/model/contact/base/base-contact';
import {ListRequest} from '../../../../data/remote/request/list-request';
import {ContactEnableModalComponent} from './contact-enable-modal/contact-enable-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ContactType} from '../../../../data/remote/model/contact/base/contact-type';
import {AppHelper} from '../../../../utils/app-helper';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public allowEdit: boolean;
  public enabled: boolean;
  public contacts: BaseContact[];

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _personService: PersonService,
              private _modalService: NgbModal,
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

  public enablePerson = () => {
    const ref = this._modalService.open(ContactEnableModalComponent);
    const componentInstance = ref.componentInstance as ContactEnableModalComponent;
    const emailContacts = this.contacts.filter(contact => contact.discriminator == ContactType.EMAIL);
    if (emailContacts.length) {
      componentInstance.email = emailContacts[0].value;
    }
  };

}
