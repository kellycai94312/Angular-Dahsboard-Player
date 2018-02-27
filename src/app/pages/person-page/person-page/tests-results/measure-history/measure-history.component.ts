import { Component, OnInit } from '@angular/core';
import { ParticipantRestApiService } from '../../../../../data/remote/rest-api/participant-rest-api.service';
import { ActivatedRoute } from '@angular/router';
import { MeasureHistoryService } from './measure-history.service';
import { ExerciseMeasure } from '../../../../../data/remote/model/exercise/exercise-measure';

@Component({
  selector: 'app-measure-history',
  templateUrl: './measure-history.component.html',
  styleUrls: ['./measure-history.component.scss']
})
export class MeasureHistoryComponent implements OnInit {

  public exerciseMeasure: ExerciseMeasure;

  constructor(private _route: ActivatedRoute,
              private _measureHistoryService: MeasureHistoryService,
              private _participantRestApiService: ParticipantRestApiService) {
  }

  async ngOnInit() {
    this._route.params.subscribe(params => {
      this._measureHistoryService.exerciseMeasureId = +params.id;
    });
    this.exerciseMeasure = await this._participantRestApiService.getExerciseMeasureById({exerciseMeasureId: this._measureHistoryService.exerciseMeasureId});
  }

}
