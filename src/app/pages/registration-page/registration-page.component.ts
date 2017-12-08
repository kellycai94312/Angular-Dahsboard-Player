import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import notify from 'devextreme/ui/notify';
import { ParticipantRestApiService } from '../../data/remote/rest-api/participant-rest-api.service';
import { User } from '../../data/remote/model/user';
import { Locale } from '../../data/remote/misc/locale';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {

  public user: User;
  public repeatPassword: string;
  public isRegistrationComplete: boolean;
  private errorMessage: string;

  constructor(public translate: TranslateService,
              private participantRestApiService: ParticipantRestApiService) {
    this.user = new User();
    this.isRegistrationComplete = false;
  }

  async ngOnInit() {
    this.errorMessage = await this.translate.get('registration.invalidCredentials').toPromise();
  }

  passwordComparison = () => {
    return this.user.password;
  };

  public async onApply(event: any) {
    const result = event.validationGroup.validate();
    if (result.isValid) {
      this.user.locale = Locale[this.translate.getBrowserLang()];
      try {
        const savedUser = await this.participantRestApiService.createUser(this.user);
        if (savedUser != null) {
          this.isRegistrationComplete = true;
        } else {
          this.showErrorMessage();
        }
      } catch (Error) {
        this.showErrorMessage();
      }
      this.repeatPassword = null;
    }
  }

  private showErrorMessage(): void {
    notify(this.errorMessage, 'error', 2000);
  }

}
