import {Component} from '@angular/core';
import {NgxTab} from '../../../../../../module/ngx/ngx-tabs/model/ngx-tab';

@Component({
  selector: 'app-group-structure',
  templateUrl: './group-structure.component.html',
  styleUrls: ['./group-structure.component.scss']
})
export class GroupStructureComponent {

  public readonly tabs: NgxTab[];

  constructor() {
    this.tabs = [
      {translation: 'clusters', link: 'cluster'},
      {translation: 'hierarchies', link: 'hierarchy'},
      {translation: 'requests', link: 'request'}
    ];
  }

}
