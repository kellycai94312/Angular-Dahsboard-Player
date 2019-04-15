import {Component} from '@angular/core';
import {Tab} from '../../../../../../../data/local/tab';

@Component({
  selector: 'app-group-requests',
  templateUrl: './group-requests.component.html',
  styleUrls: ['./group-requests.component.scss']
})
export class GroupRequestsComponent {

  public readonly tabs: Tab[];

  constructor() {
    this.tabs = [
      {
        nameKey: 'outcoming',
        routerLink: 'outcoming'
      },
      {
        nameKey: 'incoming',
        routerLink: 'incoming'
      }
    ];
  }

}
