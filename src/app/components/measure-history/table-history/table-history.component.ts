import { Component, OnInit } from '@angular/core';
import { MeasureHistoryService } from '../measure-history.service';
import { PageQuery } from '../../../data/remote/rest-api/page-query';

@Component({
  selector: 'app-table-history',
  templateUrl: './table-history.component.html',
  styleUrls: ['./table-history.component.scss']
})
export class TableHistoryComponent implements OnInit {

  constructor(public measureHistoryService: MeasureHistoryService) {
    this.measureHistoryService.setup();
  }

  ngOnInit() {
  }

  public async onNextPage(pageQuery: PageQuery) {
    await this.measureHistoryService.updateListAsync(pageQuery.from);
  }

}
