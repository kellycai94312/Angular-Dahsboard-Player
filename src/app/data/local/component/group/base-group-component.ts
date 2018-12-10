import {Group} from '../../../remote/model/group/base/group';
import {OnDestroy} from '@angular/core';
import {ISubscription} from 'rxjs-compat/Subscription';
import {GroupService} from '../../../../pages/group/group-page/service/group.service';
import {AppHelper} from '../../../../utils/app-helper';

export abstract class BaseGroupComponent<T extends Group> implements OnDestroy {

  public group: T;

  private readonly _groupSubscription: ISubscription;

  protected constructor(protected groupService: GroupService,
                        protected appHelper: AppHelper) {
    this._groupSubscription = this.groupService.groupSubject.subscribe(value => {
      this.group = value as T;
    });
  }

  ngOnDestroy(): void {
    this.appHelper.unsubscribe(this._groupSubscription);
  }

}
