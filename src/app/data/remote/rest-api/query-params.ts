import {SportTypeEnum} from '../misc/sport-type-enum';
import {PageQuery} from './page-query';

export interface QueryParams extends PageQuery {
  id?: number;
  name?: string;
  countryId?: number;
  regionId?: number;
  sportType?: SportTypeEnum;

  //#region Group

  groupTypeId?: number;
  userRoleId?: number;
  personId?: number;
  approved?: boolean;

  //#endregion
}
