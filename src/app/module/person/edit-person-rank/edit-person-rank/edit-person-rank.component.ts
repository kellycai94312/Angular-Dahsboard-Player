import {Component, Input} from '@angular/core';
import {ComponentWithAttach} from '../../../../data/local/component/base/component-with-attach';
import {PersonRank} from '../../../../data/remote/model/person-rank';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {Person} from '../../../../data/remote/model/person';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {NgxSelect} from '../../../ngx/ngx-select/model/ngx-select';
import {NgxInput} from '../../../ngx/ngx-input/model/ngx-input';
import {NgxDate} from '../../../ngx/ngx-date/model/ngx-date';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-person-rank',
  templateUrl: './edit-person-rank.component.html',
  styleUrls: ['./edit-person-rank.component.scss']
})
export class EditPersonRankComponent extends ComponentWithAttach<PersonRank> {

  @Input()
  public person: Person;

  public readonly rankNgxSelect = new NgxSelect();
  public readonly sportTypeNgxSelect = new NgxSelect();
  public readonly documentNumberNgxInput = new NgxInput();
  public readonly dateNgxDate = new NgxDate();
  private readonly _formGroup = new FormGroup({});

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);

    this.document.clazz = FileClass.PERSON_RANK;
    this.documentQuery.clazz = FileClass.PERSON_RANK;
  }

  async initialize(obj: PersonRank): Promise<boolean> {
    return await this.appHelper.tryLoad(async () => {
      await super.initialize(obj);
      this.rankNgxSelect.labelTranslation = 'rank';
      this.rankNgxSelect.required = true;
      this.rankNgxSelect.display = 'name';
      this.rankNgxSelect.items = await this.participantRestApiService.getRanks();
      this.rankNgxSelect.control.setValidators(Validators.required);
      this.rankNgxSelect.control.setValue(obj.rank ? this.rankNgxSelect.items.find(x => x.id == obj.rank.id) : this.rankNgxSelect.items[0]);

      this.sportTypeNgxSelect.labelTranslation = 'sportType';
      this.sportTypeNgxSelect.required = true;
      this.sportTypeNgxSelect.display = 'name';
      this.sportTypeNgxSelect.items = (await this.participantRestApiService.getSportTypes({count: PropertyConstant.pageSizeMax})).list;
      this.sportTypeNgxSelect.control.setValidators(Validators.required);
      this.sportTypeNgxSelect.control.setValue(obj.sportType ? this.sportTypeNgxSelect.items.find(x => x.id == obj.sportType.id) : this.sportTypeNgxSelect.items[0]);

      this.documentNumberNgxInput.labelTranslation = 'documentNumber';
      this.documentNumberNgxInput.required = true;
      this.documentNumberNgxInput.control.setValidators(Validators.required);
      this.documentNumberNgxInput.control.setValue(obj.number);

      this.dateNgxDate.placeholderTranslation = 'date';
      this.dateNgxDate.required = true;
      this.dateNgxDate.format = PropertyConstant.dateFormat;
      this.dateNgxDate.control = new FormControl(obj.date, [Validators.required]);

      this._formGroup.setControl('rank', this.rankNgxSelect.control);
      this._formGroup.setControl('sportType', this.sportTypeNgxSelect.control);
      this._formGroup.setControl('documentNumber', this.documentNumberNgxInput.control);
      this._formGroup.setControl('date', this.dateNgxDate.control);

      await this.attachFileComponent.initialize();
    });
  }

  async onRemove(): Promise<boolean> {
    return await this.appHelper.tryRemove(async () => {
      await this.participantRestApiService.removePersonRank({personId: this.person.id, personRankId: this.data.id});
    });
  }

  async onSave(): Promise<boolean> {
    this.updateData();

    if (!this.changeWatcher.hasChanges() && !this.attachFileComponent.hasChanges()) {
      return true;
    }

    if (!await this.validWithNotify()) {
      return false;
    }

    return await this.appHelper.trySave(async () => {
      if (this.changeWatcher.hasChanges()) {
        if (this.appHelper.isNewObject(this.data)) {
          this.appHelper.updateObject(this.data, await this.participantRestApiService.createPersonRank(this.data, {}, {
            personId: this.person.id
          }));
        } else {
          this.appHelper.updateObject(this.data, await this.participantRestApiService.updatePersonRank(this.data, {}, {
            personId: this.person.id,
            personRankId: this.data.id
          }));
        }
        this.document.number = this.data.number;
        this.document.date = this.data.date;
      }

      if (this.attachFileComponent.hasChanges()) {
        this.document.objectId = this.data.id;
        await this.attachFileComponent.updateFile();
      }
    });
  }

  updateData(): void {
    super.updateData();

    this.data.rank = this.rankNgxSelect.control.value;
    this.data.sportType = this.sportTypeNgxSelect.control.value;
    this.data.number = this.documentNumberNgxInput.control.value;
    this.data.date = this.appHelper.getGmtDate(this.dateNgxDate.control.value);
  }

  valid(): boolean {
    return super.valid() && this._formGroup.valid;
  }

}
