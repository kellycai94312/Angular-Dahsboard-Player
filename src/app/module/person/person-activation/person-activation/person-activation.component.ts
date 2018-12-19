import {Component} from '@angular/core';
import {NgxInputType} from '../../../../components/ngx-input/model/ngx-input-type';
import {AppHelper} from '../../../../utils/app-helper';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {Person} from '../../../../data/remote/model/person';

@Component({
  selector: 'app-person-activation',
  templateUrl: './person-activation.component.html',
  styleUrls: ['./person-activation.component.scss']
})
export class PersonActivationComponent {

  public readonly ngxInputTypeClass = NgxInputType;

  public email: string;
  private _person: Person;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper) {
  }

  public initialize(person: Person, email: string = '') {
    this._person = person;
    this.email = email;
  }

  public async onSave(): Promise<boolean> {
    return await this._appHelper.tryAction('', 'registration.invalidCredentials', async () => {
      await this._participantRestApiService.enableTemplatePerson(
        {email: this.email},
        {},
        {userId: this._person.user.id}
      );
    });
  }

}
