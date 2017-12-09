import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { ParticipantRestApiService } from '../../../data/remote/rest-api/participant-rest-api.service';
import { EmailRequest } from '../../../data/remote/request/email-request';
import { VerificationRequest } from '../../../data/remote/model/verification-request';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-password-reset-page',
  templateUrl: './password-reset-page.component.html',
  styleUrls: ['./password-reset-page.component.scss']
})
export class PasswordResetPageComponent implements OnInit {

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
              private activatedRoute: ActivatedRoute,
              private participantRestApiService: ParticipantRestApiService) {
    this.isVisibleApplyButton = true;

    this.isChangePassword = false;
    this.isSuccessPasswordRecoveryRequest = false;
    this.isSuccessPasswordChangeRequest = false;
  }

  async ngOnInit() {
    this.code = this.activatedRoute.snapshot.queryParams['code'];
    if (this.code != null) {
      this.isChangePassword = true;
    } else {
      this.isChangePassword = false;
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
          await this.participantRestApiService.resetPassword(emailRequest);

          this.isSuccessPasswordRecoveryRequest = true;
        } else {
          const verificationRequest = new VerificationRequest();
          verificationRequest.code = this.code;
          verificationRequest.password = this.password;
          await this.participantRestApiService.verification(verificationRequest);
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
