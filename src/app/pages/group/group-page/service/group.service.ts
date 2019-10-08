import { ComponentFactoryResolver, Injectable, OnDestroy } from '@angular/core';
import { DialogResult } from 'app/data/local/dialog-result';
import { PropertyConstant } from 'app/data/local/property-constant';
import { PageContainer } from 'app/data/remote/bean/page-container';
import { GroupPerson, GroupPersonState } from 'app/data/remote/model/group';
import { Group } from 'app/data/remote/model/group/base';
import { BasePosition } from 'app/data/remote/model/person-position/base-position';
import { Position } from 'app/data/remote/model/person-position/position';
import { UserRole } from 'app/data/remote/model/user-role';
import { UserRoleEnum } from 'app/data/remote/model/user-role-enum';
import { GroupApiService } from 'app/data/remote/rest-api/api/group/group-api.service';
import { ParticipantRestApiService } from 'app/data/remote/rest-api/participant-rest-api.service';
import { GroupPersonPositionQuery } from 'app/data/remote/rest-api/query/group-person-position-query';
import { GroupPersonQuery } from 'app/data/remote/rest-api/query/group-person-query';
import { GroupPersonItemComponent } from 'app/module/group/group-person-item/group-person-item/group-person-item.component';
import { GroupPositionItemComponent } from 'app/module/group/group-position/group-position-item/group-position-item/group-position-item.component';
import { ModalBuilderService } from 'app/service/modal-builder/modal-builder.service';
import { PermissionService } from 'app/shared/permission.service';
import { TranslateObjectService } from 'app/shared/translate-object.service';
import { AppHelper } from 'app/utils/app-helper';
import { Observable, Subject, Unsubscribable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable()
export class GroupService implements OnDestroy {

  public readonly group$: Observable<Group>;
  public readonly groupPerson$: Observable<GroupPerson>;
  public refreshMembers: Subject<void>;

  get updateData$(): Observable<any> {
    return this._updateDataSubject.asObservable();
  }

  private readonly _groupSubject: Subject<Group>;
  private readonly _groupSubscription: Unsubscribable;
  private readonly _groupPersonSubject: Subject<GroupPerson>;
  private readonly _updateDataSubject = new Subject<any>();

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _permissionService: PermissionService,
              private _translateObjectService: TranslateObjectService,
              private _groupApiService: GroupApiService,
              private _modalBuilderService: ModalBuilderService,
              private _componentFactoryResolver: ComponentFactoryResolver,
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

  public ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._groupSubscription);
  }

  public async initialize(groupId: number): Promise<boolean> {
    return this._appHelper.tryLoad(async () => {
      const group = await this._participantRestApiService.getGroup({id: groupId});
      this._groupSubject.next(group);
    });
  }

  private async initializeGroupPerson(group: Group): Promise<void> {
    const groupPerson = await this._groupApiService.getCurrentGroupPerson(group).toPromise();
    this.updateGroupPerson(groupPerson);
  }

  public updateGroup(group: Group): void {
    this._groupSubject.next(group);
  }

  public updateGroupPerson(groupPerson: GroupPerson): void {
    this._groupPersonSubject.next(groupPerson);
  }

  public async showSelectionGroupVacanciesModal(group: Group,
                                                unassigned: boolean,
                                                items: BasePosition[]): Promise<DialogResult<BasePosition[]>> {
    return await this.showSelectionGroupPersonPositions(items, async (query: GroupPersonPositionQuery) => {
      query.unassigned = unassigned;
      return await this._groupApiService.getGroupVacancies(group, query).toPromise();
    });
  }

  private async showSelectionGroupPersonPositions(items: BasePosition[],
                                                  fetchItems: (query: GroupPersonPositionQuery) => Promise<PageContainer<BasePosition>>): Promise<DialogResult<BasePosition[]>> {
    return await this._modalBuilderService.showSelectionItemsModal(items, fetchItems, GroupPositionItemComponent,
      async (component, data) => {
        await component.initialize(data);
      },
      {
        componentFactoryResolver: this._componentFactoryResolver,
        compare: (first, second) => {
          return first.id == second.id;
        },
        title: `${await this._translateObjectService.getTranslation('vacancies')} | ${await this._translateObjectService.getTranslation('selection')}`,
        minCount: 1
      }
    );
  }

  public async showSelectionGroupPersonsModal(items: GroupPerson[], groupPersonQuery: GroupPersonQuery): Promise<DialogResult<GroupPerson[]>> {
    return await this._modalBuilderService.showSelectionItemsModal(items, async (query: GroupPersonQuery) => {
        return await this._participantRestApiService.getGroupPersonsByGroup(this._appHelper.updatePageQuery(query, groupPersonQuery));
      }, GroupPersonItemComponent, async (component, data) => {
        await component.initialize(data);
      },
      {
        title: `${await this._translateObjectService.getTranslation('persons.section')} | ${await this._translateObjectService.getTranslation('selection')}`,
        componentFactoryResolver: this._componentFactoryResolver,
        compare: (first, second) => first.person.id == second.person.id
      }
    );
  }

  public updateData(item: any): void {
    this._updateDataSubject.next(item);
  }

  //#region Permission

  public async canEditGroup(): Promise<boolean> {
    return await this.canEditByAnyUserRole([UserRoleEnum.ADMIN, UserRoleEnum.OPERATOR]);
  }

  public async canEditSubgroup(): Promise<boolean> {
    return await this.canEditByAnyUserRole([UserRoleEnum.ADMIN, UserRoleEnum.OPERATOR, UserRoleEnum.TRAINER]);
  }

  public async canShowTemplatesSubgroups(): Promise<boolean> {
    return this.canEditByAnyUserRole([UserRoleEnum.ADMIN, UserRoleEnum.OPERATOR]);
  }

  public async canEditNews(): Promise<boolean> {
    return this.canEditByAnyUserRole([UserRoleEnum.ADMIN]);
  }

  public async canViewAdministrationTool(): Promise<boolean> {
    const group = await this._appHelper.toPromise(this.group$);
    if (group && group.dataOperator) {
      return true;
    }
    return this.canEditByAnyUserRole([UserRoleEnum.ADMIN, UserRoleEnum.OPERATOR]);
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

      const positions = (await this._groupApiService.getGroupPersonPositions(groupPerson, {
        unassigned: false,
        count: PropertyConstant.pageSizeMax
      }).toPromise()).list.map(x => x.position as any as Position);

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
