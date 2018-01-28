import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';

@Injectable()
export class RestApiInterceptor implements HttpInterceptor {

  constructor(private _router: Router,
              private _injector: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .map((event: HttpEvent<any>) => event)
      .catch((err: any, caught) => {
        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            /*case 403:
              this._injector.get(LocalStorageService).signOut();
              this._injector.get(LayoutService).toggleLayout('login');
              this._router.navigate(['login']);
              return Observable.empty();*/
            /*case 404:
              this._injector.get(LayoutService).toggleLayout('not-found');
              return Observable.empty();*/
          }
          return Observable.throw(err);
        }
      });
  }
}
