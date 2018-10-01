import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from '../../data/local/menu-item';
import {ConversationService} from '../../shared/conversation.service';
import {ISubscription} from 'rxjs/Subscription';
import {ParticipantRestApiService} from '../../data/remote/rest-api/participant-rest-api.service';
import {AuthorizationService} from '../../shared/authorization.service';
import {UserRoleEnum} from '../../data/remote/model/user-role-enum';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit, OnDestroy {

  readonly className: string = 'collapsed';

  public isCollapsed: boolean;
  public menuItems: MenuItem[];

  public readonly _unreadTotalMessageSubscription: ISubscription;
  public readonly conversationMenuItem: MenuItem;

  constructor(private _conversationService: ConversationService,
              private _participantRestApiService: ParticipantRestApiService,
              private _authorizationService: AuthorizationService) {
    this._unreadTotalMessageSubscription = this._conversationService.unreadTotalHandle.subscribe(x => {
      this.conversationMenuItem.count = x.value;
    });

    this.menuItems = [];
    this.menuItems.push(this.createMenuItem('fa fa-users', 'persons.section', 'person'));
    this.menuItems.push(this.createMenuItem('fa fa-users', 'groups.section', 'group'));
    this.menuItems.push(this.createMenuItem('fa fa-calendar', 'events', 'event'));
    this.menuItems.push(this.createMenuItem('fa fa-exchange', 'eventPlans', 'event-plan'));
    this.menuItems.push(this.createMenuItem('fa fa-bell', 'notifications', 'notification'));
    this.menuItems.push(this.createMenuItem('fa fa-address-book', 'contacts', 'connection'));
    this.menuItems.push(this.createMenuItem('fa fa-file', 'reports', 'report'));
    this.menuItems.push(this.createMenuItem('fa fa-book', 'statistics', 'statistics'));

    if (this._authorizationService.hasUserRole(UserRoleEnum.ADMIN)) {
      this.menuItems.push(this.createMenuItem('fa fa-list-ul', 'dictionaries', 'dictionary'));
    }

    this.conversationMenuItem = this.createMenuItem('fa fa-comments', 'messages.section', 'conversation');
    this.menuItems.push(this.conversationMenuItem);
  }

  async ngOnInit() {
    this.isCollapsed = localStorage.getItem(this.className) === 'true';
    try {
      this.conversationMenuItem.count = (await this._participantRestApiService.getUnreadTotalMessages()).value;
    } catch (e) {
    }
  }

  ngOnDestroy(): void {
    this._unreadTotalMessageSubscription.unsubscribe();
  }

  toggle() {
    this.isCollapsed = !this.isCollapsed;
    localStorage.setItem(this.className, String(this.isCollapsed));
  }

  private createMenuItem(iconClassName: string, nameKey: string, routerLink: string, count: number = null): MenuItem {
    const menuItem = new MenuItem();
    menuItem.iconClassName = iconClassName;
    menuItem.nameKey = nameKey;
    menuItem.routerLink = routerLink;
    menuItem.count = count;
    return menuItem;
  }

}
