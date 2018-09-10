import {SportRole} from '../../model/sport-role';
import {EstimatedParameterResult} from '../estimated-parameter-result';

export class SportRoleResult {
  public sportRole: SportRole;
  public estimatedParameterResults: EstimatedParameterResult[];
  public reactorScore: number;
}
