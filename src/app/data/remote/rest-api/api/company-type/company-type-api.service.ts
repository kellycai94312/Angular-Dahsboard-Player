import { Injectable } from '@angular/core';
import { CompanyType } from 'app/data/remote/model/group/organization';
import { ApiService } from 'app/data/remote/rest-api/api';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyTypeApiService {

  private readonly _basePath = `${environment.restUrl}/companyType`;

  constructor(private _apiService: ApiService) {
  }

  public getCompanyTypes(query?: { name?: string }): Observable<CompanyType[]> {
    return this._apiService.getValues(CompanyType, this._basePath, query);
  }

}
