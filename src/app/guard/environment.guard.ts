import { Injectable, Type } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { EnvironmentType } from '../../environments/environment-type';
import { PersonSignUpComponent } from '../pages/sign-up/person-sign-up/person-sign-up/person-sign-up.component';
import { SignUpComponent } from '../pages/sign-up/sign-up/sign-up.component';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentGuard implements CanActivate {

  private readonly _environmentDeactivationComponents: EnvironmentDeactivationComponent[];

  constructor(private _router: Router) {
    this._environmentDeactivationComponents = [
      {
        environmentTypes: [EnvironmentType.DEMO, EnvironmentType.PRODUCTION],
        deactivationComponents: [SignUpComponent, PersonSignUpComponent]
      }
    ];
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    for (const item of this._environmentDeactivationComponents) {
      if (item.environmentTypes.find(x => x === environment.type) && item.deactivationComponents.find(x => x.name === (next.component as Type<any>).name)) {
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
