import { Injectable } from '@angular/core';
import { OrganizationType } from 'app/data/remote/model/group/organization';
import { ApiService } from 'app/data/remote/rest-api/api';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationTypeApiService {
  private readonly _basePath = `${environment.restUrl}/organizationType`;

  constructor(private _apiService: ApiService) {
  }

  public getOrganizationTypes(): Observable<OrganizationType[]> {
    return this._apiService.getValues(OrganizationType, this._basePath);
  }

}
