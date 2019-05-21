import {Injectable} from '@angular/core';
import {ApiService} from '../base/api.service';
import {environment} from '../../../../../../environments/environment';
import {BaseTraining} from '../../../model/training/base/base-training';
import {Observable} from 'rxjs';
import {PageContainer} from '../../../bean/page-container';
import {map} from 'rxjs/operators';
import {plainToClassFromExist} from 'class-transformer';
import {UtilService} from '../../../../../services/util/util.service';
import {BaseTrainingQuery} from '../../query/base-training-query';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventApiService {

  private readonly _basePath = `${environment.restUrl}/baseTraining`;

  constructor(private _apiService: ApiService,
              private _utilService: UtilService) {
  }

  public getEvents<T extends BaseTraining>(query: BaseTrainingQuery): Observable<PageContainer<T>> {
    let httpParams = new HttpParams();
    for (const item of Object.keys(query)) {
      httpParams = httpParams.set(item, query[item]);
    }

    return this._apiService.get(this._basePath, httpParams).pipe(
      map(x => plainToClassFromExist(new PageContainer<BaseTraining>(BaseTraining), x) as any)
    );
  }

  public createEvent<T extends BaseTraining>(event: T): Observable<T> {
    return this._apiService.post<T>(this._basePath, event).pipe(
      map(x => this._utilService.plainDiscriminatorObjectToClass(BaseTraining, x))
    );
  }

  public updateEvent<T extends BaseTraining>(event: T): Observable<T> {
    return this._apiService.put<T>(`${this._basePath}/${event.id}`, event).pipe(
      map(x => this._utilService.plainDiscriminatorObjectToClass(BaseTraining, x))
    );
  }

  public saveEvent<T extends BaseTraining>(event: T): Observable<T> {
    if (event.isNew) {
      return this.createEvent(event);
    }
    return this.updateEvent(event);
  }

}
