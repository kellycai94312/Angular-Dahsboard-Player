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
import {HtmlContentComponent} from '../../../../components/html-content/html-content/html-content.component';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {AssetsService} from '../../../../data/remote/rest-api/assets.service';

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

  constructor(private _translate: TranslateService,
              private _participantRestApiService: ParticipantRestApiService,
              private _layoutService: LayoutService,
              private _appHelper: AppHelper,
              private _validationService: ValidationService,
              private _ngxModalService: NgxModalService,
              private _assetsService: AssetsService) {
    this.user = new User();
    this._layoutService.dark.next(true);
    this._invalidCredentialsMessageKey = 'registration.invalidCredentials';
  }

  ngOnDestroy(): void {
    this._layoutService.dark.next(false);
  }

  public async onShowUserAgreement() {
    const modal = this._ngxModalService.open({size: 'lg', backdrop: true, centered: true});
    modal.componentInstance.titleKey = 'userAgreement';
    await modal.componentInstance.initializeBody(HtmlContentComponent, async component => {
      const userAgreementHtml = new DOMParser().parseFromString(await this._assetsService.getUserAgreement(), 'text/html');
      component.html = (userAgreementHtml.getElementsByTagName('body')[0] as HTMLElement).innerHTML;
    });
  }

  // tslint:disable:semicolon
  public onSave = async () => {
    if (this.ngxFormComponent.valid()) {
      this.user.locale = Locale[this._translate.getBrowserLang()];
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
