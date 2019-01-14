import {Component, OnDestroy, OnInit} from '@angular/core';
import {Group} from '../../../../data/remote/model/group/base/group';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Tab} from '../../../../data/local/tab';
import {GroupService} from '../service/group.service';
import {ImageType} from '../../../../data/remote/model/file/image/image-type';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AppHelper} from '../../../../utils/app-helper';
import {TranslateService} from '@ngx-translate/core';
import {GroupTypeEnum} from '../../../../data/remote/model/group/base/group-type-enum';
import {IconEnum} from '../../../../components/ngx-button/model/icon-enum';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {TemplateModalService} from '../../../../service/template-modal.service';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {ISubscription} from 'rxjs-compat/Subscription';
import {PermissionService} from '../../../../shared/permission.service';
import {GroupPersonState} from '../../../../data/remote/model/group/group-person-state';
import {SplitButtonItem} from '../../../../components/ngx-split-button/bean/split-button-item';
import {BaseGroupComponent} from '../../../../data/local/component/group/base-group-component';
import {GroupSettingsComponent} from '../../../../module/group/group-settings/group-settings/group-settings.component';
import {GroupPersonPosition} from '../../../../data/remote/model/group/position/group-person-position';
import {AuthorizationService} from '../../../../shared/authorization.service';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss'],
  providers: [GroupService]
})
export class GroupPageComponent extends BaseGroupComponent<Group> implements OnInit, OnDestroy {

  public readonly propertyConstantClass = PropertyConstant;
  public readonly groupTypeEnumClass = GroupTypeEnum;
  public readonly iconEnumClass = IconEnum;
  public readonly imageTypeClass = ImageType;
  public readonly fileClassClass = FileClass;

  public readonly tabs: Tab[];
  public readonly splitButtonsItems: SplitButtonItem[];

