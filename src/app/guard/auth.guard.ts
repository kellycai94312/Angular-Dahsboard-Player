import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthorizationService} from '../shared/authorization.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _authorizationService: AuthorizationService,
              private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authorizationService.session) {
      return true;
    }

    setTimeout(async () => {
      await this._router.navigate(['/sign-in']);
    });
    return false;
  }
}
