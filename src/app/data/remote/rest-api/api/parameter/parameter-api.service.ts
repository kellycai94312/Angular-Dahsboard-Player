import {Injectable} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {Observable} from 'rxjs';
import {PageContainer} from '../../../bean/page-container';
import {map} from 'rxjs/operators';
import {plainToClass, plainToClassFromExist} from 'class-transformer';
import {ApiService} from '../base/api.service';
import {BaseParameter} from '../../../model/parameter/base-parameter';
import {ParameterQuery} from '../../query/parameter/parameter-query';
import {ListRequest} from '../../../request/list-request';
import {IdRequest} from '../../../request/id-request';
import {BaseUnit} from '../../../model/unit/base-unit';

@Injectable()
export class ParameterApiService {

  private readonly _basePath = `${environment.restUrl}/parameter`;

  constructor(private _apiService: ApiService) {
  }

  public getParameters<T extends BaseParameter>(query: ParameterQuery): Observable<PageContainer<T>> {
    return this._apiService.get(this._basePath, this._apiService.getHttpParamsFromObject(query)).pipe(
      map(x => plainToClassFromExist(new PageContainer<BaseParameter>(BaseParameter), x) as any)
    );
  }

  public getParameter<T extends BaseParameter>(baseParameterId: number): Observable<T> {
    return this._apiService.get(`${this._basePath}/${baseParameterId}`).pipe(
      map(x => plainToClass(BaseParameter, x) as any)
    );
  }

  private _createParameter<T extends BaseParameter>(value: T): Observable<T> {
    return this._apiService.post(this._basePath, value).pipe(
      map(x => plainToClass(BaseParameter, x) as any)
    );
  }

  private _updateParameter<T extends BaseParameter>(value: T): Observable<T> {
    return this._apiService.put(`${this._basePath}/${value.id}`, value).pipe(
      map(x => plainToClass(BaseParameter, x) as any)
    );
  }

  public saveParameter<T extends BaseParameter>(value: T): Observable<T> {
    if (value.id) {
      return this._updateParameter(value);
    }
    return this._createParameter(value);
  }

  public removeParameter<T extends BaseParameter>(value: T): Observable<T> {
    return this._apiService.delete(`${this._basePath}/${value.id}`).pipe(
      map(x => plainToClass(BaseParameter, x) as any)
    );
  }

  //#region Formula

  public getFormulaParameters<T extends BaseParameter>(value: T): Observable<T[]> {
    return this._apiService.get(`${this._basePath}/${value.id}/formula/parameter`).pipe(
      map(x => plainToClass(BaseParameter, x) as any)
    );
  }

  public updateFormulaParameters<T extends BaseParameter>(value: T, listRequest: ListRequest<IdRequest>): Observable<T[]> {
    return this._apiService.post(`${this._basePath}/${value.id}/formula/parameter`, listRequest).pipe(
      map(x => plainToClass(BaseParameter, x) as any)
    );
  }

  //#endregion

  //#region Unit

  public getParameterUnits<T extends BaseUnit>(value: BaseParameter): Observable<T[]> {
    return this._apiService.get(`${this._basePath}/${value.id}/unit`).pipe(
      map(x => plainToClass(BaseUnit, x) as any)
    );
  }

  public updateParameterUnits<T extends BaseUnit>(value: BaseParameter, listRequest: ListRequest<IdRequest>): Observable<T[]> {
    return this._apiService.post(`${this._basePath}/${value.id}/unit`, listRequest).pipe(
      map(x => plainToClass(BaseUnit, x) as any)
    );
  }

  //#region

}
