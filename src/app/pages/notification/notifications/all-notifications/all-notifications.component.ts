import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgxVirtualScrollComponent} from '../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {ISubscription} from 'rxjs-compat/Subscription';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {NotificationService} from '../../../../shared/notification.service';
import {Direction} from '../../../../components/ngx-virtual-scroll/model/direction';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';

@Component({
  selector: 'app-all-notifications',
  templateUrl: './all-notifications.component.html',
  styleUrls: ['./all-notifications.component.scss']
})
export class AllNotificationsComponent implements OnInit, OnDestroy {

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  private readBefore: Date;
  private readonly _notificationSubscription: ISubscription;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _notificationService: NotificationService) {
    this.readBefore = new Date(0);
    this._notificationSubscription = this._notificationService.handleNotification.subscribe(x => {
      this.ngxVirtualScrollComponent.query.from++;
      this.ngxVirtualScrollComponent.items.push(x.data);
      // TODO: Add read notification
    });
  }

  async ngOnInit() {
    // TODO: I don't understand why without setTimeout this method doesn't call!
    setTimeout(async () => {
      await this.ngxVirtualScrollComponent.reset();
    });
  }

  ngOnDestroy(): void {
    this._notificationSubscription.unsubscribe();
  }

  public getItems: Function = async (direction: Direction, pageQuery: PageQuery) => {
    // TODO: Use optimize algorithm
    const pageContainer = await this._participantRestApiService.getNotifications(pageQuery);
    for (let i = 0; i < pageContainer.list.length; i++) {
      const item = pageContainer.list[i];
      if (item.read) {
        continue;
      }
      const time = Date.parse(item.created.toString());
      if (this.readBefore.getTime() < time) {
        this.readBefore = new Date(time);
      }
    }

    await this._participantRestApiService.createReadNotifications({date: this._appHelper.getGmtDate(this.readBefore)});
    return pageContainer;
  };

}