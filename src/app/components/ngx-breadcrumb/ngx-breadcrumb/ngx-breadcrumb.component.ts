import {Component} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import 'rxjs/add/operator/distinctUntilChanged';
import {Observable} from 'rxjs';
import {BreadcrumbItem} from '../bean/breadcrumb-item';
import {AppHelper} from '../../../utils/app-helper';

@Component({
  selector: 'ngx-breadcrumb',
  templateUrl: './ngx-breadcrumb.component.html',
  styleUrls: ['./ngx-breadcrumb.component.scss']
})
export class NgxBreadcrumbComponent {

  public enabled: boolean;
  public breadcrumbItems$: Observable<BreadcrumbItem[]>;

  constructor(private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _appHelper: AppHelper) {
    this.breadcrumbItems$ = this._router.events
      .filter(event => event instanceof NavigationEnd)
      .distinctUntilChanged()
      .map(event => this.buildBreadcrumbItems(this._activatedRoute.root));
  }

  public buildBreadcrumbItems(activatedRoute: ActivatedRoute,
                              url: string = '',
                              breadcrumbItems: BreadcrumbItem[] = []): BreadcrumbItem[] {
    let nextUrl = '';
    if (activatedRoute.routeConfig) {
      let nameKey = '';
      if (activatedRoute.routeConfig.data && !this._appHelper.isUndefinedOrNull(activatedRoute.routeConfig.data.breadcrumb)) {
        nameKey = (activatedRoute.routeConfig.data.breadcrumb as BreadcrumbItem).nameKey;
      }
      const path = activatedRoute.routeConfig.path;
      if (nameKey && path) {
        nextUrl = `${url}${path}/`;
        breadcrumbItems.push({nameKey: nameKey, url: nextUrl});
      }
    }

    if (activatedRoute.firstChild) {
      return this.buildBreadcrumbItems(activatedRoute.firstChild, nextUrl, breadcrumbItems);
    }

    this.enabled = breadcrumbItems.length > 0;
    return breadcrumbItems;
  }

}
