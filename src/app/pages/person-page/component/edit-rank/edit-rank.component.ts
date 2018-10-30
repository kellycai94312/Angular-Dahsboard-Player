import {Component, Input, ViewChild} from '@angular/core';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {PersonRank} from '../../../../data/remote/model/person-rank';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {Rank} from '../../../../data/remote/model/rank';
import {SportType} from '../../../../data/remote/model/sport-type';
import {Document} from '../../../../data/remote/model/file/document/document';
import {DocumentQuery} from '../../../../data/remote/rest-api/query/file/document-query';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {Person} from '../../../../data/remote/model/person';
import {ChangeWatcher} from '../../../../data/local/util/change-watcher';
import {AttachFileComponent} from '../../../../components/attach-file/attach-file/attach-file.component';

@Component({
  selector: 'app-edit-rank',
  templateUrl: './edit-rank.component.html',
  styleUrls: ['./edit-rank.component.scss']
})
export class EditRankComponent extends BaseEditComponent<PersonRank> {

  public readonly propertyConstant = PropertyConstant;

  @ViewChild(AttachFileComponent)
  public attachFileComponent: AttachFileComponent<Document>;

  @Input()
  public person: Person;

  public ranks: Rank[];
  public sportTypes: SportType[];
  public document: Document;
  public documentQuery: DocumentQuery;

  private readonly _changeWatcher: ChangeWatcher;
  private readonly _dataName: string;

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
    this.document = new Document();
    this.documentQuery = new DocumentQuery();
    this.documentQuery.clazz = FileClass.PERSON_RANK;
    this._changeWatcher = new ChangeWatcher(this.appHelper);
    this._dataName = 'data';
  }

  async initialize(obj: PersonRank): Promise<boolean> {
    return await this.appHelper.tryLoad(async () => {
      await super.initialize(obj);
      this.ranks = await this.participantRestApiService.getRanks();
      this.sportTypes = (await this.participantRestApiService.getSportTypes({count: PropertyConstant.pageSizeMax})).list;

      this._changeWatcher.addOrUpdate(this._dataName, this.data);
      this.documentQuery.objectId = this.data.id;
      await this.attachFileComponent.initialize();
    });
  }

  async onRemove(): Promise<boolean> {
    return await this.appHelper.tryRemove(async () => {
      await this.participantRestApiService.removePersonRank({personId: this.person.id, rankId: this.data.rank.id, sportTypeId: this.data.sportType.id});
    });
  }

  async onSave(): Promise<boolean> {
    if (!this._changeWatcher.hasChanges()) {
      return true;
    }

    if (!(await this.validWithNotify())) {
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

  public valid(): boolean {
    if (this.data.rank && this.data.sportType && this.data.number && this.data.date) {
      return true;
    }
    return false;
  }

  public async validWithNotify(): Promise<boolean> {
    const valid = this.valid();
    if (!valid) {
      await this.appHelper.showErrorMessage('someFieldsNotValid');
    }
    return valid;
  }

}
