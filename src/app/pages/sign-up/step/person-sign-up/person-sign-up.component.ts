import {Component, OnDestroy, OnInit} from '@angular/core';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {Person} from '../../../../data/remote/model/person';
import {NameWrapper} from '../../../../data/local/name-wrapper';
import {SexEnum} from '../../../../data/remote/misc/sex-enum';
import {TranslateService} from '@ngx-translate/core';
import {TranslateObjectService} from '../../../../shared/translate-object.service';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AuthorizationService} from '../../../../shared/authorization.service';
import {Router} from '@angular/router';
import {AppHelper} from '../../../../utils/app-helper';
import {PersonContant} from '../../../../data/local/person-contant';
import {ValidationService} from '../../../../service/validation/validation.service';
import {NgxInputType} from '../../../../components/ngx-input/model/ngx-input-type';
import {LayoutService} from '../../../../layout/shared/layout.service';

@Component({
  selector: 'app-person-sign-up',
  templateUrl: './person-sign-up.component.html',
  styleUrls: ['./person-sign-up.component.scss']
})
export class PersonSignUpComponent implements OnInit, OnDestroy {

  public readonly propertyConstantClass = PropertyConstant;
  public readonly ngxInputTypeClass = NgxInputType;
  public readonly dateMin: Date;
  public readonly dateMax: Date;
  public person: Person;
  public sexEnums: NameWrapper<SexEnum>[];

  constructor(private _translate: TranslateService,
              private _translateObjectService: TranslateObjectService,
              private _participantRestApiService: ParticipantRestApiService,
              private _authorizationService: AuthorizationService,
              private _router: Router,
              private _appHelper: AppHelper,
              private _layoutService: LayoutService,
              private _validationService: ValidationService) {
    this.person = new Person();
    this.dateMin = PersonContant.getBirthDateMin();
    this.dateMax = PersonContant.getBirthDateMax();
    this._layoutService.dark.next(true);
  }

  async ngOnInit() {
    this.sexEnums = await this._translateObjectService.getTranslatedEnumCollection<SexEnum>(SexEnum, 'SexEnum');
    this.person.user = await this._participantRestApiService.getUser({id: this._authorizationService.session.user.id});
  }

  ngOnDestroy(): void {
    this._layoutService.dark.next(false);
  }

  public onApply = async () => {
    await this._appHelper.trySave(async () => {
      this.person = await this._participantRestApiService.createPerson(this.person);
      await this._authorizationService.updateSession();
      await this._router.navigate(['/dashboard']);
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

  public onRequiredValidation = async (val: string): Promise<string[]> => {
    return [await this._validationService.requiredValidation(val)];
  };

}
