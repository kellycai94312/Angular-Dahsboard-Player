import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Unsubscribable } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { AppHelper } from '../../../utils/app-helper';
import { BreadcrumbItem } from '../bean/breadcrumb-item';

@Component({
  selector: 'ngx-breadcrumb',
  templateUrl: './ngx-breadcrumb.component.html',
  styleUrls: ['./ngx-breadcrumb.component.scss']
})
export class NgxBreadcrumbComponent implements OnDestroy {

  public enabled: boolean;
  public breadcrumbItems: BreadcrumbItem[];

  private readonly _routerEventsSubscription: Unsubscribable;

  constructor(private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _appHelper: AppHelper) {
    this.update();
    this._routerEventsSubscription = this._router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe(event => {
        this.update();
      });
  }

  private update() {
    this.breadcrumbItems = this.buildBreadcrumbItems(this._activatedRoute.root);
  }

  private buildBreadcrumbItems(activatedRoute: ActivatedRoute,
                               url: string = '',
                               breadcrumbItems: BreadcrumbItem[] = []): BreadcrumbItem[] {
    let nextUrl = '';
    if (activatedRoute.routeConfig) {
      let breadcrumbItem: BreadcrumbItem = null;
      if (activatedRoute.routeConfig.data && !this._appHelper.isUndefinedOrNull(activatedRoute.routeConfig.data.breadcrumb)) {
        breadcrumbItem = activatedRoute.routeConfig.data.breadcrumb as BreadcrumbItem;
      }
      const path = activatedRoute.routeConfig.path;
      if (breadcrumbItem && path) {
        nextUrl = `${url}${path}/`;
        const paramId = activatedRoute.snapshot.params.id;
        if (paramId) {
          nextUrl = nextUrl.replace(':id', paramId);
        }
        breadcrumbItem.url = nextUrl;
        breadcrumbItem.params = activatedRoute.snapshot.params;
        breadcrumbItems.push(breadcrumbItem);
      }
    }

    if (activatedRoute.firstChild) {
      return this.buildBreadcrumbItems(activatedRoute.firstChild, nextUrl, breadcrumbItems);
    }

    this.enabled = breadcrumbItems.length > 0;
    return breadcrumbItems;
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._routerEventsSubscription);
  }

}
