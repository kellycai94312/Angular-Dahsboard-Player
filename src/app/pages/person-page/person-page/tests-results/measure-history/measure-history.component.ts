import { Component, OnInit } from '@angular/core';
import { ParticipantRestApiService } from '../../../../../data/remote/rest-api/participant-rest-api.service';
import { ActivatedRoute } from '@angular/router';
import { MeasureHistoryService } from './measure-history.service';
import { ExerciseMeasure } from '../../../../../data/remote/model/exercise/exercise-measure';
import { PropertyConstant } from '../../../../../data/local/property-constant';
import { PersonService } from '../../person.service';
import { Tab } from '../../../../../data/local/tab';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-measure-history',
  templateUrl: './measure-history.component.html',
  styleUrls: ['./measure-history.component.scss']
})
export class MeasureHistoryComponent implements OnInit {

  public tabs: Tab[];
  public exerciseMeasure: ExerciseMeasure;

  constructor(private _route: ActivatedRoute,
              private _measureHistoryService: MeasureHistoryService,
              private _personService: PersonService,
              private _participantRestApiService: ParticipantRestApiService,
              private _translateService: TranslateService) {
    this._measureHistoryService.measureQuery.count = PropertyConstant.pageSize;
    this._measureHistoryService.measureQuery.personId = this._personService.shared.person.id;
  }

  async ngOnInit() {
    this._route.params.subscribe(params => {
      this._measureHistoryService.measureQuery.exerciseMeasureId = +params.id;
    });
    this.exerciseMeasure = await this._participantRestApiService.getExerciseMeasureById({
      exerciseMeasureId: this._measureHistoryService.measureQuery.exerciseMeasureId
    });

    this.tabs = [];
    const tableTab = new Tab();
    tableTab.name = await this._translateService.get('table').toPromise();
    tableTab.routerLink = 'table';
    this.tabs.push(tableTab);

    const chartTab = new Tab();
    chartTab.name = await this._translateService.get('chart').toPromise();
    chartTab.routerLink = 'chart';
    this.tabs.push(chartTab);
  }

  async onDateFromChange(event: any) {
    await this._measureHistoryService.setDateFrom(event.value);
  }

  async onDateToChange(event: any) {
    await this._measureHistoryService.setDateTo(event.value);
  }

}
