import {Component} from '@angular/core';
import {ExerciseType} from '../../../data/remote/model/exercise/base/exercise-type';

@Component({
  selector: 'app-tests-dictionary',
  templateUrl: './tests-dictionary.component.html',
  styleUrls: ['./tests-dictionary.component.scss']
})
export class TestsDictionaryComponent {

  public readonly exerciseType = ExerciseType;

}
