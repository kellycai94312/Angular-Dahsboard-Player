import {Component, OnInit} from '@angular/core';
import {Tab} from '../../../data/local/tab';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-group-administration',
  templateUrl: './group-administration.component.html',
  styleUrls: ['./group-administration.component.scss']
})
export class GroupAdministrationComponent implements OnInit {

  public tabs: Tab[];

  constructor(private _translateService: TranslateService) {
  }

  async ngOnInit() {
    this.tabs = [];
    const allTab = new Tab();
    allTab.name = await this._translateService.get('settings').toPromise();
    allTab.routerLink = 'settings';
    this.tabs.push(allTab);

    const subgroupsTab = new Tab();
    subgroupsTab.name = await this._translateService.get('subgroups').toPromise();
    subgroupsTab.routerLink = 'subgroup';
    this.tabs.push(subgroupsTab);
  }

}
