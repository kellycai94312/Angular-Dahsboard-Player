import { Component, ComponentFactoryResolver } from '@angular/core';
import { NgxModalService } from 'app/components/ngx-modal/service/ngx-modal.service';
import { GroupConnectionRequestClaim } from 'app/data/remote/model/group/connection';
import { GroupConnectionNotification } from 'app/data/remote/model/notification/group/connection/group-connection-notification';
import { GroupConnectionRequestApiService } from 'app/data/remote/rest-api/api/group-connection-request/group-connection-request-api.service';
import { BaseComponent } from '../../../../data/local/component/base/base-component';
import { PropertyConstant } from '../../../../data/local/property-constant';
import { BaseNotification } from '../../../../data/remote/model/notification/base/base-notification';
import { NotificationApiService } from '../../../../data/remote/rest-api/api/notification/notification-api.service';
import { NotificationService } from '../../../../shared/notification.service';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss']
})
export class NotificationItemComponent extends BaseComponent<BaseNotification> {

  public propertyConstantClass = PropertyConstant;

  // public get canEditGroupConnectionRequestClaim(): boolean {
  //   if ((this.data instanceof GroupConnectionNotification && this.data.groupConnectionRequest instanceof GroupConnectionRequestClaim) ||
  //     (this.data instanceof GroupNotification && this.data.groupNotificationType === GroupNotificationType.JOIN_PERSON_CLAIM)) {
  //     return true;
  //   }
  //   return false;
  // }

  constructor(public notificationService: NotificationService,
              private _groupConnectionRequestApiService: GroupConnectionRequestApiService,
              private _ngxModalService: NgxModalService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _notificationApiService: NotificationApiService) {
    super();
  }

  protected async initializeComponent(data: BaseNotification): Promise<boolean> {
    await super.initializeComponent(data);

    if (this.data instanceof GroupConnectionNotification && this.data.groupConnectionRequest instanceof GroupConnectionRequestClaim) {
      this.data.action = true;
    }

    return true;
  }

  public onApprove(): void {
    if (this.data instanceof GroupConnectionNotification && this.data.groupConnectionRequest instanceof GroupConnectionRequestClaim) {
      this._groupConnectionRequestApiService.approveGroupConnectionRequest(this.data.groupConnectionRequest).subscribe(value => {
        this.data.approved = true;
      });
    } else {
      this._notificationApiService.approve(this.data).subscribe(() => {
        this.data.approved = true;
      });
    }
  }

  public onRefuse(): void {
    if (this.data instanceof GroupConnectionNotification && this.data.groupConnectionRequest instanceof GroupConnectionRequestClaim) {
      this._groupConnectionRequestApiService.rejectGroupConnectionRequest(this.data.groupConnectionRequest).subscribe(value => {
        this.data.approved = false;
      });
    } else {
      this._notificationApiService.refuse(this.data).subscribe(() => {
        this.data.approved = false;
      });
    }
  }

  // public async onEdit(): Promise<void> {
  //   const modal = this._ngxModalService.open();
  //   await modal.componentInstance.initializeBody(ViewGroupClaimComponent, async component => {
  //     await component.initialize(this.data as any);
  //   }, {componentFactoryResolver: this._componentFactoryResolver});
  // }

  public async onClickContent(event: Event): Promise<void> {
    await this.notificationService.navigateByNotificationContent(event);
  }

}
