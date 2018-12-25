import {Component, ElementRef, Input} from '@angular/core';
import {IconEnum} from '../model/icon-enum';
import {of} from 'rxjs';
import {NgxButtonType} from '../model/ngx-button-type';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'ngx-button',
  templateUrl: './ngx-button.component.html',
  styleUrls: ['./ngx-button.component.scss']
})
export class NgxButtonComponent<TData extends any> {

  public readonly enterKeyCode: number;
  public readonly delayDisplayBusy: number;

  @Input('class')
  public classes: string;

  @Input()
  public nameKey: string;

  @Input()
  public icon: IconEnum;

  @Input()
  public type: NgxButtonType;

  @Input()
  public click: (data?: TData, event?: Event) => Promise<void>;

  @Input()
  public data: TData;

  @Input()
  public disabled: (() => boolean) | boolean;

  @Input()
  public checkPressedEnter: boolean;

  public busy: boolean;
  public busyDisplay: boolean;

  public widthBeforeBusy: number;

  constructor(public elementRef: ElementRef) {
    this.enterKeyCode = 13;
    this.delayDisplayBusy = 300;
    this.type = NgxButtonType.PRIMARY;
  }

  public async onClick(e: Event): Promise<void> {
    this.widthBeforeBusy = ((this.elementRef.nativeElement as HTMLElement).childNodes[0] as HTMLElement).offsetWidth;
    if (this.click && !this.busy) {
      this.busy = true;
      // TODO: Remove all 'of([])' for create Observable
      const subscription = of([]).pipe(delay(this.delayDisplayBusy)).subscribe(() => {
        this.busyDisplay = true;
      });

      try {
        await this.click(this.data, e);
      } catch (e) {
      } finally {
        subscription.unsubscribe();
        this.busy = false;
        this.busyDisplay = false;
        delete this.widthBeforeBusy;
      }
    }
  }

  public async onKeyUp(event: any): Promise<void> {
    if (this.checkPressedEnter && event.keyCode == this.enterKeyCode) {
      await this.onClick(event);
    }
  }

  public isDisabled(): boolean {
    if (this.disabled === undefined || this.disabled === null) {
      return false;
    }
    if (typeof this.disabled === 'function') {
      return this.disabled ? this.disabled() : false;
    } else {
      return this.disabled;
    }
  }

}
