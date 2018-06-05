import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import {Tab} from '../../../data/local/tab';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent implements OnInit {

  public tabs: Tab[];

  constructor() {
  }

  async ngOnInit() {
    this.tabs = [];
    const list = new Tab();
    list.nameKey = 'list';
    list.routerLink = 'list';
    this.tabs.push(list);

    const calendar = new Tab();
    calendar.nameKey = 'calendar';
    calendar.routerLink = 'calendar';
    this.tabs.push(calendar);
  }

}
