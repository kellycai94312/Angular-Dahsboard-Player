import {BaseNotification} from '../../../remote/model/notification/base/base-notification';

export interface INotificationViewModel {
  title: string;
  body: string;
  data: any | BaseNotification;

  build(): Promise<void>;

  preApprove(): Promise<boolean>;

  unsubscribe(): void;
}
