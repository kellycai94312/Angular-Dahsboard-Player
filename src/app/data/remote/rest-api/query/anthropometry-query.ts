import { PageQuery } from '../page-query';

export class AnthropometryQuery extends PageQuery {
  personId?: number;
  measureId?: number;
  dateFrom?: Date;
  dateTo?: Date;
  isNumeric?: boolean;
}
