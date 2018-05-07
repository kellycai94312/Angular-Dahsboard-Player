import {AfterContentInit, AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {NotificationService} from '../../../shared/notification.service';
import {INotificationViewModel} from '../../../data/local/view-model/notification/i-notification-view-model';
import {Router} from '@angular/router';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {BaseNotification} from '../../../data/remote/model/notification/base/base-notification';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {BaseNotificationViewModel} from '../../../data/local/view-model/notification/base-notification-view-model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, AfterContentInit, AfterViewInit {

  @Input()
  public data: BaseNotification;

  public viewModel: INotificationViewModel;

  constructor(private _notificationService: NotificationService,
              private _router: Router,
              private _participantRestApiService: ParticipantRestApiService,
              private _toastrService: ToastrService,
              private _translateService: TranslateService) {
    this.viewModel = new BaseNotificationViewModel(new BaseNotification());
  }

  ngOnInit() {
  }

  async ngAfterContentInit() {
    this.viewModel = this._notificationService.createNotificationViewModel(this.data);
    await this.viewModel.build();
  }

  ngAfterViewInit() {
  }

  public async onDataClick(event: any) {
    if (event.target.tagName.toLowerCase() === 'a') {
      const link = event.target.getAttribute('link');
      await this._router.navigate([link]);
    }
  }

  public async onApprove() {
    try {
      await this._participantRestApiService.approveNotification({id: this.data.id});
      this.data.approved = true;

      this._toastrService.error(await this.translateByKey('success'));
    } catch (e) {
      this._toastrService.error(await this.translateByKey('error'));
    }
  }

  public async onRefuse() {
    try {
      await this._participantRestApiService.refuseNotification({id: this.data.id});
      this.data.approved = false;

      this._toastrService.error(await this.translateByKey('success'));
    } catch (e) {
      this._toastrService.error(await this.translateByKey('error'));
    }
  }

  private translateByKey(key: string): Promise<string> {
    return this._translateService.get(key).toPromise();
  }

}
