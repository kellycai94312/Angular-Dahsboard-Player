import { Injectable } from '@angular/core';
import { PageContainer } from 'app/data/remote/bean/page-container';
import { Discipline } from 'app/data/remote/model/discipline';
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
    return this._apiService.getPageContainer(SportType, this._basePath, query);
  }

  //region Discipline

  public getSportTypeDisciplines(sportType: SportType, query?: PageQuery): Observable<PageContainer<Discipline>> {
    return this._apiService.getPageContainer(Discipline, `${this._basePath}/${sportType.id}/discipline`, query);
  }

  public createSportTypeDiscipline(sportType: SportType, value: Discipline): Observable<Discipline> {
    return this._apiService.createValue(Discipline, `${this._basePath}/${sportType.id}/discipline`, value) as Observable<Discipline>;
  }

  public updateSportTypeDiscipline(sportType: SportType, value: Discipline): Observable<Discipline> {
    return this._apiService.updateValue(Discipline, `${this._basePath}/${sportType.id}/discipline/${value.id}`, value) as Observable<Discipline>;
  }

  public saveSportTypeDiscipline(sportType: SportType, value: Discipline): Observable<Discipline> {
    if (value.id) {
      return this.updateSportTypeDiscipline(sportType, value);
    }
    return this.createSportTypeDiscipline(sportType, value);
  }

  public removeSportTypeDiscipline(sportType: SportType, value: Discipline): Observable<Discipline> {
    return this._apiService.removeValue(Discipline, `${this._basePath}/${sportType.id}/discipline/${value.id}`) as Observable<Discipline>;
  }

  //endregion

}
