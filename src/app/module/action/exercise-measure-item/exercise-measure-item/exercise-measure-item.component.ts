import {Component} from '@angular/core';
import {BaseComponent} from '../../../../data/local/component/base/base-component';
import {ExerciseMeasure} from '../../../../data/remote/model/exercise/exercise-measure';

@Component({
  selector: 'app-exercise-measure-item',
  templateUrl: './exercise-measure-item.component.html',
  styleUrls: ['./exercise-measure-item.component.scss']
})
export class ExerciseMeasureItemComponent extends BaseComponent<ExerciseMeasure> {
}
