import {Component, OnInit} from '@angular/core';
import {Tab} from '../../../../../data/local/tab';
import {ActivatedRoute} from '@angular/router';
import {EventReportService} from '../../service/event-report.service';

// @Component({
//   selector: 'app-event-block',
//   templateUrl: './event-block.component.html',
//   styleUrls: ['./event-block.component.scss']
// })
export class EventBlockComponent implements OnInit {

  public readonly tabs: Tab[];

  constructor(private _activatedRoute: ActivatedRoute,
              private _eventReportService: EventReportService) {
    this.tabs = [
      {nameKey: 'general', routerLink: 'general'},
      {nameKey: 'exercises', routerLink: 'exercise'},
      {nameKey: 'persons.section', routerLink: 'person'}
    ];
  }

  ngOnInit() {
    this._eventReportService.setSelectedTrainingBlockId(this._activatedRoute.snapshot.params.id);
  }

}
