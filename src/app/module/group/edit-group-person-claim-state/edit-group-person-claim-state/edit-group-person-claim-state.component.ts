import { Component, Input } from '@angular/core';
import { BaseEditComponent } from 'app/data/local/component/base/base-edit-component';
import { PropertyConstant } from 'app/data/local/property-constant';
import { ClaimState } from 'app/data/remote/model/claim-state';
import { Group } from 'app/data/remote/model/group/base';
import {
  BaseGroupPersonClaimState,
  ClaimStateEnum,
  GroupPersonClaimRank,
  GroupPersonClaimStateType,
  GroupPersonClaimStatus
} from 'app/data/remote/model/group/person/state';
import { Person } from 'app/data/remote/model/person';
import { PersonRank } from 'app/data/remote/model/person/rank/person-rank';
import { BaseRank } from 'app/data/remote/model/rank';
import { SportType } from 'app/data/remote/model/sport-type';
import { GroupApiService, PersonApiService } from 'app/data/remote/rest-api/api';
import { ClaimStateApiService } from 'app/data/remote/rest-api/api/claim-state/claim-state-api.service';
import { RankApiService } from 'app/data/remote/rest-api/api/rank/rank-api.service';
import { SportTypeApiService } from 'app/data/remote/rest-api/api/sport-type/sport-type-api.service';
import { ParticipantRestApiService } from 'app/data/remote/rest-api/participant-rest-api.service';
import { NgxDate } from 'app/module/ngx/ngx-date/model/ngx-date';
import { NgxInput } from 'app/module/ngx/ngx-input';
import { NgxSelect } from 'app/module/ngx/ngx-select/model/ngx-select';
import { UtilService } from 'app/services/util/util.service';
import { AppHelper } from 'app/utils/app-helper';
import { plainToClass } from 'class-transformer';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-edit-group-person-claim-state',
  templateUrl: './edit-group-person-claim-state.component.html',
  styleUrls: ['./edit-group-person-claim-state.component.scss']
})
export class EditGroupPersonClaimStateComponent extends BaseEditComponent<BaseGroupPersonClaimState> {

  @Input()
  public withRemoteAction: boolean;

  @Input()
  public group: Group;

  @Input()
  public person: Person;

  public readonly groupPersonClaimStateTypeClass = GroupPersonClaimStateType;

  public claimStateNgxSelect: NgxSelect<ClaimState>;
  public rankNgxSelect: NgxSelect<BaseRank>;
  public sportTypeNgxSelect: NgxSelect<SportType>;
  public personRankNgxSelect: NgxSelect<PersonRank>;
  public nameNgxInput: NgxInput;
  public numberNgxInput: NgxInput;
  public issuedByNgxInput: NgxInput;
  public issuedAtNgxDate: NgxDate;
  public createRank = true;

  constructor(private _claimStateApiService: ClaimStateApiService,
              private _utilService: UtilService,
              private _rankApiService: RankApiService,
              private _sportTypeApiService: SportTypeApiService,
              private _groupApiService: GroupApiService,
              private _personApiService: PersonApiService,
              participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
  }

