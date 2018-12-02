import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Type} from '@angular/core/src/type';
import {EnvironmentType} from '../../environments/environment-type';
import {environment} from '../../environments/environment';
import {GeneralSignUpComponent} from '../pages/sign-up/step/general-sign-up/general-sign-up.component';
import {PersonSignUpComponent} from '../pages/sign-up/step/person-sign-up/person-sign-up.component';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentGuard implements CanActivate {

  private readonly _environmentDeactivationComponents: EnvironmentDeactivationComponent[];

  constructor(private _router: Router) {
    this._environmentDeactivationComponents = [
      {
        environmentTypes: [EnvironmentType.PRODUCTION],
        deactivationComponents: [GeneralSignUpComponent, PersonSignUpComponent]
      }
    ];
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    for (const item of this._environmentDeactivationComponents) {
      if (item.environmentTypes.find(x => x === environment.type) && item.deactivationComponents.find(x => x.name === (<Type<any>>next.component).name)) {
        setTimeout(async () => {
          await this._router.navigate(['/']);
        });
        return false;
      }
    }
    return true;
  }

}

class EnvironmentDeactivationComponent {
  public environmentTypes: EnvironmentType[];
  public deactivationComponents: Type<any>[];
}
