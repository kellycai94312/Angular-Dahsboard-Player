import { Injectable } from '@angular/core';
import { BaseRank, RankType } from 'app/data/remote/model/rank';
import { ApiService } from 'app/data/remote/rest-api/api';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RankApiService {

  private readonly _basePath = `${environment.restUrl}/rank`;

  constructor(private _apiService: ApiService) {
  }

  public getRanks(query?: { name?: string, rankType?: RankType }): Observable<BaseRank[]> {
    return this._apiService.getValues(BaseRank, this._basePath, query);
  }

}
