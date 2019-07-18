import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {EnvironmentType} from '../../../../environments/environment-type';
import {IEnvironment} from '../../../../environments/ienvironment';
import {AuthorizationService} from '../../../shared/authorization.service';
import {AppHelper} from '../../../utils/app-helper';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {LayoutService} from '../../../shared/layout.service';
import {ValidationService} from '../../../service/validation/validation.service';
import {environment} from '../../../../environments/environment';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {NgxInput} from '../../../module/ngx/ngx-input/model/ngx-input';
import {FormGroup, Validators} from '@angular/forms';
import {NgxInputType} from '../../../module/ngx/ngx-input/model/ngx-input-type';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit, OnDestroy {

  public readonly environmentTypeClass = EnvironmentType;
  public readonly environment: IEnvironment = environment;
  public readonly emailNgxInput = new NgxInput();
  public readonly passwordNgxInput = new NgxInput();
  public readonly formGroup = new FormGroup({}, {updateOn: 'change'});
  private _notDestroyed = true;

  constructor(private _authorizationService: AuthorizationService,
              private _appHelper: AppHelper,
              private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _layoutService: LayoutService,
              private _validationService: ValidationService,
              private _participantRestApiService: ParticipantRestApiService) {
    this._layoutService.dark.next(true);
  }

  public ngOnInit(): void {
    this._activatedRoute.queryParams
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(async (val: Params) => {
        const code = val['code'];
        if (code) {
          await this._appHelper.tryAction('registrationVerification.yourAccountHasBeenSuccessfullyActivated', 'registrationVerification.errorActivatingAccount', async () => {
            await this._participantRestApiService.verification({code: code});
          });
        }
      });

    this.emailNgxInput.labelTranslation = 'enterEmailOrPhoneNumber';
    this.emailNgxInput.appearance = 'outline';
    this.emailNgxInput.control.setValidators(Validators.required);

    this.passwordNgxInput.labelTranslation = 'enterPassword';
    this.passwordNgxInput.type = NgxInputType.PASSWORD;
    this.passwordNgxInput.appearance = 'outline';
    this.passwordNgxInput.control.setValidators(Validators.required);

    this.formGroup.setControl('email', this.emailNgxInput.control);
    this.formGroup.setControl('password', this.passwordNgxInput.control);
  }

  public ngOnDestroy(): void {
    this._notDestroyed = false;
    this._layoutService.dark.next(false);
  }

  public async onSignIn(): Promise<void> {
    if (this.formGroup.invalid) {
      return;
    }
    await this._appHelper.tryLoad(async () => {
      const session = await this._authorizationService.logIn({email: this.emailNgxInput.control.value, password: this.passwordNgxInput.control.value});
      if (session) {
        if (session.person) {
          await this._router.navigate(['/dashboard']);
        } else {
          await this._router.navigate(['/sign-up/person']);
        }
      } else {
        await this._showWrongLoginOrPasswordMessage();
      }
    });
  }

  private async _showWrongLoginOrPasswordMessage(): Promise<void> {
    await this._appHelper.showErrorMessage('wrongLoginOrPassword');
  }

}
