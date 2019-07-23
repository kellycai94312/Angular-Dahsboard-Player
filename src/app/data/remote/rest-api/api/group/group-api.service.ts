import {Injectable} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ApiService} from '../base/api.service';
import {Group} from '../../../model/group/base/group';
import {GroupCluster} from '../../../model/group/connection/group-cluster';
import {Observable} from 'rxjs';
import {ClusterGroupPosition} from './model/cluster-group-position';
import {PositionLevelEnum} from '../../../model/person-position/position-level-enum';
import {UtilService} from '../../../../../services/util/util.service';

@Injectable({
  providedIn: 'root'
})
export class GroupApiService {
  private readonly _basePath = `${environment.restUrl}/group`;

  constructor(private _apiService: ApiService,
              private _utilService: UtilService) {
  }

  public getClusterGroupPositions(group: Group,
                                  groupCluster: GroupCluster,
                                  query?: { positionLevelEnum?: PositionLevelEnum, positionId?: number, rankId?: number }): Observable<ClusterGroupPosition[]> {
    return this._apiService.getValues(ClusterGroupPosition, `${this._basePath}/${group.id}/cluster/${groupCluster.id}/position`, this._utilService.clone(query, {excludeNullable: true})) as Observable<ClusterGroupPosition[]>;
  }

}
