import {Component} from '@angular/core';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {IdentifiedObject} from '../../../../data/remote/base/identified-object';
import {NamedObject} from '../../../../data/remote/base/named-object';
import {SportType} from '../../../../data/remote/model/sport-type';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {PageContainer} from '../../../../data/remote/bean/page-container';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';

@Component({
  selector: 'app-edit-subgroup-template',
  templateUrl: './edit-subgroup-template.component.html',
  styleUrls: ['./edit-subgroup-template.component.scss']
})
export class EditSubgroupTemplateComponent extends BaseEditComponent<any> {

  public selectedSportType: SportType;
  private readonly tableConfigurations: PageContainer<TableRow>;

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
    const items: TableRow[] = [
      {translation: 'lastName'},
      {translation: 'firstName'},
      {translation: 'patronymic'},
      {translation: 'yearBirth', fieldName: 'showBirthYear', canEdit: true, value: true},
      {translation: 'rank', fieldName: 'showRank', canEdit: true, value: true},
      {translation: 'stageType', fieldName: 'showStageType', canEdit: true, value: true}
    ];
    this.tableConfigurations = this.appHelper.arrayToPageContainer(items);
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

  }

  public fetchItems = async () => {
    return this.tableConfigurations;
  };

  public async onRemove(): Promise<boolean> {
    return undefined;
  }

  public async onSave(): Promise<boolean> {
    return undefined;
  }

}

class TableRow {
  public translation: string;
  public fieldName?: string;
  public canEdit?: boolean;
  public value?: boolean;
}
