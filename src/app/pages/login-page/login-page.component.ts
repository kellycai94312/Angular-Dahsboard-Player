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

  public auth: Auth;

  constructor(public translate: TranslateService,
              private participantRestApiService: ParticipantRestApiService,
              private router: Router) {
    this.auth = new Auth();
  }

  ngOnInit() {
  }

  public async onApply(event: any) {
    const result = event.validationGroup.validate();
    if (result.isValid) {
      try {
        const session: Session = await this.participantRestApiService.login(this.auth);
        if (session != null) {
          console.log(session.personId);
          if (session.personId != null) {
            this.router.navigate(['/person', session.personId]);
          } else {
            this.router.navigate(['/registration/person']);
          }
        } else {
          this.invalidCredentials(event);
        }
      } catch (Error) {
        this.invalidCredentials(event);
      }
    }
  }

  private invalidCredentials(event: any): void {
    this.auth.password = null;
    event.validationGroup.validate();
  }

}
