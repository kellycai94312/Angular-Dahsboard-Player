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
import {SubgroupTemplate} from '../../../model/group/subgroup/template/subgroup-template';
import {PageQuery} from '../../page-query';
import {SubgroupTemplateGroup} from '../../../model/group/subgroup/template/subgroup-template-group';
import {GroupQuery} from '../../query/group-query';
import {GroupNews} from '../../../model/group/news/group-news';
import {EventDay} from '../../../bean/event/event-day';
import {map} from 'rxjs/operators';
import {GroupPosition} from '../../../model/person-position/group-position';
import {PositionQuery} from '../position/model/position-query';
import {BasePosition} from '../../../model/person-position/base-position';
import {ListRequest} from '../../../request/list-request';
import {GroupPersonPositionQuery} from '../../query/group-person-position-query';
import {SingleAttributeWrapper} from '../../../bean/wrapper/single-attribute-wrapper';
import {GroupPersonPosition} from '../../../model/group/position/group-person-position';

@Injectable({
  providedIn: 'root'
})
export class GroupApiService {

  private readonly _basePath = `${environment.restUrl}/group`;

  constructor(private _apiService: ApiService,
              private _httpClient: HttpClient,
              private _utilService: UtilService) {
  }

  //region Group

  public getGroups<T extends Group>(query?: GroupQuery): Observable<PageContainer<T>> {
    return this._apiService.getPageContainer(Group, this._basePath, query) as Observable<PageContainer<T>>;
  }

  public createGroup<T extends Group>(value: T): Observable<T> {
    return this._apiService.createValue(Group, this._basePath, value) as Observable<T>;
  }

  public updateGroup<T extends Group>(value: T): Observable<T> {
    return this._apiService.updateValue(Group, `${this._basePath}/${value.id}`, value) as Observable<T>;
  }

  public saveGroup<T extends Group>(value: T): Observable<T> {
    if (value.id) {
      return this.updateGroup(value);
    }
    return this.createGroup(value);
  }

  //endregion

  //region Group person

  public getCurrentGroupPerson<T extends GroupPerson>(group: Group): Observable<T> {
    return this._apiService.getValue(SingleAttributeWrapper, `${this._basePath}/${group.id}/currentGroupPerson`).pipe(map(value => value.value)) as Observable<T>;
  }

  public getGroupPersonPositions(groupPerson: GroupPerson, query?: GroupPersonPositionQuery): Observable<PageContainer<GroupPersonPosition>> {
    return this._apiService.getPageContainer(GroupPersonPosition, `${this._basePath}/${groupPerson.group.id}/person/${groupPerson.person.id}/position`, query);
  }

  public updateGroupPersonPositions(groupPerson: GroupPerson, values: BasePosition[]): Observable<GroupPersonPosition[]> {
    return this._apiService.createValue(GroupPersonPosition, `${this._basePath}/${groupPerson.group.id}/person/${groupPerson.person.id}/position`, new ListRequest(values.map(x => new IdRequest(x.id)))) as Observable<GroupPersonPosition[]>;
  }

  //endregion

  public getPersons<T extends GroupPerson>(group: Group,
                                           query: GroupPersonQuery): Observable<PageContainer<T>> {
    return this._apiService.getPageContainer(GroupPerson, `${this._basePath}/${group.id}/person`, query) as Observable<PageContainer<T>>;
  }

  //#region Contract

  public getGroupContracts<T extends BaseGroupContract>(group: Group,
                                                        person: Person): Observable<T[]> {

    return this._mapBaseGroupContract(this._apiService.getValues(BaseGroupContract, `${this._basePath}/${group.id}/person/${person.id}/contract`)) as Observable<T[]>;
  }

  public createGroupContract<T extends BaseGroupContract>(value: T,
                                                          group: Group,
                                                          person: Person): Observable<T> {
    return this._mapBaseGroupContract(this._apiService.createValue(BaseGroupContract, `${this._basePath}/${group.id}/person/${person.id}/contract`, value) as Observable<T>) as Observable<T>;
  }

  public updateGroupContract<T extends BaseGroupContract>(value: T,
                                                          group: Group,
                                                          person: Person): Observable<T> {
    return this._mapBaseGroupContract(this._apiService.updateValue(BaseGroupContract, `${this._basePath}/${group.id}/person/${person.id}/contract/${value.id}`, value) as Observable<T>) as Observable<T>;
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
    return this._mapBaseGroupContract(this._apiService.removeValue(BaseGroupContract, `${this._basePath}/${group.id}/person/${person.id}/contract/${value.id}`) as Observable<T>) as Observable<T>;
  }

  public getUrlForDownloadGroupContractReport<T extends BaseGroupContract>(value: T,
                                                                           group: Group,
                                                                           person: Person,
                                                                           query: { extension?: ReportExtension }): string {
    return `${this._basePath}/${group.id}/person/${person.id}/contract/${value.id}/report?${this._utilService.getHttpQueryFromObject(query)}`;
  }

  //#endregion

  //#region Representative

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

  //#region SubgroupTemplate

  public getSubgroupTemplates(group: Group,
                              query?: PageQuery): Observable<PageContainer<SubgroupTemplate>> {
    return this._apiService.getPageContainer(SubgroupTemplate, `${this._basePath}/${group.id}/subgroupTemplate`, query) as Observable<PageContainer<SubgroupTemplate>>;
  }

