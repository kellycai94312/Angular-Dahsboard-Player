import {Injectable} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ApiService} from '../base/api.service';
import {Observable} from 'rxjs';
import {SubgroupGroup} from '../../../model/group/subgroup/subgroup/subgroup-group';
import {SubgroupTemplateGroupVersion} from '../../../model/group/subgroup/template/subgroup-template-group-version';
import {Person} from '../../../model/person';
import {SubgroupTemplateGroupVersionQuery} from './model/subgroup-template-group-version-query';
import {SubgroupTemplateGroupVersionPersonPosition} from '../../../bean/subgroup-template-group-version-person-position';
import {BaseGroupContract} from '../../../model/group/contract/base-group-contract';
import {ReportExtension} from '../../../bean/report-extension';
import {UtilService} from '../../../../../services/util/util.service';

@Injectable({
  providedIn: 'root'
})
export class SubgroupTemplateGroupVersionApiService {

  private readonly _basePath = `${environment.restUrl}/subgroupTemplateGroupVersion`;

  constructor(private _apiService: ApiService,
              private _utilService: UtilService) {
  }

  public getUnassignedSubgroupGroupsForPersons(subgroupTemplateGroupVersion: SubgroupTemplateGroupVersion,
                                               persons: Person[]): Observable<SubgroupGroup[]> {
    return this._apiService.getValues(SubgroupGroup, `${this._basePath}/${subgroupTemplateGroupVersion.id}/unassignedSubgroupGroup`, {personIds: persons.map(x => x.id).join('_')});
  }

  public getSubgroupTemplateGroupChildrenSubgroupGroups(subgroupTemplateGroupVersion: SubgroupTemplateGroupVersion,
                                                        query?: { subgroupGroupId?: number }): Observable<SubgroupGroup[]> {
    return this._apiService.getValues(SubgroupGroup, `${this._basePath}/${subgroupTemplateGroupVersion.id}/childrenSubgroup`, query);
  }

  //#region Subgroup person

  public getSubgroupTemplateGroupVersionPositions(subgroupTemplateGroupVersion: SubgroupTemplateGroupVersion,
                                                  query?: SubgroupTemplateGroupVersionQuery): Observable<SubgroupTemplateGroupVersionPersonPosition[]> {
    return this._apiService.getValues(SubgroupTemplateGroupVersionPersonPosition, `${this._basePath}/${subgroupTemplateGroupVersion.id}/person`, this._utilService.clone(query, {excludeNullable: true}));
  }

  public getSubgroupTemplateGroupVersionReport<T extends BaseGroupContract>(subgroupTemplateGroupVersion: SubgroupTemplateGroupVersion,
                                                                            query: SubgroupTemplateGroupVersionQuery & { positionId: number, byName?: boolean, extension?: ReportExtension }): string {
    return `${this._basePath}/${subgroupTemplateGroupVersion.id}/personReport?${this._utilService.getHttpQueryFromObject(this._utilService.clone(query, {excludeNullable: true}))}`;
  }

  //#endregion

}
