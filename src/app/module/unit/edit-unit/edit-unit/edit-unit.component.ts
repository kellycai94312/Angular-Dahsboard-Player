import {Component, OnInit} from '@angular/core';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {BaseUnit} from '../../../../data/remote/model/unit/base-unit';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {UnitApiService} from '../../../../data/remote/rest-api/api/unit/unit-api.service';
import {NgxSelect} from '../../../ngx/ngx-select/model/ngx-select';
import {NgxInput} from '../../../ngx/ngx-input/model/ngx-input';
import {TranslateObjectService} from '../../../../shared/translate-object.service';
import {DictionaryType} from '../../../../data/remote/model/base/dictionary-type';
import {Validators} from '@angular/forms';
import {NgxInputType} from '../../../ngx/ngx-input/model/ngx-input-type';
import {UnitTypeEnum} from '../../../../data/remote/misc/unit-type-enum';
import {UserUnit} from '../../../../data/remote/model/unit/user-unit';

@Component({
  selector: 'app-edit-unit',
  templateUrl: './edit-unit.component.html',
  styleUrls: ['./edit-unit.component.scss'],
  providers: [UnitApiService]
})
export class EditUnitComponent extends BaseEditComponent<BaseUnit> implements OnInit {

  public readonly dictionaryTypeClass = DictionaryType;
  public readonly dictionaryTypeNgxSelect = new NgxSelect();
  public readonly nameNgxInput = new NgxInput();
  public readonly shortNameNgxInput = new NgxInput();
  public readonly descriptionNgxInput = new NgxInput();
  public readonly unitTypeNgxSelect = new NgxSelect();

  constructor(private _unitApiService: UnitApiService,
              private _translateObjectService: TranslateObjectService,
              participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
  }


  protected async initializeComponent(data: BaseUnit): Promise<boolean> {
    const result = await super.initializeComponent(data);
    if (result) {
      return await this.appHelper.tryLoad(async () => {
        this.dictionaryTypeNgxSelect.labelTranslation = 'libraryType';
        this.dictionaryTypeNgxSelect.items = await this._translateObjectService.getTranslatedEnumCollection<DictionaryType>(DictionaryType, 'LibraryTypeEnum');
        this.dictionaryTypeNgxSelect.control.setValue(this.isNew ? this.dictionaryTypeNgxSelect.items[0] : this.dictionaryTypeNgxSelect.items.find(x => x.data === data.discriminator));
        this.dictionaryTypeNgxSelect.control.setValidators(Validators.required);
        this.dictionaryTypeNgxSelect.display = 'name';
        this.dictionaryTypeNgxSelect.required = true;
        if (!this.isNew) {
          this.dictionaryTypeNgxSelect.control.disable();
        }

        this.nameNgxInput.labelTranslation = 'name';
        this.nameNgxInput.required = true;
        this.nameNgxInput.control.setValue(data.name);
        this.nameNgxInput.control.setValidators(Validators.required);

        this.shortNameNgxInput.labelTranslation = 'shortName';
        this.shortNameNgxInput.required = true;
        this.shortNameNgxInput.control.setValue(data.shortName);
        this.shortNameNgxInput.control.setValidators(Validators.required);

        this.descriptionNgxInput.labelTranslation = 'description';
        this.descriptionNgxInput.type = NgxInputType.TEXTAREA;
        this.descriptionNgxInput.control.setValue(data.description);

        this.unitTypeNgxSelect.labelTranslation = 'unitType';
        this.unitTypeNgxSelect.items = await this._translateObjectService.getTranslatedEnumCollection<UnitTypeEnum>(UnitTypeEnum, 'UnitTypeEnum');
        this.unitTypeNgxSelect.control.setValue(this.isNew ? this.unitTypeNgxSelect.items[0] : this.unitTypeNgxSelect.items.find(x => x.data === data.unitTypeEnum));
        this.unitTypeNgxSelect.control.setValidators(Validators.required);
        this.unitTypeNgxSelect.display = 'name';
        this.unitTypeNgxSelect.required = true;
      });
    }
    return result;
  }

  async onRemove(): Promise<boolean> {
    return await this.appHelper.tryRemove(async () => {
      this.data = await this._unitApiService.removeUnit(this.data).toPromise();
    });
  }

  async onSave(): Promise<boolean> {
    this.data.discriminator = this.dictionaryTypeNgxSelect.control.value.data;
    this.data.name = this.nameNgxInput.control.value;
    this.data.shortName = this.shortNameNgxInput.control.value;
    this.data.description = this.descriptionNgxInput.control.value;
    this.data.unitTypeEnum = this.unitTypeNgxSelect.control.value.data;
    (this.data as UserUnit).open = (this.data as UserUnit).open || false;

    return await this.appHelper.trySave(async () => {
      this.data = await this._unitApiService.saveUnit(this.data).toPromise();
    });
  }

}
