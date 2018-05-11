import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthorizationService} from '../shared/authorization.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthDenyGuard implements CanActivate {

  constructor(private _authorizationService: AuthorizationService,
              private _router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authorizationService.session) {
      setTimeout(async () => {
        await this._router.navigate(['/person']);
      });
      return false;
    }
    return true;
  }
}
