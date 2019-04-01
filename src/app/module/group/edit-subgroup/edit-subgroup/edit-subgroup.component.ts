import {Component} from '@angular/core';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {Subgroup} from '../../../../data/remote/model/group/subgroup/subgroup/subgroup';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {SubgroupTemplate} from '../../../../data/remote/model/group/subgroup/template/subgroup-template';
import {IdentifiedObject} from '../../../../data/remote/base/identified-object';
import {NamedObject} from '../../../../data/remote/base/named-object';
import {SubgroupTemplateVersion} from '../../../../data/remote/model/group/subgroup/template/subgroup-template-version';
import {TranslateObjectService} from '../../../../shared/translate-object.service';

@Component({
  selector: 'app-edit-subgroup',
  templateUrl: './edit-subgroup.component.html',
  styleUrls: ['./edit-subgroup.component.scss']
})
export class EditSubgroupComponent extends BaseEditComponent<Subgroup> {

  public subgroupTemplate: SubgroupTemplate;
  public subgroupTemplateVersion: SubgroupTemplateVersion;

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper,
              private translateObjectService: TranslateObjectService) {
    super(participantRestApiService, appHelper);
  }

  protected async initializeComponent(data: Subgroup): Promise<boolean> {
    const result = await super.initializeComponent(data);
    if (result) {
      return await this.appHelper.tryLoad(async () => {
        this.subgroupTemplateVersion = await this.participantRestApiService.createUnapprovedSubgroupTemplateVersion({}, {}, {subgroupTemplateId: this.subgroupTemplate.id});

        if (this.isNew) {
          this.data.subgroupVersion.parentSubgroupVersion = this.data.subgroupVersion.parentSubgroupVersion || (await this.fetchParentSubgroups()).list.find(x => x.defaultSubgroup);
        }
      });
    }
    return result;
  }

  async onRemove(): Promise<boolean> {
    return await this.appHelper.tryRemove(async () => {
      this.appHelper.updateObject(this.data, await this.participantRestApiService.removeSubgroupTemplateSubgroup({subgroupTemplateId: this.subgroupTemplate.id, subgroupId: this.data.id}));
    });
  }

  async onSave(): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      let subgroup: Subgroup;
      if (this.appHelper.isNewObject(this.data)) {
        subgroup = await this.participantRestApiService.createSubgroupTemplateSubgroup(this.data, {}, {subgroupTemplateId: this.subgroupTemplate.id});
      } else {
        subgroup = await this.participantRestApiService.updateSubgroupTemplateSubgroup(this.data, {}, {subgroupTemplateId: this.subgroupTemplate.id, subgroupId: this.data.id});
      }
      this.appHelper.updateObject(this.data, subgroup);
    });
  }

  public getKey(obj: IdentifiedObject) {
    return obj.id;
  }

  public getName(obj: NamedObject) {
    return obj.name;
  }

  public fetchParentSubgroups = async () => {
    let items: Subgroup[];
    if (this.isNew) {
      items = await this.participantRestApiService.getSubgroupTemplateSubgroups({}, {subgroupTemplateVersionId: this.subgroupTemplateVersion.id}, {subgroupTemplateId: this.subgroupTemplate.id});
    } else {
      items = await this.participantRestApiService.getSubgroupTemplateSubgroupParentSubgroups({subgroupTemplateId: this.subgroupTemplate.id, subgroupId: this.data.id});
    }
    // TODO: Getting name for default subgroup from the server
    const defaultSubgroup = items.find(x => x.subgroupVersion.defaultSubgroup);
    if (defaultSubgroup && !defaultSubgroup.subgroupVersion.name) {
      defaultSubgroup.subgroupVersion.name = await this.translateObjectService.getTranslation('rootSubgroup');
    }
    return this.appHelper.arrayToPageContainer(items.map(x => x.subgroupVersion));
  };

}
