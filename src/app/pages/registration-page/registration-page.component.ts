import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
  public isErrors: boolean;

  constructor(public translate: TranslateService,
              private participantRestApiService: ParticipantRestApiService) {
    this.user = new User();
    this.isRegistrationComplete = false;
    this.isErrors = false;
  }

  ngOnInit() {
  }

  passwordComparison = () => {
    return this.user.password;
  };

  public async onApply(event: any) {
    const result = event.validationGroup.validate();
    this.isErrors = false;

    if (result.isValid) {
      this.user.locale = Locale[this.translate.getBrowserLang()];
      try {
        const savedUser = await this.participantRestApiService.createUser(this.user);
        if (savedUser != null) {
          this.isRegistrationComplete = true;
        }
      }
      catch (Error) {
        this.isErrors = true;
      }
      this.user.password = null;
      this.repeatPassword = null;
    }
  }

}
