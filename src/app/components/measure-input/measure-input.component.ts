import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { PersonAnthropometry } from '../../data/remote/model/person-anthropometry';
import { UnitTypeEnum } from '../../data/remote/misc/unit-type-enum';

@Component({
  selector: 'app-measure-input',
  templateUrl: './measure-input.component.html',
  styleUrls: ['./measure-input.component.scss']
})
export class MeasureInputComponent implements OnChanges {

  @Input()
  anthropometry: PersonAnthropometry;

  @Output()
  anthropometryChange: EventEmitter<PersonAnthropometry>;

  @Input()
  disabled: boolean;

  isNumber: boolean;
  step: number;
  precision: number;

  constructor() {
    this.anthropometryChange = new EventEmitter<PersonAnthropometry>();
  }

  ngOnChanges() {
    this.isNumber = this.anthropometry.measure.measureUnit.unitTypeEnum.toString() == UnitTypeEnum[UnitTypeEnum.NUMBER];
    if (this.isNumber) {
      this.precision = this.anthropometry.measure.measureUnit.precision;
      if (this.precision) {
        this.step = Math.pow(0.1, this.precision);
      }
    }
  }

}
