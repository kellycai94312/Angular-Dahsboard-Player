import {Component, OnInit} from '@angular/core';
import {Tab} from '../../../../../data/local/tab';
import {ActivatedRoute} from '@angular/router';
import {EventReportService} from '../../service/event-report.service';

@Component({
  selector: 'app-event-block',
  templateUrl: './event-block.component.html',
  styleUrls: ['./event-block.component.scss']
})
export class EventBlockComponent implements OnInit {

  public readonly tabs: Tab[];

  constructor(private _activatedRoute: ActivatedRoute,
              private _eventReportService: EventReportService) {
    this.tabs = [
      this.createTab('general', 'general'),
      this.createTab('exercises', 'exercise'),
      this.createTab('persons.section', 'person')
    ];
  }

  ngOnInit() {
    this._eventReportService.setSelectedTrainingBlockId(this._activatedRoute.snapshot.params.id);
  }

  private createTab(nameKey: string, routerLink: string): Tab {
    const tab = new Tab();
    tab.nameKey = nameKey;
    tab.routerLink = routerLink;
    return tab;
  }

}
