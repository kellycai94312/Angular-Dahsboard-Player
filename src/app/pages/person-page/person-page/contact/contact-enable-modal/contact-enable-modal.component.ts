import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ParticipantRestApiService} from '../../../../../data/remote/rest-api/participant-rest-api.service';
import {EmailRequest} from '../../../../../data/remote/request/email-request';
import {PersonService} from '../../person.service';
import {AppHelper} from '../../../../../utils/app-helper';

@Component({
  selector: 'app-contact-enable-modal',
  templateUrl: './contact-enable-modal.component.html',
  styleUrls: ['./contact-enable-modal.component.scss']
})
export class ContactEnableModalComponent implements OnInit {

  @Input()
  public email: string;

  constructor(public modal: NgbActiveModal,
              private _appHelper: AppHelper,
              private personService: PersonService,
              private _participantRestApiService: ParticipantRestApiService) {
  }

  ngOnInit() {
  }

  public async onSave(event: any) {
    const result = event.validationGroup.validate();
    if (result.isValid) {
      const request = new EmailRequest();
      request.email = this.email;
      try {
        await this._participantRestApiService.enableTemplatePerson(request, {}, {userId: this.personService.personViewModel.data.user.id});
        this.modal.dismiss();
      } catch (e) {
        this._appHelper.showErrorMessage('registration.invalidCredentials');
      }
    }
  }

}
