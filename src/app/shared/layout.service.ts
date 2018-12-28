import {Observable, of, Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class LayoutService implements CanActivate {

  public readonly hidden: Subject<boolean>;
  public readonly dark: Subject<boolean>;

  private hiddenRoutes: string[] = ['sign-in', 'registration', 'password', 'not-found'];

  constructor() {
    this.hidden = new Subject<boolean>();
    this.dark = new Subject<boolean>();
  }

  toggleLayout(urlPath: string) {
    this.hidden.next(this.hiddenRoutes.indexOf(urlPath) > -1);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    this.toggleLayout(route.url[0].path);
    return of(true);
  }

}
