import {Component, Input, OnInit} from '@angular/core';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {NgxColumnComponent} from '../../../../components/ngx-grid/ngx-column/ngx-column.component';
import {StageType} from '../../../../data/remote/model/stage/stage-type';
import {Stage} from '../../../../data/remote/model/stage/stage';
import {StagePerson} from '../../../../data/remote/bean/stage-person';

@Component({
  selector: 'app-stage-persons',
  templateUrl: './stage-persons.component.html',
  styleUrls: ['./stage-persons.component.scss']
})
export class StagePersonsComponent implements OnInit {

  @Input()
  public sportTypeId: number;

  public stageTypes: StageType[];

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper) {
  }

  async ngOnInit(): Promise<void> {
    this.stageTypes = await this._participantRestApiService.getStageTypes();
  }

  public fetchItems = async (query: PageQuery) => {
    const items = await this._participantRestApiService.getStagePersons({sportTypeId: this.sportTypeId});
    return this._appHelper.arrayToPageContainer(this.groupStagePerson(items));
  };

  public onColumnClick = async (column: NgxColumnComponent) => {
  };

  public getItemByColumn(item: GroupStagePerson, column: NgxColumnComponent): StageTypePerson {
    return item.types.find(x => x.stageType.id == column.data.id);
  }

  private groupStagePerson(items: StagePerson[]): GroupStagePerson[] {
    const groupStagePersons: GroupStagePerson[] = [];
    for (const item of items) {
      let groupStagePerson: GroupStagePerson = groupStagePersons.find(x => x.stage.id == item.stage.id && x.stageYear == item.stageYear);
      if (!groupStagePerson) {
        groupStagePerson = new GroupStagePerson();
        groupStagePerson.stage = item.stage;
        groupStagePerson.stageYear = item.stageYear;
        groupStagePerson.types = [];
        groupStagePersons.push(groupStagePerson);
      }

      for (const stageType of this.stageTypes) {
        const stageTypePerson = new StageTypePerson();
        stageTypePerson.stageType = stageType;
        if (stageType.id == item.stageType.id) {
          stageTypePerson.personCount = item.personCount;
        }
        groupStagePerson.types.push(stageTypePerson);
      }
    }
    return groupStagePersons;
  }

}

class GroupStagePerson {
  public stage: Stage;
  public stageYear: number;
  public types: StageTypePerson[];
}

class StageTypePerson {
  public stageType: StageType;
  public personCount: number;
}
