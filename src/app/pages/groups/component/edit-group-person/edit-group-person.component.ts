import {Component} from '@angular/core';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {GroupPerson} from '../../../../data/remote/model/group/group-person';
import {UserRoleEnum} from '../../../../data/remote/model/user-role-enum';
import {UserRole} from '../../../../data/remote/model/user-role';
import {IdentifiedObject} from '../../../../data/remote/base/identified-object';
import {GroupTypeEnum} from '../../../../data/remote/model/group/base/group-type-enum';
import {SubGroup} from '../../../../data/remote/model/group/sub-group';
import {SportRole} from '../../../../data/remote/model/sport-role';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {EditGroupPersonLogsComponent} from '../edit-group-person-logs/edit-group-person-logs.component';
import {EditGroupPersonLogComponent} from '../edit-group-person-log/edit-group-person-log.component';
import {PermissionService} from '../../../../shared/permission.service';
import {Team} from '../../../../data/remote/model/group/team/team';

// @Component({
//   selector: 'app-edit-group-person',
//   templateUrl: './edit-group-person.component.html',
//   styleUrls: ['./edit-group-person.component.scss']
// })
export class EditGroupPersonComponent extends BaseEditComponent<GroupPerson> {

  public readonly pageSize: number;

  public baseGroupPerson: GroupPerson;
  public userRoles: UserRole[];
  public subgroups: SubGroup[];
  public sportRoles: SportRole[];
  public isOwner: boolean;

  private _mentorUserRoleEnum: UserRoleEnum;

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper,
              private _permissionService: PermissionService,
              private _ngxModalService: NgxModalService) {
    super(participantRestApiService, appHelper);
    this.pageSize = PropertyConstant.pageSize;
  }

  async initialize(obj: GroupPerson): Promise<boolean> {
    await super.initialize(obj);
    this.isOwner = this._permissionService.areYouCreator(this.data.group, this.data.person);

    return await this.appHelper.tryLoad(async () => {
      this.userRoles = await this.participantRestApiService.getUserUserRoles({userId: this.data.person.user.id});
      // TODO: Subgroups have to stored in GroupService
      this.subgroups = await this.participantRestApiService.getSubGroupsByGroup({id: this.data.group.id});

      switch (this.data.group.discriminator) {
        case GroupTypeEnum.TEAM:
          this.sportRoles = await this.participantRestApiService.getSportRolesBySportType({id: (this.data.group as Team).sportType.id});
          this._mentorUserRoleEnum = UserRoleEnum.TRAINER;
          break;
        case GroupTypeEnum.AGENCY:
          this._mentorUserRoleEnum = UserRoleEnum.SCOUT;
          break;
      }
    });
  }

  loadMentors = async (from: number, searchText: string) => {
    return this.participantRestApiService.getGroupPersonsByGroup({
      id: this.data.group.id,
      userRoleEnum: this._mentorUserRoleEnum,
      from: from,
      count: this.pageSize,
      name: searchText
    });
  };

  getKey(item: IdentifiedObject) {
    return item.id;
  }

  getName(item: GroupPerson) {
    if (item.person.patronymic != null) {
      return `${item.person.firstName} ${item.person.lastName} ${item.person.patronymic}`;
    } else {
      return `${item.person.firstName} ${item.person.lastName}`;
    }
  }

  public async onUserRoleChange(userRole: UserRole) {
  }

  public async onSave(): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      const subGroupId = this.data.subGroup === undefined ? null : this.data.subGroup.id;
      await this.participantRestApiService.postPersonSubgroup({id: subGroupId}, {}, {
        groupId: this.data.group.id,
        personId: this.data.person.id
      });

      // TODO: Update user role
      // await this.participantRestApiService.updateGroupPersonUserRoles(new ListRequest(userRoles), {}, {
      //   groupId: this.data.group.id,
      //   personId: this.data.person.id
      // });

      const sportRoleId = this.data.sportRole === undefined || this.data.sportRole === null ? null : this.data.sportRole.id;
      await this.participantRestApiService.postPersonSportRole({id: sportRoleId}, {}, {
        groupId: this.data.group.id,
        personId: this.data.person.id
      });

      await this.participantRestApiService.postPersonNumber({number: this.data.number}, {}, {
        groupId: this.data.group.id,
        personId: this.data.person.id
      });

      try {
        const mentorId = this.data.mentor === undefined || this.data.mentor === null ? null : this.data.mentor.person.id;
        await this.participantRestApiService.postPersonMentor({id: mentorId}, {}, {
          groupId: this.data.group.id,
          personId: this.data.person.id
        });
      } catch (e) {
      }
    });
  }

  public async onRemove(): Promise<boolean> {
    return await this.appHelper.tryRemove(async () => {
      const modal = this._ngxModalService.open();
      modal.componentInstance.titleKey = 'edit';

      await modal.componentInstance.initializeBody(EditGroupPersonLogComponent, async component => {
        component.manualInitialization = true;
        const groupPersonLog = await this.participantRestApiService.getLatestGroupPersonLog({groupId: this.data.group.id, personId: this.data.person.id});
        await component.initialize(groupPersonLog);

        modal.componentInstance.splitButtonItems = [
          {
            nameKey: 'remove',
            callback: async () => {
              await this.appHelper.tryRemove(async () => {
                await this.participantRestApiService.updateGroupPersonLog(component.data, {}, {groupId: this.data.group.id, personId: this.data.person.id, groupPersonLogId: component.data.id});
                await this.participantRestApiService.deleteApprovePersonInGroup({
                  id: this.data.group.id,
                  personId: this.data.person.id
                });
                modal.dismiss();
              });
            }
          }];
      });
    }, false);
  }

  public onEditGroupPersonLog = async () => {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'edit';
    await modal.componentInstance.initializeBody(EditGroupPersonLogsComponent, async component => {
      component.manualInitialization = true;
      await component.initialize(this.data);

      modal.componentInstance.splitButtonItems = [{
        nameKey: 'add',
        callback: async () => {
          await component.onAdd();
        }
      }];
    });
  };

}
