import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Group} from '../../../data/remote/model/group/base/group';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GroupPerson} from '../../../data/remote/model/group/group-person';
import {GroupPersonState} from '../../../data/local/group-person-state';
import {SubGroup} from '../../../data/remote/model/group/sub-group';
import {Tab} from '../../../data/local/tab';
import {GroupService} from '../group.service';
import {ImageComponent} from '../../../components/image/image.component';
import {Image} from '../../../data/remote/model/file/image/image';
import {ImageType} from '../../../data/remote/model/file/image/image-type';
import {FileClass} from '../../../data/remote/model/file/base/file-class';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgxModalComponent} from '../../../components/ngx-modal/ngx-modal/ngx-modal.component';
import {AppHelper} from '../../../utils/app-helper';
import {HtmlContentComponent} from '../../../components/html-content/html-content/html-content.component';
import {TranslateService} from '@ngx-translate/core';
import {GroupTypeEnum} from '../../../data/remote/model/group/base/group-type-enum';
import {IconEnum} from '../../../components/ngx-button/model/icon-enum';
import {PropertyConstant} from '../../../data/local/property-constant';
import {NgxGridComponent} from '../../../components/ngx-grid/ngx-grid/ngx-grid.component';
import {GroupPersonQuery} from '../../../data/remote/rest-api/query/group-person-query';
import {TemplateModalService} from '../../../service/template-modal.service';
import {Person} from '../../../data/remote/model/person';
import {UserRoleEnum} from '../../../data/remote/model/user-role-enum';
import {NgxModalService} from '../../../components/ngx-modal/service/ngx-modal.service';
import {GroupAdministrationComponent} from '../group-administration/group-administration.component';
import {ISubscription} from 'rxjs-compat/Subscription';
import {PermissionService} from '../../../shared/permission.service';
import {SelectionType} from '../../../components/ngx-grid/bean/selection-type';
import {SplitButtonItem} from '../../../components/ngx-split-button/bean/split-button-item';
import {GroupTransitionType} from '../../../data/remote/model/group/transition/group-transition-type';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss']
})
export class GroupPageComponent implements OnInit, OnDestroy {

  public readonly propertyConstantClass = PropertyConstant;
  public readonly groupTypeEnumClass = GroupTypeEnum;
  public readonly iconEnumClass = IconEnum;
  public readonly selectionTypeClass = SelectionType;

  @ViewChild(NgxGridComponent)
  public ngxGridComponent: NgxGridComponent;

  public group: Group;
  public groupPerson: GroupPerson;
  public subGroups: SubGroup[];

  public textStateInGroup: string;

  @ViewChild('logo')
  public logo: ImageComponent;

