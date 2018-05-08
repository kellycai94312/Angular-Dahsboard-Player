import {Injectable, OnDestroy} from '@angular/core';
import {BaseNotification} from '../data/remote/model/notification/base/base-notification';
import {GroupNotification} from '../data/remote/model/notification/group/group-notification';
import {TrainingNotification} from '../data/remote/model/notification/training/training-notification';
import {NotificationType} from '../data/remote/model/notification/base/notification-type';
import {INotificationViewModel} from '../data/local/view-model/notification/i-notification-view-model';
import {GroupNotificationViewModel} from '../data/local/view-model/notification/group-notification-view-model';
import {TrainingNotificationViewModel} from '../data/local/view-model/notification/training-notification-view-model';
import {NotificationWrapper} from '../data/remote/bean/wrapper/notification-wrapper';
import {ISubscription} from 'rxjs/Subscription';
import {Subject} from 'rxjs/Subject';
import {ParticipantStompService} from '../data/remote/web-socket/participant-stomp.service';

@Injectable()
export class NotificationService implements OnDestroy {

  public readonly handleNotification: Subject<INotificationViewModel>;

  private _notificationSubscription: ISubscription;

  constructor(private _participantStompService: ParticipantStompService) {
    this.handleNotification = new Subject<INotificationViewModel>();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  public createNotificationViewModel(notification: BaseNotification): INotificationViewModel {
    switch (notification.discriminator) {
      case NotificationType.GROUP:
        return new GroupNotificationViewModel(notification as GroupNotification);
      case NotificationType.TRAINING:
        return new TrainingNotificationViewModel(notification as TrainingNotification);
    }
  }

  public subscribe() {
    if (this._notificationSubscription) {
      return;
    }

    try {
      this._notificationSubscription = this._participantStompService.subscribeNotification()
        .map(message => this._participantStompService.messageToObject<NotificationWrapper>(message))
        .subscribe(async notification => {
          const viewModel = this.createNotificationViewModel(notification.notification);
          await viewModel.build();
          this.handleNotification.next(viewModel);
        });
    } catch (e) {
    }
  }

  public unsubscribe() {
    if (this._notificationSubscription) {
      this._notificationSubscription.unsubscribe();
      delete this._notificationSubscription;
    }
  }

}
