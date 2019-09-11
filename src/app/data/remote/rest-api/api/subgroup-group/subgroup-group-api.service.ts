import {Injectable} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ApiService} from '../base/api.service';
import {Observable} from 'rxjs';
import {PageContainer} from '../../../bean/page-container';
import {SubgroupPerson} from '../../../model/group/subgroup/person/subgroup-person';
import {SubgroupPersonQuery} from '../../query/subgroup-person-query';
import {SubgroupGroup} from '../../../model/group/subgroup/subgroup/subgroup-group';
import {SubgroupPersonListRequest} from '../../../request/subgroup-person-list-request';
import {SubgroupPersonRequest} from '../../../request/subgroup-person-request';
import {ListRequest} from '../../../request/list-request';
import {IdRequest} from '../../../request/id-request';
import {UtilService} from '../../../../../services/util/util.service';
import {Person} from '../../../model/person';
import {AppHelper} from '../../../../../utils/app-helper';
import {Group} from '../../../model/group/base/group';

@Injectable({
  providedIn: 'root'
})
export class SubgroupGroupApiService {

  private readonly _basePath = `${environment.restUrl}/subgroupGroup`;

  constructor(private _apiService: ApiService,
              private _utilService: UtilService,
              private _appHelper: AppHelper) {
  }

  public getSubgroupPersons(subgroupGroup: SubgroupGroup, query: SubgroupPersonQuery): Observable<PageContainer<SubgroupPerson>> {
    return this._apiService.getPageContainer(SubgroupPerson, `${this._basePath}/${subgroupGroup.id}/person`, query);
  }

  public createSubgroupPersons(subgroupGroup: SubgroupGroup, value: SubgroupPersonListRequest): Observable<SubgroupPerson[]> {
    return this._apiService.createValue(SubgroupPerson, `${this._basePath}/${subgroupGroup.id}/person`, value) as Observable<SubgroupPerson[]>;
  }

  public transferSubgroupPersons(subgroupGroup: SubgroupGroup, value: SubgroupPersonRequest): Observable<SubgroupPerson[]> {
    return this._apiService.updateValue(SubgroupPerson, `${this._basePath}/${subgroupGroup.id}/person`, value) as Observable<SubgroupPerson[]>;
  }

  public removeSubgroupPersons(subgroupGroup: SubgroupGroup, values: SubgroupPerson[]): Observable<SubgroupPerson[]> {
    return this._apiService.removeValue(SubgroupPerson, `${this._basePath}/${subgroupGroup.id}/person`, null, new ListRequest(values.map(x => new IdRequest(x.id)))) as Observable<SubgroupPerson[]>;
  }

  public getSubgroupGroupReceiptReport(subgroupGroup: SubgroupGroup,
                                       persons: Person[],
                                       kosgu: string,
                                       date: Date): string {
    const query = {personIds: persons.map(x => x.id).join('_'), kosgu, date: this._appHelper.dateByFormat(date, 'yyyy-MM')};
    return `${this._basePath}/${subgroupGroup.id}/receipt?${this._utilService.getHttpQueryFromObject(this._utilService.clone(query, {excludeNullable: true}))}`;
  }

  public getSubgroupGroupAttendanceReport(subgroupGroup: SubgroupGroup,
                                          group: Group,
                                          headPerson: Person,
                                          executorPerson: Person,
                                          specialistPerson: Person,
                                          date: Date): string {
    const query = {groupId: group.id, headPersonId: headPerson.id, executorPersonId: executorPerson.id, specialistPersonId: specialistPerson.id, date: this._appHelper.dateByFormat(date, 'yyyy-MM')};
    return `${this._basePath}/${subgroupGroup.id}/attendance?${this._utilService.getHttpQueryFromObject(this._utilService.clone(query, {excludeNullable: true}))}`;
  }

}
