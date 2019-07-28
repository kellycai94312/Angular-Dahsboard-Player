import {Injectable} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ApiService} from '../base/api.service';
import {Group} from '../../../model/group/base/group';
import {GroupCluster} from '../../../model/group/connection/group-cluster';
import {Observable} from 'rxjs';
import {ClusterGroupPosition} from './model/cluster-group-position';
import {PositionLevelEnum} from '../../../model/person-position/position-level-enum';
import {UtilService} from '../../../../../services/util/util.service';
import {Person} from '../../../model/person';
import {BaseGroupContract} from '../../../model/group/contract/base-group-contract';
import {ReportExtension} from '../../../bean/report-extension';
import {IdRequest} from '../../../request/id-request';
import {PersonRepresentative} from '../../../model/person/person-representative';
import {GroupPerson} from '../../../model/group/group-person';
import {PageContainer} from '../../../bean/page-container';
import {GroupPersonQuery} from '../../query/group-person-query';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupApiService {
  private readonly _basePath = `${environment.restUrl}/group`;

  constructor(private _apiService: ApiService,
              private _httpClient: HttpClient,
              private _utilService: UtilService) {
  }

  public getPersons<T extends GroupPerson>(group: Group,
                                           query: GroupPersonQuery): Observable<PageContainer<T>> {
    return this._apiService.getPageContainer(GroupPerson, `${this._basePath}/${group.id}/person`, query) as Observable<PageContainer<T>>;
  }

  //#region Contract

  public getGroupContracts<T extends BaseGroupContract>(group: Group,
                                                        person: Person): Observable<T[]> {
    return this._apiService.getValues(BaseGroupContract, `${this._basePath}/${group.id}/person/${person.id}/contract`) as Observable<T[]>;
  }

  public createGroupContract<T extends BaseGroupContract>(value: T,
                                                          group: Group,
                                                          person: Person): Observable<T> {
    return this._apiService.createValue(BaseGroupContract, `${this._basePath}/${group.id}/person/${person.id}/contract`, value) as Observable<T>;
  }

  public updateGroupContract<T extends BaseGroupContract>(value: T,
                                                          group: Group,
                                                          person: Person): Observable<T> {
    return this._apiService.updateValue(BaseGroupContract, `${this._basePath}/${group.id}/person/${person.id}/contract/${value.id}`, value) as Observable<T>;
  }

  public saveGroupContract<T extends BaseGroupContract>(value: T,
                                                        group: Group,
                                                        person: Person): Observable<T> {
    if (value.id) {
      return this.updateGroupContract(value, group, person);
    }
    return this.createGroupContract(value, group, person);
  }

  public removeGroupContract<T extends BaseGroupContract>(value: T,
                                                          group: Group,
                                                          person: Person): Observable<T> {
    return this._apiService.removeValue(BaseGroupContract, `${this._basePath}/${group.id}/person/${person.id}/contract/${value.id}`) as Observable<T>;
  }

  public getUrlForDownloadGroupContractReport<T extends BaseGroupContract>(value: T,
                                                                           group: Group,
                                                                           person: Person,
                                                                           query: { extension?: ReportExtension }): string {
    return `${this._basePath}/${group.id}/person/${person.id}/contract/${value.id}/report?${this._utilService.getHttpQueryFromObject(query)}`;
  }

  //#endregion

  //#region representative

  public createPersonRepresentative(value: IdRequest,
                                    group: Group,
                                    person: Person): Observable<PersonRepresentative> {
    return this._apiService.createValue(PersonRepresentative, `${this._basePath}/${group.id}/person/${person.id}/representative`, value) as Observable<PersonRepresentative>;
  }

  public removePersonRepresentative(value: Person,
                                    group: Group,
                                    person: Person): Observable<PersonRepresentative> {
    return this._apiService.removeValue(PersonRepresentative, `${this._basePath}/${group.id}/person/${person.id}/representative/${value.id}`) as Observable<PersonRepresentative>;
  }

  //#endregion

  public getClusterGroupPositions(group: Group,
                                  groupCluster: GroupCluster,
                                  query?: { organizationTypeId?: number, positionLevelEnum?: PositionLevelEnum, positionId?: number, rankId?: number }): Observable<ClusterGroupPosition[]> {
    return this._apiService.getValues(ClusterGroupPosition, `${this._basePath}/${group.id}/cluster/${groupCluster.id}/position`, this._utilService.clone(query, {excludeNullable: true})) as Observable<ClusterGroupPosition[]>;
  }

}
