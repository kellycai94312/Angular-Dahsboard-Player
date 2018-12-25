import {of} from 'rxjs';
import {delay} from 'rxjs/operators/delay';
import {Component, Input} from '@angular/core';

// @deprecated Use ngx-button
@Component({
  selector: 'app-busy-button',
  templateUrl: './busy-button.component.html',
  styleUrls: ['./busy-button.component.scss']
})
export class BusyButtonComponent {

  // TODO: Use host binding
  @Input()
  public classes: any;

  @Input()
  public click: Function;

  @Input()
  public disabled: () => boolean;

  @Input()
  public parameter: any;

  @Input()
  public checkPressedEnter: boolean;

  @Input()
  public nameKey: string;

  @Input()
  public icon: 'fa fa-edit' | 'fa fa-plus' | 'fa fa-book' | 'fa fa-download' | 'fa fa-trash' | 'fa fa-image';

  public busy: boolean;

  private _clicked: boolean;

  public async onClick(event: Event): Promise<void> {
    if (this.click && !this._clicked) {
      this._clicked = true;
      const subscription = of([]).pipe(delay(200))
        .subscribe(() => {
          this.busy = true;
        });

      try {
        if (this.parameter) {
          await this.click(event, this.parameter);
        } else {
          await this.click(event);
        }
      } catch (e) {
      } finally {
        subscription.unsubscribe();
        this.busy = false;
        this._clicked = false;
      }
    }
  }

  public async onKeyUp(event: any): Promise<void> {
    if (this.checkPressedEnter && event.keyCode == 13) {
      await this.onClick(event);
    }
  }

}
