import { Injectable } from '@angular/core';
import { Person } from '../../../data/remote/model/person';

@Injectable()
export class PersonService {

  shared: {
    person: Person;
    isEditAllow: boolean;
  };

  constructor() {
  }

}