  public tabs: Tab[];
  public canEdit: boolean;
  public trainerGroupPersons: GroupPerson[];
  public selectedGroupPersons: GroupPerson[];
  public splitButtonsItems: SplitButtonItem[];
  private readonly _groupSubscription: ISubscription;

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
    this._groupSubscription = this._groupService.groupSubject.subscribe(group => {
      this.group = group;
    });
    this.selectedGroupPersons = [];
    // this.groupService.subgroupsSubject.subscribe(async subgroups => {
    //   this.subGroups = subgroups;
    //   await this.initTabs();
    // });
    this.splitButtonsItems = [
      this.groupTransitionModalSplitButtonItem(GroupTransitionType.EXPEL),
      this.groupTransitionModalSplitButtonItem(GroupTransitionType.TRANSFER, () => {
        return this.group && (this.group.discriminator === GroupTypeEnum.PREPARATION_GROUP || this.group.discriminator === GroupTypeEnum.TEAM);
      })
    ];
  }

  async ngOnInit() {
    const groupId = this._activatedRoute.snapshot.params.id;

    try {
      this.group = await this._participantRestApiService.getGroup({id: groupId});
      try {
        const groupPerson = await this._participantRestApiService.getCurrentGroupPerson({id: groupId});
        if (groupPerson) {
          this.canEdit = (!!(await this._participantRestApiService.getGroupPersonUserRoles({
            groupId: groupId,
            personId: groupPerson.person.id
          })).filter(x => x.userRoleEnum === UserRoleEnum.ADMIN || x.userRoleEnum === UserRoleEnum.OPERATOR).length) || this._permissionService.areYouCreator(this.group, groupPerson.person);
        }
      } catch (e) {
      }
      this._groupService.updateGroup(this.group);

      if (this.group) {
        await this.baseInit();
      }
    } catch (e) {
      if (e.status == 403) {
        await this._router.navigate(['/group']);
      }
    }
    await this.updateTrainerGroupPersons();
    await this.resetItems();
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._groupSubscription);
  }

  public async updateTrainerGroupPersons() {
    this.trainerGroupPersons = (await this._participantRestApiService.getGroupPersonsByGroup({
      id: this.group.id,
      count: PropertyConstant.pageSizeMax,
      userRoleEnum: UserRoleEnum.TRAINER
    })).list.sort((a, b) => {
      if (a.leadTrainer && !b.leadTrainer) {
        return -1;
      }
      if (!a.leadTrainer && b.leadTrainer) {
        return 1;
      }
      return 0;
    });
  }

  async baseInit() {
    try {
      this.groupPerson = await this._groupService.getCurrentGroupPerson();
      this.textStateInGroup = this._groupService.getKeyNamePersonStateInGroup(this._groupService.getGroupPersonState());

      await this._groupService.updateSubgroups();
    } catch (e) {
      if (e.status == 403) {
        await this._router.navigate(['/group']);
      }
    }
  }

  private async initTabs() {
    this.tabs = [];
    for (let i = 0; i < this.subGroups.length; i++) {
      this.tabs.push({name: this.subGroups[i].name, routerLink: this.getSubGroupRouterLink(this.subGroups[i].id)});
    }

    this.tabs.push({nameKey: 'members', routerLink: this.getSubGroupRouterLink(0)});

    if (this._groupService.isEditAllow()) {
      this.tabs.push({nameKey: 'administration', routerLink: 'administration'});
    }

    if (this._groupService.hasEvents()) {
      this.tabs.push({nameKey: 'events', routerLink: 'events'});
    }

    this.tabs.push({nameKey: 'connectionsGraph', routerLink: 'connections-graph'});
  }

  private getSubGroupRouterLink(subGroupId: number): string {
    return `subgroup/${subGroupId}`;
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

  public onGroupPersonState = async () => {
    if (this._groupService.getGroupPersonState() === GroupPersonState.MEMBER) {
      const modal = this._modalService.open(NgxModalComponent, {size: 'lg'});
      const componentInstance = modal.componentInstance as NgxModalComponent;
      componentInstance.titleKey = 'confirmation';
      await componentInstance.initializeBody(HtmlContentComponent, async component => {
        component.html = await this._translateService.get('areYouSureYouWantToLeaveTheGroup').toPromise();

        componentInstance.splitButtonItems = [
          {
            nameKey: 'approve',
            default: true,
            callback: async () => {
              if (await this.changePersonStateInGroup()) {
                modal.dismiss();
                await this.baseInit();
              }
            }
          },
          {
            nameKey: 'cancel',
            callback: async () => {
              modal.dismiss();
            }
          }
        ];
      });
    } else {
      if (await this.changePersonStateInGroup()) {
        await this.baseInit();
      }
    }
  };

  public fetchItems = async (query: GroupPersonQuery) => {
    query.id = this.group.id;
    if (this.group.discriminator === GroupTypeEnum.TEAM || this.group.discriminator === GroupTypeEnum.PREPARATION_GROUP) {
      query.userRoleEnum = UserRoleEnum.ATHLETE;
    }
    const pageContainer = await this._participantRestApiService.getGroupPersonsByGroup(query);
    // Group owner hidden in list
    const groupOwnerIndex = pageContainer.list.findIndex(x => x.person.user.id == this.group.owner.id);
    if (groupOwnerIndex > -1) {
      pageContainer.list.splice(groupOwnerIndex, 1);
    }
    return pageContainer;
  };

  public onEditSettings = async () => {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'settings';
    await modal.componentInstance.initializeBody(GroupAdministrationComponent, async component => {
    });
    await this._ngxModalService.awaitModalResult(modal);
    await this.updateTrainerGroupPersons();
  };

  public onAddGroupPerson = async () => {
    if (await this._templateModalService.showEditPersonModal(new Person(), this.group)) {
      // TODO: Update only edited item!
      await this.resetItems();
    }
  };

  public onEditGroupPerson = async (obj: GroupPerson) => {
    if (await this._templateModalService.showEditPersonModal(obj.person, this.group)) {
      // TODO: Update only edited item!
      await this.resetItems();
    }
  };

  private async changePersonStateInGroup(): Promise<boolean> {
    return this._appHelper.trySave(async () => {
      if (this._groupService.getGroupPersonState() === GroupPersonState.NOT_MEMBER) {
        await this._participantRestApiService.joinGroup({id: this.group.id});
      } else {
        await this._participantRestApiService.leaveGroup({id: this.group.id});
      }
    });
  }

  public onSelectedItemsChange(items: GroupPerson[]) {
    this.selectedGroupPersons = items;
  }

  private async resetItems() {
    await this._appHelper.delay();
    await this.ngxGridComponent.reset();
  }

  private groupTransitionModalSplitButtonItem(type: GroupTransitionType, visible?: () => boolean): SplitButtonItem {
    return {
      nameKey: `groupTransitionTypeEnum.${type}`,
      callback: async () => {
        if (await this._templateModalService.showGroupPersonTransferModal(type, this.group, this.selectedGroupPersons.map(x => x.person))) {
          await this.resetItems();
        }
      },
      visible: visible
    };
  }

}
