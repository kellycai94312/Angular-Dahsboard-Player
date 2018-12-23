import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgxInputType} from '../model/ngx-input-type';
import {Subject} from 'rxjs';
import {ISubscription} from 'rxjs-compat/Subscription';
import {AppHelper} from '../../../utils/app-helper';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  // tslint:disable:component-selector
  selector: 'ngx-input',
  templateUrl: './ngx-input.component.html',
  styleUrls: ['./ngx-input.component.scss']
})
export class NgxInputComponent implements OnInit, OnDestroy {

  @Input()
  public type: NgxInputType;

  @Input()
  public class: string;

  @Input()
  public disabled: boolean;

  @Input()
  public placeholder: string;

  @Input()
  public placeholderKey: string;

  private _value: string;

  @Input()
  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this.innerValue = value;
    this._value = value;
    this.valueChange.emit(this.value);
  }

  @Output()
  public readonly valueChange: EventEmitter<string>;

  @Output()
  public readonly focusOut: EventEmitter<void>;

  @Input()
  public debounceTime: number;

  @Input()
  public checkValidation: (val: string) => Promise<string[]>;

  public readonly keyUp: Subject<KeyboardEvent>;
  public valid: boolean;
  public errorMessages: string[];
  public touched: boolean;
  public innerValue: string;

  private _inputKeyUpSubscription: ISubscription;

  constructor(private _appHelper: AppHelper) {
    this.valueChange = new EventEmitter<string>();
    this.focusOut = new EventEmitter<void>();
    this.keyUp = new Subject<KeyboardEvent>();
    this.class = '';
    this.errorMessages = [];
    this.type = NgxInputType.TEXT;
  }

  ngOnInit() {
    let valueObservable = this.keyUp.map((event: KeyboardEvent) => (event.target as HTMLInputElement).value)
      .pipe(
        distinctUntilChanged()
      );
    if (this.debounceTime) {
      valueObservable = valueObservable
        .pipe(
          debounceTime(this.debounceTime)
        );
    }
    this._inputKeyUpSubscription = valueObservable.subscribe(async val => {
      this.value = val;
      if (this.touched) {
        await this.onCheckValidation();
      }
    });
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._inputKeyUpSubscription);
  }

  public onFocusOut(e: any) {
    this.touched = true;
    this.focusOut.emit();
  }

  public async onCheckValidation(withNotification: boolean = true): Promise<boolean> {
    let errorMessages = [];
    if (this.checkValidation) {
      errorMessages = (await this.checkValidation(this.value)).filter(x => x);
    }

    // tslint:disable:triple-equals
    const valid = errorMessages.length == 0;
    if (withNotification) {
      this.valid = valid;
      this.errorMessages = errorMessages;
    }
    return valid;
  }

  public getErrorText(): string {
    let message = '';
    for (const item of this.errorMessages) {
      message += `${item}\n`;
    }
    return message;
  }

}
