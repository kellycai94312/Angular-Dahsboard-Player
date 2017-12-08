import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { ParticipantRestApiService } from '../../../data/remote/rest-api/participant-rest-api.service';
import { VerificationRequest } from '../../../data/remote/model/verification-request';

@Component({
  selector: 'app-registration-verification-page',
  templateUrl: './registration-verification-page.component.html',
  styleUrls: ['./registration-verification-page.component.scss']
})
export class RegistrationVerificationPageComponent implements OnInit {
  public isBusy: boolean;

  public message: string;

  constructor(private translateService: TranslateService,
              private activatedRoute: ActivatedRoute,
              private participantRestApiService: ParticipantRestApiService) {
    this.isBusy = true;
  }

  async ngOnInit() {
    const code = this.activatedRoute.snapshot.queryParams['code'];
    if (code != null) {
      const verificationRequest = new VerificationRequest();
      verificationRequest.code = code;
      try {
        await this.participantRestApiService.verification(verificationRequest);
        await this.setMessageStatus(true);
      } catch (Error) {
        await this.setMessageStatus(false);
      }
    } else {
      await this.setMessageStatus(false);
    }

    this.isBusy = false;
  }

  private async setMessageStatus(isSuccess: boolean) {
    if (isSuccess) {
      this.message = await this.translateService.get('registrationVerification.yourAccountHasBeenSuccessfullyActivated').toPromise();
    } else {
      this.message = await this.translateService.get('registrationVerification.errorActivatingAccount').toPromise();
    }
  }

}
