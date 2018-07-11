import {Component, Input, ViewChild} from '@angular/core';
import {Tab} from '../../data/local/tab';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {BusyWrapperComponent} from '../busy-wrapper/busy-wrapper.component';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent {

  @ViewChild(BusyWrapperComponent)
  public busyWrapperComponent: BusyWrapperComponent;

  @Input()
  public tabs: Tab[];

  @Input()
  public newElement: Function;

  @Input()
  public visible: Function;

  public busy: boolean;

  constructor(private _router: Router) {
    this._router.events.subscribe(event => {
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

}
