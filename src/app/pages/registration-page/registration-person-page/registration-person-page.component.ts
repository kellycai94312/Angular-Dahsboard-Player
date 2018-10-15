import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import notify from 'devextreme/ui/notify';

import {SexEnum} from '../../../data/remote/misc/sex-enum';
import {TranslateObjectService} from '../../../shared/translate-object.service';
import {Person} from '../../../data/remote/model/person';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {AuthorizationService} from '../../../shared/authorization.service';
import {PersonContant} from '../../../data/local/person-contant';
import {NameWrapper} from '../../../data/local/name-wrapper';

@Component({
  selector: 'app-registration-person-page',
  templateUrl: './registration-person-page.component.html',
  styleUrls: ['./registration-person-page.component.scss']
})
export class RegistrationPersonPageComponent implements OnInit {

  public readonly dateMin: Date;
  public readonly dateMax: Date;
  public person: Person;
  public sexEnums: NameWrapper<SexEnum>[];

  constructor(private _translate: TranslateService,
              private _translateObjectService: TranslateObjectService,
              private _participantRestApiService: ParticipantRestApiService,
              private _authorizationService: AuthorizationService,
              private _router: Router) {
    this.person = new Person();
    this.dateMin = PersonContant.getBirthDateMin();
    this.dateMax = PersonContant.getBirthDateMax();
  }

  async ngOnInit() {
    this.sexEnums = await this._translateObjectService.getTranslatedEnumCollection<SexEnum>(SexEnum, 'SexEnum');
    this.person.user = await this._participantRestApiService.getUser({id: this._authorizationService.session.userId});
  }

  public async onApply(event: any) {
    const result = event.validationGroup.validate();
    if (result.isValid) {
      try {
        this.person = await this._participantRestApiService.createPerson(this.person);
        if (this.person) {
          await this._authorizationService.updateSession();
          await this._router.navigate(['/person', this.person.id]);
        } else {
          await this.showErrorMessage();
        }
      } catch (e) {
        await this.showErrorMessage();
      }
    }
  }

  public onSexChanged(val: NameWrapper<SexEnum>) {
    this.person.sex = val.data;
  }

  private async showErrorMessage(): Promise<void> {
    const errorMessage = await this._translate.get('errors.errorWhileSaving').toPromise();
    notify(errorMessage, 'error', 2000);
  }

}
