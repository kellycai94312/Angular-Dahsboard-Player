import { Injectable } from '@angular/core';
import {
  BaseGroupConnectionRequest,
  GroupConnection,
  GroupConnectionRequest
} from 'app/data/remote/model/group/connection';
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

  public removeGroupConnectionRequest<T extends BaseGroupConnectionRequest>(groupConnectionRequest: T): Observable<T> {
    return this._apiService.removeValue(BaseGroupConnectionRequest, `${this._basePath}/${groupConnectionRequest.id}`) as Observable<T>;
  }

  public approveGroupConnectionRequest(groupConnectionRequest: GroupConnectionRequest): Observable<GroupConnection> {
    return this._apiService.createValue(GroupConnection, `${this._basePath}/${groupConnectionRequest.id}/approve`) as Observable<GroupConnection>;
  }

  public rejectGroupConnectionRequest(groupConnectionRequest: GroupConnectionRequest): Observable<GroupConnectionRequest> {
    return this._apiService.removeValue(GroupConnectionRequest, `${this._basePath}/${groupConnectionRequest.id}/approve`) as Observable<GroupConnectionRequest>;
  }

}
