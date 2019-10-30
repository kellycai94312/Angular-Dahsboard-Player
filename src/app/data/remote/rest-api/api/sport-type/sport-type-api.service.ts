import { Injectable } from '@angular/core';
import { PageContainer } from 'app/data/remote/bean/page-container';
import { SportType } from 'app/data/remote/model/sport-type';
import { ApiService } from 'app/data/remote/rest-api/api';
import { PageQuery } from 'app/data/remote/rest-api/page-query';
import { UtilService } from 'app/services/util/util.service';
import { AppHelper } from 'app/utils/app-helper';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SportTypeApiService {

  private readonly _basePath = `${environment.restUrl}/sportType`;

  constructor(private _apiService: ApiService,
              private _utilService: UtilService,
              private _appHelper: AppHelper) {
  }

  public getSportTypes(query?: PageQuery): Observable<PageContainer<SportType>> {
    return this._apiService.getPageContainer(SportType, this._basePath);
  }

}
