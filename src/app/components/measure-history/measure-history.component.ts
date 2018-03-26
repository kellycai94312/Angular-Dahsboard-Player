import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExerciseMeasure } from '../../data/remote/model/exercise/exercise-measure';
import { PersonService } from '../../pages/person-page/person-page/person.service';
import { ParticipantRestApiService } from '../../data/remote/rest-api/participant-rest-api.service';
import { PropertyConstant } from '../../data/local/property-constant';
import { Tab } from '../../data/local/tab';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-measure-history',
  templateUrl: './measure-history.component.html',
  styleUrls: ['./measure-history.component.scss']
})
export class MeasureHistoryComponent implements OnInit {

  public tabs: Tab[];
  public exerciseMeasure: ExerciseMeasure;

  @Input()
  measureValues: any[];

  @Input()
  measureQuery: any;

  @Input()
  setup: Function;

  @Input()
  setDateFrom: Function;

  @Input()
  setDateTo: Function;

  @Input()
  updateListAsync: Function;

  @Input()
  getDate: Function;

  @Input()
  getUnits: Function;

  @Input()
  getValue: Function;

  @Input()
  dateSubject: Subject<any[]>;

  constructor(private _route: ActivatedRoute,
              private _personService: PersonService,
              private _participantRestApiService: ParticipantRestApiService) {
  }

  async ngOnInit() {
    this.measureQuery.count = PropertyConstant.pageSize;
    this.measureQuery.personId = this._personService.shared.person.id;
    this._route.params.subscribe(params => {
      this.measureQuery.exerciseMeasureId = +params.id;
    });
    this.exerciseMeasure = await this._participantRestApiService.getExerciseMeasureById({
      exerciseMeasureId: this.measureQuery.exerciseMeasureId
    });
  }

  async onDateFromChange(event: any) {
    await this.setDateFrom(event.value);
  }

  async onDateToChange(event: any) {
    await this.setDateTo(event.value);
  }

}
