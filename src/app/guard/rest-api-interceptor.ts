import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthorizationService} from '../shared/authorization.service';

@Injectable()
export class RestApiInterceptor implements HttpInterceptor {

  constructor(private _authorizationService: AuthorizationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => event),
      catchError((err: any, caught) => {
        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            case 401:
              this._authorizationService.logOut();
              break;
          }
          return throwError(err);
        }
      })
    );
  }
}
