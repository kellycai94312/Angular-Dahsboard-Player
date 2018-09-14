import {TestResult} from './test-result';
import {EstimatedParameterResult} from './estimated-parameter-result';
import {TrainingInfo} from './training-info';
import {Scores} from './report/scores';
import {TrainingPersonExercise} from "./training-person-exercise";

export class TrainingPersonalReport {
  trainingInfo: TrainingInfo;
  trainingPersonExercise: TrainingPersonExercise[];
}
