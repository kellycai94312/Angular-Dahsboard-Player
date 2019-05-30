import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {ThemePalette} from '@angular/material';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {NgxTabAction} from '../model/ngx-tab-action';
import {NgxTab} from '../model/ngx-tab';
import {distinctUntilChanged, takeWhile} from 'rxjs/operators';

@Component({
  selector: 'ngx-tabs',
  templateUrl: './ngx-tabs.component.html',
  styleUrls: ['./ngx-tabs.component.scss']
})
export class NgxTabsComponent implements OnDestroy {

  @Input()
  public withoutRouting: boolean;

  @Input()
  public hasExternalRouterOutlet: boolean;

  get tabs(): NgxTab[] {
    return this._tabs;
  }

  @Input()
  set tabs(value: NgxTab[]) {
    this._tabs = value;
    delete this.selectedTab;
    if (!this.withoutRouting) {
      this.updateSelection(this._router.url);
    }
  }

  @Input()
  public backgroundColor: ThemePalette;

  @Input()
  public selectedTab: NgxTab;

  @Output()
  public readonly selectedTabChange = new EventEmitter<NgxTab>();

  private _notDestroyed = true;
  private _tabs: NgxTab[] = [];

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute) {
    if (!this.withoutRouting) {
      this._router.events
        .pipe(
          takeWhile(() => this._notDestroyed),
          distinctUntilChanged()
        )
        .subscribe((val) => {
          if (val instanceof NavigationEnd) {
            this.updateSelection(this._router.url);
          }
        });
    }
  }

  public ngOnDestroy(): void {
    this._notDestroyed = false;
  }

  public async onClickByTab(tab: NgxTab): Promise<void> {
    if (this.withoutRouting) {
      if (this.selectedTab !== tab) {
        this.selectedTab = tab;
        this.selectedTabChange.emit(this.selectedTab);
      }
    } else {
      await this._router.navigate([tab.link], {relativeTo: this._activatedRoute.parent});
    }
  }

  public async onClickByTabAction(tabAction: NgxTabAction): Promise<void> {
    await tabAction.action(tabAction);
  }

  private updateSelection(url: string) {
    let selectedTab = null;
    if (this._tabs && this._tabs.length) {
      const decodedUrl = decodeURI(url);
      const segments = decodedUrl.split('/');
      if (segments.length > 1 || segments[0].length != decodedUrl.length) {
        selectedTab = this._tabs.find(tab => !!segments.find(x => x === tab.link));
      }
    }

    if (this.selectedTab !== selectedTab) {
      this.selectedTab = selectedTab;
      if (this.selectedTab) {
        this.selectedTabChange.emit(this.selectedTab);
      }
    }
  }

}
