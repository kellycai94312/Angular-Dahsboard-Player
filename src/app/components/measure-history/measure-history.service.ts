import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ExerciseExecMeasureValue } from '../../data/remote/model/training/exercise-exec-measure-value';
import { MeasureTemplateQuery } from '../../data/remote/rest-api/query/measure-template-query';
import { ParticipantRestApiService } from '../../data/remote/rest-api/participant-rest-api.service';
import { PropertyConstant } from '../../data/local/property-constant';
import { AppHelper } from '../../utils/app-helper';

@Injectable()
export class MeasureHistoryService {
  public measureValues: ExerciseExecMeasureValue[];
  public readonly measureQuery: MeasureTemplateQuery;
  public dateSubject: Subject<void>;

  constructor(private _participantRestApiService: ParticipantRestApiService) {
    this.measureQuery = new MeasureTemplateQuery();
    this.dateSubject = new Subject<void>();
  }

  public async setup(isNumeric: boolean = false, count: number = PropertyConstant.pageSize) {
    this.measureValues = [];
    this.measureQuery.isNumeric = isNumeric;
    this.measureQuery.count = count;
    await this.updateListAsync(0);
  }

  public async setDateFrom(value: any) {
    if (value) {
      this.measureQuery.dateFrom = value.toISOString().split('T')[0];
    } else {
      delete this.measureQuery.dateFrom;
    }
    await this.updateListAsync(0);
  }

  public async setDateTo(value: any) {
    if (value) {
      this.measureQuery.dateTo = value.toISOString().split('T')[0];
    } else {
      delete this.measureQuery.dateTo;
    }
    await this.updateListAsync(0);
  }

  public async updateListAsync(from: number) {
    this.measureQuery.from = from;
    const container = await this._participantRestApiService.getExerciseValueHistory(this.measureQuery);
    this.measureValues = AppHelper.pushItemsInList(from, this.measureValues, container);
    this.dateSubject.next(null);
  }

}
