import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthorizationService} from '../shared/authorization.service';
import {AppHelper} from '../utils/app-helper';

@Injectable()
export class RestApiInterceptor implements HttpInterceptor {

  constructor(private _authorizationService: AuthorizationService,
              private _appHelper: AppHelper) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => event),
      catchError(value => {
        if (value instanceof HttpErrorResponse) {
          switch (value.status) {
            case 401:
              this._authorizationService.logOut();
              break;
          }
          let message = value.message;
          if (value.error) {
            const errors: string[] = value.error.errors;
            if (errors && Array.isArray(errors)) {
              message = errors.join('\n');
            }
          }

          this._appHelper.showErrorMessage(message);
          return throwError(value);
        }
      })
    );
  }
}
