import {Component} from '@angular/core';
import {Tab} from '../../../data/local/tab';

@Component({
  selector: 'app-group-administration',
  templateUrl: './group-administration.component.html',
  styleUrls: ['./group-administration.component.scss']
})
export class GroupAdministrationComponent {

  public readonly tabs: Tab[];

  constructor() {
    this.tabs = [
      {
        nameKey: 'settings',
        routerLink: 'settings'
      },
      {
        nameKey: 'subgroups',
        routerLink: 'subgroup'
      },
      {
        nameKey: 'members',
        routerLink: 'member'
      },
      {
        nameKey: 'requests',
        routerLink: 'request'
      },
      {
        nameKey: 'templates',
        routerLink: 'template'
      },
      {
        nameKey: 'connections',
        routerLink: 'connection'
      }
    ];
  }

}
