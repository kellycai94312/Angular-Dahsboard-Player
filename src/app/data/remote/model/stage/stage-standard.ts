import {IdentifiedObject} from '../../base/identified-object';
import {Stage} from './stage';
import {SportType} from '../sport-type';
import {EstimatedParameter} from '../training/testing/estimated-parameter';
import {ExerciseMeasure} from '../exercise/exercise-measure';
import {Operator} from '../../misc/operator';

export class StageStandard extends IdentifiedObject {
  public stage: Stage;
  public sportType: SportType;
  public estimatedParameter: EstimatedParameter;
  public exerciseMeasure: ExerciseMeasure;
  public maleOperator: Operator;
  public maleStandardValue: string;
  public femaleOperator: Operator;
  public femaleStandardValue: string;
}
