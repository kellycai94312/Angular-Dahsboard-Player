import { PageQuery } from '../page-query';

export class MeasureTemplateQuery extends PageQuery {
  personId?: number;
  name?: string;
  groupId?: number;
  exerciseMeasureId?: number;
  dateFrom?: Date;
  dateTo?: Date;
}
