import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {UtilService} from '../../../../../services/util/util.service';

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

}
