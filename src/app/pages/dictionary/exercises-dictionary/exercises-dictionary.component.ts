import {Component} from '@angular/core';
import {ExerciseType} from '../../../data/remote/model/exercise/base/exercise-type';

@Component({
  selector: 'app-exercises-dictionary',
  templateUrl: './exercises-dictionary.component.html',
  styleUrls: ['./exercises-dictionary.component.scss']
})
export class ExercisesDictionaryComponent {

  public readonly exerciseType = ExerciseType;

}
