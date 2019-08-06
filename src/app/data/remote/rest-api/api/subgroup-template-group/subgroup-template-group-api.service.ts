import {Injectable} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ApiService} from '../base/api.service';
import {SubgroupTemplateGroupVersion} from '../../../model/group/subgroup/template/subgroup-template-group-version';
import {Observable} from 'rxjs';
import {SubgroupTemplateGroup} from '../../../model/group/subgroup/template/subgroup-template-group';

@Injectable({
  providedIn: 'root'
})
export class SubgroupTemplateGroupApiService {

  private readonly _basePath = `${environment.restUrl}/subgroupTemplateGroup`;

  constructor(private _apiService: ApiService) {
  }

  public getSubgroupTemplateGroupVersions(subgroupTemplateGroup: SubgroupTemplateGroup): Observable<SubgroupTemplateGroupVersion[]> {
    return this._apiService.getValues(SubgroupTemplateGroupVersion, `${this._basePath}/${subgroupTemplateGroup.id}/version`);
  }

}
