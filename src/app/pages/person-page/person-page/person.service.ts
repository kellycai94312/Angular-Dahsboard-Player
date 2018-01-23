import { Injectable } from '@angular/core';
import { Person } from '../../../data/remote/model/person';
import { Subject } from 'rxjs/Subject';
import { SportType } from '../../../data/remote/model/sport-type';

@Injectable()
export class PersonService {

  shared: {
    person: Person;
    isEditAllow: boolean;
  };

  sportTypeSelectDefault: SportType;

  private sportTypeSelect = new Subject<any>();
  sportTypeSelectEmitted$ = this.sportTypeSelect.asObservable();

  emitSportTypeSelect(change: any) {
    this.sportTypeSelect.next(change);
  }

  constructor() {
  }

}
