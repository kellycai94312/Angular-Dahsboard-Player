import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MeasureHistoryService } from './measure-history.service';

@Component({
  selector: 'app-measure-history',
  templateUrl: './measure-history.component.html',
  styleUrls: ['./measure-history.component.scss']
})
export class MeasureHistoryComponent implements OnInit {

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
  isNumber: boolean;

  constructor(private _measureHistoryService: MeasureHistoryService) {
  }

  async ngOnInit() {
  }

  async onDateFromChange(event: any) {
    this._measureHistoryService.dateSubject.next(await this.setDateFrom(event.value));
  }

  async onDateToChange(event: any) {
    this._measureHistoryService.dateSubject.next(await this.setDateTo(event.value));
  }

}
