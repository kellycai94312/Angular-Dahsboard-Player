import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {ISubscription} from 'rxjs-compat/Subscription';
import {AppHelper} from '../../../utils/app-helper';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

// @deprecated Use ngx-input
@Component({
  selector: 'ngx-text-box',
  templateUrl: './ngx-text-box.component.html',
  styleUrls: ['./ngx-text-box.component.scss']
})
export class NgxTextBoxComponent implements OnInit, OnDestroy {

  @Input()
  public class: string;

  @Input()
  public disabled: boolean;

  @Input()
  public placeholderKey: string;

  private _value: string;

  @Input()
  get value(): string {
    return this._value;
  }

  set value(value: string) {
    if (value === undefined) {
      value = null;
    }
    this._value = value;
    this.valueChange.emit(value);
  }

  @Output()
  public readonly valueChange: EventEmitter<string>;

  @Output()
  public readonly focusOut: EventEmitter<void>;

  @Input()
  public debounceTime: number;

  public readonly keyUp: Subject<KeyboardEvent>;

  private _inputKeyUpSubscription: ISubscription;

  constructor(private _appHelper: AppHelper) {
    this.valueChange = new EventEmitter<string>();
    this.focusOut = new EventEmitter<void>();
    this.keyUp = new Subject<KeyboardEvent>();
    this.value = null;
    this.class = '';
  }

  ngOnInit() {
    this._inputKeyUpSubscription = this.keyUp
      .pipe(
        map((event: KeyboardEvent) => (event.target as HTMLInputElement).value),
        debounceTime(this.debounceTime),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.value = value;
      });
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._inputKeyUpSubscription);
  }

  public onFocusOut(e: any) {
    this.focusOut.emit();
  }

}
