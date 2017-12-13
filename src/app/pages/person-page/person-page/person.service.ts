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

  private rolesChange = new Subject<any>();
  rolesChangeEmitted$ = this.rolesChange.asObservable();

  private sportTypesChange = new Subject<any>();
  sportTypesChangeEmitted$ = this.sportTypesChange.asObservable();

  emitSportTypeSelect(change: any) {
    this.sportTypeSelect.next(change);
  }

  emitRolesChange(change: any) {
    this.rolesChange.next(change);
  }

  emitSportTypesChange(change: any) {
    this.sportTypesChange.next(change);
  }

  constructor() {
  }

}
