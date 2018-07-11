import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ISubscription} from 'rxjs-compat/Subscription';

@Component({
  selector: 'app-busy-wrapper',
  templateUrl: './busy-wrapper.component.html',
  styleUrls: ['./busy-wrapper.component.scss']
})
export class BusyWrapperComponent {

  @Input()
  public startDebounce: number;

  public isBusy: boolean;

  private _isLocked: boolean;
  private _startBusySubscription: ISubscription;

  public constructor() {
    this.startDebounce = 200;
  }

  public setState(busy: boolean) {
    if (busy) {
      if (!this.isBusy && (!this._startBusySubscription || this._startBusySubscription.closed)) {
        this._startBusySubscription = Observable.of([]).delay(this.startDebounce)
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
      const subscription = Observable.of([]).delay(this.startDebounce)
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
