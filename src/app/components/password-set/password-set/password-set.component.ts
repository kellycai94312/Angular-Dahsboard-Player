import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VerificationRequest} from '../../../data/remote/model/verification-request';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {EmailRequest} from '../../../data/remote/request/email-request';
import {AppHelper} from '../../../utils/app-helper';
import {LayoutService} from '../../../shared/layout.service';
import {ValidationService} from '../../../service/validation/validation.service';
import {FormGroup, Validators} from '@angular/forms';
import {NgxInput} from '../../../module/ngx/ngx-input/model/ngx-input';
import {NgxInputType} from '../../../module/ngx/ngx-input/model/ngx-input-type';
import {distinctUntilChanged, takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-password-set',
  templateUrl: './password-set.component.html',
  styleUrls: ['./password-set.component.scss']
})
export class PasswordSetComponent implements OnInit, OnDestroy {

  @Input()
  public passwordSetHeader: string;

  @Input()
  public passwordSetBtn: string;

  @Input()
  public setEmail: boolean;

  public readonly emailNgxInput = new NgxInput();
  public readonly newPasswordNgxInput = new NgxInput();
  public readonly repeatPasswordNgxInput = new NgxInput();
  public readonly formGroup = new FormGroup({});
  public isVisibleApplyButton = true;
  public isChangePassword: boolean;
  public isSuccessPasswordRecoveryRequest: boolean;
  public isSuccessPasswordChangeRequest: boolean;
  private _notDestroyed = true;
  private _code: string;

  constructor(private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _participantRestApiService: ParticipantRestApiService,
              private _layoutService: LayoutService,
              private _validationService: ValidationService,
              private _appHelper: AppHelper) {
    this._layoutService.dark.next(true);
  }

  public async ngOnInit(): Promise<void> {
    this._code = this._activatedRoute.snapshot.queryParams['code'];
    if (this._code) {
      this.isChangePassword = true;

      this.newPasswordNgxInput.labelTranslation = 'createPassword';
      this.newPasswordNgxInput.type = NgxInputType.PASSWORD;
      this.newPasswordNgxInput.appearance = 'outline';
      this.newPasswordNgxInput.control.setValidators([Validators.required, ValidationService.passwordValidator, ValidationService.compareValidator(this.repeatPasswordNgxInput.control)]);

      this.repeatPasswordNgxInput.labelTranslation = 'retypePassword';
      this.repeatPasswordNgxInput.type = NgxInputType.PASSWORD;
      this.repeatPasswordNgxInput.appearance = 'outline';
      this.repeatPasswordNgxInput.control.setValidators([Validators.required, ValidationService.compareValidator(this.newPasswordNgxInput.control)]);

      this.newPasswordNgxInput.control.statusChanges
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
          this.newPasswordNgxInput.control.updateValueAndValidity();
        });

      this.formGroup.setControl('newPassword', this.newPasswordNgxInput.control);
      this.formGroup.setControl('repeatPassword', this.repeatPasswordNgxInput.control);
    } else if (this.setEmail) {
      this.isChangePassword = false;
      this.emailNgxInput.labelTranslation = 'enterEmail';
      this.emailNgxInput.type = NgxInputType.EMAIL;
      this.emailNgxInput.appearance = 'outline';
      this.emailNgxInput.control.setValidators([Validators.required, ValidationService.emailValidator]);

      this.formGroup.setControl('email', this.emailNgxInput.control);
    } else {
      await this._router.navigate(['/sign-in']);
    }
  }

  public ngOnDestroy(): void {
    this._notDestroyed = false;
    this._layoutService.dark.next(false);
  }

  public async onApply(): Promise<void> {
    if (this.formGroup.invalid) {
      return;
    }

    await this._appHelper.tryAction('', 'password.passwordResetError', async () => {
      if (!this.isChangePassword) {
        const emailRequest = new EmailRequest();
        emailRequest.email = this.emailNgxInput.control.value;
        await this._participantRestApiService.resetPassword(emailRequest);

        this.isSuccessPasswordRecoveryRequest = true;
      } else {
        const verificationRequest = new VerificationRequest();
        verificationRequest.code = this._code;
        verificationRequest.password = this.newPasswordNgxInput.control.value;
        await this._participantRestApiService.verification(verificationRequest);
        this.isSuccessPasswordChangeRequest = true;
      }
      this.isVisibleApplyButton = false;
    });
  };

}
