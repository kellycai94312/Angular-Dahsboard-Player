import {Component, OnDestroy} from '@angular/core';
import {LayoutService} from '../shared/layout.service';
import {ISubscription} from 'rxjs-compat/Subscription';
import {AppHelper} from '../utils/app-helper';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnDestroy {

  public hidden: boolean;
  public dark: boolean;

  private readonly _hiddenSubscription: ISubscription;
  private readonly _darkSubscription: ISubscription;

  constructor(private layoutService: LayoutService,
              private _appHelper: AppHelper) {
    this.hidden = true;

    this._hiddenSubscription = this.layoutService.hidden.subscribe(val => this.hidden = val);
    this._darkSubscription = this.layoutService.dark.subscribe(value => this.dark = value);
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._hiddenSubscription);
    this._appHelper.unsubscribe(this._darkSubscription);
  }

}
