import {Component, OnInit} from '@angular/core';
import {MenuItem} from '../../data/local/menu-item';
import {ConversationService} from '../../shared/conversation.service';
import {ParticipantRestApiService} from '../../data/remote/rest-api/participant-rest-api.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  readonly className: string = 'collapsed';

  public isCollapsed: boolean;
  public menuItems: MenuItem[];

  public readonly conversationMenuItem: MenuItem;

  constructor(private _conversationService: ConversationService,
              private _participantRestApiService: ParticipantRestApiService) {
    this.menuItems = [
      this.createMenuItem('fa fa-home', 'myPage', 'dashboard'),
      this.createMenuItem('fa fa-user', 'persons.section', 'person'),
      this.createMenuItem('fa fa-users', 'groups', 'group'),
      this.createMenuItem('fa fa-calendar', 'calendar', 'event'),
      this.createMenuItem('fa fa-comments', 'messages.section', 'conversation'),
      // this.createMenuItem('fa fa-exchange', 'eventPlans', 'event-plan'),
      this.createMenuItem('fa fa-file', 'reports', 'report', null, false),
      this.createMenuItem('fa fa-book', 'statistics', 'statistics', null, false),
      this.createMenuItem('fa fa-list-ul', 'dictionaries', 'dictionary', null, false),
      this.createMenuItem('fa fa-graduation-cap', 'education', 'education', null, false),
      // this.createMenuItem('fa fa-address-book', 'contacts', 'connection')
    ];
  }

  async ngOnInit() {
    this.isCollapsed = localStorage.getItem(this.className) === 'true';
    try {
      this.conversationMenuItem.count = (await this._participantRestApiService.getUnreadTotalMessages()).value;
    } catch (e) {
    }
  }

  toggle() {
    this.isCollapsed = !this.isCollapsed;
    localStorage.setItem(this.className, String(this.isCollapsed));
  }

  private createMenuItem(iconClassName: string, nameKey: string, routerLink: string, count: number = null, enabled: boolean = true): MenuItem {
    const menuItem = new MenuItem();
    menuItem.iconClassName = iconClassName;
    menuItem.nameKey = nameKey;
    menuItem.routerLink = routerLink;
    menuItem.count = count;
    menuItem.enabled = enabled;
    return menuItem;
  }

}
