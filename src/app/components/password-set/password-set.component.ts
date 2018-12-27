import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VerificationRequest} from '../../data/remote/model/verification-request';
import {ParticipantRestApiService} from '../../data/remote/rest-api/participant-rest-api.service';
import {EmailRequest} from '../../data/remote/request/email-request';
import {AppHelper} from '../../utils/app-helper';
import {LayoutService} from '../../shared/layout.service';

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

  public isVisibleApplyButton: boolean;
  public isChangePassword: boolean;

  public isSuccessPasswordRecoveryRequest: boolean;
  public isSuccessPasswordChangeRequest: boolean;

  public email: string;

  public password: string;
  public repeatPassword: string;

  private code: string;

  constructor(private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _participantRestApiService: ParticipantRestApiService,
              private _layoutService: LayoutService,
              private _appHelper: AppHelper) {
    this.isVisibleApplyButton = true;
    this.isChangePassword = false;
    this.isSuccessPasswordRecoveryRequest = false;
    this.isSuccessPasswordChangeRequest = false;

    this._layoutService.dark.next(true);
  }

  async ngOnInit() {
    this.code = this._activatedRoute.snapshot.queryParams['code'];
    if (this.code != null) {
      this.isChangePassword = true;
    } else if (this.setEmail) {
      this.isChangePassword = false;
    } else {
      await this._router.navigate(['/sign-in']);
    }
  }

  ngOnDestroy(): void {
    this._layoutService.dark.next(false);
  }

  public onApply = async () => {
    try {
      if (!this.isChangePassword) {
        const emailRequest = new EmailRequest();
        emailRequest.email = this.email;
        await this._participantRestApiService.resetPassword(emailRequest);

        this.isSuccessPasswordRecoveryRequest = true;
      } else {
        const verificationRequest = new VerificationRequest();
        verificationRequest.code = this.code;
        verificationRequest.password = this.password;
        await this._participantRestApiService.verification(verificationRequest);
        this.isSuccessPasswordChangeRequest = true;
      }
      this.isVisibleApplyButton = false;
    } catch (e) {
      await this._appHelper.showErrorMessage('password.passwordResetError');
    }
  };

  public passwordComparison = () => {
    return this.password;
  };

}
