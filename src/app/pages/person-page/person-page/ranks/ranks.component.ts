import {Component, OnInit} from '@angular/core';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {PersonService} from '../person.service';
import {PersonRank} from '../../../../data/remote/model/person-rank';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RankModalComponent} from './rank-modal/rank-modal.component';
import {AuthorizationService} from '../../../../shared/authorization.service';
import {UserRoleEnum} from '../../../../data/remote/model/user-role-enum';

@Component({
  selector: 'app-ranks',
  templateUrl: './ranks.component.html',
  styleUrls: ['./ranks.component.scss']
})
export class RanksComponent implements OnInit {

  public isEditAllow: boolean;

  public personRanks: PersonRank[];

  constructor(private _personService: PersonService,
              private _authorizationService: AuthorizationService,
              private _participantRestApiService: ParticipantRestApiService,
              private _modalService: NgbModal) {
  }

  async ngOnInit() {
    this.isEditAllow = await this._personService.allowEdit() && await this._authorizationService.hasUserRole(UserRoleEnum.OPERATOR);
    this.personRanks = await this._participantRestApiService.getRanks({personId: this._personService.personViewModel.data.id});
  }

  public async editRank(index: number) {
    const ref = this._modalService.open(RankModalComponent, {size: 'lg'});
    ref.componentInstance.personRank = Object.assign({}, this.personRanks[index]);
    ref.componentInstance.onSave = async (newPersonRank: PersonRank) => {
      await this._participantRestApiService.updateRank(newPersonRank, {}, {personId: this._personService.personViewModel.data.id, rankId: newPersonRank.rank.id});
      this.personRanks[index] = newPersonRank;
      ref.dismiss();
    };
  }

  public async removeRank(index: number) {
    await this._participantRestApiService.removeRank({personId: this._personService.personViewModel.data.id, rankId: this.personRanks[index].rank.id});
    this.clearPersonRank(this.personRanks[index]);
  }

  private clearPersonRank(personRank: PersonRank) {
    personRank.assignee = null;
    personRank.date = null;
    personRank.orderNumber = null;
    personRank.certificateNumber = null;
  }

}
