import {Injectable, Type} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {UtilService} from '../../../../../services/util/util.service';
import {map} from 'rxjs/operators';
import {plainToClass, plainToClassFromExist} from 'class-transformer';
import {PageContainer} from '../../../bean/page-container';
import {IdentifiedObject} from '../../../base/identified-object';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly _restApiOptions = {
    headers: new HttpHeaders({Accept: 'application/json'}),
    withCredentials: true
  };

  constructor(private _httpClient: HttpClient,
              private _utilService: UtilService) {
  }

  public get<T = any>(url: string, params?: HttpParams): Observable<T> {
    const options = this._utilService.clone(this._restApiOptions);
    (options as any).params = params;
    return this._httpClient.get<T>(url, options);
  }

  public put<T = any>(url: string, body: any): Observable<T> {
    return this._httpClient.put<T>(url, body, this._restApiOptions);
  }

  public post<T = any>(url: string, body: any): Observable<T> {
    return this._httpClient.post<T>(url, body, this._restApiOptions);
  }

  public delete<T = any>(url: string, params?: HttpParams): Observable<T> {
    const options = this._utilService.clone(this._restApiOptions);
    (options as any).params = params;
    return this._httpClient.delete<T>(url, options);
  }

  public getHttpParamsFromObject<T extends object>(obj: T): HttpParams | null {
    if (!obj) {
      return null;
    }
    let httpParams = new HttpParams();
    for (const item of Object.keys(obj)) {
      httpParams = httpParams.set(item, obj[item]);
    }
    return httpParams;
  }

  //#region CRUD

  public getValue<T, Q extends object>(classObj: Type<T>, url: string, query?: Q): Observable<T> {
    return this.get(url, this.getHttpParamsFromObject(query)).pipe(
      map(x => plainToClass(classObj, x) as any)
    );
  }

  public getValues<T, Q extends object>(classObj: Type<T>, url: string, query?: Q): Observable<T[]> {
    return this.getValue(classObj, url, query) as any;
  }

  public getPageContainer<T, Q extends object>(classObj: Type<T>, url: string, query?: Q): Observable<PageContainer<T>> {
    return this.get(url, this.getHttpParamsFromObject(query)).pipe(
      map(x => plainToClassFromExist(new PageContainer<T>(classObj), x) as any)
    );
  }

  public createValue<T>(classObj: Type<T>, url: string, value: T | any): Observable<T | T[]> {
    return this.post(url, value).pipe(
      map(x => plainToClass(classObj, x) as any)
    );
  }

  public updateValue<T>(classObj: Type<T>, url: string, value: T | any): Observable<T | T[]> {
    return this.put(url, value).pipe(
      map(x => plainToClass(classObj, x) as any)
    );
  }

  public saveValue<T extends IdentifiedObject>(classObj: Type<T>, url: string, value: T): Observable<T> {
    if (value.id) {
      return this.updateValue(classObj, `${url}/${value.id}`, value) as Observable<T>;
    }
    return this.createValue(classObj, url, value) as Observable<T>;
  }

  public removeValue<T extends object>(classObj: Type<T>, url: string, query?: object, body?: object): Observable<T | T[]> {
    const options = this._utilService.clone(this._restApiOptions);
    (options as any).params = this.getHttpParamsFromObject(query);
    if (body) {
      (options as any).body = this._utilService.clone(body);
    }
    return this._httpClient.delete<T>(url, options).pipe(
      map(x => plainToClass(classObj, x) as T)
    );
  }

  //#endregion

}
