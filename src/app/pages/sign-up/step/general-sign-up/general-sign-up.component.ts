import {Component, OnDestroy, ViewChild} from '@angular/core';
import {User} from '../../../../data/remote/model/user';
import {TranslateService} from '@ngx-translate/core';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {LayoutService} from '../../../../layout/shared/layout.service';
import {AppHelper} from '../../../../utils/app-helper';
import {Locale} from '../../../../data/remote/misc/locale';
import {NgxInputType} from '../../../../components/ngx-input/model/ngx-input-type';
import {ValidationService} from '../../../../service/validation/validation.service';
import {ClientError} from '../../../../data/local/error/client-error';
import {NgxFormComponent} from '../../../../components/ngx-form/ngx-form/ngx-form.component';

@Component({
  selector: 'app-general-sign-up',
  templateUrl: './general-sign-up.component.html',
  styleUrls: ['./general-sign-up.component.scss']
})
export class GeneralSignUpComponent implements OnDestroy {

  public readonly ngxInputTypeClass = NgxInputType;

  @ViewChild(NgxFormComponent)
  public ngxFormComponent: NgxFormComponent;

  public readonly user: User;
  public repeatPassword: string;
  public isRegistrationComplete: boolean;

  private readonly _invalidCredentialsMessageKey: string;

  constructor(public translate: TranslateService,
              private _participantRestApiService: ParticipantRestApiService,
              private _layoutService: LayoutService,
              private _appHelper: AppHelper,
              private _validationService: ValidationService) {
    this.user = new User();
    this._layoutService.dark.next(true);
    this._invalidCredentialsMessageKey = 'registration.invalidCredentials';
  }

  ngOnDestroy(): void {
    this._layoutService.dark.next(false);
  }

  // tslint:disable:semicolon
  public onSave = async () => {
    if (this.ngxFormComponent.valid()) {
      this.user.locale = Locale[this.translate.getBrowserLang()];
      await this._appHelper.tryAction(null, this._invalidCredentialsMessageKey, async () => {
        const user = await this._participantRestApiService.createUser(this.user);
        if (user) {
          this.isRegistrationComplete = true;
        } else {
          throw new ClientError(this._invalidCredentialsMessageKey);
        }
      });
    } else {
      await this._appHelper.showErrorMessage(this._invalidCredentialsMessageKey);
    }
  };

  public onEmailValidation = async (val: string): Promise<string[]> => {
    return [await this._validationService.emailValidation(val)];
  };

  public onPasswordValidation = async (val: string): Promise<string[]> => {
    return [await this._validationService.passwordValidation(val)];
  };

  public onCompareValidation = async (val: string): Promise<string[]> => {
    return [await this._validationService.compareValidation(this.user.password, val)];
  };
  // tslint:enable:semicolon

}
