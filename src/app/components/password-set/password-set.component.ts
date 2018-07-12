import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VerificationRequest} from '../../data/remote/model/verification-request';
import {TranslateService} from '@ngx-translate/core';
import {ParticipantRestApiService} from '../../data/remote/rest-api/participant-rest-api.service';
import {EmailRequest} from '../../data/remote/request/email-request';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-password-set',
  templateUrl: './password-set.component.html',
  styleUrls: ['./password-set.component.scss']
})
export class PasswordSetComponent implements OnInit {

  @Input()
  public passwordSetHeader: string;

  @Input()
  public passwordSetBtn: string;

  @Input()
  public setEmail: boolean;

  public isVisibleApplyButton: boolean;
  public errorMessage: string;

  public isChangePassword: boolean;

  public isSuccessPasswordRecoveryRequest: boolean;
  public isSuccessPasswordChangeRequest: boolean;

  public email: string;

  public password: string;
  public repeatPassword: string;

  private code: string;

  constructor(public translate: TranslateService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _participantRestApiService: ParticipantRestApiService) {
    this.isVisibleApplyButton = true;

    this.isChangePassword = false;
    this.isSuccessPasswordRecoveryRequest = false;
    this.isSuccessPasswordChangeRequest = false;
  }

  async ngOnInit() {
    this.code = this._activatedRoute.snapshot.queryParams['code'];
    if (this.code != null) {
      this.isChangePassword = true;
    } else if (this.setEmail) {
      this.isChangePassword = false;
    } else {
      await this._router.navigate(['/login']);
    }
    this.errorMessage = await this.translate.get('password.passwordResetError').toPromise();
  }

  public async onApply(event: any) {
    const result = event.validationGroup.validate();
    if (result.isValid) {
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
      } catch (Error) {
        this.showErrorMessage();
      }
    }
  }

  public passwordComparison = () => {
    return this.password;
  };

  private showErrorMessage(): void {
    notify(this.errorMessage, 'error', 2000);
  }

}
