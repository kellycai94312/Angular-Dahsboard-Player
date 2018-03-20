import { ListRequest } from './list-request';
import { PersonAnthropometry } from '../model/person-anthropometry';

export class AnthropometryRequest {
  anthropometry: ListRequest<PersonAnthropometry>;
  sportTypeId: number;
}
