import {Injectable} from '@angular/core';
import {Person} from '../../../data/remote/model/person';
import {Subject} from 'rxjs/Subject';
import {SportType} from '../../../data/remote/model/sport-type';
import {UserRole} from '../../../data/remote/model/user-role';
import {GroupPerson} from '../../../data/remote/model/group/group-person';

@Injectable()
export class PersonService {

  shared: {
    person: Person;
    isEditAllow: boolean;
  };

  sportTypeSelectDefault: SportType;
  userRoleSelectDefault: UserRole;
  baseGroupSelectDefault: GroupPerson;

  private sportTypeSelect = new Subject<SportType>();
  sportTypeSelectEmitted$ = this.sportTypeSelect.asObservable();

  private userRoleSelect = new Subject<UserRole>();
  userRoleSelectEmitted$ = this.userRoleSelect.asObservable();

  private baseGroupSelect = new Subject<GroupPerson>();
  baseGroupSelectEmitted$ = this.baseGroupSelect.asObservable();

  private baseGroupChange = new Subject<GroupPerson>();
  baseGroupChangeEmitted$ = this.baseGroupChange.asObservable();

  emitSportTypeSelect(change: SportType) {
    this.sportTypeSelectDefault = change;
    this.sportTypeSelect.next(change);
  }

  emitUserRoleSelect(change: UserRole) {
    this.userRoleSelectDefault = change;
    this.userRoleSelect.next(change);
  }

  emitBaseGroupSelect(change: GroupPerson) {
    this.baseGroupSelectDefault = change;
    this.baseGroupSelect.next(change);
  }

  emitBaseGroupChange(change: GroupPerson) {
    this.baseGroupSelectDefault = change;
    this.baseGroupChange.next(change);
  }

  constructor() {
  }

}
