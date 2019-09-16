import {Component, ViewChild} from '@angular/core';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {IdentifiedObject} from '../../../../data/remote/base/identified-object';
import {NamedObject} from '../../../../data/remote/base/named-object';
import {SportType} from '../../../../data/remote/model/sport-type';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {PageContainer} from '../../../../data/remote/bean/page-container';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {SubgroupTemplate} from '../../../../data/remote/model/group/subgroup/template/subgroup-template';
import {SubgroupTemplatePersonType} from '../../../../data/remote/model/group/subgroup/person/subgroup-template-person-type';
import {SubgroupPersonTypeEnum} from '../../../../data/remote/model/group/subgroup/person/subgroup-person-type-enum';
import {SubgroupPersonType} from '../../../../data/remote/model/group/subgroup/person/subgroup-person-type';
import {NgxGridComponent} from '../../../../components/ngx-grid/ngx-grid/ngx-grid.component';

@Component({
  selector: 'app-edit-subgroup-template',
  templateUrl: './edit-subgroup-template.component.html',
  styleUrls: ['./edit-subgroup-template.component.scss']
})
export class EditSubgroupTemplateComponent extends BaseEditComponent<SubgroupTemplate> {

  @ViewChild(NgxGridComponent, { static: false })
  public ngxGridComponent: NgxGridComponent;

  private tableConfigurations: PageContainer<TableRow>;

  public leadPersonType: SubgroupTemplatePersonType;
  public secondaryPersonType: SubgroupTemplatePersonType;

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
  }

  protected async initializeComponent(data: SubgroupTemplate): Promise<boolean> {
    const result = await super.initializeComponent(data);
    if (result) {
      return await this.appHelper.tryLoad(async () => {
        if (!this.appHelper.isNewObject(this.data)) {
          const subgroupTemplatePersonTypes = await this.participantRestApiService.getSubgroupTemplatePersonTypes({subgroupTemplateId: this.data.id});
          this.leadPersonType = subgroupTemplatePersonTypes.find(x => x.subgroupPersonType.subgroupPersonTypeEnum === SubgroupPersonTypeEnum.LEAD);
          this.secondaryPersonType = subgroupTemplatePersonTypes.find(x => x.subgroupPersonType.subgroupPersonTypeEnum === SubgroupPersonTypeEnum.SECONDARY);
        } else {
          const subgroupPersonTypes = await this.participantRestApiService.getSubgroupPersonTypes();
          this.leadPersonType = this.buildSubgroupTemplatePersonType(subgroupPersonTypes, SubgroupPersonTypeEnum.LEAD);
          this.secondaryPersonType = this.buildSubgroupTemplatePersonType(subgroupPersonTypes, SubgroupPersonTypeEnum.SECONDARY);
        }

        this.tableConfigurations = this.getTable(data);
        await this.ngxGridComponent.reset();
      });
    }
    return result;
  }

  loadSportTypes = async (from: number, searchText: string) => {
    return this.participantRestApiService.getSportTypes({from: from, count: PropertyConstant.pageSize, name: searchText});
  };

  getKey(obj: IdentifiedObject) {
    return obj.id;
  }

  getName(obj: NamedObject) {
    return obj.name;
  }

  public onSportTypeChanged(sportType: SportType) {
    this.data.sportType = sportType;
  }

  public fetchItems = async () => {
    return this.tableConfigurations;
  };

  public async onRemove(): Promise<boolean> {
    return await this.appHelper.tryRemove(async () => {
      if (!this.appHelper.isNewObject(this.data)) {
        this.data = await this.participantRestApiService.removeSubgroupTemplate({subgroupTemplateId: this.data.id});
      }
    });
  }

  public async onSave(): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      this.updateObjectFromTable(this.data);
      if (this.appHelper.isNewObject(this.data)) {
        this.data = await this.participantRestApiService.createSubgroupTemplate(this.data);

        const subgroupTemplatePersonTypes = await this.participantRestApiService.getSubgroupTemplatePersonTypes({subgroupTemplateId: this.data.id});
        this.leadPersonType.id = subgroupTemplatePersonTypes.find(x => x.subgroupPersonType.subgroupPersonTypeEnum === SubgroupPersonTypeEnum.LEAD).id;
        this.secondaryPersonType.id = subgroupTemplatePersonTypes.find(x => x.subgroupPersonType.subgroupPersonTypeEnum === SubgroupPersonTypeEnum.SECONDARY).id;
      } else {
        this.data = await this.participantRestApiService.updateSubgroupTemplate(this.data, {}, {subgroupTemplateId: this.data.id});
      }

      await this.participantRestApiService.updateSubgroupTemplatePersonTypes({list: [this.leadPersonType, this.secondaryPersonType]}, {}, {subgroupTemplateId: this.data.id});
    });
  }

  private getTable(data: SubgroupTemplate): PageContainer<TableRow> {
    const items: TableRow[] = [
      {translation: 'lastName'},
      {translation: 'firstName'},
      {translation: 'patronymic'},
      {translation: 'yearBirth', fieldName: 'showBirthYear', canEdit: true},
      {translation: 'rank', fieldName: 'showRank', canEdit: true},
      {translation: 'stageType', fieldName: 'showStageType', canEdit: true}
    ];

    for (const item of items.filter(x => x.canEdit && x.fieldName)) {
      item.value = data[item.fieldName];
    }
    return this.appHelper.arrayToPageContainer(items);
  }

  private updateObjectFromTable(data: SubgroupTemplate): void {
    for (const item of this.tableConfigurations.list.filter(x => x.canEdit)) {
      data[item.fieldName] = item.value;
    }
  }

  private buildSubgroupTemplatePersonType(subgroupPersonTypes: SubgroupPersonType[],
                                          subgroupPersonTypeEnum: SubgroupPersonTypeEnum): SubgroupTemplatePersonType {
    const subgroupTemplatePersonType = new SubgroupTemplatePersonType();
    subgroupTemplatePersonType.subgroupPersonType = subgroupPersonTypes.find(x => x.subgroupPersonTypeEnum === subgroupPersonTypeEnum);
    return subgroupTemplatePersonType;
  }

}

class TableRow {
  public translation: string;
  public fieldName?: string;
  public canEdit?: boolean;
  public value?: boolean;
}
