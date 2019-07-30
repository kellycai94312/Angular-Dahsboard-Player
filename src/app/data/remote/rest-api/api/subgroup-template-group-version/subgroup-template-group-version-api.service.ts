import {Injectable} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ApiService} from '../base/api.service';
import {Observable} from 'rxjs';
import {SubgroupGroup} from '../../../model/group/subgroup/subgroup/subgroup-group';
import {SubgroupTemplateGroupVersion} from '../../../model/group/subgroup/template/subgroup-template-group-version';
import {Person} from '../../../model/person';

@Injectable({
  providedIn: 'root'
})
export class SubgroupTemplateGroupVersionApiService {

  private readonly _basePath = `${environment.restUrl}/subgroupTemplateGroupVersion`;

  constructor(private _apiService: ApiService) {
  }

  public getUnassignedSubgroupGroupsForPersons(subgroupTemplateGroupVersion: SubgroupTemplateGroupVersion,
                                               persons: Person[]): Observable<SubgroupGroup[]> {
    return this._apiService.getValues(SubgroupGroup, `${this._basePath}/${subgroupTemplateGroupVersion.id}/unassignedSubgroupGroup`, {personIds: persons.map(x => x.id).join('_')});
  }

}