  //#endregion

  //#region SubgroupTemplateGroup

  public getSubgroupTemplateGroups(group: Group,
                                   query?: PageQuery): Observable<PageContainer<SubgroupTemplateGroup>> {
    return this._apiService.getPageContainer(SubgroupTemplateGroup, `${this._basePath}/${group.id}/subgroupTemplateGroup`, query) as Observable<PageContainer<SubgroupTemplateGroup>>;
  }

  //#endregion

  //#region Group news

  public getGroupNews(group: Group,
                      query?: PageQuery): Observable<PageContainer<GroupNews>> {
    return this._apiService.getPageContainer(GroupNews, `${this._basePath}/${group.id}/news`, query) as Observable<PageContainer<GroupNews>>;
  }

  public getGroupNewsById(group: Group,
                          groupNews: GroupNews): Observable<GroupNews> {
    return this._apiService.getValue(GroupNews, `${this._basePath}/${group.id}/news/${groupNews.id}`) as Observable<GroupNews>;
  }

  public createGroupNews(group: Group,
                         value: GroupNews): Observable<GroupNews> {
    return this._apiService.createValue(GroupNews, `${this._basePath}/${group.id}/news`, value) as Observable<GroupNews>;
  }

  public updateGroupNews(group: Group,
                         value: GroupNews): Observable<GroupNews> {
    return this._apiService.updateValue(GroupNews, `${this._basePath}/${group.id}/news/${value.id}`, value) as Observable<GroupNews>;
  }

  public saveGroupNews(group: Group,
                       value: GroupNews): Observable<GroupNews> {
    if (value.id) {
      return this.updateGroupNews(group, value);
    }
    return this.createGroupNews(group, value);
  }

  public removeGroupNews(group: Group,
                         value: GroupNews): Observable<GroupNews> {
    return this._apiService.removeValue(GroupNews, `${this._basePath}/${group.id}/news/${value.id}`) as Observable<GroupNews>;
  }

  //#endregion

  public getClusterGroupPositions(group: Group,
                                  groupCluster: GroupCluster,
                                  query?: { organizationTypeId?: number, positionLevelEnum?: PositionLevelEnum, positionId?: number, rankId?: number }): Observable<ClusterGroupPosition[]> {
    return this._apiService.getValues(ClusterGroupPosition, `${this._basePath}/${group.id}/cluster/${groupCluster.id}/position`, this._utilService.clone(query, {excludeNullable: true})) as Observable<ClusterGroupPosition[]>;
  }

  //#region Event

  public getGroupSchedule(group: Group,
                          query?: { weekOffset?: number }): Observable<EventDay[]> {
    return this._apiService.getValues(EventDay, `${this._basePath}/${group.id}/schedule`, this._utilService.clone(query, {excludeNullable: true}));
  }

  //#endregion

  //region Position

  public getGroupPositions(group: Group, query: PositionQuery): Observable<PageContainer<GroupPosition>> {
    return this._apiService.getPageContainer(GroupPosition, `${this._basePath}/${group.id}/position`);
  }

  public getGroupPosition(group: Group, groupPosition: GroupPosition): Observable<GroupPosition> {
    return this._apiService.getValue(GroupPosition, `${this._basePath}/${group.id}/position/${groupPosition.id}`);
  }

  public createGroupPosition(group: Group, value: GroupPosition): Observable<GroupPosition> {
    return this._apiService.createValue(GroupPosition, `${this._basePath}/${group.id}/position`, value) as Observable<GroupPosition>;
  }

  public updateGroupPosition(group: Group, value: GroupPosition): Observable<GroupPosition> {
    return this._apiService.updateValue(GroupPosition, `${this._basePath}/${group.id}/position/${value.id}`, value) as Observable<GroupPosition>;
  }

  public saveGroupPosition(group: Group, value: GroupPosition): Observable<GroupPosition> {
    if (value.id) {
      return this.updateGroupPosition(group, value);
    }
    return this.createGroupPosition(group, value);
  }

  public removeGroupPosition(group: Group, groupPosition: GroupPosition): Observable<GroupPosition> {
    return this._apiService.removeValue(GroupPosition, `${this._basePath}/${group.id}/position/${groupPosition.id}`) as Observable<GroupPosition>;
  }

  //endregion

  //region Vacancies

  public getGroupVacancies<T extends BasePosition>(group: Group, query?: GroupPersonPositionQuery): Observable<PageContainer<T>> {
    return this._apiService.getPageContainer(BasePosition, `${this._basePath}/${group.id}/vacancy`, query) as Observable<PageContainer<T>>;
  }

  public updateGroupVacancies<T extends BasePosition>(group: Group, values: T[]): Observable<T[]> {
    return this._apiService.createValue(BasePosition, `${this._basePath}/${group.id}/vacancy`, new ListRequest(values.map(x => new IdRequest(x.id)))) as Observable<T[]>;
  }

  //endregion

  private _mapBaseGroupContract<T extends BaseGroupContract>(observable: Observable<T | T[]>): Observable<T | T[]> {
    return observable.pipe(map(value => this._utilService.plainDiscriminatorObjectToClass(BaseGroupContract, value))) as Observable<T | T[]>;
  }

}
