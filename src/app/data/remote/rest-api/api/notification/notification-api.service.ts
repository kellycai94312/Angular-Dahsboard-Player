import {Injectable} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ApiService} from '../base/api.service';
import {BaseNotification} from '../../../model/notification/base/base-notification';
import {PageQuery} from '../../page-query';
import {Observable} from 'rxjs';
import {PageContainer} from '../../../bean/page-container';
import {IntegerWrapper} from '../../../bean/wrapper/integer-wrapper';
import {DateWrapper} from '../../../bean/wrapper/date-wrapper';

@Injectable({
  providedIn: 'root'
})
export class NotificationApiService {

  private readonly _basePath = `${environment.restUrl}/notification`;

  constructor(private _apiService: ApiService) {
  }

  public getNotifications<T extends BaseNotification>(query?: PageQuery): Observable<PageContainer<T>> {
    return this._apiService.getPageContainer(BaseNotification, this._basePath, query) as Observable<PageContainer<T>>;
  }

  public getUnreadCount(): Observable<IntegerWrapper> {
    return this._apiService.getValue(IntegerWrapper, `${this._basePath}/unread`);
  }

  public read(dateWrapper: DateWrapper): Observable<void> {
    return this._apiService.createValue(void 0, `${this._basePath}/read`, dateWrapper) as Observable<void>;
  }

  public approve<T extends BaseNotification>(notification: T): Observable<void> {
    return this._apiService.createValue(void 0, `${this._basePath}/${notification.id}/approve`) as Observable<void>;
  }

  public refuse<T extends BaseNotification>(notification: T): Observable<void> {
    return this._apiService.createValue(void 0, `${this._basePath}/${notification.id}/refuse`) as Observable<void>;
  }

}
