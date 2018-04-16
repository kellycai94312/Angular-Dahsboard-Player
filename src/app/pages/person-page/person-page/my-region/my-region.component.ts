import { Component, OnInit } from '@angular/core';
import { Tab } from '../../../../data/local/tab';
import { TranslateService } from '@ngx-translate/core';
import { MyRegionService } from "./my-region.service";

@Component({
  selector: 'app-my-region',
  templateUrl: './my-region.component.html',
  styleUrls: ['./my-region.component.scss']
})
export class MyRegionComponent implements OnInit {

  public tabs: Tab[];

  constructor(private _translateService: TranslateService,
              public myRegionService: MyRegionService) {
  }

  async ngOnInit() {
    this.tabs = [];

    const schoolTab = new Tab();
    schoolTab.name = await this._translateService.get('persons.person.myRegion.school.section').toPromise();
    schoolTab.routerLink = 'school';
    this.tabs.push(schoolTab);

    const trainerTab = new Tab();
    trainerTab.name = await this._translateService.get('persons.person.myRegion.trainer.section').toPromise();
    trainerTab.routerLink = 'trainer';
    this.tabs.push(trainerTab);

    const agentTab = new Tab();
    agentTab.name = await this._translateService.get('persons.person.myRegion.agent.section').toPromise();
    agentTab.routerLink = 'agent';
    this.tabs.push(agentTab);

  }

}
