import {Component} from '@angular/core';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {SubgroupGroup} from '../../../../data/remote/model/group/subgroup/subgroup/subgroup-group';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {SubgroupPersonQuery} from '../../../../data/remote/rest-api/query/subgroup-person-query';
import {SubgroupPersonTypeEnum} from '../../../../data/remote/model/group/subgroup/person/subgroup-person-type-enum';
import {PageContainer} from '../../../../data/remote/bean/page-container';
import {SubgroupPerson} from '../../../../data/remote/model/group/subgroup/person/subgroup-person';
import {SubgroupGroupApiService} from '../../../../data/remote/rest-api/api/subgroup-group/subgroup-group-api.service';

@Component({
  selector: 'app-edit-subgroup-group',
  templateUrl: './edit-subgroup-group.component.html',
  styleUrls: ['./edit-subgroup-group.component.scss']
})
export class EditSubgroupGroupComponent extends BaseEditComponent<SubgroupGroup> {

  public leadSubgroupPerson: SubgroupPerson;
  public secondarySubgroupPerson: SubgroupPerson;

  private _lastLeadSubgroupPerson: SubgroupPerson;
  private _lastSecondarySubgroupPerson: SubgroupPerson;

  constructor(private _subgroupGroupApiService: SubgroupGroupApiService,
              participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
  }

  async onRemove(): Promise<boolean> {
    return undefined;
  }

  async onSave(): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      this.leadSubgroupPerson = await this.updateSubgroupPerson(this.leadSubgroupPerson, this._lastLeadSubgroupPerson, SubgroupPersonTypeEnum.LEAD);
      this.secondarySubgroupPerson = await this.updateSubgroupPerson(this.secondarySubgroupPerson, this._lastSecondarySubgroupPerson, SubgroupPersonTypeEnum.SECONDARY);
    });
  }

  protected async initializeComponent(data: SubgroupGroup): Promise<boolean> {
    const result = await super.initializeComponent(data);
    if (result) {
      const leadSubgroupPersonPageContainer = await this.getSubgroupPersons({subgroupPersonTypeEnum: SubgroupPersonTypeEnum.LEAD, count: 1, unassigned: false});
      if (leadSubgroupPersonPageContainer.list) {
        this.leadSubgroupPerson = leadSubgroupPersonPageContainer.list[0];
        this._lastLeadSubgroupPerson = this.appHelper.cloneObject(this.leadSubgroupPerson);
      }

      const secondarySubgroupPersonPageContainer = await this.getSubgroupPersons({subgroupPersonTypeEnum: SubgroupPersonTypeEnum.SECONDARY, count: 1, unassigned: false});
      if (secondarySubgroupPersonPageContainer.list) {
        this.secondarySubgroupPerson = secondarySubgroupPersonPageContainer.list[0];
        this._lastSecondarySubgroupPerson = this.appHelper.cloneObject(this.secondarySubgroupPerson);
      }
    }
    return result;
  }

  public getKey(obj: SubgroupPerson) {
    return obj.person.id;
  }

  public getName(obj: SubgroupPerson) {
    return `${obj.person.lastName} ${obj.person.firstName}`;
  }

  public fetchLeadSubgroupPersons = async (from: number) => {
    const query = new SubgroupPersonQuery();
    query.from = from;
    query.unassigned = true;
    query.subgroupPersonTypeEnum = SubgroupPersonTypeEnum.LEAD;
    return await this.getSubgroupPersons(query);
  };

  public fetchSecondarySubgroupPersons = async (from: number) => {
    const query = new SubgroupPersonQuery();
    query.from = from;
    query.unassigned = true;
    query.subgroupPersonTypeEnum = SubgroupPersonTypeEnum.SECONDARY;
    return await this.getSubgroupPersons(query);
  };

  private async getSubgroupPersons(query: SubgroupPersonQuery): Promise<PageContainer<SubgroupPerson>> {
    return await this._subgroupGroupApiService.getSubgroupPersons(this.data, query).toPromise();
  }

  private async saveSubgroupPerson(subgroupPerson: SubgroupPerson, type: SubgroupPersonTypeEnum): Promise<SubgroupPerson> {
    return (await this._subgroupGroupApiService.createSubgroupPersons(this.data, {
      subgroupPersonTypeEnum: type,
      personIds: [subgroupPerson.person.id]
    }).toPromise())[0];
  }

  private async removeSubgroupPerson(subgroupPerson: SubgroupPerson, type: SubgroupPersonTypeEnum): Promise<SubgroupPerson> {
    return (await this._subgroupGroupApiService.removeSubgroupPersons(subgroupPerson.subgroupGroup, [subgroupPerson]).toPromise())[0];
  }

  private async updateSubgroupPerson(subgroupPerson: SubgroupPerson, lastSubgroupPerson: SubgroupPerson, type: SubgroupPersonTypeEnum) {
    if (lastSubgroupPerson) {
      await this.removeSubgroupPerson(lastSubgroupPerson, type);
    }
    return subgroupPerson ? await this.saveSubgroupPerson(subgroupPerson, type) : null;
  }

}
