import { ListRequest } from './list-request';
import { PersonAnthropometry } from '../model/person-anthropometry';
import { SportTypeEnum } from '../misc/sport-type-enum';

export class AnthropometryRequest {
  anthropometry: ListRequest<PersonAnthropometry>;
  sportType: SportTypeEnum;
}
