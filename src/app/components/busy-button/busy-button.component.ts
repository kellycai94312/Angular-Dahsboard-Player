import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-busy-button',
  templateUrl: './busy-button.component.html',
  styleUrls: ['./busy-button.component.scss']
})
export class BusyButtonComponent implements OnInit {

  @Input()
  public click: Function;

  @Input()
  public nameKey: string;

  public busy: boolean;

  private _clicked: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  public async onClick(): Promise<void> {
    if (this.click && !this._clicked) {
      this._clicked = true;
      const subscription = Observable.of([]).delay(200)
        .subscribe(() => {
          this.busy = true;
        });

      try {
        await this.click();
      } catch (e) {
      } finally {
        subscription.unsubscribe();
        this.busy = false;
        this._clicked = false;
      }
    }
  }

}
