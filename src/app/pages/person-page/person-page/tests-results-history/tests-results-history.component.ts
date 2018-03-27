import { Component, OnInit } from '@angular/core';
import { MeasureTemplateQuery } from '../../../../data/remote/rest-api/query/measure-template-query';
import { PropertyConstant } from '../../../../data/local/property-constant';
import { ParticipantRestApiService } from '../../../../data/remote/rest-api/participant-rest-api.service';
import { AppHelper } from '../../../../utils/app-helper';
import { ExerciseExecMeasureValue } from '../../../../data/remote/model/training/exercise-exec-measure-value';
import { ActivatedRoute } from '@angular/router';
import { PersonService } from '../person.service';
import { ExerciseMeasure } from '../../../../data/remote/model/exercise/exercise-measure';
import { UnitTypeEnum } from '../../../../data/remote/misc/unit-type-enum';

@Component({
  selector: 'app-tests-results-history',
  templateUrl: './tests-results-history.component.html',
  styleUrls: ['./tests-results-history.component.scss']
})
export class TestsResultsHistoryComponent implements OnInit {
  public measureValues: ExerciseExecMeasureValue[];
  public readonly query: MeasureTemplateQuery;
  public exerciseMeasure: ExerciseMeasure;
  public isNumber: boolean;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _route: ActivatedRoute,
              private _personService: PersonService) {
    this.measureValues = [];
    this.query = new MeasureTemplateQuery();
  }

  public setup = async (isNumeric: boolean = false, count: number = PropertyConstant.pageSize) => {
    this.query.isNumeric = isNumeric;
    this.query.count = count;
    return await this.updateListAsync(0);
  };

  public setDateFrom = async (value: any) => {
    if (value) {
      this.query.dateFrom = value.toISOString().split('T')[0];
    } else {
      delete this.query.dateFrom;
    }
    return await this.updateListAsync(0);
  };

  public setDateTo = async (value: any) => {
    if (value) {
      this.query.dateTo = value.toISOString().split('T')[0];
    } else {
      delete this.query.dateTo;
    }
    return await this.updateListAsync(0);
  };

  public updateListAsync = async (from: number) => {
    this.query.from = from;
    const container = await this._participantRestApiService.getExerciseValueHistory(this.query);
    this.measureValues = AppHelper.pushItemsInList(from, this.measureValues, container);
    return this.measureValues;
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

  async ngOnInit() {
    this.query.personId = this._personService.shared.person.id;
    this._route.params.subscribe(params => {
      this.query.exerciseMeasureId = +params.id;
    });
    this.exerciseMeasure = await this._participantRestApiService.getExerciseMeasureById({
      exerciseMeasureId: this.query.exerciseMeasureId
    });
    this.isNumber = this.exerciseMeasure.measure.measureUnit.unitTypeEnum.toString() === UnitTypeEnum[UnitTypeEnum.NUMBER];
  }

}
