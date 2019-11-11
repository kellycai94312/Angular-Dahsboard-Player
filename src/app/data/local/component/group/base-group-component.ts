import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'app/data/remote/model/group/base';
import { GroupPerson } from 'app/data/remote/model/group/person';
import { GroupService } from 'app/pages/group/group-page/service/group.service';
import { AppHelper } from 'app/utils/app-helper';
import { BehaviorSubject } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

export abstract class BaseGroupComponent<T extends Group> implements OnInit, OnDestroy {

  public readonly canEditSubject = new BehaviorSubject(false);
  public group: T;
  public groupPerson: GroupPerson;
  public canEdit: boolean;
  public isOwner: boolean;
  protected notDestroyed = true;

  protected constructor(public groupService: GroupService,
                        public appHelper: AppHelper) {
  }

  public ngOnInit(): void {
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

  public ngOnDestroy(): void {
    delete this.notDestroyed;
  }

  public initializeGroupService(activatedRoute: ActivatedRoute,
                                router: Router): void {
    activatedRoute.params
      .pipe(takeWhile(() => this.notDestroyed))
      .subscribe(async val => {
        const groupId = val.id;
        if (!groupId || !(await this.groupService.initialize(groupId))) {
          await router.navigate(['/group']);
        }
      });
  }

  public async initializeGroup(group: T): Promise<void> {
    this.group = group;
  }

  public async initializeGroupPerson(groupPerson: GroupPerson): Promise<void> {
    this.groupPerson = groupPerson;
    this.canEdit = await this.groupService.canEditGroup();
    this.canEditSubject.next(this.canEdit);
    this.isOwner = await this.groupService.areYouGroupCreator();
  }

}
