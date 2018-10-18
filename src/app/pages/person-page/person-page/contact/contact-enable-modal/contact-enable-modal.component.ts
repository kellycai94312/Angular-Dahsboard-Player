import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ParticipantRestApiService} from '../../../../../data/remote/rest-api/participant-rest-api.service';
import {EmailRequest} from '../../../../../data/remote/request/email-request';
import {PersonService} from '../../person.service';
import {AppHelper} from '../../../../../utils/app-helper';
import {ClientError} from '../../../../../data/local/error/client-error';

@Component({
  selector: 'app-contact-enable-modal',
  templateUrl: './contact-enable-modal.component.html',
  styleUrls: ['./contact-enable-modal.component.scss']
})
export class ContactEnableModalComponent {

  @Input()
  public email: string;

  constructor(public modal: NgbActiveModal,
              private _appHelper: AppHelper,
              private personService: PersonService,
              private _participantRestApiService: ParticipantRestApiService) {
  }

  public onSave = async () => {
    await this._appHelper.trySave(async () => {
      const request = new EmailRequest();
      request.email = this.email;
      try {
        await this._participantRestApiService.enableTemplatePerson(request, {}, {userId: this.personService.personViewModel.data.user.id});
        this.modal.dismiss();
      } catch (e) {
        throw new ClientError('registration.invalidCredentials');
      }
    });
  };

}
