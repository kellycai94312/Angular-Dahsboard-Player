import {Component, OnInit} from '@angular/core';
import {Tab} from '../../../../../../data/local/tab';

@Component({
  selector: 'app-game-steps-manager-page',
  templateUrl: './game-steps-manager-page.component.html',
  styleUrls: ['./game-steps-manager-page.component.scss']
})
export class GameStepsManagerPageComponent implements OnInit {

  public tabs: Tab[];

  constructor() {
    this.tabs = [];
    this.tabs.push(this.createTab('information', '1'));
    this.tabs.push(this.createTab('persons.section', '2'));
    this.tabs.push(this.createTab('execution', '3'));
  }

  private createTab(nameKey: string, routerLink: string): Tab {
    const tab = new Tab();
    tab.nameKey = nameKey;
    tab.routerLink = routerLink;
    return tab;
  }

  ngOnInit() {
  }

}
