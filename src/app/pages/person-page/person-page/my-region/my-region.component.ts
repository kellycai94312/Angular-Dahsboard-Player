import {Component} from '@angular/core';
import {Tab} from '../../../../data/local/tab';
import {MyRegionService} from './my-region.service';

@Component({
  selector: 'app-my-region',
  templateUrl: './my-region.component.html',
  styleUrls: ['./my-region.component.scss']
})
export class MyRegionComponent {

  public readonly tabs: Tab[];

  constructor(public myRegionService: MyRegionService) {
    this.tabs = [];

    const schoolTab = new Tab();
    schoolTab.nameKey = 'persons.person.myRegion.school.section';
    schoolTab.routerLink = 'school';
    this.tabs.push(schoolTab);

    const trainerTab = new Tab();
    trainerTab.nameKey = 'persons.person.myRegion.trainer.section';
    trainerTab.routerLink = 'trainer';
    this.tabs.push(trainerTab);

    const agentTab = new Tab();
    agentTab.nameKey = 'persons.person.myRegion.agent.section';
    agentTab.routerLink = 'agent';
    this.tabs.push(agentTab);
  }

}
