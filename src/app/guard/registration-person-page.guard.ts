import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthorizationService} from '../shared/authorization.service';

@Injectable()
export class RegistrationPersonPageGuard implements CanActivate {

  constructor(private _authorizationService: AuthorizationService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authorizationService.session && !this._authorizationService.session.person) {
      return true;
    }
    return false;
  }

}
