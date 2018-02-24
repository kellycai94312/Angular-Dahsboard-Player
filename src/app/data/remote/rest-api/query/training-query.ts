import { PageQuery } from '../page-query';

export class TrainingQuery extends PageQuery {
  personId?: number;
  name?: string;
  dateFrom?: Date;
  dateTo?: Date;
  locationId?: number;
}
