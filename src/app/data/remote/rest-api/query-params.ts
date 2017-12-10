import { SportTypeEnum } from '../misc/sport-type-enum';

export interface QueryParams {
  id?: number;
  countryId?: number;
  regionId?: number;
  count?: number;
  sportType?: SportTypeEnum;
}
