import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private localStorageService: LocalStorageService,
              private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.localStorageService.getSessionId() != null) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
