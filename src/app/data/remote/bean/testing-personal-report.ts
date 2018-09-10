import {TestResult} from './test-result';
import {EstimatedParameterResult} from './estimated-parameter-result';
import {TrainingInfo} from './training-info';
import {Scores} from './report/scores';

export class TestingPersonalReport {
  trainingInfo: TrainingInfo;
  estimatedParameterResults: EstimatedParameterResult[];
  testResults: TestResult[];
  scores: Scores;
}
