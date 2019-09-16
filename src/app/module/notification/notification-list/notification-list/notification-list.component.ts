import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {NotificationApiService} from '../../../../data/remote/rest-api/api/notification/notification-api.service';
import {Direction} from '../../../../components/ngx-virtual-scroll/model/direction';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {PageContainer} from '../../../../data/remote/bean/page-container';
import {BaseNotification} from '../../../../data/remote/model/notification/base/base-notification';
import {AppHelper} from '../../../../utils/app-helper';
import {NgxVirtualScrollComponent} from '../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {NotificationService} from '../../../../shared/notification.service';
import {takeWhile} from 'rxjs/operators';
import {EMPTY, Observable} from 'rxjs';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements AfterViewInit, OnDestroy {

  @ViewChild(NgxVirtualScrollComponent, { static: false })
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  private _readBeforeDate: Date;
  private _notDestroyed = true;

  constructor(private _notificationApiService: NotificationApiService,
              private _notificationService: NotificationService,
              private _appHelper: AppHelper) {
  }

  public async ngAfterViewInit(): Promise<void> {
    await this.ngxVirtualScrollComponent.reset();

    this._notificationService.notification$
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(async value => {
        await this.ngxVirtualScrollComponent.addItem(value.notification);
        await this._updateReadNotifications(value.notification.created);
      });
  }

  public ngOnDestroy(): void {
    delete this._notDestroyed;
  }

  public fetchItems = async (direction: Direction, query: PageQuery): Promise<PageContainer<BaseNotification>> => {
    const pageContainer = await this._notificationApiService.getNotifications(query).toPromise();
    const readBeforeDate = new Date(pageContainer.list
      .filter(x => x.read)
      .map(x => new Date(x.created).getTime())
      .reduce((previousValue, currentValue) => Math.max(previousValue, currentValue)));

    await this._updateReadNotifications(readBeforeDate).toPromise();

    return pageContainer;
  };

  private _updateReadNotifications(value: Date): Observable<void> {
    if (!this._readBeforeDate || value.getTime() > this._readBeforeDate.getTime()) {
      this._readBeforeDate = value;
      return this._notificationApiService.read({date: this._appHelper.getGmtDate(this._readBeforeDate)});
    }
    return EMPTY;
  }

}
