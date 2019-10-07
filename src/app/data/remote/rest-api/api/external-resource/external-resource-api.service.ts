import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { IdentifiedObject } from '../../../base';
import { ExternalResource, ExternalResourceClass } from '../../../model/external-resource';
import { ApiService } from '../base/api.service';

@Injectable({
  providedIn: 'root'
})
export class ExternalResourceApiService {

  private readonly _basePath = `${environment.restUrl}/externalResource`;

  constructor(private _apiService: ApiService) {
  }

  public getExternalResources<T extends ExternalResource>(clazz: ExternalResourceClass, object: IdentifiedObject): Observable<T[]> {
    return this._apiService.getValues(ExternalResource, `${this._basePath}/${clazz}/${object.id}`) as Observable<T[]>;
  }

  public saveExternalResource<T extends ExternalResource>(clazz: ExternalResourceClass, object: IdentifiedObject, value: T): Observable<T> {
    return this._apiService.saveValue(ExternalResource, `${this._basePath}/${clazz}/${object.id}`, value) as Observable<T>;
  }

  public removeExternalResource<T extends ExternalResource>(clazz: ExternalResourceClass, object: IdentifiedObject, value: T): Observable<T> {
    return this._apiService.removeValue(ExternalResource, `${this._basePath}/${clazz}/${object.id}/${value.id}`) as Observable<T>;
  }

}
