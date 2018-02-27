import { Component, OnInit } from '@angular/core';
import { MeasureTemplateQuery } from '../../../../../../data/remote/rest-api/query/measure-template-query';
import { PersonService } from '../../../person.service';
import { ParticipantRestApiService } from '../../../../../../data/remote/rest-api/participant-rest-api.service';
import { PropertyConstant } from '../../../../../../data/local/property-constant';
import { PageQuery } from '../../../../../../data/remote/rest-api/page-query';
import { AppHelper } from '../../../../../../utils/app-helper';
import { MeasureHistoryService } from '../measure-history.service';

@Component({
  selector: 'app-table-history',
  templateUrl: './table-history.component.html',
  styleUrls: ['./table-history.component.scss']
})
export class TableHistoryComponent implements OnInit {

  public readonly pageSize: number;

  private readonly _measureQuery: MeasureTemplateQuery;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _personService: PersonService,
              public measureHistoryService: MeasureHistoryService) {
    this.pageSize = PropertyConstant.pageSize;

    this._measureQuery = new MeasureTemplateQuery();
    this._measureQuery.from = 0;
    this._measureQuery.count = PropertyConstant.pageSize;
    this._measureQuery.personId = _personService.shared.person.id;
  }

  async ngOnInit() {
    this._measureQuery.exerciseMeasureId = this.measureHistoryService.exerciseMeasureId;
    this.updateListAsync();
  }

  async onDateFromChange(event: any) {
    if (event.value) {
      this._measureQuery.dateFrom = event.value.toISOString().split('T')[0];
    } else {
      delete this._measureQuery.dateFrom;
    }
    await this.updateListAsync();
  }

  async onDateToChange(event: any) {
    if (event.value) {
      this._measureQuery.dateTo = event.value.toISOString().split('T')[0];
    } else {
      delete this._measureQuery.dateTo;
    }
    await this.updateListAsync();
  }

  public async onNextPage(pageQuery: PageQuery) {
    await this.updateListAsync(pageQuery.from);
  }

  private async updateListAsync(from: number = 0) {
    this._measureQuery.from = from;
    const container = await this._participantRestApiService.getExerciseValueHistory(this._measureQuery);
    this.measureHistoryService.measureValues = AppHelper.pushItemsInList(from, this.measureHistoryService.measureValues, container);
  }

}
