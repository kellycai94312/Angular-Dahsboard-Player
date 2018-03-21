import { Component, OnInit } from '@angular/core';
import { ParticipantRestApiService } from '../../../../data/remote/rest-api/participant-rest-api.service';
import { PersonService } from '../person.service';
import { PersonRank } from '../../../../data/remote/model/person-rank';

@Component({
  selector: 'app-ranks',
  templateUrl: './ranks.component.html',
  styleUrls: ['./ranks.component.scss']
})
export class RanksComponent implements OnInit {

  public readonly isEditAllow: boolean;
  public personRanks: PersonRank[];

  constructor(private _personService: PersonService,
              private _participantRestApiService: ParticipantRestApiService) {
    this.isEditAllow = _personService.shared.isEditAllow;
  }

  async ngOnInit() {
    this.personRanks = await this._participantRestApiService.getRanks({id: this._personService.shared.person.id});
  }

  async editRank(personRank: PersonRank) {
    //todo
  }

  async removeRank(personRank: PersonRank) {
    await this._participantRestApiService.removeRank({rankId: personRank.rank.id});
    this.clearPersonRank(personRank);
  }

  private clearPersonRank(personRank: PersonRank) {
    personRank.assignee = null;
    personRank.date = null;
    personRank.orderNumber = null;
    personRank.certificateNumber = null;
  }

}
