import {Component} from '@angular/core';
import {Tab} from '../../../data/local/tab';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent {

  public readonly tabs: Tab[];

  constructor() {
    this.tabs = [
      {
        nameKey: 'list',
        routerLink: 'list'
      },
      {
        nameKey: 'calendar',
        routerLink: 'calendar'
      }
    ];
  }

}
