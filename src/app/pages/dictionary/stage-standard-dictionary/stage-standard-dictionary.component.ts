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
import {UserRoleEnum} from '../../../data/remote/model/user-role-enum';

@Component({
  selector: 'app-stage-standard-dictionary',
  templateUrl: './stage-standard-dictionary.component.html',
  styleUrls: ['./stage-standard-dictionary.component.scss']
})
export class StageStandardDictionaryComponent implements OnInit {

  @ViewChild(NgxGridComponent)
  public ngxGridComponent: NgxGridComponent;

  public readonly propertyConstant = PropertyConstant;

  public selectedSportType: SportType;
  public selectedStage: Stage;
  public stages: Stage[];
  public query: StageQuery;
  public canEdit: boolean;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _authorizationService: AuthorizationService) {
    this.query = new StageQuery();
  }

  async ngOnInit() {
    this.canEdit = await this._authorizationService.hasUserRole(UserRoleEnum.ADMIN);
    this.stages = await this._participantRestApiService.getStages();
  }

  //#region SportTypes

  loadSportTypes = async (from: number, searchText: string) => {
    return this._participantRestApiService.getSportTypes({from: from, count: PropertyConstant.pageSize, name: searchText});
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
    console.log(val);

    await this.resetItems();
  }

  public fetchItems = async (pageQuery: StageQuery) => {
    if (!this.selectedStage || !this.query.sportTypeId) {
      return null;
    }
    return await this._participantRestApiService.getStageStandards({}, pageQuery, {stageId: this.selectedStage.id});
  };

  private async resetItems(): Promise<void> {
    await this._appHelper.delay();
    await this.ngxGridComponent.reset();
  }

}
