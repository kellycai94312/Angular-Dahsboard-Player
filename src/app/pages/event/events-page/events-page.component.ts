import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent implements OnInit {

  public baseTrainingQuery: BaseTrainingQuery;
  public baseTrainings: BaseTraining[];

  private searchTextChanges: Subject<PageQuery>;

  constructor(private _router: Router,
              private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper) {
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
  }

  public async onCreate() {
    await this._router.navigate(['/event/0']);
  }

  public onKeyUp(): void {
    this.searchTextChanges.next(this.baseTrainingQuery);
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
