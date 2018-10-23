import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {SexEnum} from '../../../data/remote/misc/sex-enum';
import {TranslateObjectService} from '../../../shared/translate-object.service';
import {Person} from '../../../data/remote/model/person';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {AuthorizationService} from '../../../shared/authorization.service';
import {PersonContant} from '../../../data/local/person-contant';
import {NameWrapper} from '../../../data/local/name-wrapper';
import {AppHelper} from '../../../utils/app-helper';
import {PropertyConstant} from '../../../data/local/property-constant';

@Component({
  selector: 'app-registration-person-page',
  templateUrl: './registration-person-page.component.html',
  styleUrls: ['./registration-person-page.component.scss']
})
export class RegistrationPersonPageComponent implements OnInit {
  public readonly propertyConstantClass = PropertyConstant;
  public readonly dateMin: Date;
  public readonly dateMax: Date;
  public person: Person;
  public sexEnums: NameWrapper<SexEnum>[];

  constructor(private _translate: TranslateService,
              private _translateObjectService: TranslateObjectService,
              private _participantRestApiService: ParticipantRestApiService,
              private _authorizationService: AuthorizationService,
              private _router: Router,
              private _appHelper: AppHelper) {
    this.person = new Person();
    this.dateMin = PersonContant.getBirthDateMin();
    this.dateMax = PersonContant.getBirthDateMax();
  }

  async ngOnInit() {
    this.sexEnums = await this._translateObjectService.getTranslatedEnumCollection<SexEnum>(SexEnum, 'SexEnum');
    this.person.user = await this._participantRestApiService.getUser({id: this._authorizationService.session.user.id});
  }

  public onApply = async () => {
    await this._appHelper.trySave(async () => {
      this.person = await this._participantRestApiService.createPerson(this.person);
      await this._authorizationService.updateSession();
      await this._router.navigate(['/person', this.person.id]);
    });
  };

  public disabledApplyButton = (): boolean => {
    if (this.person.firstName && this.person.lastName && this.person.birthDate && this.person.sex) {
      return false;
    }
    return true;
  };

  public onSexChanged(val: NameWrapper<SexEnum>) {
    this.person.sex = val.data;
  }

  public onBirthDateChanged(val: Date) {
    this.person.birthDate = this._appHelper.dateByFormat(val, PropertyConstant.dateTimeServerFormat);
  }

}
