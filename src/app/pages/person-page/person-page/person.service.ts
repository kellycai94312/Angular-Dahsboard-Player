import { Injectable } from '@angular/core';
import { Person } from '../../../data/remote/model/person';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PersonService {

  shared: {
    person: Person;
    isEditAllow: boolean;
  };

  private sportTypeChange = new Subject<any>();
  sportTypeChangeEmitted$ = this.sportTypeChange.asObservable();

  emitSportTypeChange(change: any) {
    this.sportTypeChange.next(change);
  }

  constructor() {
  }

}
