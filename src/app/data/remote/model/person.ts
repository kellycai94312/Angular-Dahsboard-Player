import { SexEnum } from '../misc/sex-enum';
import { Address } from './address';

export class Person {
  firstName: string;
  lastName: string;
  patronymic: string;
  birthDate: Date;
  sex: SexEnum;
  countryCode: string;
  phoneNumber: string;
  address: Address;
}
