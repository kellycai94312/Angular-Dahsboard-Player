import { Injectable } from '@angular/core';
import { ClaimState } from 'app/data/remote/model/claim-state';
import { ApiService } from 'app/data/remote/rest-api/api';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClaimStateApiService {

  private readonly _basePath = `${environment.restUrl}/claimState`;

  constructor(private _apiService: ApiService) {
  }

  public getClaimStates(): Observable<ClaimState[]> {
    return this._apiService.getValues(ClaimState, this._basePath);
  }

}
