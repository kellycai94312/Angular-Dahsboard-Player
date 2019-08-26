import {Component, OnInit} from '@angular/core';
import {Group} from '../../../../data/remote/model/group/base/group';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GroupService} from '../service/group.service';
import {ImageType} from '../../../../data/remote/model/file/image/image-type';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {AppHelper} from '../../../../utils/app-helper';
import {TranslateService} from '@ngx-translate/core';
import {GroupTypeEnum} from '../../../../data/remote/model/group/base/group-type-enum';
import {IconEnum} from '../../../../components/ngx-button/model/icon-enum';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {TemplateModalService} from '../../../../service/template-modal.service';
import {PermissionService} from '../../../../shared/permission.service';
import {GroupPersonState} from '../../../../data/remote/model/group/group-person-state';
import {SplitButtonItem} from '../../../../components/ngx-split-button/bean/split-button-item';
import {BaseGroupComponent} from '../../../../data/local/component/group/base-group-component';
import {AuthorizationService} from '../../../../shared/authorization.service';
import {NgxTab} from '../../../../module/ngx/ngx-tabs/model/ngx-tab';
import {map} from 'rxjs/operators';
import {IdRequest} from '../../../../data/remote/request/id-request';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss']
})
export class GroupPageComponent extends BaseGroupComponent<Group> implements OnInit {

  public readonly propertyConstantClass = PropertyConstant;
  public readonly groupTypeEnumClass = GroupTypeEnum;
  public readonly iconEnumClass = IconEnum;
  public readonly imageTypeClass = ImageType;
  public readonly fileClassClass = FileClass;
  public readonly tabs: NgxTab[];
  public readonly splitButtonsItems: SplitButtonItem[];

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _activatedRoute: ActivatedRoute,
              private _translateService: TranslateService,
              private _authorizationService: AuthorizationService,
              private _router: Router,
              private _templateModalService: TemplateModalService,
              private _permissionService: PermissionService,
              groupService: GroupService, appHelper: AppHelper) {
    super(groupService, appHelper);

    this.tabs = [
      {
        translation: 'news',
        link: 'news'
      },
      {
        translation: 'employees',
        link: 'employee'
      },
      {
        translation: 'subgroups',
        link: 'subgroup',
        hidden$: this.canEditSubject.pipe(map(value => !value))
      },
      {
        translation: 'subscribers',
        link: 'subscriber'
      },
      {
        translation: 'requests',
        link: 'request',
        hidden$: this.canEditSubject.pipe(map(value => !value))
      },
      {
        translation: 'structure',
        link: 'structure'
      },
      {
        translation: 'timetableOfClasses',
        link: 'schedule'
      }
    ];

    this.splitButtonsItems = [
      {
        nameKey: 'join',
        callback: async () => {
          const params = {groupId: this.group.id};
          const result = await this.groupService.showSelectionGroupVacanciesModal(this.group, false, []);
          if (result.result) {
            await this.groupService.updateGroupPerson(await this._participantRestApiService.joinGroup({list: result.data.map(x => new IdRequest(x.id))}, {}, params));
          }
        },
        visible: (): boolean => {
          return !this.isOwner && (!this.groupPerson);
        }
      },
      // TODO:
      // {
      //   nameKey: 'editRequest',
      //   callback: async () => {
      //     const groupPersonPositions = (await this._participantRestApiService.getGroupPersonPositions({},
      //       {unassigned: false, count: PropertyConstant.pageSizeMax},
      //       {groupId: this.group.id, personId: this.groupPerson.person.id})).list;
      //     const params = {groupId: this.group.id};
      //     const result = await this.groupService.showSelectionGroupVacanciesModal(this.group, false, groupPersonPositions);
      //     if (result.result) {
      //       await this._participantRestApiService.updateGroupPersonPositions({list: result.data.map(x => x.position)}, {}, {groupId: this.group.id, personId: this.groupPerson.person.id});
      //     }
      //   },
      //   visible: (): boolean => {
      //     return !this.isOwner && (this.groupPerson && this.groupPerson.state === GroupPersonState.JOIN_REQUEST);
      //   }
      // },
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

  public async ngOnInit() {
    super.ngOnInit();
    this.initializeGroupService(this._activatedRoute, this._router);
  }

  async initializeGroup(group: Group): Promise<void> {
    await super.initializeGroup(group);
  }

  public onEditSettings = async () => {
    await this._router.navigate(['/group', this.group.id, 'settings']);
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
