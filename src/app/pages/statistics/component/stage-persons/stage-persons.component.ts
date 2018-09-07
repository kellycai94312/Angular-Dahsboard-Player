import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {NgxColumnComponent} from '../../../../components/ngx-grid/ngx-column/ngx-column.component';
import {StageType} from '../../../../data/remote/model/stage/stage-type';
import {Stage} from '../../../../data/remote/model/stage/stage';
import {StagePerson} from '../../../../data/remote/bean/stage-person';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {SportType} from '../../../../data/remote/model/sport-type';
import {ActivatedRoute, Router} from '@angular/router';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {NgxGridComponent} from '../../../../components/ngx-grid/ngx-grid/ngx-grid.component';
import {BreadcrumbItem} from '../../../../components/ngx-breadcrumb/bean/breadcrumb-item';

@Component({
  selector: 'app-stage-persons',
  templateUrl: './stage-persons.component.html',
  styleUrls: ['./stage-persons.component.scss']
})
export class StagePersonsComponent implements OnInit {

  @ViewChild(NgxGridComponent)
  public ngxGridComponent: NgxGridComponent;

  @Input()
  public sportType: SportType;

  public stageTypes: StageType[];
  private readonly _breadcrumbItem: BreadcrumbItem;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _ngxModalService: NgxModalService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router) {
    this._breadcrumbItem = this._activatedRoute.routeConfig.data.breadcrumb as BreadcrumbItem;
  }

  async ngOnInit(): Promise<void> {
    this.stageTypes = await this._participantRestApiService.getStageTypes();
    if (!this.sportType) {
      const sportTypeId = await this._activatedRoute.snapshot.params.id;
      // TODO: You should use another method to get sport type by id from server
      this.sportType = (await this._participantRestApiService.getSportTypes({count: PropertyConstant.pageSizeMax})).list.find(x => x.id == sportTypeId);
      this._breadcrumbItem.name = this.sportType.name;
      await this.resetItems();
    }
  }

  public fetchItems = async (query: PageQuery) => {
    if (!this.sportType) {
      return;
    }
    const items = await this._participantRestApiService.getStagePersons({sportTypeId: this.sportType.id});
    return this._appHelper.arrayToPageContainer(this.groupStagePerson(items));
  };

  public onColumnClick = async (column: NgxColumnComponent) => {
    const data: StageType = column.data;
    await this._router.navigate([data.id, 'person'], {relativeTo: this._activatedRoute});
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

  private async resetItems() {
    await this._appHelper.delay();
    await this.ngxGridComponent.reset();
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
