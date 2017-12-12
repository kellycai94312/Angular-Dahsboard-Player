import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NavBarService {

  private fullNameChange = new Subject<any>();
  fullNameChangeEmitted$ = this.fullNameChange.asObservable();

  private logoChange = new Subject<any>();
  logoChangeEmitted$ = this.logoChange.asObservable();

  constructor() {
  }

  emitFullNameChange(change: any) {
    this.fullNameChange.next(change);
  }

  emitLogoChange(change: any) {
    this.logoChange.next(change);
  }

}
