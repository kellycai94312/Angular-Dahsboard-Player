import { Injectable } from '@angular/core';
import { PageContainer } from 'app/data/remote/bean/page-container';
import { Country } from 'app/data/remote/model/address/linked/country';
import { ApiService } from 'app/data/remote/rest-api/api';
import { PageQuery } from 'app/data/remote/rest-api/page-query';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryApiService {

  private readonly _basePath = `${environment.restUrl}/country`;

  constructor(private _apiService: ApiService) {
  }

  public getCountries(query?: PageQuery): Observable<PageContainer<Country>> {
    return this._apiService.getPageContainer(Country, this._basePath, query);
  }

}
