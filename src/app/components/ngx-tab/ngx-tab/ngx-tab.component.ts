import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Tab} from '../../../data/local/tab';
import {NavigationEnd, Router} from '@angular/router';
import {ISubscription} from 'rxjs-compat/Subscription';
import {AppHelper} from '../../../utils/app-helper';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'ngx-tab',
  templateUrl: './ngx-tab.component.html',
  styleUrls: ['./ngx-tab.component.scss']
})
export class NgxTabComponent implements OnInit, OnDestroy {

  @Input('class')
  public classes: string;

  @Input()
  public tabs: Tab[];

  @Output()
  public readonly tabChange: EventEmitter<Tab>;

  public selectedTab: Tab;

  private readonly _routerEventsSubscription: ISubscription;
  public readonly _routerEventSubject: BehaviorSubject<NavigationEnd>;

  public _routerEventSubscription: ISubscription;

  constructor(private _router: Router,
              private _appHelper: AppHelper) {
    this._routerEventSubject = new BehaviorSubject<NavigationEnd>(null);
    this.tabChange = new EventEmitter<Tab>();
    this._routerEventsSubscription = this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this._routerEventSubject.next(event);
      }
    });
  }

  ngOnInit(): void {
    this._routerEventSubscription = this._routerEventSubject.subscribe(value => {
      const url = value.urlAfterRedirects;
      let length = url.length;
      const from = url.lastIndexOf('/') + 1;
      const to = url.indexOf('?', from);
      if (to != -1) {
        length = to - from;
      }
      const currentRouterLink = url.substr(from, length);
      if (this.tabs) {
        this.selectedTab = this.tabs.find(x => x.routerLink === currentRouterLink);
      } else {
        this.selectedTab = null;
      }
      this.tabChange.emit(this.selectedTab);
    });
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._routerEventsSubscription);
    this._appHelper.unsubscribe(this._routerEventSubscription);
  }

  public onCheckingVisible(item: Tab): boolean {
    if (item.visible) {
      return item.visible();
    }
    return true;
  }

}
