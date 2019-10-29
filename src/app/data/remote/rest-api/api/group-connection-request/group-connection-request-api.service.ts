import { Injectable } from '@angular/core';
import {
  BaseGroupConnectionRequest,
  GroupCluster,
  GroupConnection,
  GroupConnectionRequest
} from 'app/data/remote/model/group/connection';
import { IdRequest } from 'app/data/remote/request/id-request';
import { ApiService } from 'app/data/remote/rest-api/api';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupConnectionRequestApiService {

  private readonly _basePath = `${environment.restUrl}/groupConnectionRequest`;

  constructor(private _apiService: ApiService) {
  }

  public approveGroupConnectionRequest(groupConnectionRequest: GroupConnectionRequest, value: GroupCluster): Observable<GroupConnection> {
    return this._apiService.createValue(GroupConnection, `${this._basePath}/${groupConnectionRequest.id}/approve`, new IdRequest(value.id)) as Observable<GroupConnection>;
  }

  public rejectGroupConnectionRequest(groupConnectionRequest: GroupConnectionRequest): Observable<BaseGroupConnectionRequest> {
    return this._apiService.removeValue(BaseGroupConnectionRequest, `${this._basePath}/${groupConnectionRequest.id}/approve`) as Observable<BaseGroupConnectionRequest>;
  }

}
