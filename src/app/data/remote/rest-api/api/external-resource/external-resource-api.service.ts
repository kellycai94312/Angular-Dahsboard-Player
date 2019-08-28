import {Injectable} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ApiService} from '../base/api.service';
import {Observable} from 'rxjs';
import {ExternalResource} from '../../../model/external-resource';
import {FileClass} from '../../../model/file/base/file-class';

@Injectable({
  providedIn: 'root'
})
export class ExternalResourceApiService {

  private readonly _basePath = `${environment.restUrl}/externalResource`;

  constructor(private _apiService: ApiService) {
  }

  public getExternalResources<T extends ExternalResource>(query: { clazz: FileClass, objectId: number }): Observable<T[]> {
    return this._apiService.getValues(ExternalResource, this._basePath, query) as Observable<T[]>;
  }

  public getExternalResource<T extends ExternalResource>(objectId: number): Observable<T> {
    return this._apiService.getValue(ExternalResource, `${this._basePath}/${objectId}`) as Observable<T>;
  }

  public saveExternalResource<T extends ExternalResource>(value: T): Observable<T> {
    return this._apiService.saveValue(ExternalResource, this._basePath, value) as Observable<T>;
  }

  public removeExternalResource<T extends ExternalResource>(value: T): Observable<T> {
    return this._apiService.removeValue(ExternalResource, `${this._basePath}/${value.id}`) as Observable<T>;
  }

}
