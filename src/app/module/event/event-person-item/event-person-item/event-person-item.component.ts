import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../../data/local/component/base/base-component';
import {TrainingPerson} from '../../../../data/remote/model/training/training-person';

@Component({
  selector: 'app-event-person-item',
  templateUrl: './event-person-item.component.html',
  styleUrls: ['./event-person-item.component.scss']
})
export class EventPersonItemComponent extends BaseComponent<TrainingPerson> implements OnInit {

  constructor() {
    super();
  }

}
