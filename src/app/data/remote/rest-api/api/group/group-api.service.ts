import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GroupClaimRequest } from 'app/data/remote/bean/group-claim-request';
import { GroupPersonClaimRequest } from 'app/data/remote/bean/group-person-claim-request';
import { RequestType } from 'app/data/remote/bean/request-type';
import { StringWrapper } from 'app/data/remote/bean/wrapper/string-wrapper';
import { PlainAddress } from 'app/data/remote/model/address/plain-address';
import {
  BaseGroupConnectionRequest,
  GroupCluster,
  GroupConnectionRequestClaim,
  GroupConnectionRequestType
} from 'app/data/remote/model/group/connection';
import { BaseGroupContract } from 'app/data/remote/model/group/contract';
import { GroupNews } from 'app/data/remote/model/group/news';
import { BaseGroupPerson, GroupPerson, GroupPersonClaim } from 'app/data/remote/model/group/person';
import { BaseGroupPersonClaimState } from 'app/data/remote/model/group/person/state';
import { GroupPersonPosition } from 'app/data/remote/model/group/position';
import { FileApiService } from 'app/data/remote/rest-api/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment';
import { UtilService } from '../../../../../services/util/util.service';
import { EventDay } from '../../../bean/event/event-day';
import { PageContainer } from '../../../bean/page-container';
import { ReportExtension } from '../../../bean/report-extension';
import { SingleAttributeWrapper } from '../../../bean/wrapper/single-attribute-wrapper';
import { Group } from '../../../model/group/base/group';
import { SubgroupTemplate } from '../../../model/group/subgroup/template/subgroup-template';
import { SubgroupTemplateGroup } from '../../../model/group/subgroup/template/subgroup-template-group';
import { Person } from '../../../model/person';
import { BasePosition } from '../../../model/person-position/base-position';
import { GroupPosition } from '../../../model/person-position/group-position';
import { PositionLevelEnum } from '../../../model/person-position/position-level-enum';
import { PersonRepresentative } from '../../../model/person/person-representative';
import { IdRequest } from '../../../request/id-request';
import { ListRequest } from '../../../request/list-request';
import { PageQuery } from '../../page-query';
import { GroupPersonPositionQuery } from '../../query/group-person-position-query';
import { GroupPersonQuery } from '../../query/group-person-query';
import { GroupQuery } from '../../query/group-query';
import { ApiService } from '../base/api.service';
import { PositionQuery } from '../position/model/position-query';
import { ClusterGroupPosition } from './model/cluster-group-position';

@Injectable({
  providedIn: 'root'
})
export class GroupApiService {

  private readonly _basePath = `${environment.restUrl}/group`;

  constructor(private _apiService: ApiService,
              private _httpClient: HttpClient,
              private _fileApiService: FileApiService,
              private _utilService: UtilService) {
  }

  //region Group

  public getGroups<T extends Group>(query?: GroupQuery): Observable<PageContainer<T>> {
    return this._apiService.getPageContainer(Group, this._basePath, query) as Observable<PageContainer<T>>;
  }

  public getGroup<T extends Group>(groupId: number): Observable<T> {
    return this._apiService.getValue(Group, `${this._basePath}/${groupId}`) as Observable<T>;
  }

