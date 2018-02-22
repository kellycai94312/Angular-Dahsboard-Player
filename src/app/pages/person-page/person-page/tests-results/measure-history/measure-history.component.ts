import { Component, OnInit } from '@angular/core';
import { ParticipantRestApiService } from '../../../../../data/remote/rest-api/participant-rest-api.service';
import { PropertyConstant } from '../../../../../data/local/property-constant';
import { MeasureTemplateQuery } from '../../../../../data/remote/rest-api/query/measure-template-query';
import { PersonService } from '../../person.service';
import { ActivatedRoute } from '@angular/router';
import { AppHelper } from '../../../../../utils/app-helper';
import { ExerciseExecMeasureValue } from '../../../../../data/remote/model/training/exercise-exec-measure-value';
import { PageQuery } from '../../../../../data/remote/rest-api/page-query';
import { ExerciseMeasure } from '../../../../../data/remote/model/exercise/exercise-measure';

@Component({
  selector: 'app-measure-history',
  templateUrl: './measure-history.component.html',
  styleUrls: ['./measure-history.component.scss']
})
export class MeasureHistoryComponent implements OnInit {

  public measureValues: ExerciseExecMeasureValue[];
  public exerciseMeasure: ExerciseMeasure;

  public readonly pageSize: number;

  private readonly _measureQuery: MeasureTemplateQuery;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _personService: PersonService,
              private _route: ActivatedRoute) {
    this.pageSize = PropertyConstant.pageSize;

    this._measureQuery = new MeasureTemplateQuery();
    this._measureQuery.from = 0;
    this._measureQuery.count = PropertyConstant.pageSize;
    this._measureQuery.personId = _personService.shared.person.id;
  }

  async ngOnInit() {
    this._route.params.subscribe(params => {
      this._measureQuery.exerciseMeasureId = +params.id;
      this.updateListAsync();
    });
    this.exerciseMeasure = await this._participantRestApiService.getExerciseMeasureById({exerciseMeasureId: this._measureQuery.exerciseMeasureId});
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
    this.measureValues = AppHelper.pushItemsInList(from, this.measureValues, container);
  }

}
