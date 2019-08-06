import {Injectable} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ApiService} from '../base/api.service';
import {Observable} from 'rxjs';
import {PositionQuery} from './model/position-query';
import {Position} from '../../../model/person-position/position';
import {PageContainer} from '../../../bean/page-container';

@Injectable({
  providedIn: 'root'
})
export class PositionApiService {

  private readonly _basePath = `${environment.restUrl}/position`;

  constructor(private _apiService: ApiService) {
  }

  public getPositions(query: PositionQuery): Observable<PageContainer<Position>> {
    return this._apiService.getPageContainer(Position, this._basePath, query);
  }

}
