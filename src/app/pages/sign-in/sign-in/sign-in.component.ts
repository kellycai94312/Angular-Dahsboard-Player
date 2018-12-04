import {Component, OnDestroy, ViewChild} from '@angular/core';
import {NgxFormComponent} from '../../../components/ngx-form/ngx-form/ngx-form.component';
import {EnvironmentType} from '../../../../environments/environment-type';
import {Auth} from '../../../data/remote/model/auth';
import {IEnvironment} from '../../../../environments/ienvironment';
import {AuthorizationService} from '../../../shared/authorization.service';
import {ProfileService} from '../../../shared/profile.service';
import {AppHelper} from '../../../utils/app-helper';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {LayoutService} from '../../../layout/shared/layout.service';
import {ValidationService} from '../../../service/validation/validation.service';
import {environment} from '../../../../environments/environment';
import {NgxInputType} from '../../../components/ngx-input/model/ngx-input-type';
import {ISubscription} from 'rxjs-compat/Subscription';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnDestroy {

  public readonly ngxInputTypeClass = NgxInputType;
  public readonly environmentTypeClass = EnvironmentType;

  @ViewChild(NgxFormComponent)
  public ngxFormComponent: NgxFormComponent;

  public auth: Auth;
  public environment: IEnvironment;
  private readonly _queryParamsSubscription: ISubscription;

  constructor(private _authorizationService: AuthorizationService,
              private _profileService: ProfileService,
              private _appHelper: AppHelper,
              private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _layoutService: LayoutService,
              private _validationService: ValidationService,
              private _participantRestApiService: ParticipantRestApiService) {
    this.auth = new Auth();
    this.environment = environment;
    this._layoutService.dark.next(true);
    this._queryParamsSubscription = this._activatedRoute.queryParams.subscribe(async (val: Params) => {
      const code = val['code'];
      if (code) {
        await this._appHelper.tryAction('registrationVerification.yourAccountHasBeenSuccessfullyActivated', 'registrationVerification.errorActivatingAccount', async () => {
          await this._participantRestApiService.verification({code: code});
        });
      }
    });
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._queryParamsSubscription);
    this._layoutService.dark.next(false);
  }

  // tslint:disable:semicolon
  public signIn = async () => {
    if (this.ngxFormComponent.valid()) {
      await this._appHelper.tryLoad(async () => {
        const session = await this._authorizationService.logIn(this.auth);
        if (session) {
          if (session.person) {
            this._profileService.init();
            await this._router.navigate(['/person', session.person.id]);
          } else {
            await this._router.navigate(['/sign-up/person']);
          }
        } else {
          await this.showWrongLoginOrPasswordMessage();
        }
      });
    } else {
      await this.showWrongLoginOrPasswordMessage();
    }
  };

  public onRequiredValidation = async (val: string): Promise<string[]> => {
    return [await this._validationService.requiredValidation(val)];
  };

  public onPasswordValidation = async (val: string): Promise<string[]> => {
    return [await this._validationService.passwordValidation(val)];
  };

  private async showWrongLoginOrPasswordMessage() {
    await this._appHelper.showErrorMessage('wrongLoginOrPassword');
  }

}
