import {Component} from '@angular/core';
import {Tab} from '../../../data/local/tab';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {

  public readonly tabs: Tab[];

  constructor() {
    this.tabs = [
      {
        nameKey: 'all',
        routerLink: 'all'
      },
      {
        nameKey: 'changes',
        routerLink: 'change'
      }
    ];
  }

}
