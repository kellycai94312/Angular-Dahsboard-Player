import {Component} from '@angular/core';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {Group} from '../../../../data/remote/model/group/base/group';
import {GroupTypeEnum} from '../../../../data/remote/model/group/base/group-type-enum';
import {NameWrapper} from '../../../../data/local/name-wrapper';
import {SportType} from '../../../../data/remote/model/sport-type';
import {Stage} from '../../../../data/remote/model/stage/stage';
import {StageType} from '../../../../data/remote/model/stage/stage-type';
import {TeamType} from '../../../../data/remote/model/group/team/team-type';
import {OrganizationType} from '../../../../data/remote/model/group/organization/organization-type';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../../../shared/local-storage.service';
import {TranslateObjectService} from '../../../../shared/translate-object.service';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {PermissionService} from '../../../../shared/permission.service';
import {UserRoleEnum} from '../../../../data/remote/model/user-role-enum';
import {OrganizationTypeEnum} from '../../../../data/remote/model/group/organization/organization-type-enum';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
})
export class EditGroupComponent extends BaseEditComponent<Group> {

  public readonly groupTypeEnum = GroupTypeEnum;

  public groupTypeEnums: NameWrapper<GroupTypeEnum>[];
  public selectedGroupTypeEnum: NameWrapper<GroupTypeEnum>;
  public sportTypes: SportType[];
  public stages: Stage[];
  public stageTypes: StageType[];
  public teamTypes: TeamType[];
  public organizationTypes: OrganizationType[];

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper,
              private _router: Router,
              private _localStorageService: LocalStorageService,
              private _permissionService: PermissionService,
              private _translateObjectService: TranslateObjectService) {
    super(participantRestApiService, appHelper);
  }

  async initialize(obj: Group): Promise<boolean> {
    await super.initialize(obj);
    obj.visible = obj.visible || true;

    return await this.appHelper.tryLoad(async () => {
      this.groupTypeEnums = (await this._translateObjectService.getTranslatedEnumCollection<GroupTypeEnum>(GroupTypeEnum, 'GroupTypeEnum')).filter(x => x.data === GroupTypeEnum.ORGANIZATION);
      this.selectedGroupTypeEnum = this.groupTypeEnums[0];
      this.onGroupTypeChanged(this.selectedGroupTypeEnum);
      this.sportTypes = (await this.participantRestApiService.getSportTypes({count: PropertyConstant.pageSizeMax})).list;
      this.stages = await this.participantRestApiService.getStages();
      this.teamTypes = await this.participantRestApiService.getTeamTypes();
      this.stageTypes = await this.participantRestApiService.getStageTypes();

      let organizationTypes = await this.participantRestApiService.getOrganizationTypes();
      if (!await this._permissionService.hasAnyRole([UserRoleEnum.OPERATOR])) {
        organizationTypes = organizationTypes.filter(x =>
          x.organizationTypeEnum === OrganizationTypeEnum.SECTION ||
          x.organizationTypeEnum === OrganizationTypeEnum.CLUB ||
          x.organizationTypeEnum === OrganizationTypeEnum.OTHER
        );
      }
      this.organizationTypes = organizationTypes;
    });
  }

  async onSave(): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      const isNew = this.appHelper.isNewObject(this.data);
      if (isNew) {
        this.appHelper.updateObject(this.data, await this.participantRestApiService.createGroup(this.data));
      } else {
        this.appHelper.updateObject(this.data, await this.participantRestApiService.putGroup(this.data));
      }

      if (isNew) {
        await this.navigateToPage();
      }
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

  getKey(group: Group) {
    return group.id;
  }

  getName(group: Group) {
    return group.name;
  }

}
