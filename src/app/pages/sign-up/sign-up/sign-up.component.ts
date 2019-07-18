import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {NgxInputType} from '../../../module/ngx/ngx-input/model/ngx-input-type';
import {NgxInput} from '../../../module/ngx/ngx-input/model/ngx-input';
import {ValidationService} from '../../../service/validation/validation.service';
import {Locale} from '../../../data/remote/misc/locale';
import {ClientError} from '../../../data/local/error/client-error';
import {TranslateService} from '@ngx-translate/core';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {LayoutService} from '../../../shared/layout.service';
import {AppHelper} from '../../../utils/app-helper';
import {NgxModalService} from '../../../components/ngx-modal/service/ngx-modal.service';
import {AssetsService} from '../../../data/remote/rest-api/assets.service';
import {User} from '../../../data/remote/model/user';
import {HtmlContentComponent} from '../../../components/html-content/html-content/html-content.component';
import {distinctUntilChanged, takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit, OnDestroy {

  public readonly emailNgxInput = new NgxInput();
  public readonly passwordNgxInput = new NgxInput();
  public readonly repeatPasswordNgxInput = new NgxInput();
  public readonly formGroup = new FormGroup({}, {updateOn: 'change'});
  public isRegistrationComplete: boolean;
  public titleTranslation = 'newUserSignUp';
  private readonly _invalidCredentialsTranslation = 'invalidCredentials';
  private _notDestroyed = true;

  constructor(private _translate: TranslateService,
              private _participantRestApiService: ParticipantRestApiService,
              private _layoutService: LayoutService,
              private _appHelper: AppHelper,
              private _ngxModalService: NgxModalService,
              private _changeDetectorRef: ChangeDetectorRef,
              private _assetsService: AssetsService) {
    this._layoutService.dark.next(true);
  }

  public ngOnInit() {
    this.emailNgxInput.labelTranslation = 'enterEmail';
    this.emailNgxInput.type = NgxInputType.EMAIL;
    this.emailNgxInput.appearance = 'outline';
    this.emailNgxInput.control.setValidators([Validators.required, ValidationService.emailValidator]);

    this.passwordNgxInput.labelTranslation = 'createPassword';
    this.passwordNgxInput.type = NgxInputType.PASSWORD;
    this.passwordNgxInput.appearance = 'outline';
    this.passwordNgxInput.control.setValidators([Validators.required, ValidationService.passwordValidator, ValidationService.compareValidator(this.repeatPasswordNgxInput.control)]);

    this.repeatPasswordNgxInput.labelTranslation = 'retypePassword';
    this.repeatPasswordNgxInput.type = NgxInputType.PASSWORD;
    this.repeatPasswordNgxInput.appearance = 'outline';
    this.repeatPasswordNgxInput.control.setValidators([Validators.required, ValidationService.compareValidator(this.passwordNgxInput.control)]);

    this.formGroup.setControl('email', this.emailNgxInput.control);
    this.formGroup.setControl('password', this.passwordNgxInput.control);
    this.formGroup.setControl('repeatPassword', this.repeatPasswordNgxInput.control);

    this.passwordNgxInput.control.statusChanges
      .pipe(
        takeWhile(() => this._notDestroyed),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.repeatPasswordNgxInput.control.updateValueAndValidity();
      });

    this.repeatPasswordNgxInput.control.statusChanges
      .pipe(
        takeWhile(() => this._notDestroyed),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.passwordNgxInput.control.updateValueAndValidity();
      });
  }

  public ngOnDestroy(): void {
    this._notDestroyed = false;
    this._layoutService.dark.next(false);
  }

  public async onSignUp(): Promise<void> {
    if (this.formGroup.invalid) {
      return;
    }
    let user = new User();
    user.locale = Locale[this._translate.getBrowserLang()];
    user.email = this.emailNgxInput.control.value;
    user.password = this.passwordNgxInput.control.value;
    await this._appHelper.tryAction(null, this._invalidCredentialsTranslation, async () => {
      user = await this._participantRestApiService.createUser(user);
      if (user) {
        this.titleTranslation = 'registration.yourAccountHasBeenCreatedNowYouNeedToActivateIt';
        this.isRegistrationComplete = true;
        this._changeDetectorRef.markForCheck();
      } else {
        throw new ClientError(this._invalidCredentialsTranslation);
      }
    });
  }

  public async onShowUserAgreement(): Promise<void> {
    const modal = this._ngxModalService.open({size: 'lg', backdrop: true, centered: true});
    modal.componentInstance.titleKey = 'userAgreement';
    await modal.componentInstance.initializeBody(HtmlContentComponent, async component => {
      const userAgreementHtml = new DOMParser().parseFromString(await this._assetsService.getUserAgreement(), 'text/html');
      component.html = (userAgreementHtml.getElementsByTagName('body')[0] as HTMLElement).innerHTML;
    });
  }

}
