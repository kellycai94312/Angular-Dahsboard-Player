import {Group} from '../../../remote/model/group/base/group';
import {OnDestroy} from '@angular/core';
import {GroupService} from '../../../../pages/group/group-page/service/group.service';
import {AppHelper} from '../../../../utils/app-helper';
import {GroupPerson} from '../../../remote/model/group/group-person';
import {takeWhile} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

export abstract class BaseGroupComponent<T extends Group> implements OnDestroy {

  public readonly canEditSubject = new BehaviorSubject(false);
  public group: T;
  public groupPerson: GroupPerson;
  public canEdit: boolean;
  public isOwner: boolean;

  protected notDestroyed = true;

  protected constructor(protected groupService: GroupService,
                        protected appHelper: AppHelper) {
    this.groupService.group$
      .pipe(takeWhile(() => this.notDestroyed))
      .subscribe(async value => {
        await this.initializeGroup(value as T);
      });
    this.groupService.groupPerson$
      .pipe(takeWhile(() => this.notDestroyed))
      .subscribe(async value => {
        await this.initializeGroupPerson(value);
      });
  }

  ngOnDestroy(): void {
    this.notDestroyed = false;
  }

  async initializeGroup(group: T): Promise<void> {
    this.group = group;
  }

  async initializeGroupPerson(groupPerson: GroupPerson): Promise<void> {
    this.groupPerson = groupPerson;
    this.canEdit = await this.groupService.canEditGroup();
    this.canEditSubject.next(this.canEdit);
    this.isOwner = await this.groupService.areYouGroupCreator();
  }

}
