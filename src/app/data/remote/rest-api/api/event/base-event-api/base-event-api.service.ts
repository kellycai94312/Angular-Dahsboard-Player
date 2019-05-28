import {Injectable} from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {ApiService} from '../../base/api.service';
import {UtilService} from '../../../../../../services/util/util.service';
import {Observable} from 'rxjs';
import {PageContainer} from '../../../../bean/page-container';
import {HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {plainToClassFromExist} from 'class-transformer';
import {BaseEvent} from '../../../../model/event/base/base-event';
import {BaseEventQuery} from '../../../query/event/base-event-query';

@Injectable()
export class BaseEventApiService {

  private readonly _basePath = `${environment.restUrl}/baseEvent`;

  constructor(private _apiService: ApiService,
              private _utilService: UtilService) {
  }

  public getEvents<T extends BaseEvent>(query: BaseEventQuery): Observable<PageContainer<T>> {
    let httpParams = new HttpParams();
    for (const item of Object.keys(query)) {
      httpParams = httpParams.set(item, query[item]);
    }

    return this._apiService.get(this._basePath, httpParams).pipe(
      map(x => plainToClassFromExist(new PageContainer<BaseEvent>(BaseEvent), x) as any)
    );
  }

  public createEvent<T extends BaseEvent>(event: T): Observable<T> {
    return this._apiService.post<T>(this._basePath, event).pipe(
      map(x => this._utilService.plainDiscriminatorObjectToClass(BaseEvent, x))
    );
  }

  public updateEvent<T extends BaseEvent>(event: T): Observable<T> {
    return this._apiService.put<T>(`${this._basePath}/${event.id}`, event).pipe(
      map(x => this._utilService.plainDiscriminatorObjectToClass(BaseEvent, x))
    );
  }

  public saveEvent<T extends BaseEvent>(event: T): Observable<T> {
    if (!event.id) {
      return this.createEvent(event);
    }
    return this.updateEvent(event);
  }

  public removeEvent<T extends BaseEvent>(event: T): Observable<T> {
    return this._apiService.delete<T>(`${this._basePath}/${event.id}`).pipe(
      map(x => this._utilService.plainDiscriminatorObjectToClass(BaseEvent, x))
    );
  }

}
