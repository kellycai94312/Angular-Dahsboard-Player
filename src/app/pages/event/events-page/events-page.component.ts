import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BaseTrainingQuery } from '../../../data/remote/rest-api/query/base-training-query';
import { PropertyConstant } from '../../../data/local/property-constant';
import { PageQuery } from '../../../data/remote/rest-api/page-query';
import { AppHelper } from '../../../utils/app-helper';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import { ParticipantRestApiService } from '../../../data/remote/rest-api/participant-rest-api.service';
import { BaseTraining } from '../../../data/remote/model/training/base/base-training';
import { MeasureParameterEnum } from "../../../data/remote/misc/measure-parameter-enum";
import { ProfileService } from "../../../shared/profile.service";
import { UserRoleEnum } from "../../../data/remote/model/user-role-enum";
import { DxTextBoxComponent } from "devextreme-angular";

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent implements OnInit, AfterViewInit {

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;
  public baseTrainingQuery: BaseTrainingQuery;
  public baseTrainings: BaseTraining[];
  public canCreateEvent: boolean;

  private searchTextChanges: Subject<PageQuery>;

  constructor(private _router: Router,
              private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _profileService: ProfileService) {
    this.baseTrainingQuery = new BaseTrainingQuery();
    this.baseTrainingQuery.count = PropertyConstant.pageSize;
    this.baseTrainingQuery.measureParameter = MeasureParameterEnum[MeasureParameterEnum.GOALS];

    this.searchTextChanges = new Subject<PageQuery>();
    this.searchTextChanges.debounceTime(PropertyConstant.searchDebounceTime).subscribe(async x => {
      await this.updateListAsync();
    });
  }

  async ngOnInit() {
    await this.updateListAsync();
    this.canCreateEvent = await this._profileService.hasUserRole(UserRoleEnum[UserRoleEnum.TRAINER]);
  }

  async ngAfterViewInit() {
    this.searchDxTextBoxComponent.onValueChanged.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(event => {
        this.baseTrainingQuery.name = event.value;
        this.updateListAsync();
      });
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
    await this.updateListAsync();
  }

  async onDateFromChange(event: any) {
    if (event.value) {
      this.baseTrainingQuery.dateFrom = this._appHelper.getGmtDate(event.value);
    } else {
      delete this.baseTrainingQuery.dateFrom;
    }
    await this.updateListAsync();
  }

  async onDateToChange(event: any) {
    if (event.value) {
      this.baseTrainingQuery.dateTo = this._appHelper.getGmtDate(event.value);
    } else {
      delete this.baseTrainingQuery.dateTo;
    }
    await this.updateListAsync();
  }

  public async onNextPage(pageQuery: PageQuery) {
    await this.updateListAsync(pageQuery.from);
  }

  private async updateListAsync(from: number = 0) {
    this.baseTrainingQuery.from = from;

    const pageContainer = await this._participantRestApiService.getBaseTrainings(this.baseTrainingQuery);
    this.baseTrainings = this._appHelper.pushItemsInList(from, this.baseTrainings, pageContainer);
  }

}
