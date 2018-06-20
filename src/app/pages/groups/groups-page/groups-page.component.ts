import {Component} from '@angular/core';
import {Tab} from '../../../data/local/tab';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss']
})
export class GroupsPageComponent {

  public readonly tabs: Tab[];

  constructor(private _route: ActivatedRoute,
              private _router: Router) {
    this.tabs = [];
    const allTab = new Tab();
    allTab.nameKey = 'groups.all';
    allTab.routerLink = 'all';
    this.tabs.push(allTab);

    const myTab = new Tab();
    myTab.nameKey = 'groups.my';
    myTab.routerLink = 'my';
    this.tabs.push(myTab);
  }

  public openNewGroupPage = async () => this._router.navigate(['new'], {relativeTo: this._route});

}
