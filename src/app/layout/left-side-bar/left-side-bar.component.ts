import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from '../../data/local/menu-item';
import {ConversationService} from '../../shared/conversation.service';
import {SubscriptionLike as ISubscription} from 'rxjs';
import {AppHelper} from '../../utils/app-helper';

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.scss']
})
export class LeftSideBarComponent implements OnInit, OnDestroy {

  public readonly menuItems: MenuItem[];
  public readonly className: string = 'collapsed';
  public isCollapsed: boolean;

  private readonly _conversationMenuItem: MenuItem;
  private readonly _unreadTotalMessageSubscription: ISubscription;

  constructor(private _conversationService: ConversationService,
              private _appHelper: AppHelper) {
    this._conversationMenuItem = {iconClassName: 'fa fa-comments', nameKey: 'messages.section', routerLink: 'conversation', enabled: true};
    this.menuItems = [
      {iconClassName: 'fa fa-home', nameKey: 'myPage', routerLink: 'dashboard', enabled: true},
      {iconClassName: 'fa fa-user', nameKey: 'persons.section', routerLink: 'person', enabled: true},
      {iconClassName: 'fa fa-users', nameKey: 'groups', routerLink: 'group', enabled: true},
      {iconClassName: 'fa fa-calendar', nameKey: 'calendar', routerLink: 'event', enabled: true},
      this._conversationMenuItem,
      // {iconClassName:'fa fa-exchange', nameKey:'eventPlans', routerLink:'event-plan'},
      {iconClassName: 'fa fa-file', nameKey: 'reports', routerLink: 'report'},
      {iconClassName: 'fa fa-book', nameKey: 'statistics', routerLink: 'statistics'},
      {iconClassName: 'fa fa-list-ul', nameKey: 'dictionaries', routerLink: 'dictionary'},
      {iconClassName: 'fa fa-graduation-cap', nameKey: 'education', routerLink: 'education'},
      // {iconClassName:'fa fa-address-book', nameKey:'contacts', routerLink:'connection'}
    ];

    this._unreadTotalMessageSubscription = this._conversationService.unreadTotalHandle.subscribe(x => {
      this._conversationMenuItem.count = x.value;
    });
  }

  async ngOnInit() {
    this.isCollapsed = localStorage.getItem(this.className) === 'true';
    this._conversationMenuItem.count = await this._conversationService.getUnreadTotalMessages();
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._unreadTotalMessageSubscription);
  }

  toggle() {
    this.isCollapsed = !this.isCollapsed;
    localStorage.setItem(this.className, String(this.isCollapsed));
  }

}
