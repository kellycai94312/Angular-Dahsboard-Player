import {BaseNotification} from '../../../remote/model/notification/base/base-notification';

export interface INotificationViewModel {
  title: string;
  body: string;
  data: any | BaseNotification;

  build(): Promise<void>;

  unsubscribe(): void;
}
