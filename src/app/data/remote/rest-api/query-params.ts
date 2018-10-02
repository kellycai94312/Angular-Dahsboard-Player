import {PageQuery} from './page-query';

// @deprecated
export interface QueryParams extends PageQuery {
  id?: number;
  name?: string;
  countryId?: number;
  regionId?: number;
}
