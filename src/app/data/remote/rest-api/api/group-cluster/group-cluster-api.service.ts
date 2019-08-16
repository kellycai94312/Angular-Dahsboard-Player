import {Injectable} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ApiService} from '../base/api.service';
import {Observable} from 'rxjs';
import {Group} from '../../../model/group/base/group';
import {Position} from '../../../model/person-position/position';
import {GroupCluster} from '../../../model/group/connection/group-cluster';
import {PositionLevelEnum} from '../../../model/person-position/position-level-enum';
import {UtilService} from '../../../../../services/util/util.service';
import {Person} from '../../../model/person';
import {WorkTimePeriodEnum} from '../../../model/group/contract/work-time-period-enum';
import {AppHelper} from '../../../../../utils/app-helper';

@Injectable({
  providedIn: 'root'
})
export class GroupClusterApiService {

  private readonly _basePath = `${environment.restUrl}/groupCluster`;

  constructor(private _apiService: ApiService,
              private _utilService: UtilService,
              private _appHelper: AppHelper) {
  }

  public getChildrenGroups<T extends Group>(groupCluster: GroupCluster,
                                            group: T): Observable<T[]> {
    return this._apiService.getValues(Group, `${this._basePath}/${groupCluster.id}/group/${group.id}/childrenGroup`) as Observable<T[]>;
  }

  public getNestedGroupPositions<T extends Position>(groupCluster: GroupCluster,
                                                     group: Group,
                                                     query?: { positionLevelEnum?: PositionLevelEnum }): Observable<T[]> {
    return this._apiService.getValues(Position, `${this._basePath}/${groupCluster.id}/group/${group.id}/nestedGroupPosition`, this._utilService.clone(query, {excludeNullable: true})) as Observable<T[]>;
  }

  public getGroupWorkTimeReport(groupCluster: GroupCluster,
                                group: Group,
                                workTimePeriodEnum: WorkTimePeriodEnum,
                                createdByPerson: Person,
                                checkedByPerson: Person,
                                secondCheckedByPerson: Person,
                                accountantPerson: Person,
                                date: Date): string {
    const query = {
      workTimePeriodEnum,
      createdByPersonId: createdByPerson.id,
      checkedByPersonId: checkedByPerson.id,
      secondCheckedByPersonId: secondCheckedByPerson.id,
      accountantPersonId: accountantPerson.id,
      date: this._appHelper.dateByFormat(date, 'yyyy-MM')
    };
    return `${this._basePath}/${groupCluster.id}/group/${group.id}/workTime?${this._utilService.getHttpQueryFromObject(this._utilService.clone(query, {excludeNullable: true}))}`;
  }

}
