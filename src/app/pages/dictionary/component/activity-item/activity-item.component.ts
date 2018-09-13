import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../../../data/local/component/base/base-component';
import {BaseExercise} from '../../../../data/remote/model/exercise/base/base-exercise';
import {PropertyConstant} from '../../../../data/local/property-constant';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.scss']
})
export class ActivityItemComponent<T extends BaseExercise> extends BaseComponent<T> implements OnInit {

  public readonly propertyConstant = PropertyConstant;

  @Input()
  public class: string;

  ngOnInit() {
  }

}
