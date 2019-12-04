import { Injectable } from '@angular/core';
import { BooleanWrapper } from 'app/data/remote/bean/wrapper/boolean-wrapper';
import { VerificationRequest } from 'app/data/remote/model/verification-request';
import { ApiService } from 'app/data/remote/rest-api/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerificationApiService {

  private readonly _basePath = `${environment.restUrl}/verification`;

  constructor(private _apiService: ApiService) {
  }

  public verifyEmailCode(value: VerificationRequest): Observable<void> {
    return this._apiService.createValue(void 0, this._basePath, value) as Observable<void>;
  }

  public isUserEnabled(value: VerificationRequest): Observable<boolean> {
    return this._apiService.createValue(BooleanWrapper, `${this._basePath}/enabled`, value).pipe(map(x => (x as BooleanWrapper).value as boolean));
  }

}
