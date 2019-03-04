import {Component} from '@angular/core';
import {Tab} from '../../../../../../data/local/tab';

@Component({
  selector: 'app-subgroups-page',
  templateUrl: './subgroups-page.component.html',
  styleUrls: ['./subgroups-page.component.scss']
})
export class SubgroupsPageComponent {

  public readonly tabs: Tab[];

  constructor() {
    this.tabs = [
      {nameKey: 'structureSubgroups', routerLink: 'structure'},
      {nameKey: 'templates', routerLink: 'template'}
    ];
  }

}
