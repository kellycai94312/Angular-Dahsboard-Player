import {Group} from '../../../remote/model/group/base/group';
import {OnDestroy} from '@angular/core';
import {ISubscription} from 'rxjs-compat/Subscription';
import {GroupService} from '../../../../pages/group/group-page/service/group.service';
import {AppHelper} from '../../../../utils/app-helper';
import {GroupPerson} from '../../../remote/model/group/group-person';

export abstract class BaseGroupComponent<T extends Group> implements OnDestroy {

  public group: T;
  public groupPerson: GroupPerson;
  public canEdit: boolean;
  public isOwner: boolean;

  private readonly _groupSubscription: ISubscription;
  private readonly _groupPersonSubscription: ISubscription;

  protected constructor(protected groupService: GroupService,
                        protected appHelper: AppHelper) {
    this._groupSubscription = this.groupService.group$.subscribe(async value => {
      await this.initializeGroup(value as T);
    });
    this._groupPersonSubscription = this.groupService.groupPerson$.subscribe(async value => {
      await this.initializeGroupPerson(value);
    });
  }

  ngOnDestroy(): void {
    this.appHelper.unsubscribe(this._groupSubscription);
    this.appHelper.unsubscribe(this._groupPersonSubscription);
  }

  async initializeGroup(group: T): Promise<void> {
    this.group = group;
  }

  async initializeGroupPerson(groupPerson: GroupPerson): Promise<void> {
    this.groupPerson = groupPerson;
    this.canEdit = await this.groupService.canEditGroup();
    this.isOwner = await this.groupService.areYouGroupCreator();
  }

}