  private _paramRouteSubscription: ISubscription;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _activatedRoute: ActivatedRoute,
              private _modalService: NgbModal,
              private _translateService: TranslateService,
              private _authorizationService: AuthorizationService,
              private _router: Router,
              private _templateModalService: TemplateModalService,
              private _permissionService: PermissionService,
              private _ngxModalService: NgxModalService,
              groupService: GroupService, appHelper: AppHelper) {
    super(groupService, appHelper);

    this.tabs = [
      {
        nameKey: 'news',
        routerLink: 'news'
      },
      {
        nameKey: 'employees',
        routerLink: 'employee'
      },
      {
        nameKey: 'subscribers',
        routerLink: 'subscriber'
      },
      {
        nameKey: 'requests',
        routerLink: 'request',
        visible: (item: Tab) => {
          return this.canEdit;
        }
      }
    ];

    this.splitButtonsItems = [
      {
        nameKey: 'join',
        callback: async () => {
          const params = {groupId: this.group.id};
          const result = await this.groupService.showSelectionGroupVacanciesModal(false, [], params);
          if (result.result && await this._templateModalService.addMissingUserRoles(result.data.map(x => x.position))) {
            await this.groupService.updateGroupPerson(await this._participantRestApiService.joinGroup({list: result.data.map(x => x.position)}, {}, params));
          }
        },
        visible: (): boolean => {
          return !this.isOwner && (!this.groupPerson);
        }
      },
      {
        nameKey: 'editRequest',
        callback: async () => {
          const groupPersonPositions = (await this._participantRestApiService.getGroupPersonPositions({},
            {unassigned: false, count: PropertyConstant.pageSizeMax},
            {groupId: this.group.id, personId: this.groupPerson.person.id})).list;
          const params = {groupId: this.group.id};
          const result = await this.groupService.showSelectionGroupVacanciesModal(false, groupPersonPositions, params);
          if (result.result && await this._templateModalService.addMissingUserRoles(result.data.map(x => x.position))) {
            await this._participantRestApiService.updateGroupPersonPositions({list: result.data.map(x => x.position)}, {}, {groupId: this.group.id, personId: this.groupPerson.person.id});
          }
        },
        visible: (): boolean => {
          return !this.isOwner && (this.groupPerson && this.groupPerson.state === GroupPersonState.JOIN_REQUEST);
        }
      },
      // TODO: Approve in notifications
      // {
      //   nameKey: 'viewRequest',
      //   callback: async () => {
      //     // TODO: View request
      //   },
      //   visible: (): boolean => {
      //     return !this.isOwner && (this.groupPerson && this.groupPerson.state === GroupPersonState.INVITE_REQUEST);
      //   }
      // },
      {
        nameKey: 'leave',
        callback: async () => {
          await this.leaveGroup();
        },
        visible: () => {
          return !!(!this.isOwner && this.groupPerson && this.groupPerson.state !== GroupPersonState.FOLLOWING);
        }
      },
      {
        nameKey: 'subscribe',
        callback: async () => {
          await this.groupService.updateGroupPerson(await this._participantRestApiService.followGroup({groupId: this.group.id}));
        },
        visible: () => {
          return !this.groupPerson;
        }
      },
      {
        nameKey: 'unsubscribe',
        callback: async () => {
          await this.leaveGroup();
        },
        visible: () => {
          return this.groupPerson && this.groupPerson.state === GroupPersonState.FOLLOWING;
        }
      }
    ];
  }

  async ngOnInit() {
    this._paramRouteSubscription = this._activatedRoute.params.subscribe(async val => {
      const groupId = val.id;
      if (!groupId || !(await this.groupService.initialize(groupId))) {
        await this._router.navigate(['/group']);
      }
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.appHelper.unsubscribe(this._paramRouteSubscription);
  }

  async initializeGroup(group: Group): Promise<void> {
    await super.initializeGroup(group);
  }

  public onEditSettings = async () => {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'settings';
    let groupSettingsComponent: GroupSettingsComponent = null;
    await modal.componentInstance.initializeBody(GroupSettingsComponent, async component => {
      groupSettingsComponent = component;
      await component.initialize(this.appHelper.cloneObject(this.group));

      modal.componentInstance.splitButtonItems = [
        this._ngxModalService.saveSplitItemButton(async () => {
          if (await this._ngxModalService.save(modal, component)) {
            this.appHelper.updateObject(this.group, component.data);
          }
        }),
        {
          nameKey: 'sendInvitations',
          callback: async () => {
            await this._ngxModalService.showSelectionGroupPersonsModal({id: this.group.id, unassigned: true}, async selectedItems => {
              await this.appHelper.tryAction('invitationsHaveBeenSent', 'invitationsHaveNotBeenSent', async () => {
                // for (const item of selectedItems.map(x => x.person)) {
                //   await this._participantRestApiService.inviteIntoGroup({id: item.id}, {}, {groupId: this.group.id});
                // }
              });
            });
          }
        },
        {
          nameKey: 'vacancies',
          callback: async () => {
            const vacancies = (await this._participantRestApiService.getGroupVacancies({},
              {unassigned: false, count: PropertyConstant.pageSizeMax},
              {groupId: this.group.id}
            )).list.map(x => {
              const groupPersonPosition = new GroupPersonPosition();
              groupPersonPosition.position = x;
              return groupPersonPosition;
            });
            const params = {groupId: this.group.id};
            const result = await this.groupService.showSelectionGroupVacanciesModal(true, vacancies, params);
            if (result.result) {
              await this._participantRestApiService.updateGroupVacancies({list: result.data.map(x => x.position)}, {}, params);
            }
          }
        },
        this._ngxModalService.removeSplitItemButton(async () => {
          if (await this._ngxModalService.remove(modal, component)) {
            await this._router.navigate(['/group']);
          }
        })
      ];
    });
    await this._ngxModalService.awaitModalResult(modal);
    await this.groupService.updateGroup(groupSettingsComponent.data);
  };

  //#region Change group person state

  private async leaveGroup(): Promise<boolean> {
    if (!this.groupPerson) {
      return false;
    }
    return await this.appHelper.trySave(async () => {
      await this._participantRestApiService.leaveGroup({groupId: this.group.id});
      await this.groupService.updateGroupPerson(null);
    });
  }

  //#endregion

}
