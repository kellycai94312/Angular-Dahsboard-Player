import {BaseNotification} from '../../../remote/model/notification/base/base-notification';
import {INotificationViewModel} from './i-notification-view-model';
import {TranslateService} from '@ngx-translate/core';
import {SubscriptionLike as ISubscription} from 'rxjs';
import {AppModule} from '../../../../app.module';
import {BaseViewModel} from '../base/base-view-model';
import {Person} from '../../../remote/model/person';

export class BaseNotificationViewModel<T extends BaseNotification> extends BaseViewModel<T> implements INotificationViewModel {

  public title: string;
  public body: string;

  protected readonly translateService: TranslateService;
  private readonly translateServiceSubscription: ISubscription;

  constructor(data: T) {
    super(data);

    this.translateService = AppModule.injector.get(TranslateService);
    this.translateServiceSubscription = this.translateService.onLangChange.subscribe(async x => {
      await this.build();
    });
  }

  build(): Promise<void> {
    return null;
  }

  public unsubscribe(): void {
    this.translateServiceSubscription.unsubscribe();
  }

  public getPersonLink(person: Person): string {
    return `<a class="link" link="/person/${person.id}">${person.firstName} ${person.lastName}</a>`;
  }

}
