import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {AuthorizationService} from '../shared/authorization.service';

@Injectable()
export class RestApiInterceptor implements HttpInterceptor {

  constructor(private _authorizationService: AuthorizationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .map((event: HttpEvent<any>) => event)
      .catch((err: any, caught) => {
        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            case 401:
              this._authorizationService.logOut();
              break;
          }
          return Observable.throw(err);
        }
      });
  }
}
