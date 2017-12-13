import { Component, OnInit } from '@angular/core';
import { SportType } from '../../../../data/remote/model/sport-type';
import { Subject } from 'rxjs/Subject';
import { PersonService } from '../person.service';
import { ParticipantRestApiService } from '../../../../data/remote/rest-api/participant-rest-api.service';
import { BsModalRef } from 'ngx-bootstrap';
import { ListRequest } from '../../../../data/remote/request/list-request';

@Component({
  selector: 'app-sport-types-modal',
  templateUrl: './sport-types-modal.component.html',
  styleUrls: ['./sport-types-modal.component.scss']
})
export class SportTypesModalComponent implements OnInit {

  personSportTypes: SportType[];
  private sportTypes: SportType[] = [];
  private sportTypeSubject: Subject<any> = new Subject();

  constructor(public bsModalRef: BsModalRef,
              private _participantRestApiService: ParticipantRestApiService,
              private _personService: PersonService) {
  }

  async ngOnInit() {
    this.sportTypes = await this._participantRestApiService.getSportTypes();
    this.sportTypeSubject.next();
  }

  getSportTypes = (typing: string) => {
    const data = [];
    for (const item of this.sportTypes) {
      if (item.sportTypeEnum.toString().toLowerCase().indexOf(typing) > -1) {
        data.push(item);
      }
    }
    return data;
  }

  addSportType = (typing: string, sportType: SportType) => {
    this.sportTypes.splice(this.sportTypes.indexOf(sportType), 1);
    this.personSportTypes.push(sportType);
    return this.getSportTypes(typing);
  }

  removeSportType(sportType: SportType) {
    this.personSportTypes.splice(this.personSportTypes.indexOf(sportType), 1);
    this.sportTypes.push(sportType);
    this.sportTypeSubject.next(); // refresh data
  }

  async save() {
    const personSportTypes = await this._participantRestApiService.changeSportTypes(new ListRequest(this.personSportTypes));
    this._personService.emitSportTypesChange(personSportTypes);
    this.bsModalRef.hide();
  }

}
