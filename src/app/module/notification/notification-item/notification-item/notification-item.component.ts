import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BaseComponent} from '../../../../data/local/component/base/base-component';
import {BaseNotification} from '../../../../data/remote/model/notification/base/base-notification';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {NotificationApiService} from '../../../../data/remote/rest-api/api/notification/notification-api.service';
import {NotificationService} from '../../../../shared/notification.service';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationItemComponent extends BaseComponent<BaseNotification> {

  public propertyConstantClass = PropertyConstant;

  constructor(public notificationService: NotificationService,
              private _notificationApiService: NotificationApiService) {
    super();
  }

  public onApprove(): void {
    this._notificationApiService.approve(this.data).subscribe(() => {
      this.data.approved = true;
    });
  }

  public onRefuse(): void {
    this._notificationApiService.refuse(this.data).subscribe(() => {
      this.data.approved = false;
    });
  }

  public async onClickContent(event: Event): Promise<void> {
    await this.notificationService.navigateByNotificationContent(event);
  }

}
