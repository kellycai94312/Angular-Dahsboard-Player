import {Injectable} from '@angular/core';
import {Organization, OrganizationRequisites} from 'app/data/remote/model/group/organization';
import {Observable} from 'rxjs';
import {environment} from '../../../../../../environments/environment';
import {ApiService} from '../base/api.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationApiService {

  private readonly _basePath = `${environment.restUrl}/organization`;

  constructor(private _apiService: ApiService) {
  }

  //region requisites

  public getOrganizationRequisitesList(organization: Organization): Observable<OrganizationRequisites[]> {
    return this._apiService.getValues(OrganizationRequisites, `${this._basePath}/${organization.id}/requisites`);
  }

  public getOrganizationRequisites(organization: Organization, organizationRequisites: OrganizationRequisites): Observable<OrganizationRequisites> {
    return this._apiService.getValue(OrganizationRequisites, `${this._basePath}/${organization.id}/requisites/${organizationRequisites.id}`) as Observable<OrganizationRequisites>;
  }

  public createOrganizationRequisites(organization: Organization, value: OrganizationRequisites): Observable<OrganizationRequisites> {
    return this._apiService.createValue(OrganizationRequisites, `${this._basePath}/${organization.id}/requisites`, value) as Observable<OrganizationRequisites>;
  }

  public updateOrganizationRequisites(organization: Organization, value: OrganizationRequisites): Observable<OrganizationRequisites> {
    return this._apiService.updateValue(OrganizationRequisites, `${this._basePath}/${organization.id}/requisites/${value.id}`, value) as Observable<OrganizationRequisites>;
  }

  public saveOrganizationRequisites(organization: Organization, value: OrganizationRequisites): Observable<OrganizationRequisites> {
    if (value.id) {
      return this.updateOrganizationRequisites(organization, value);
    }
    return this.createOrganizationRequisites(organization, value);
  }

  public removeOrganizationRequisites(organization: Organization, organizationRequisites: OrganizationRequisites): Observable<OrganizationRequisites> {
    return this._apiService.removeValue(OrganizationRequisites, `${this._basePath}/${organization.id}/requisites/${organizationRequisites.id}`) as Observable<OrganizationRequisites>;
  }

  //endregion

}
