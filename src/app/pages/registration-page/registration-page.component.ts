import {Component, OnDestroy} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ParticipantRestApiService} from '../../data/remote/rest-api/participant-rest-api.service';
import {User} from '../../data/remote/model/user';
import {Locale} from '../../data/remote/misc/locale';
import {LayoutService} from '../../layout/shared/layout.service';
import {AppHelper} from '../../utils/app-helper';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnDestroy {

  public user: User;
  public repeatPassword: string;
  public isRegistrationComplete: boolean;

  constructor(public translate: TranslateService,
              private _participantRestApiService: ParticipantRestApiService,
              private _layoutService: LayoutService,
              private _appHelper: AppHelper) {
    this.user = new User();
    this._layoutService.dark.next(true);
  }

  passwordComparison = () => {
    return this.user.password;
  };

  public onSave = async () => {
    this.user.locale = Locale[this.translate.getBrowserLang()];
    await this._appHelper.tryAction(null, 'registration.invalidCredentials', async () => {
      const user = await this._participantRestApiService.createUser(this.user);
      if (user) {
        this.isRegistrationComplete = true;
      } else {
        throw new Error();
      }
    });
  };

  ngOnDestroy(): void {
    this._layoutService.dark.next(false);
  }

}
