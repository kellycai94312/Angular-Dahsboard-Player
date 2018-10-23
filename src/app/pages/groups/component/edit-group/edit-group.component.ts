import {Component} from '@angular/core';
import {GroupType} from '../../../../data/remote/model/group/base/group-type';
import {SportType} from '../../../../data/remote/model/sport-type';
import {Group} from '../../../../data/remote/model/group/base/group';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {GroupTypeEnum} from '../../../../data/remote/model/group/base/group-type-enum';
import {StageType} from '../../../../data/remote/model/stage/stage-type';
import {Stage} from '../../../../data/remote/model/stage/stage';
import {Router} from '@angular/router';
import {TeamType} from '../../../../data/remote/model/group/team/team-type';
import {LocalStorageService} from '../../../../shared/local-storage.service';
import {OrganizationType} from '../../../../data/remote/model/group/organization/organization-type';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
})
export class EditGroupComponent extends BaseEditComponent<Group> {

  public readonly groupTypeEnum = GroupTypeEnum;
  public group: Group;
  public groupTypes: GroupType[];
  public sportTypes: SportType[];
  public stages: Stage[];
  public stageTypes: StageType[];
  public teamTypes: TeamType[];
  public organizationTypes: OrganizationType[];
  public rememberName: boolean;

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper,
              private _router: Router,
              private _localStorageService: LocalStorageService) {
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
      this.groupTypes = await this.participantRestApiService.getGroupTypes();
      this.sportTypes = (await this.participantRestApiService.getSportTypes({count: PropertyConstant.pageSizeMax})).list;
      this.stages = await this.participantRestApiService.getStages();
      this.teamTypes = await this.participantRestApiService.getTeamTypes();
      this.stageTypes = await this.participantRestApiService.getStageTypes();
      // TODO: Get organization types this.organizationTypes = await this.participantRestApiService.get;
    });
  }

  async onSave(): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      this.data.discriminator = this.data.groupType.groupTypeEnum;

      if (this.appHelper.isNewObject(this.data)) {
        this.data = await this.participantRestApiService.postGroup(this.data);
      } else {
        this.data = await this.participantRestApiService.putGroup(this.data);
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

}
