import { Component } from '@angular/core';
import { MeasureTemplateQuery } from '../../../../../data/remote/rest-api/query/measure-template-query';
import { PropertyConstant } from '../../../../../data/local/property-constant';
import { ParticipantRestApiService } from '../../../../../data/remote/rest-api/participant-rest-api.service';
import { AppHelper } from '../../../../../utils/app-helper';
import { ExerciseExecMeasureValue } from '../../../../../data/remote/model/training/exercise-exec-measure-value';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-tests-results-history',
  templateUrl: './tests-results-history.component.html',
  styleUrls: ['./tests-results-history.component.scss']
})
export class TestsResultsHistoryComponent {

  public measureValues: ExerciseExecMeasureValue[];
  public readonly measureQuery: MeasureTemplateQuery;
  public dateSubject: Subject<ExerciseExecMeasureValue[]>;

  constructor(private _participantRestApiService: ParticipantRestApiService) {
    this.measureValues = [];
    this.measureQuery = new MeasureTemplateQuery();
    this.dateSubject = new Subject<ExerciseExecMeasureValue[]>();
  }

  public setup = async (isNumeric: boolean = false, count: number = PropertyConstant.pageSize) => {
    this.measureQuery.isNumeric = isNumeric;
    this.measureQuery.count = count;
    await this.updateListAsync(0);
  };

  public setDateFrom = async (value: any) => {
    if (value) {
      this.measureQuery.dateFrom = value.toISOString().split('T')[0];
    } else {
      delete this.measureQuery.dateFrom;
    }
    await this.updateListAsync(0);
  };

  public setDateTo = async (value: any) => {
    if (value) {
      this.measureQuery.dateTo = value.toISOString().split('T')[0];
    } else {
      delete this.measureQuery.dateTo;
    }
    await this.updateListAsync(0);
  };

  public updateListAsync = async (from: number) => {
    this.measureQuery.from = from;
    const container = await this._participantRestApiService.getExerciseValueHistory(this.measureQuery);
    this.measureValues = AppHelper.pushItemsInList(from, this.measureValues, container);
    this.dateSubject.next(this.measureValues);
  };

  public getDate = (item: ExerciseExecMeasureValue) => {
    return item.created;
  };

  public getUnits = (item: ExerciseExecMeasureValue) => {
    return item.exerciseExecMeasure.exerciseMeasure.measure.measureUnit.name;
  };

  public getValue = (item: ExerciseExecMeasureValue) => {
    return item.value;
  };

}
