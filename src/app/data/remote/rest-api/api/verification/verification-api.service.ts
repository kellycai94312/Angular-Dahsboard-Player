import { Injectable } from '@angular/core';
import { VerificationRequest } from 'app/data/remote/model/verification-request';
import { ApiService } from 'app/data/remote/rest-api/api';
import { Observable } from 'rxjs';
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

}