  protected async initializeComponent(data: BaseGroupPersonClaimState): Promise<boolean> {
    await super.initializeComponent(data);
    return this.appHelper.tryLoad(async () => {
      let selectedClaimState: ClaimState;
      let sportType: SportType;
      let name: string;
      let numberDocument: string;
      let issuedBy: string;
      let issuedAt: Date;
      let rank: BaseRank;

      if (!data.isNew) {
        if (this.data instanceof GroupPersonClaimRank) {
          selectedClaimState = this.data.personRank.rank.claimState;
          rank = this.data.personRank.rank;
          sportType = this.data.personRank.sportType;
          numberDocument = this.data.personRank.number;
          issuedBy = this.data.personRank.issuedBy;
          issuedAt = this.data.personRank.issuedAt;
        } else if (this.data instanceof GroupPersonClaimStatus) {
          selectedClaimState = this.data.claimState;
          name = this.data.name;
          sportType = this.data.sportType;
          numberDocument = this.data.number;
          issuedBy = this.data.issuedBy;
          issuedAt = this.data.issuedAt;
        }

        if (this.person) {
          this.personRankNgxSelect = this._utilService.getNgxSelect('rank', true);
          this.personRankNgxSelect.items = await this._personApiService.getPersonRanks(this.person).toPromise();
          this.personRankNgxSelect.compare = (first, second) => first.id === second.id;
        }
      }

      this.claimStateNgxSelect = this._utilService.getNgxSelect('status', true);
      this.claimStateNgxSelect.items = await this._claimStateApiService.getClaimStates().toPromise();
      this.claimStateNgxSelect.compare = (first, second) => first.id === second.id;
      this.claimStateNgxSelect.control.setValue(selectedClaimState);

      this.claimStateNgxSelect.control.valueChanges
        .pipe(takeUntil(this.destroyComponent$))
        .subscribe(async (value: ClaimState) => {
          if (value) {
            switch (value.claimStateEnum) {
              case ClaimStateEnum.ATHLETE:
              case ClaimStateEnum.TRAINER:
              case ClaimStateEnum.REFEREE:
                this.rankNgxSelect.items = await this._rankApiService.getRanks({claimStateEnum: value.claimStateEnum}).toPromise();
                this.rankNgxSelect.control.reset();
                this.data.discriminator = GroupPersonClaimStateType.RANK;
                this.data = plainToClass(GroupPersonClaimRank, this.data);
                break;
              case ClaimStateEnum.FKIS_EMPLOYEE:
              case ClaimStateEnum.ATHLETE_REPRESENTATIVE:
              case ClaimStateEnum.OTHER:
                this.data.discriminator = GroupPersonClaimStateType.STATUS;
                this.data = plainToClass(GroupPersonClaimStatus, this.data);
                break;
            }
          }
        });

      this.rankNgxSelect = this._utilService.getNgxSelect('rank', true);
      if (selectedClaimState) {
        this.rankNgxSelect.items = await this._rankApiService.getRanks({claimStateEnum: selectedClaimState.claimStateEnum}).toPromise();
      }
      this.rankNgxSelect.compare = (first, second) => first.id === second.id;
      this.rankNgxSelect.control.setValue(rank);

      this.sportTypeNgxSelect = this._utilService.getNgxSelect('sportType', true);
      this.sportTypeNgxSelect.items = (await this._sportTypeApiService.getSportTypes({count: PropertyConstant.pageSizeMax}).toPromise()).list;
      this.sportTypeNgxSelect.compare = (first, second) => first.id === second.id;
      this.sportTypeNgxSelect.control.setValue(sportType);

      this.nameNgxInput = this._utilService.getNgxInput('name', name, true);
      this.numberNgxInput = this._utilService.getNgxInput('number', numberDocument, true);
      this.issuedByNgxInput = this._utilService.getNgxInput('issuedBy', issuedBy, true);
      this.issuedAtNgxDate = this._utilService.getNgxDate('issuedAt', issuedAt, true);
    });
  }

  public async onRemove(): Promise<boolean> {
    return this.appHelper.tryRemove(async () => {
      if (this.withRemoteAction) {
        this.data = await this._groupApiService.removeGroupPersonClaimState(this.group, this.person, this.data).toPromise();
      } else {
        this.data.deleted = new Date();
      }
    });
  }

  public async onSave(): Promise<boolean> {
    return this.appHelper.trySave(async () => {
      if (this.data instanceof GroupPersonClaimRank) {
        if (this.createRank) {
          this.data.personRank = this.data.personRank || new PersonRank();
          this.data.personRank.rank = this.rankNgxSelect.control.value;
          this.data.personRank.sportType = this.sportTypeNgxSelect.control.value;
          this.data.personRank.number = this.numberNgxInput.control.value;
          this.data.personRank.issuedBy = this.issuedByNgxInput.control.value;
          this.data.personRank.issuedAt = this.appHelper.getGmtDate(this.issuedAtNgxDate.control.value);
        } else {
          this.data.personRank = this.personRankNgxSelect.control.value;
        }
      } else if (this.data instanceof GroupPersonClaimStatus) {
        this.data.name = this.nameNgxInput.control.value;
        this.data.claimState = this.claimStateNgxSelect.control.value;
        this.data.number = this.numberNgxInput.control.value;
        this.data.issuedBy = this.issuedByNgxInput.control.value;
        this.data.issuedAt = this.appHelper.getGmtDate(this.issuedAtNgxDate.control.value);
      }

      if (this.withRemoteAction) {
        await this._groupApiService.saveGroupPersonClaimState(this.group, this.person, this.data).toPromise();
      } else {
        this.data.id = Date.now();
      }
    });
  }

}
