import {Injectable} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ApiService} from '../base/api.service';
import {Observable} from 'rxjs';
import {PageContainer} from '../../../bean/page-container';
import {Person} from '../../../model/person';
import {PersonQuery} from '../../query/person-query';

@Injectable({
  providedIn: 'root'
})
export class PersonApiService {
  private readonly _basePath = `${environment.restUrl}/person`;

  constructor(private _apiService: ApiService) {
  }

  public getPersons<T extends Person>(query: PersonQuery): Observable<PageContainer<T>> {
    return this._apiService.getPageContainer(Person, this._basePath, query) as Observable<PageContainer<T>>;
  }

  public createPerson<T extends Person>(value: T): Observable<T> {
    return this._apiService.createValue(Person, this._basePath, value) as Observable<T>;
  }

  public updatePerson<T extends Person>(value: T): Observable<T> {
    return this._apiService.updateValue(Person, this._basePath, value) as Observable<T>;
  }

  public savePerson<T extends Person>(value: T): Observable<T> {
    return this._apiService.saveValue(Person, this._basePath, value) as Observable<T>;
  }

  public removePerson<T extends Person>(value: T): Observable<T> {
    return this._apiService.removeValue(Person, `${this._basePath}/${value.id}`) as Observable<T>;
  }

}
