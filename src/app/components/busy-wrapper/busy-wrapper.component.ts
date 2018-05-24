import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-busy-wrapper',
  templateUrl: './busy-wrapper.component.html',
  styleUrls: ['./busy-wrapper.component.scss']
})
export class BusyWrapperComponent implements OnInit {

  public isBusy: boolean;

  private _isLocked: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  public async invoke(event: Event, callback: Function, parameter: any): Promise<void> {
    if (callback && !this._isLocked) {
      this._isLocked = true;
      const subscription = Observable.of([]).delay(200)
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
