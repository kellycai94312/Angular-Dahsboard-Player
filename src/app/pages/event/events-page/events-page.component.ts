import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {BaseTrainingQuery} from '../../../data/remote/rest-api/query/base-training-query';
import {PropertyConstant} from '../../../data/local/property-constant';
import {PageQuery} from '../../../data/remote/rest-api/page-query';
import {AppHelper} from '../../../utils/app-helper';
import 'rxjs/add/operator/debounceTime';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {MeasureParameterEnum} from '../../../data/remote/misc/measure-parameter-enum';
import {ProfileService} from '../../../shared/profile.service';
import {UserRoleEnum} from '../../../data/remote/model/user-role-enum';
import {DxTextBoxComponent} from 'devextreme-angular';
import {InfiniteListComponent} from '../../../components/infinite-list/infinite-list.component';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;

  @ViewChild(InfiniteListComponent)
  public infiniteListComponent: InfiniteListComponent;

  public baseTrainingQuery: BaseTrainingQuery;
  public canCreateEvent: boolean;

  constructor(private _router: Router,
              private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _profileService: ProfileService) {
    this.baseTrainingQuery = new BaseTrainingQuery();
    this.baseTrainingQuery.count = PropertyConstant.pageSize;
    this.baseTrainingQuery.measureParameter = MeasureParameterEnum[MeasureParameterEnum.GOALS];
  }

  async ngOnInit() {
    this.canCreateEvent = await this._profileService.hasUserRole(UserRoleEnum[UserRoleEnum.TRAINER]);
  }

  async ngAfterViewInit() {
    this.searchDxTextBoxComponent.onValueChanged.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(async event => {
        this.baseTrainingQuery.name = event.value;
        await this.updateItems();
      });
    await this.infiniteListComponent.initialize();
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
      this.baseTrainingQuery.dateFrom = this._appHelper.getGmtDate(event.value);
    } else {
      delete this.baseTrainingQuery.dateFrom;
    }
    await this.updateItems();
  }

  public async onDateToChange(event: any) {
    if (event.value) {
      this.baseTrainingQuery.dateTo = this._appHelper.getGmtDate(event.value);
    } else {
      delete this.baseTrainingQuery.dateTo;
    }
    await this.updateItems();
  }

  public getItems: Function = async (pageQuery: PageQuery) => {
    return await this._participantRestApiService.getBaseTrainings(pageQuery);
  };

  private async updateItems() {
    await this.infiniteListComponent.update(true);
  }

}
