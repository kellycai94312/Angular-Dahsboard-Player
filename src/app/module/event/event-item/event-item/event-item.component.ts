import {Component} from '@angular/core';
import {BaseTraining} from '../../../../data/remote/model/training/base/base-training';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {ItemComponent} from '../../../../data/local/component/base/item-component';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss']
})
export class EventItemComponent<T extends BaseTraining> extends ItemComponent<T> {

  public readonly propertyConstantClass = PropertyConstant;

  constructor() {
    super();
  }

}
