import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Group} from '../../../../data/remote/model/group/base/group';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GroupPerson} from '../../../../data/remote/model/group/group-person';
import {Tab} from '../../../../data/local/tab';
import {GroupService} from '../service/group.service';
import {ImageComponent} from '../../../../components/image/image.component';
import {Image} from '../../../../data/remote/model/file/image/image';
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
import {OrganizationTrainer} from '../../../../data/remote/model/group/organization-trainer';
import {GroupSettingsComponent} from '../group-settings/group-settings.component';
import {GroupPersonState} from '../../../../data/remote/model/group/group-person-state';
import {SplitButtonItem} from '../../../../components/ngx-split-button/bean/split-button-item';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss']
})
export class GroupPageComponent implements OnInit, OnDestroy {

  public readonly propertyConstantClass = PropertyConstant;
  public readonly groupTypeEnumClass = GroupTypeEnum;
  public readonly iconEnumClass = IconEnum;

  public group: Group;
  public groupPerson: GroupPerson;

  @ViewChild('logo')
  public logo: ImageComponent;

  public readonly tabs: Tab[];
  public readonly splitButtonsItems: SplitButtonItem[];
  public canEdit: boolean;
  public isOwner: boolean;
  public organizationTrainers: OrganizationTrainer[];

  private readonly _groupSubscription: ISubscription;
  private readonly _groupPersonSubscription: ISubscription;
  private readonly _refreshMembersSubscription: ISubscription;
  private _paramRouteSubscription: ISubscription;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _activatedRoute: ActivatedRoute,
              private _modalService: NgbModal,
              private _appHelper: AppHelper,
              private _translateService: TranslateService,
              private _router: Router,
              private _templateModalService: TemplateModalService,
              private _permissionService: PermissionService,
              private _ngxModalService: NgxModalService,
              private _groupService: GroupService) {
    this._groupSubscription = this._groupService.group$.subscribe(async val => {
      await this.initialize(val);
    });

    this._groupPersonSubscription = this._groupService.groupPerson$.subscribe(async val => {
      await this.initializeGroupPerson(val);
    });
    this._refreshMembersSubscription = this._groupService.refreshMembers.subscribe(async () => {
      await this.updateTrainerGroupPersons();
    });

    this.tabs = [
      {
        nameKey: 'news',
        routerLink: 'news'
      },
      {
        nameKey: 'members',
        routerLink: 'member'
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
          await this.joinGroup();
        },
        visible: (): boolean => {
          return !this.isOwner && (!this.groupPerson || this.groupPerson && this.groupPerson.state === GroupPersonState.INVITE_REQUEST);
        }
      },
      {
        nameKey: 'leave',
        callback: async () => {
          await this.leaveGroup();
        },
        visible: () => {
          return !!(!this.isOwner && this.groupPerson);
        }
      }
    ];
  }

  async ngOnInit() {
    this._paramRouteSubscription = this._activatedRoute.params.subscribe(async val => {
      const groupId = val['id'];
      if (!groupId || !(await this._groupService.initialize(groupId))) {
        await this._router.navigate(['/group']);
      }
    });
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._groupSubscription);
    this._appHelper.unsubscribe(this._groupPersonSubscription);
    this._appHelper.unsubscribe(this._refreshMembersSubscription);
    this._appHelper.unsubscribe(this._paramRouteSubscription);
  }

  private async initialize(group: Group) {
    this.group = group;
    await this.updateTrainerGroupPersons();
  }

  private async initializeGroupPerson(groupPerson: GroupPerson) {
    this.groupPerson = groupPerson;
    this.canEdit = await this._groupService.canEditGroup();
    this.isOwner = await this._groupService.areYouGroupCreator();
  }

  private async updateTrainerGroupPersons() {
    this.organizationTrainers = (await this._participantRestApiService.getOrganizationTrainers({}, {},
      {
        groupId: this.group.id
      }
    )).sort((a, b) => {
      if (a.lead && !b.lead) {
        return -1;
      }
      if (!a.lead && b.lead) {
        return 1;
      }
      return 0;
    });
  }

  public async onLogoChange(event) {
    // TODO: Upload in image component
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const image: Image = new Image();
      image.clazz = FileClass.GROUP;
      image.objectId = this.group.id;
      image.type = ImageType.LOGO;
      await this._participantRestApiService.uploadFile(image, [file]);

      this.logo.refresh();
    }
  }

  public onEditSettings = async () => {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'settings';
    let groupSettingsComponent: GroupSettingsComponent = null;
    await modal.componentInstance.initializeBody(GroupSettingsComponent, async component => {
      groupSettingsComponent = component;
      await component.initialize(this._appHelper.cloneObject(this.group));

      modal.componentInstance.splitButtonItems = [
        this._ngxModalService.saveSplitItemButton(async () => {
          if (await this._ngxModalService.save(modal, component)) {
            this._appHelper.updateObject(this.group, component.data);
          }
        }),
        {
          nameKey: 'sendInvites',
          callback: async () => {
            await this._ngxModalService.showSelectionGroupPersonsModal({id: this.group.id, unassigned: true}, async selectedItems => {
              await this._appHelper.tryAction('invitesSent', 'invitesDidNotSend', async () => {
                for (const item of selectedItems.map(x => x.person)) {
                  await this._participantRestApiService.inviteIntoGroup({id: item.id}, {}, {groupId: this.group.id});
                }
              });
            });
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
    await this._groupService.updateGroup(groupSettingsComponent.data);
    await this.updateTrainerGroupPersons();
  };

  //#region Change group person state

  private async joinGroup(): Promise<boolean> {
    if (this.groupPerson && this.groupPerson.state !== GroupPersonState.INVITE_REQUEST) {
      return false;
    }
    return await this._appHelper.trySave(async () => {
      this.groupPerson = await this._participantRestApiService.joinGroup({groupId: this.group.id});
      await this._groupService.updateGroupPerson(this.groupPerson);
    });
  }

  private async leaveGroup(): Promise<boolean> {
    if (!this.groupPerson) {
      return false;
    }
    return await this._appHelper.trySave(async () => {
      await this._participantRestApiService.leaveGroup({groupId: this.group.id});
      await this._groupService.updateGroupPerson(null);
    });
  }

  //#endregion

}
