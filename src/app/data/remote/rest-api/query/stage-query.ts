import {PageQuery} from '../page-query';

export class StageQuery extends PageQuery {
  public stageId: number;
  public sportTypeId: number;
  public estimatedParameterId?: number;
  public exerciseMeasureId?: number;
}
