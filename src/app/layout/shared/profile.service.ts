import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ParticipantRestApiService } from '../../data/remote/rest-api/participant-rest-api.service';
import { LocalStorageService } from '../../shared/local-storage.service';
import { Person } from '../../data/remote/model/person';

@Injectable()
export class ProfileService {

  private fullNameChange = new Subject<any>();
  fullNameChangeEmitted$ = this.fullNameChange.asObservable();

  private logoChange = new Subject<any>();
  logoChangeEmitted$ = this.logoChange.asObservable();

  private profile: Promise<Person>;

  constructor(private _localStorageService: LocalStorageService,
              private _participantRestApiService: ParticipantRestApiService) {
  }

  emitFullNameChange(change: any) {
    this.fullNameChange.next(change);
  }

  emitLogoChange(change: any) {
    this.logoChange.next(change);
  }

  getPerson(id: number): Promise<Person> {
    if (this._localStorageService.getCurrentPersonId() === id) {
      if (this.profile) {
        return this.profile;
      } else {
        this.profile = this._participantRestApiService.getPerson({id: id});
        return this.profile;
      }
    } else {
      return this._participantRestApiService.getPerson({id: id});
    }
  }

}
