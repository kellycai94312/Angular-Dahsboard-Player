import {Component, OnInit} from '@angular/core';
import {MenuItem} from '../../data/local/menu-item';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  readonly className: string = 'collapsed';

  public isCollapsed: boolean;
  public menuItems: MenuItem[];

  constructor() {
    this.menuItems = [];
    this.menuItems.push(this.createMenuItem('fa fa-users', 'persons.section', 'person'));
    this.menuItems.push(this.createMenuItem('fa fa-users', 'groups.section', 'group'));
    this.menuItems.push(this.createMenuItem('fa fa-calendar', 'events', 'event'));
    this.menuItems.push(this.createMenuItem('fa fa-bell', 'notifications', 'notification'));
    this.menuItems.push(this.createMenuItem('fa fa-address-book', 'contacts', 'connection'));
    this.menuItems.push(this.createMenuItem('fa fa-comments', 'conversations', 'conversation'));
  }

  ngOnInit() {
    this.isCollapsed = localStorage.getItem(this.className) === 'true';
  }

  toggle() {
    this.isCollapsed = !this.isCollapsed;
    localStorage.setItem(this.className, String(this.isCollapsed));
  }

  private createMenuItem(iconClassName: string, nameKey: string, routerLink: string): MenuItem {
    const menuItem = new MenuItem();
    menuItem.iconClassName = iconClassName;
    menuItem.nameKey = nameKey;
    menuItem.routerLink = routerLink;
    return menuItem;
  }

}
