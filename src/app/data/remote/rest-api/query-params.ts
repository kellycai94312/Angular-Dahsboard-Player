import { SportTypeEnum } from '../misc/sport-type-enum';
import { PageQuery } from './page-query';

export interface QueryParams extends PageQuery {
  id?: number;
  name?: string;
  countryId?: number;
  regionId?: number;
  sportType?: SportTypeEnum;
}
