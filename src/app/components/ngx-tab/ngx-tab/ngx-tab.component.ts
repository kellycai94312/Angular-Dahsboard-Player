import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Tab} from '../../../data/local/tab';
import {ActivatedRoute, ChildActivationEnd, Router} from '@angular/router';
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

  public readonly _routerEventSubject: BehaviorSubject<ChildActivationEnd>;

  private _queryParamsSubscription: ISubscription;

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _appHelper: AppHelper) {
    this._routerEventSubject = new BehaviorSubject<ChildActivationEnd>(null);
    this.tabChange = new EventEmitter<Tab>();
  }

  ngOnInit(): void {
    this._queryParamsSubscription = this._activatedRoute.queryParams.subscribe(value => {
      if (this.tabs) {
        const url = this._router.url;
        const urlWithoutQueryParams = this.getUrlWithoutQueryParams(url);
        const lastUrlSegment = this.getLastUrlSegment(url);
        const sortedQueryParams = this.getSortObjectByString(value);

        this.selectedTab = this.tabs.find(x =>
          ((x.routerLink === lastUrlSegment || x.routerLink === urlWithoutQueryParams) && !x.queryParams) ||
          (x.queryParams && (this.getSortObjectByString(x.queryParams) === sortedQueryParams))
        );
      } else {
        this.selectedTab = null;
      }
      if (this.selectedTab) {
        this.tabChange.emit(this.selectedTab);
      }
    });
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._queryParamsSubscription);
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
      return item.visible();
    }
    return true;
  }

}
