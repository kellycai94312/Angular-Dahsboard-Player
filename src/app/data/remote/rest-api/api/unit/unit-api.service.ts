import {Injectable} from '@angular/core';
import {ApiService} from '../base/api.service';
import {environment} from '../../../../../../environments/environment';
import {Observable} from 'rxjs';
import {PageContainer} from '../../../bean/page-container';
import {map} from 'rxjs/operators';
import {plainToClass, plainToClassFromExist} from 'class-transformer';
import {UnitQuery} from '../../query/unit/unit-query';
import {BaseUnit} from '../../../model/unit/base-unit';
import {BaseParameter} from '../../../model/parameter/base-parameter';

@Injectable({
  providedIn: 'root'
})
export class UnitApiService {

  private readonly _basePath = `${environment.restUrl}/unit`;

  constructor(private _apiService: ApiService) {
  }

  public getUnits<T extends BaseUnit>(query: UnitQuery): Observable<PageContainer<T>> {
    return this._apiService.get(this._basePath, this._apiService.getHttpParamsFromObject(query)).pipe(
      map(x => plainToClassFromExist(new PageContainer<BaseUnit>(BaseUnit), x) as any)
    );
  }

  public getUnit<T extends BaseUnit>(baseParameterId: number): Observable<T> {
    return this._apiService.get(`${this._basePath}/${baseParameterId}`).pipe(
      map(x => plainToClass(BaseUnit, x) as any)
    );
  }

  private _createUnit<T extends BaseUnit>(value: T): Observable<T> {
    return this._apiService.post(this._basePath, value).pipe(
      map(x => plainToClass(BaseUnit, x) as any)
    );
  }

  private _updateUnit<T extends BaseUnit>(value: T): Observable<T> {
    return this._apiService.put(`${this._basePath}/${value.id}`, value).pipe(
      map(x => plainToClass(BaseUnit, x) as any)
    );
  }

  public saveUnit<T extends BaseUnit>(value: T): Observable<T> {
    if (value.id) {
      return this._updateUnit(value);
    }
    return this._createUnit(value);
  }

  public removeUnit<T extends BaseUnit>(value: T): Observable<T> {
    return this._apiService.delete(`${this._basePath}/${value.id}`).pipe(
      map(x => plainToClass(BaseParameter, x) as any)
    );
  }

}
