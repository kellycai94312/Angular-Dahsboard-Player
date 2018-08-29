import {Component, OnInit, ViewChild} from '@angular/core';
import {PropertyConstant} from '../../../data/local/property-constant';
import {SportType} from '../../../data/remote/model/sport-type';
import {Stage} from '../../../data/remote/model/stage/stage';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../utils/app-helper';
import {IdentifiedObject} from '../../../data/remote/base/identified-object';
import {NamedObject} from '../../../data/remote/base/named-object';
import {StageQuery} from '../../../data/remote/rest-api/query/stage-query';
import {NgxGridComponent} from '../../../components/ngx-grid/ngx-grid/ngx-grid.component';
import {AuthorizationService} from '../../../shared/authorization.service';
import {BaseDictionaryComponent} from '../base/base-dictionary-component';

@Component({
  selector: 'app-stage-standard-dictionary',
  templateUrl: './stage-standard-dictionary.component.html',
  styleUrls: ['./stage-standard-dictionary.component.scss']
})
export class StageStandardDictionaryComponent extends BaseDictionaryComponent implements OnInit {

  @ViewChild(NgxGridComponent)
  public ngxGridComponent: NgxGridComponent;

  public readonly propertyConstant = PropertyConstant;

  public selectedSportType: SportType;
  public selectedStage: Stage;
  public stages: Stage[];
  public query: StageQuery;
  public canEdit: boolean;

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper, authorizationService: AuthorizationService) {
    super(participantRestApiService, appHelper, authorizationService);

    this.query = new StageQuery();
  }

  public async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    this.stages = await this.participantRestApiService.getStages();
  }

  //#region SportTypes

  loadSportTypes = async (from: number, searchText: string) => {
    return this.participantRestApiService.getSportTypes({from: from, count: PropertyConstant.pageSize, name: searchText});
  };

  getKey(obj: IdentifiedObject) {
    return obj.id;
  }

  getName(obj: NamedObject) {
    return obj.name;
  }

  //#endregion

  public async onSportTypeChanged(val: any) {
    this.query.sportTypeId = val.id;

    await this.resetItems();
  }

  public async onStageChanged(val: any) {
    await this.resetItems();
  }

  public fetchItems = async (pageQuery: StageQuery) => {
    if (!this.selectedStage || !this.query.sportTypeId) {
      return null;
    }
    return await this.participantRestApiService.getStageStandards({}, pageQuery, {stageId: this.selectedStage.id});
  };

  private async resetItems(): Promise<void> {
    await this.appHelper.delay();
    await this.ngxGridComponent.reset();
  }

}
