import {Component} from '@angular/core';
import {Tab} from '../../../../../data/local/tab';

@Component({
  selector: 'app-event-block',
  templateUrl: './event-block.component.html',
  styleUrls: ['./event-block.component.scss']
})
export class EventBlockComponent {

  public readonly tabs: Tab[];

  constructor() {
    this.tabs = [
      this.createTab('general', 'general'),
      this.createTab('exercises', 'exercise'),
      this.createTab('persons.section', 'person')
    ];
  }

  private createTab(nameKey: string, routerLink: string): Tab {
    const tab = new Tab();
    tab.nameKey = nameKey;
    tab.routerLink = routerLink;
    return tab;
  }

}
