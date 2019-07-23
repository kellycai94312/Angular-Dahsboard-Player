import {Injectable} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ApiService} from '../base/api.service';
import {Observable} from 'rxjs';
import {Group} from '../../../model/group/base/group';
import {Position} from '../../../model/person-position/position';
import {GroupCluster} from '../../../model/group/connection/group-cluster';
import {PositionLevelEnum} from '../../../model/person-position/position-level-enum';

@Injectable({
  providedIn: 'root'
})
export class GroupClusterApiService {

  private readonly _basePath = `${environment.restUrl}/groupCluster`;

  constructor(private _apiService: ApiService) {
  }

  public getChildrenGroups<T extends Group>(groupCluster: GroupCluster,
                                            group: T): Observable<T[]> {
    return this._apiService.getValues(Group, `${this._basePath}/${groupCluster.id}/group/${group.id}/childrenGroup`) as Observable<T[]>;
  }

  public getNestedGroupPositions<T extends Position>(groupCluster: GroupCluster,
                                                     group: Group,
                                                     query?: { positionLevelEnum?: PositionLevelEnum }): Observable<T[]> {
    return this._apiService.getValues(Position, `${this._basePath}/${groupCluster.id}/group/${group.id}/nestedGroupPosition`, query) as Observable<T[]>;
  }

}
