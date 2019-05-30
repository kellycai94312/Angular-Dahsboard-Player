import {Injectable} from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {ApiService} from '../../base/api.service';
import {UtilService} from '../../../../../../services/util/util.service';
import {Observable} from 'rxjs';
import {PageContainer} from '../../../../bean/page-container';
import {map} from 'rxjs/operators';
import {plainToClassFromExist} from 'class-transformer';
import {BaseEvent} from '../../../../model/event/base/base-event';
import {BaseEventQuery} from '../../../query/event/base-event-query';
import {EventGroup} from '../../../../model/event/event-group';
import {ListRequest} from '../../../../request/list-request';
import {Group} from '../../../../model/group/base/group';

@Injectable()
export class BaseEventApiService {

  private readonly _basePath = `${environment.restUrl}/baseEvent`;

  constructor(private _apiService: ApiService,
              private _utilService: UtilService) {
  }

  public getEvents<T extends BaseEvent>(query: BaseEventQuery): Observable<PageContainer<T>> {
    return this._apiService.get(this._basePath, this._apiService.getHttpParamsFromObject(query)).pipe(
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

  //#region Group

  public getEventGroups(event: BaseEvent,
                        query: BaseEventQuery): Observable<PageContainer<EventGroup>> {
    return this._apiService.get(`${this._basePath}/${event.id}/group`, this._apiService.getHttpParamsFromObject(query)).pipe(
      map(x => plainToClassFromExist(new PageContainer<EventGroup>(EventGroup), x) as any)
    );
  }

  public updateEventGroups(event: BaseEvent,
                           groups: ListRequest<Group>): Observable<PageContainer<EventGroup>> {
    return this._apiService.post(`${this._basePath}/${event.id}/group`, groups.list.map(x => x.id)).pipe(
      map(x => plainToClassFromExist(new PageContainer<EventGroup>(EventGroup), x) as any)
    );
  }

  //#endregion

}