  public getGroupByInn<T extends Group>(inn: string): Observable<T> {
    return this._apiService.getValue(Group, `${this._basePath}/inn/${inn}`) as Observable<T>;
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

  public getCurrentGroupPerson<T extends BaseGroupPerson>(group: Group): Observable<T> {
    return this._apiService.getValue(SingleAttributeWrapper, `${this._basePath}/${group.id}/currentGroupPerson`)
      .pipe(map(value => this._apiService.mapObject(BaseGroupPerson, value.value) as T));
  }

  public getGroupPerson<T extends Group>(group: T, person: Person): Observable<GroupPerson> {
    return this._apiService.getValue(GroupPerson, `${this._basePath}/${group.id}/person/${person.id}`);
  }

  public joinGroup<T extends Group, P extends BasePosition>(group: T, positions: P[]): Observable<BaseGroupPerson> {
    return this._apiService.createValue(BaseGroupPerson, `${this._basePath}/${group.id}/join`, new ListRequest(positions.map(x => new IdRequest(x.id)))) as Observable<BaseGroupPerson>;
  }

  public createGroupPersonClaim<T extends Group>(group: T, value: GroupPersonClaimRequest, file?: File): Observable<GroupPersonClaim> {
    return this._apiService.createValue(GroupPersonClaim, `${this._basePath}/${group.id}/claim/person`, this._fileApiService.getFileFormData(value, file)) as Observable<GroupPersonClaim>;
  }

  public createGroupConnectionRequestClaim<T extends Group>(group: T, value: GroupClaimRequest): Observable<GroupConnectionRequestClaim> {
    return this._apiService.createValue(GroupConnectionRequestClaim, `${this._basePath}/${group.id}/claim/group`, value) as Observable<GroupConnectionRequestClaim>;
  }

  public followGroup<T extends Group>(group: T): Observable<GroupPerson> {
    return this._apiService.createValue(GroupPerson, `${this._basePath}/${group.id}/follow`) as Observable<GroupPerson>;
  }

  public leaveGroup<T extends Group>(group: T): Observable<null> {
    return this._apiService.removeValue(void 0, `${this._basePath}/${group.id}/join`) as Observable<null>;
  }

  public getGroupPersonPositions(groupPerson: GroupPerson, query?: GroupPersonPositionQuery): Observable<PageContainer<GroupPersonPosition>> {
    return this._apiService.getPageContainer(GroupPersonPosition, `${this._basePath}/${groupPerson.group.id}/person/${groupPerson.person.id}/position`, query);
  }

  public updateGroupPersonPositions(groupPerson: GroupPerson, values: BasePosition[]): Observable<GroupPersonPosition[]> {
    return this._apiService.createValue(GroupPersonPosition, `${this._basePath}/${groupPerson.group.id}/person/${groupPerson.person.id}/position`, new ListRequest(values.map(x => new IdRequest(x.id)))) as Observable<GroupPersonPosition[]>;
  }

  //endregion

  public getPersons<T extends BaseGroupPerson>(group: Group,
                                               query: GroupPersonQuery): Observable<PageContainer<T>> {
    return this._apiService.getPageContainer(BaseGroupPerson, `${this._basePath}/${group.id}/person`, query) as Observable<PageContainer<T>>;
  }

  public updateGroupPersonAddress<T extends BaseGroupPerson>(group: Group,
                                                             person: Person,
                                                             value: PlainAddress): Observable<PlainAddress> {
    return this._apiService.updateValue(PlainAddress, `${this._basePath}/${group.id}/person/${person.id}/address`, value) as Observable<PlainAddress>;
  }

  public updateGroupPersonWorkplace<T extends BaseGroupPerson>(group: Group,
                                                               person: Person,
                                                               value: string): Observable<BaseGroupPerson> {
    const stringWrapper = new StringWrapper();
    stringWrapper.name = value;
    return this._apiService.updateValue(BaseGroupPerson, `${this._basePath}/${group.id}/person/${person.id}/workplace`, stringWrapper) as Observable<BaseGroupPerson>;
  }

  public issueGroupPersonCertificate(group: Group,
                                     person: Person): Observable<null> {
    return this._apiService.createValue(void 0, `${this._basePath}/${group.id}/person/${person.id}/issueCertificate`) as Observable<null>;
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

  //region Group person claim rank

  public getGroupPersonClaimStates(group: Group,
                                   person: Person): Observable<BaseGroupPersonClaimState[]> {
    return this._apiService.getValues(BaseGroupPersonClaimState, `${this._basePath}/${group.id}/person/${person.id}/claimState`);
  }

  public createGroupPersonClaimState<T extends BaseGroupPersonClaimState>(group: Group,
                                                                          person: Person,
                                                                          value: T): Observable<T> {
    return this._apiService.createValue(BaseGroupPersonClaimState, `${this._basePath}/${group.id}/person/${person.id}/claimState`, value) as Observable<T>;
  }

  public updateGroupPersonClaimState<T extends BaseGroupPersonClaimState>(group: Group,
                                                                          person: Person,
                                                                          value: T): Observable<T> {
    return this._apiService.updateValue(BaseGroupPersonClaimState, `${this._basePath}/${group.id}/person/${person.id}/claimState/${value.id}`, value) as Observable<T>;
  }

  public saveGroupPersonClaimState<T extends BaseGroupPersonClaimState>(group: Group, person: Person, value: T): Observable<T> {
    if (value.id) {
      return this.updateGroupPersonClaimState(group, person, value);
    }
    return this.createGroupPersonClaimState(group, person, value);
  }

  public removeGroupPersonClaimState<T extends BaseGroupPersonClaimState>(group: Group,
                                                                          person: Person,
                                                                          value: T): Observable<T> {
    return this._apiService.removeValue(BaseGroupPersonClaimState, `${this._basePath}/${group.id}/person/${person.id}/claimState/${value.id}`) as Observable<T>;
  }

  //endregion

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

  public getGroupConnectionRequests(group: Group, query?: { requestType?: RequestType, groupConnectionRequestType?: GroupConnectionRequestType } & PageQuery): Observable<PageContainer<BaseGroupConnectionRequest>> {
    return this._apiService.getPageContainer(BaseGroupConnectionRequest, `${this._basePath}/${group.id}/connectionRequest`, query) as Observable<PageContainer<BaseGroupConnectionRequest>>;
  }

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
