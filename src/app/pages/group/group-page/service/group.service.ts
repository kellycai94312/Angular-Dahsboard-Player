import {Injectable, OnDestroy} from '@angular/core';
import {Group} from '../../../../data/remote/model/group/base/group';
import {Observable, Subject} from 'rxjs';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {GroupPerson} from '../../../../data/remote/model/group/group-person';
import {UserRoleEnum} from '../../../../data/remote/model/user-role-enum';
import {PermissionService} from '../../../../shared/permission.service';
import {AppHelper} from '../../../../utils/app-helper';
import {ISubscription} from 'rxjs-compat/Subscription';
import {GroupPersonState} from '../../../../data/remote/model/group/group-person-state';
import {shareReplay} from 'rxjs/operators';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {UserRole} from '../../../../data/remote/model/user-role';

@Injectable()
export class GroupService implements OnDestroy {

  public readonly group$: Observable<Group>;
  public readonly groupPerson$: Observable<GroupPerson>;
  public refreshMembers: Subject<void>;

  private readonly _groupSubject: Subject<Group>;
  private readonly _groupSubscription: ISubscription;
  private readonly _groupPersonSubject: Subject<GroupPerson>;

  constructor(private  _participantRestApiService: ParticipantRestApiService,
              private _permissionService: PermissionService,
              private _appHelper: AppHelper) {
    this._groupSubject = new Subject<Group>();
    this.group$ = this._groupSubject.asObservable().pipe(shareReplay(1));
    this._groupSubscription = this.group$.subscribe(async val => {
      await this.initializeGroupPerson(val);
    });

    this._groupPersonSubject = new Subject<GroupPerson>();
    this.groupPerson$ = this._groupPersonSubject.asObservable().pipe(shareReplay(1));
    this.refreshMembers = new Subject<void>();
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._groupSubscription);
  }

  public async initialize(groupId: number): Promise<boolean> {
    return await this._appHelper.tryLoad(async () => {
      const group = await this._participantRestApiService.getGroup({id: groupId});
      this._groupSubject.next(group);
    });
  }

  private async initializeGroupPerson(group: Group) {
    let groupPerson: GroupPerson = null;
    try {
      groupPerson = await this._participantRestApiService.getCurrentGroupPerson({id: group.id});
    } catch (e) {
    }
    await this.updateGroupPerson(groupPerson);
  }

  public async updateGroup(group: Group) {
    this._groupSubject.next(group);
  }

  public async updateGroupPerson(groupPerson: GroupPerson) {
    this._groupPersonSubject.next(groupPerson);
  }

  //#region Permission

  public async canEditGroup(): Promise<boolean> {
    return await this.canEditByAnyUserRole([UserRoleEnum.ADMIN, UserRoleEnum.OPERATOR]);
  }

  public async canEditNews(): Promise<boolean> {
    return this.canEditByAnyUserRole([UserRoleEnum.ADMIN]);
  }

  public async areYouGroupCreator(): Promise<boolean> {
    const groupPerson = await this._appHelper.toPromise(this.groupPerson$);
    if (groupPerson) {
      return this._permissionService.areYouCreator(groupPerson.group, groupPerson.person);
    }
    return false;
  }

  private async canEditByAnyUserRole(userRoleEnums: UserRoleEnum[]): Promise<boolean> {
    const groupPerson = await this._appHelper.toPromise(this.groupPerson$);
    if (groupPerson) {
      if (groupPerson.state !== GroupPersonState.APPROVED) {
        return false;
      }

      const positions = (await this._participantRestApiService.getGroupPersonPositions({},
        {unassigned: false, count: PropertyConstant.pageSizeMax},
        {groupId: groupPerson.group.id, personId: groupPerson.person.id}
      )).list.map(x => x.position);

      let userRoles: UserRole[] = [];
      for (const item of positions) {
        const result = this._appHelper.except(item.positionUserRoles.map(x => x.userRole), userRoles);
        if (result.length) {
          userRoles = userRoles.concat(result);
        }
      }
      return this._permissionService.hasAnyRoles(userRoles, userRoleEnums) || await this.areYouGroupCreator();
    }
    return false;
  }

  //#endregion

}
