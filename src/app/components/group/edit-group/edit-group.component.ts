import {Component} from '@angular/core';
import {BaseEditComponent} from '../../../data/local/component/base/base-edit-component';
import {Group} from '../../../data/remote/model/group/base/group';
import {GroupTypeEnum} from '../../../data/remote/model/group/base/group-type-enum';
import {NameWrapper} from '../../../data/local/name-wrapper';
import {SportType} from '../../../data/remote/model/sport-type';
import {Stage} from '../../../data/remote/model/stage/stage';
import {StageType} from '../../../data/remote/model/stage/stage-type';
import {TeamType} from '../../../data/remote/model/group/team/team-type';
import {OrganizationType} from '../../../data/remote/model/group/organization/organization-type';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../utils/app-helper';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../../shared/local-storage.service';
import {TranslateObjectService} from '../../../shared/translate-object.service';
import {PropertyConstant} from '../../../data/local/property-constant';
import {GroupRequest} from '../../../data/remote/request/group-request';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
})
export class EditGroupComponent extends BaseEditComponent<Group> {

  public readonly groupTypeEnum = GroupTypeEnum;
  public groupTypeEnums: NameWrapper<GroupTypeEnum>[];
  public sportTypes: SportType[];
  public stages: Stage[];
  public stageTypes: StageType[];
  public teamTypes: TeamType[];
  public organizationTypes: OrganizationType[];
  public rememberName: boolean;
  public parentGroup: Group;

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper,
              private _router: Router,
              private _localStorageService: LocalStorageService,
              private _translateObjectService: TranslateObjectService) {
    super(participantRestApiService, appHelper);
    this.rememberName = false;
  }

  async initialize(obj: Group): Promise<boolean> {
    await super.initialize(obj);

    const lastGroupName = this._localStorageService.getLastGroupName();
    if (lastGroupName) {
      this.rememberName = true;
    }

    obj.name = obj.name || lastGroupName;
    obj.visible = obj.visible || true;

    return await this.appHelper.tryLoad(async () => {
      this.groupTypeEnums = await this._translateObjectService.getTranslatedEnumCollection<GroupTypeEnum>(GroupTypeEnum, 'GroupTypeEnum');
      this.sportTypes = (await this.participantRestApiService.getSportTypes({count: PropertyConstant.pageSizeMax})).list;
      this.stages = await this.participantRestApiService.getStages();
      this.teamTypes = await this.participantRestApiService.getTeamTypes();
      this.stageTypes = await this.participantRestApiService.getStageTypes();
      this.organizationTypes = await this.participantRestApiService.getOrganizationTypes();
    });
  }

  async onSave(): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      if (this.appHelper.isNewObject(this.data)) {
        const groupRequest = new GroupRequest();
        groupRequest.group = this.data;
        if (this.parentGroup) {
          groupRequest.topGroupId = this.parentGroup.id;
        }
        this.appHelper.updateObject(this.data, await this.participantRestApiService.createGroup(groupRequest));
      } else {
        this.appHelper.updateObject(this.data, await this.participantRestApiService.putGroup(this.data));
      }

      this._localStorageService.setLastGroupName(this.rememberName ? this.data.name : null);
    });
  }

  async onRemove(): Promise<boolean> {
    return undefined;
  }

  public async navigateToPage(): Promise<void> {
    await this._router.navigate(['/group', this.data.id]);
  }

  public onGroupTypeChanged(val: NameWrapper<GroupTypeEnum>) {
    this.data.discriminator = val.data;
  }

  public loadGroups = async (from: number, searchText: string) => {
    return this.participantRestApiService.getGroups({
      from: from,
      count: PropertyConstant.pageSize,
      name: searchText,
      canEdit: true
    });
  };

  getKey(group: Group) {
    return group.id;
  }

  getName(group: Group) {
    return group.name;
  }

}
