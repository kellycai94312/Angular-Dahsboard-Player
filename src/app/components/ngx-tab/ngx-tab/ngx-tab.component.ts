import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Tab} from '../../../data/local/tab';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ISubscription} from 'rxjs-compat/Subscription';
import {AppHelper} from '../../../utils/app-helper';
import {BehaviorSubject} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';
import {Mutex} from '../../../data/local/mutex';

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

  private readonly _routerEventSubject: BehaviorSubject<NavigationEnd>;
  private readonly _routerSubscription: ISubscription;
  private readonly _mutex: Mutex;
  private _queryParamsSubscription: ISubscription;
  private _routerEventSubscription: ISubscription;

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _appHelper: AppHelper) {
    this._routerEventSubject = new BehaviorSubject<NavigationEnd>(null);
    this.tabChange = new EventEmitter<Tab>();
    this._mutex = new Mutex();
    this._routerSubscription = this._router.events
      .pipe(distinctUntilChanged())
      .subscribe(val => {
        if (val instanceof NavigationEnd) {
          this._routerEventSubject.next(val);
        }
      });
  }

  ngOnInit(): void {
    this._queryParamsSubscription = this._activatedRoute.queryParams.subscribe(async val => {
      await this.refreshSelect(this._router.url);
    });
    this._routerEventSubscription = this._routerEventSubject.subscribe(async val => {
      await this.refreshSelect(this._router.url);
    });
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._routerSubscription);
    this._appHelper.unsubscribe(this._routerEventSubscription);
    this._appHelper.unsubscribe(this._queryParamsSubscription);
  }

  private async refreshSelect(url: string): Promise<void> {
    try {
      await this._mutex.acquire();
      let selection = null;
      if (this.tabs) {
        const urlTree = this._router.parseUrl(url);

        const urlWithoutQueryParams = this.getUrlWithoutQueryParams(url);
        const lastUrlSegment = this.getLastUrlSegment(url);
        const sortedQueryParams = this.getSortObjectByString(urlTree.queryParams);

        selection = this.tabs.find(x =>
          ((x.routerLink === lastUrlSegment || x.routerLink === urlWithoutQueryParams) && !x.queryParams) ||
          (x.queryParams && (this.getSortObjectByString(x.queryParams) === sortedQueryParams))
        );
      }
      if (this.selectedTab === selection) {
        return;
      }
      this.selectedTab = selection;
      if (this.selectedTab) {
        this.tabChange.emit(this.selectedTab);
      }
    } finally {
      this._mutex.release();
    }
  }

  private getSortObjectByString(obj: any): string {
    if (!obj) {
      return '';
    }
    let symbols = JSON.stringify(obj).split('');
    symbols = symbols.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    return symbols.join('');
  }

  private getLastUrlSegment(url: string): string {
    const urlWithoutQueryParams = this.getUrlWithoutQueryParams(url);
    const from = urlWithoutQueryParams.lastIndexOf('/') + 1;
    return urlWithoutQueryParams.substr(from, urlWithoutQueryParams.length - from);
  }

  private getUrlWithoutQueryParams(url: string): string {
    let length = url.length;
    let from = url.indexOf('/');
    if (from < 0) {
      from = 0;
    }
    const to = url.indexOf('?', from);
    if (to != -1) {
      length = to - from;
    }
    return url.substr(from, length);
  }

  public onCheckingVisible(item: Tab): boolean {
    if (item.visible) {
      return item.visible(item);
    }
    return true;
  }

}
