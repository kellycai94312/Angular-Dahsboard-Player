import { TestResult } from './test-result';
import { EstimatedParameterResult } from './estimated-parameter-result';
import { TrainingInfo } from './training-info';

export class TestingPersonalReport {
  trainingInfo: TrainingInfo;
  estimatedParameterResults: EstimatedParameterResult[];
  testResults: TestResult[];
  reactorScore: number;
  perspectiveReactorScore: number;
}
