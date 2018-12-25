import {Component, Input, OnDestroy} from '@angular/core';
import {of} from 'rxjs';
import {ISubscription} from 'rxjs-compat/Subscription';
import {AppHelper} from '../../utils/app-helper';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-busy-wrapper',
  templateUrl: './busy-wrapper.component.html',
  styleUrls: ['./busy-wrapper.component.scss']
})
export class BusyWrapperComponent implements OnDestroy {

  @Input()
  public startDebounce: number;

  public isBusy: boolean;

  private _isLocked: boolean;
  private _startBusySubscription: ISubscription;

  public constructor(private _appHelper: AppHelper) {
    this.startDebounce = 200;
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._startBusySubscription);
  }

  public setState(busy: boolean) {
    if (busy) {
      if (!this.isBusy && (!this._startBusySubscription || this._startBusySubscription.closed)) {
        this._startBusySubscription = of([]).pipe(delay(this.startDebounce))
          .subscribe(() => {
            this.isBusy = true;
          });
      }
    } else {
      if (this._startBusySubscription) {
        this._startBusySubscription.unsubscribe();
      }
      this.isBusy = false;
    }
  }

  public async invoke(event: Event, callback: Function, parameter: any): Promise<void> {
    if (callback && !this._isLocked) {
      this._isLocked = true;
      const subscription = of([]).pipe(delay(this.startDebounce))
        .subscribe(() => {
          this.isBusy = true;
        });

      try {
        if (parameter) {
          await callback(event, parameter);
        } else {
          await callback(event);
        }
      } catch (e) {
      } finally {
        subscription.unsubscribe();
        this.isBusy = false;
        this._isLocked = false;
      }
    }
  }

}
