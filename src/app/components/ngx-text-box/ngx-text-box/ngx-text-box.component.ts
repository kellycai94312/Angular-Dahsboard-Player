import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {ISubscription} from 'rxjs-compat/Subscription';
import {AppHelper} from '../../../utils/app-helper';

@Component({
  selector: 'ngx-text-box',
  templateUrl: './ngx-text-box.component.html',
  styleUrls: ['./ngx-text-box.component.scss']
})
export class NgxTextBoxComponent implements OnInit, OnDestroy {

  private _value: string;

  @Input()
  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
    this.valueChanged.emit(value);
  }

  @Output()
  public readonly valueChanged: EventEmitter<string>;

  @Input()
  public debounceTime: number;

  public readonly keyUp = new Subject<KeyboardEvent>();

  private _inputKeyupSubscription: ISubscription;

  constructor(private _appHelper: AppHelper) {
    this.valueChanged = new EventEmitter<string>();
    this.keyUp = new Subject<KeyboardEvent>();
  }

  ngOnInit() {
    this._inputKeyupSubscription = this.keyUp
      .map((event: KeyboardEvent) => (event.target as HTMLInputElement).value)
      .debounceTime(this.debounceTime)
      .distinctUntilChanged()
      .subscribe(value => {
        this.value = value;
      });
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._inputKeyupSubscription);
  }

}
