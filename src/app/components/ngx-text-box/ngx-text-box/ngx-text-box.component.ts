import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {ISubscription} from 'rxjs-compat/Subscription';
import {AppHelper} from '../../../utils/app-helper';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'ngx-text-box',
  templateUrl: './ngx-text-box.component.html',
  styleUrls: ['./ngx-text-box.component.scss']
})
export class NgxTextBoxComponent implements OnInit, OnDestroy {

  @Input()
  public class: string;

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

  @Input()
  public debounceTime: number;

  public readonly keyUp = new Subject<KeyboardEvent>();

  private _inputKeyupSubscription: ISubscription;

  constructor(private _appHelper: AppHelper) {
    this.valueChange = new EventEmitter<string>();
    this.keyUp = new Subject<KeyboardEvent>();
    this.value = null;
    this.class = '';
  }

  ngOnInit() {
    this._inputKeyupSubscription = this.keyUp
      .map((event: KeyboardEvent) => (event.target as HTMLInputElement).value)
      .pipe(debounceTime(this.debounceTime),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.value = value;
      });
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._inputKeyupSubscription);
  }

}
