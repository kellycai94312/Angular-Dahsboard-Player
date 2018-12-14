import {Component} from '@angular/core';
import {Tab} from '../../../../data/local/tab';
import {MyRegionService} from './my-region.service';
import {SplitButtonItem} from '../../../../components/ngx-split-button/bean/split-button-item';

// @Component({
//   selector: 'app-my-region',
//   templateUrl: './my-region.component.html',
//   styleUrls: ['./my-region.component.scss']
// })
export class MyRegionComponent {

  public readonly tabs: Tab[];

  constructor(private _myRegionService: MyRegionService) {
    const actions: SplitButtonItem[] = [
      {nameKey: 'add', callback: this._myRegionService.onAdd}
    ];
    this.tabs = [
      {nameKey: 'persons.person.myRegion.school.section', routerLink: 'school', splitButtonsItems: actions},
      {nameKey: 'persons.person.myRegion.trainer.section', routerLink: 'trainer', splitButtonsItems: actions},
      {nameKey: 'persons.person.myRegion.agent.section', routerLink: 'agent', splitButtonsItems: actions},
    ];
  }

}
