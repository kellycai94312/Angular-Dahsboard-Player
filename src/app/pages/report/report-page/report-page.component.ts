import {Component, OnInit} from '@angular/core';
import {Tab} from '../../../data/local/tab';
import {ActivatedRoute} from '@angular/router';
import {EventReportService} from './service/event-report.service';

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.scss']
})
export class ReportPageComponent implements OnInit {

  public readonly tabs: Tab[];

  constructor(private _eventReportService: EventReportService,
              private _activatedRoute: ActivatedRoute) {
    this.tabs = [
      {nameKey: 'general', routerLink: 'general'},
      {nameKey: 'blocks', routerLink: 'block'}
    ];
  }

  ngOnInit(): void {
    this._eventReportService.setTrainingReportId(this._activatedRoute.snapshot.params.id);
  }

}
