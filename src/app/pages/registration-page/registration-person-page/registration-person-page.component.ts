import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import notify from 'devextreme/ui/notify';

import {SexEnum} from '../../../data/remote/misc/sex-enum';
import {Sex} from '../../../data/local/sex';
import {TranslateObjectService} from '../../../shared/translate-object.service';
import {Person} from '../../../data/remote/model/person';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {AuthorizationService} from '../../../shared/authorization.service';

@Component({
  selector: 'app-registration-person-page',
  templateUrl: './registration-person-page.component.html',
  styleUrls: ['./registration-person-page.component.scss']
})
export class RegistrationPersonPageComponent implements OnInit {

  public person: Person;

  public dateMin: Date;
  public dateMax: Date;

  public sexValues: Array<Sex>;
  public selectedSex: Sex;

  constructor(private _translate: TranslateService,
              private _translateObjectService: TranslateObjectService,
              private _participantRestApiService: ParticipantRestApiService,
              private _authorizationService: AuthorizationService,
              private _router: Router) {
    this.sexValues = [];
    this.person = new Person();

    this.dateMin = new Date();
    this.dateMin.setFullYear(this.dateMin.getFullYear() - 125);

    this.dateMax = new Date();
    this.dateMax.setFullYear(this.dateMax.getFullYear() - 3);
  }

  async ngOnInit() {
    const temp = Object.keys(SexEnum).filter(x => !isNaN(Number(SexEnum[x]))).map(x => SexEnum[x]);
    for (let i = 0; i < temp.length; i++) {
      const sex = new Sex();
      sex.name = await this._translateObjectService.getTranslateName('SexEnum', SexEnum[temp[i]].toString());
      sex.sexEnum = temp[i];
      this.sexValues.push(sex);
    }

    this.person.user = await this._participantRestApiService.getUser({id: this._authorizationService.session.userId});
  }

  public async onApply(event: any) {
    const result = event.validationGroup.validate();
    if (result.isValid) {
      try {
        this.person.sex = this.selectedSex.sexEnum;
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

  private async showErrorMessage(): Promise<void> {
    const errorMessage = await this._translate.get('errors.errorWhileSaving').toPromise();
    notify(errorMessage, 'error', 2000);
  }

}
