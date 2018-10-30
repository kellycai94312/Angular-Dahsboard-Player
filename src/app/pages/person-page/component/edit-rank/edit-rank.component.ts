import {Component, Input} from '@angular/core';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {PersonRank} from '../../../../data/remote/model/person-rank';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {Rank} from '../../../../data/remote/model/rank';
import {SportType} from '../../../../data/remote/model/sport-type';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {Person} from '../../../../data/remote/model/person';
import {ComponentWithAttach} from '../../../../data/local/component/base/component-with-attach';

@Component({
  selector: 'app-edit-rank',
  templateUrl: './edit-rank.component.html',
  styleUrls: ['./edit-rank.component.scss']
})
export class EditRankComponent extends ComponentWithAttach<PersonRank> {

  public readonly propertyConstant = PropertyConstant;

  @Input()
  public person: Person;

  public ranks: Rank[];
  public sportTypes: SportType[];

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);

    this.document.clazz = FileClass.PERSON_RANK;
    this.documentQuery.clazz = FileClass.PERSON_RANK;
  }

  async initialize(obj: PersonRank): Promise<boolean> {
    return await this.appHelper.tryLoad(async () => {
      await super.initialize(obj);
      this.ranks = await this.participantRestApiService.getRanks();
      this.sportTypes = (await this.participantRestApiService.getSportTypes({count: PropertyConstant.pageSizeMax})).list;

      await this.attachFileComponent.initialize();
    });
  }

  async onRemove(): Promise<boolean> {
    return await this.appHelper.tryRemove(async () => {
      await this.participantRestApiService.removePersonRank({personId: this.person.id, rankId: this.data.rank.id, sportTypeId: this.data.sportType.id});
    });
  }

  async onSave(): Promise<boolean> {
    if (!this.changeWatcher.hasChanges()) {
      return true;
    }

    if (!await this.validWithNotify()) {
      return false;
    }

    return await this.appHelper.trySave(async () => {
      this.appHelper.updateObject(this.data, await this.participantRestApiService.updatePersonRank(this.data, {}, {
        personId: this.person.id,
        rankId: this.data.rank.id,
        sportTypeId: this.data.sportType.id
      }));
      this.document.number = this.data.number;
      this.document.date = this.data.date;

      if (this.attachFileComponent.hasChanges()) {
        this.document.objectId = this.data.id;
        await this.attachFileComponent.updateFile();
      }
    });
  }

  public onDateChanged(val: Date) {
    this.data.date = this.appHelper.getGmtDate(val);
  }

  valid(): boolean {
    return super.valid() && !!(this.data.rank && this.data.sportType && this.data.number && this.data.date);
  }

}
