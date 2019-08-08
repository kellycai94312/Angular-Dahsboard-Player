import {Injectable} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ApiService} from '../base/api.service';
import {Observable} from 'rxjs';
import {SubgroupTemplate} from '../../../model/group/subgroup/template/subgroup-template';
import {SubgroupTemplateGroup} from '../../../model/group/subgroup/template/subgroup-template-group';

@Injectable({
  providedIn: 'root'
})
export class SubgroupTemplateApiService {

  private readonly _basePath = `${environment.restUrl}/subgroupTemplate`;

  constructor(private _apiService: ApiService) {
  }

  public getSubgroupTemplateGroups(subgroupTemplate: SubgroupTemplate): Observable<SubgroupTemplateGroup[]> {
    return this._apiService.getValues(SubgroupTemplateGroup, `${this._basePath}/${subgroupTemplate.id}/group`);
  }

  public createSubgroupTemplateGroup(subgroupTemplate: SubgroupTemplate,
                                     value: SubgroupTemplateGroup): Observable<SubgroupTemplateGroup> {
    return this._apiService.createValue(SubgroupTemplateGroup, `${this._basePath}/${subgroupTemplate.id}/group`, value) as Observable<SubgroupTemplateGroup>;
  }

  public removeSubgroupTemplateGroupByTemplateOwner(subgroupTemplate: SubgroupTemplate,
                                                    subgroupTemplateGroup: SubgroupTemplateGroup): Observable<SubgroupTemplateGroup> {
    return this._apiService.removeValue(SubgroupTemplateGroup, `${this._basePath}/${subgroupTemplate.id}/group/${subgroupTemplateGroup.id}`) as Observable<SubgroupTemplateGroup>;
  }

}
