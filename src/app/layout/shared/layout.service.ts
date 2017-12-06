import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class LayoutService implements CanActivate {

  private hidden: Subject<boolean>;
  private hiddenRoutes: string[] = ['login', 'registration', 'password', 'not-found'];

  constructor() {
    this.hidden = <Subject<boolean>>new Subject();
  }

  get displayLayout(): Observable<boolean> {
    return this.hidden.asObservable();
  }

  toggleLayout(urlPath: string) {
    this.hidden.next(this.hiddenRoutes.indexOf(urlPath) > -1);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    this.toggleLayout(route.url[0].path);
    return Observable.of(true);
  }

}
