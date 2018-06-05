import {Component, OnInit} from '@angular/core';
import {Tab} from '../../../data/local/tab';

@Component({
  selector: 'app-group-administration',
  templateUrl: './group-administration.component.html',
  styleUrls: ['./group-administration.component.scss']
})
export class GroupAdministrationComponent implements OnInit {

  public tabs: Tab[];

  constructor() {
  }

  async ngOnInit() {
    this.tabs = [];
    const allTab = new Tab();
    allTab.nameKey = 'settings';
    allTab.routerLink = 'settings';
    this.tabs.push(allTab);

    const subgroupsTab = new Tab();
    subgroupsTab.nameKey = 'subgroups';
    subgroupsTab.routerLink = 'subgroup';
    this.tabs.push(subgroupsTab);

    const membersTab = new Tab();
    membersTab.nameKey = 'members';
    membersTab.routerLink = 'member';
    this.tabs.push(membersTab);

    const requestsTab = new Tab();
    requestsTab.nameKey = 'requests';
    requestsTab.routerLink = 'request';
    this.tabs.push(requestsTab);

    const measureTemplateTab = new Tab();
    measureTemplateTab.nameKey = 'templates';
    measureTemplateTab.routerLink = 'template';
    this.tabs.push(measureTemplateTab);
  }

}
