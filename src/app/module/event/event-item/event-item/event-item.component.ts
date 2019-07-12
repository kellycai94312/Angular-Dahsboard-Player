import {Component} from '@angular/core';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {ItemComponent} from '../../../../data/local/component/base/item-component';
import {BaseEvent} from '../../../../data/remote/model/event/base/base-event';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss']
})
export class EventItemComponent<T extends BaseEvent> extends ItemComponent<T> {

  public readonly propertyConstantClass = PropertyConstant;

  constructor() {
    super();
  }

}
