import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Auth } from '../../data/remote/model/auth';
import { ParticipantRestApiService } from '../../data/remote/rest-api/participant-rest-api.service';
import { Router } from '@angular/router';
import { Session } from '../../data/remote/model/session';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public login: string;
  public password: string;

  constructor(public translate: TranslateService,
              private participantRestApiService: ParticipantRestApiService,
              private router: Router) {
    this.login = 'KirillVorozhbyanov@gmail.com';
    this.password = '11111111';
  }

  ngOnInit() {
  }

  public async onApply(event: any) {
    const result = event.validationGroup.validate();
    if (result.isValid) {
      const auth = new Auth();
      auth.email = this.login;
      auth.password = this.password;

      try {
        const session: Session = await this.participantRestApiService.login(auth);
        if (session != null) {
          this.router.navigate(['/registration/person']);
        } else {
          this.invalidCredentials(event);
        }
      } catch (Error) {
        this.invalidCredentials(event);
      }
    }
  }

  private invalidCredentials(event: any): void {
    this.password = null;
    event.validationGroup.validate();
  }

}
