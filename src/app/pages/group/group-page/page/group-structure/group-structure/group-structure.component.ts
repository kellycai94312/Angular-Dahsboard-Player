import {Component} from '@angular/core';
import {Tab} from '../../../../../../data/local/tab';

@Component({
  selector: 'app-group-structure',
  templateUrl: './group-structure.component.html',
  styleUrls: ['./group-structure.component.scss']
})
export class GroupStructureComponent {

  public readonly tabs: Tab[];

  constructor() {
    this.tabs = [
      {
        nameKey: 'clusters',
        routerLink: 'cluster'
      },
      {
        nameKey: 'requests',
        routerLink: 'request'
      }
    ];
  }

}
