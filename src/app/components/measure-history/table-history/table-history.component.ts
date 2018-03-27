import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageQuery } from '../../../data/remote/rest-api/page-query';

@Component({
  selector: 'app-table-history',
  templateUrl: './table-history.component.html',
  styleUrls: ['./table-history.component.scss']
})
export class TableHistoryComponent implements OnInit {

  @Input()
  measureValues: any[];

  @Output()
  measureValuesChange: EventEmitter<any>;

  @Input()
  setup: Function;

  @Input()
  updateListAsync: Function;

  @Input()
  getDate: Function;

  @Input()
  getUnits: Function;

  @Input()
  getValue: Function;

  constructor() {
    this.measureValuesChange = new EventEmitter<any>();
  }

  ngOnInit() {
    this.setup();
  }

  public async onNextPage(pageQuery: PageQuery) {
    await this.updateListAsync(pageQuery.from);
  }

}
