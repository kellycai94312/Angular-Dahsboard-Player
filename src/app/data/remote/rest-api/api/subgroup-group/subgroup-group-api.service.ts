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

@Injectable({
  providedIn: 'root'
})
export class SubgroupGroupApiService {

  private readonly _basePath = `${environment.restUrl}/subgroupGroup`;

  constructor(private _apiService: ApiService) {
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

}
