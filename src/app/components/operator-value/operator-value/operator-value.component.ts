import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NameWrapper} from '../../../data/local/name-wrapper';
import {Operator} from '../../../data/remote/misc/operator';
import {TranslateObjectService} from '../../../shared/translate-object.service';
import {AppHelper} from '../../../utils/app-helper';

@Component({
  selector: 'app-operator-value',
  templateUrl: './operator-value.component.html',
  styleUrls: ['./operator-value.component.scss']
})
export class OperatorValueComponent implements OnInit {

  public readonly operatorClass = Operator;

  @Input()
  public value: string;
  @Output()
  public readonly valueChange: EventEmitter<string>;

  @Input()
  public operator: Operator;
  @Output()
  public readonly operatorChange: EventEmitter<Operator>;

  public selectedOperator: NameWrapper<Operator>;
  public minValue: number;
  public maxValue: number;
  public operators: NameWrapper<Operator>[];

  constructor(private _translateObjectService: TranslateObjectService,
              private _appHelper: AppHelper) {
    this.minValue = null;
    this.maxValue = null;
    this.valueChange = new EventEmitter<string>();
    this.operatorChange = new EventEmitter<Operator>();
  }

  async ngOnInit(): Promise<void> {
    this.operators = await this._translateObjectService.getTranslatedEnumCollection<Operator>(Operator, 'OperatorEnum');
    if (this.operator) {
      this.selectedOperator = this.operators.find(x => x.data === this.operator);
    } else {
      this.selectedOperator = this.operators[0];
      this.operator = this.selectedOperator.data;
      this.operatorChange.emit(this.operator);
    }

    const result = this.parseValue(this.selectedOperator.data, this.value);
    if (result) {
      this.minValue = result.val1;
      this.maxValue = result.val2;
    }
  }

  public onOperatorChanged() {
    this.operator = this.selectedOperator.data;
    this.operatorChange.emit(this.operator);

    this.onValueChanged();
  }

  public onValueChanged() {
    if (this._appHelper.isUndefinedOrNull(this.selectedOperator)) {
      return;
    }
    if (this.selectedOperator.data === Operator.INTERVAL) {
      this.value = `${this.minValue || ''}:${this.maxValue || ''}`;
    } else {
      if (this.minValue) {
        this.value = this.minValue.toString();
      } else {
        this.value = null;
      }
    }
    this.valueChange.emit(this.value);
  }

  private parseValue(operator: Operator, val: string): { val1: number, val2?: number } {
    if (operator === Operator.INTERVAL) {
      const items = val.split(':');
      if (items && items.length == 2) {
        return {val1: this.parseNumber(items[0]), val2: this.parseNumber(items[1])};
      }
    }
    return {val1: this.parseNumber(val)};
  }

  private parseNumber(val: string): number {
    if (!val) {
      return null;
    }
    return Number(val);
  }

}
