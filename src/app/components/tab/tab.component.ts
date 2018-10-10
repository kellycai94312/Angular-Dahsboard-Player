import {Component, Input, OnDestroy, ViewChild} from '@angular/core';
import {Tab} from '../../data/local/tab';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {BusyWrapperComponent} from '../busy-wrapper/busy-wrapper.component';
import {ISubscription} from 'rxjs-compat/Subscription';
import {AppHelper} from '../../utils/app-helper';

// @deprecated Use ngx-tab
@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnDestroy {

  @ViewChild(BusyWrapperComponent)
  public busyWrapperComponent: BusyWrapperComponent;

  @Input()
  public tabs: Tab[];

  @Input()
  public newElement: Function;

  @Input()
  public visible: Function;

  public busy: boolean;

  private readonly _routerEventsSubscription: ISubscription;

  constructor(private _router: Router,
              private _appHelper: AppHelper) {
    this._routerEventsSubscription = this._router.events.subscribe(event => {
      if (!this.busyWrapperComponent) {
        return;
      }

      if (event instanceof NavigationStart) {
        this.busyWrapperComponent.setState(true);
      } else if (event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError) {
        this.busyWrapperComponent.setState(false);
      }
    });
  }

  onClickApply = () => {
    this.newElement();
  };

  public onCheckingVisible(item: Tab): boolean {
    if (this.visible) {
      return this.visible(item);
    }
    return true;
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._routerEventsSubscription);
  }

}
