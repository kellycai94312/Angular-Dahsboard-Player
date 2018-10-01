import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppHelper} from '../../../../utils/app-helper';
import {BaseTrainingQuery} from '../../../../data/remote/rest-api/query/base-training-query';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {DxTextBoxComponent} from 'devextreme-angular';
import {MeasureParameterEnum} from '../../../../data/remote/misc/measure-parameter-enum';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {Router} from '@angular/router';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {UserRoleEnum} from '../../../../data/remote/model/user-role-enum';
import {ProfileService} from '../../../../shared/profile.service';
import {TrainingDiscriminator} from '../../../../data/remote/model/training/base/training-discriminator';
import {Game} from '../../../../data/remote/model/training/game/game';
import {NgxGridComponent} from '../../../../components/ngx-grid/ngx-grid/ngx-grid.component';
import {BaseTraining} from '../../../../data/remote/model/training/base/base-training';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {PersonReportsComponent} from '../../../../components/report/person-reports/person-reports.component';
import {TrainingState} from '../../../../data/remote/misc/training-state';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit, OnDestroy {

  public readonly propertyConstant = PropertyConstant;
  public readonly trainingDiscriminator = TrainingDiscriminator;
  public readonly trainingState = TrainingState;

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;

  @ViewChild(NgxGridComponent)
  public ngxGridComponent: NgxGridComponent;

  public baseTrainingQuery: BaseTrainingQuery;
  public canCreateEvent: boolean;

  constructor(private _router: Router,
              private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _profileService: ProfileService,
              private _ngxModalService: NgxModalService) {
    this.baseTrainingQuery = new BaseTrainingQuery();
    this.baseTrainingQuery.count = PropertyConstant.pageSize;
    this.baseTrainingQuery.measureParameterEnum = MeasureParameterEnum.GOALS;
  }

  async ngOnInit() {
    this.canCreateEvent = await this._profileService.hasUserRole(UserRoleEnum[UserRoleEnum.TRAINER]);

    this.searchDxTextBoxComponent.onValueChanged.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(async event => {
        this.baseTrainingQuery.name = event.value;
        await this.updateItems();
      });
  }

  ngOnDestroy(): void {
    this.searchDxTextBoxComponent.textChange.unsubscribe();
  }

  public async onCreate() {
    await this._router.navigate(['/event/0']);
  }

  public async onLocationChange(e: any) {
    if (e.current) {
      this.baseTrainingQuery.locationId = e.current.id;
    } else {
      delete this.baseTrainingQuery.locationId;
    }
    await this.updateItems();
  }

  public async onDateFromChange(event: any) {
    if (event.value) {
      this.baseTrainingQuery.dateFrom = this._appHelper.dateByFormat(event.value, PropertyConstant.dateFormat);
    } else {
      delete this.baseTrainingQuery.dateFrom;
    }
    await this.updateItems();
  }

  public async onDateToChange(event: any) {
    if (event.value) {
      this.baseTrainingQuery.dateTo = this._appHelper.dateByFormat(event.value, PropertyConstant.dateFormat);
    } else {
      delete this.baseTrainingQuery.dateTo;
    }
    await this.updateItems();
  }

  public fetchItems = async (pageQuery: PageQuery) => {
    const items = await this._participantRestApiService.getBaseTrainings(pageQuery);
    for (const event of items.list) {
      if (event.discriminator === TrainingDiscriminator.GAME) {
        this.setGameGroupScores(event as Game);
      }
    }
    return items;
  };

  public showReport = async (e: any, parameter: BaseTraining) => {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'reports';
    await modal.componentInstance.initializeBody(PersonReportsComponent, async component => {
      await component.initialize(parameter);
    });
  };

  public onShowEvent = async (item: BaseTraining) => {
    if (item.discriminator === TrainingDiscriminator.GAME) {
      await this._router.navigate([`/event/${item.id}`]);
    }
  };

  private async updateItems() {
    await this.ngxGridComponent.reset();
  }

  private setGameGroupScores(event: Game) {
    if (event.groupScores) {
      event.teams = event.groupScores.map(groupScore => groupScore.group.name).join(' - ');
      event.score = event.groupScores.map(groupScore => groupScore.score).join(' : ');
    }
  }

}
