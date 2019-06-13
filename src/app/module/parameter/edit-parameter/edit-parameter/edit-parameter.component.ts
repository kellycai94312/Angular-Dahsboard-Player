import {Component, ComponentFactoryResolver, forwardRef, Inject, OnInit} from '@angular/core';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {DictionaryType} from '../../../../data/remote/model/base/dictionary-type';
import {NgxSelect} from '../../../ngx/ngx-select/model/ngx-select';
import {NgxInput} from '../../../ngx/ngx-input/model/ngx-input';
import {TranslateObjectService} from '../../../../shared/translate-object.service';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {Validators} from '@angular/forms';
import {NgxInputType} from '../../../ngx/ngx-input/model/ngx-input-type';
import {ParameterApiService} from '../../../../data/remote/rest-api/api/parameter/parameter-api.service';
import {BaseParameter} from '../../../../data/remote/model/parameter/base-parameter';
import {UserParameter} from '../../../../data/remote/model/parameter/user-parameter';
import {ParameterTypeEnum} from '../../../../data/remote/model/parameter/parameter-type-enum';
import {BaseUnit} from '../../../../data/remote/model/unit/base-unit';
import {ParameterWindowService} from '../../../../services/windows/parameter-window/parameter-window.service';
import {IdRequest} from '../../../../data/remote/request/id-request';
import {ListRequest} from '../../../../data/remote/request/list-request';
import {NameWrapper} from '../../../../data/local/name-wrapper';

@Component({
  selector: 'app-edit-parameter',
  templateUrl: './edit-parameter.component.html',
  styleUrls: ['./edit-parameter.component.scss'],
  providers: [ParameterApiService]
})
export class EditParameterComponent extends BaseEditComponent<BaseParameter> implements OnInit {

  public readonly dictionaryTypeClass = DictionaryType;
  public readonly parameterTypeEnumClass = ParameterTypeEnum;
  public readonly dictionaryTypeNgxSelect = new NgxSelect();
  public readonly nameNgxInput = new NgxInput();
  public readonly shortNameNgxInput = new NgxInput();
  public readonly specialNameNgxInput = new NgxInput();
  public readonly descriptionNgxInput = new NgxInput();
  public readonly parameterTypeNgxSelect = new NgxSelect();
  public readonly mathOperations: NameWrapper<string>[];
  public formulaParameters: NameWrapper<string>[] = [];
  public parameters: BaseParameter[] = [];

  constructor(private _parameterApiService: ParameterApiService,
              // TODO: ParameterWindowService can't inject without forwardRef()
              @Inject(forwardRef(() => ParameterWindowService))
              private _parameterWindowService: ParameterWindowService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _translateObjectService: TranslateObjectService,
              participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
    this.mathOperations = [
      {name: '/', data: '/'},
      {name: '*', data: '*'},
      {name: '-', data: '-'},
      {name: '+', data: '+'}
    ];
  }

  protected async initializeComponent(data: BaseParameter): Promise<boolean> {
    const result = await super.initializeComponent(data);
    if (result) {
      return await this.appHelper.tryLoad(async () => {
        this.dictionaryTypeNgxSelect.labelTranslation = 'dictionaryType';
        this.dictionaryTypeNgxSelect.items = await this._translateObjectService.getTranslatedEnumCollection<DictionaryType>(DictionaryType, 'DictionaryTypeEnum');
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

        this.specialNameNgxInput.labelTranslation = 'specialName';
        this.specialNameNgxInput.required = true;
        this.specialNameNgxInput.control.setValue(data.specialName);
        this.specialNameNgxInput.control.setValidators([Validators.required, Validators.pattern('[_0-9a-zA-Z]+')]);

        this.descriptionNgxInput.labelTranslation = 'description';
        this.descriptionNgxInput.type = NgxInputType.TEXTAREA;
        this.descriptionNgxInput.control.setValue(data.description);

        this.parameterTypeNgxSelect.labelTranslation = 'parameterType';
        this.parameterTypeNgxSelect.items = await this._translateObjectService.getTranslatedEnumCollection<ParameterTypeEnum>(ParameterTypeEnum, 'ParameterTypeEnum');
        this.parameterTypeNgxSelect.control.setValue(this.isNew ? this.parameterTypeNgxSelect.items[0] : this.parameterTypeNgxSelect.items.find(x => x.data === data.parameterTypeEnum));
        this.parameterTypeNgxSelect.control.setValidators(Validators.required);
        this.parameterTypeNgxSelect.display = 'name';
        this.parameterTypeNgxSelect.required = true;

        this.data.units = this.data.units || [];
        await this._updateFormulaParameters();
      });
    }
    return result;
  }

  public async onEditFormula(): Promise<void> {
    if (this.isNew && !(await this.onSave())) {
      return;
    }
    const dialogResult = await this._parameterWindowService.openEditParameterFormula(this.data);
    if (dialogResult.result) {
      this.data = dialogResult.data;
      await this._updateFormulaParameters();
    }
  }

  public onRemoveUnit(item: BaseUnit): void {
    this.data.units.splice(this.data.units.indexOf(item), 1);
  }

  public async onEditUnits(): Promise<void> {
    const dialogResult = await this._parameterWindowService.openEditParameterUnits(this.data, this.data.units, {
      componentFactoryResolver: this._componentFactoryResolver,
      compare: (first, second) => first.id == second.id
    });
    if (dialogResult.result) {
      this.data.units = dialogResult.data;
    }
  }

  async onRemove(): Promise<boolean> {
    return await this.appHelper.tryRemove(async () => {
      this.data = await this._parameterApiService.removeParameter(this.data).toPromise();
    });
  }

  async onSave(): Promise<boolean> {
    this.data.discriminator = this.dictionaryTypeNgxSelect.control.value.data;
    this.data.name = this.nameNgxInput.control.value;
    this.data.shortName = this.shortNameNgxInput.control.value;
    this.data.specialName = this.specialNameNgxInput.control.value;
    this.data.description = this.descriptionNgxInput.control.value;
    this.data.parameterTypeEnum = this.parameterTypeNgxSelect.control.value.data;
    (this.data as UserParameter).open = (this.data as UserParameter).open || false;
    (this.data as UserParameter).free = (this.data as UserParameter).free || false;

    return await this.appHelper.trySave(async () => {
      this.data = await this._parameterApiService.saveParameter(this.data).toPromise();
      this.data.units = await this._parameterApiService.updateParameterUnits(this.data, new ListRequest<IdRequest>(this.data.units.map(x => new IdRequest(x.id)))).toPromise();
    });
  }

  private _getFormulaParameters(formula: string): NameWrapper<string>[] {
    if (!formula) {
      return [];
    }
    const result: NameWrapper<string>[] = [];
    const pattern = `([$]\\d+)|[${this.mathOperations.map(x => x.data).join(',')}]`;
    const regExp = new RegExp(pattern, 'gi');
    let regExpExecArray: RegExpExecArray;
    do {
      regExpExecArray = regExp.exec(formula);
      if (regExpExecArray) {
        result.push({name: '' + regExpExecArray[0], data: '' + regExpExecArray[0]});
      }
    } while (regExpExecArray);
    return result;
  }

  private async _updateFormulaParameters(): Promise<void> {
    if (!this.isNew) {
      this.parameters = await this._parameterApiService.getFormulaParameters(this.data).toPromise();
      const formulaParameters = this._getFormulaParameters(this.data.formula);
      formulaParameters
        .filter(x => x.data.indexOf('$') > -1)
        .forEach(value => {
          const nameWrapper = this._getNameWrapperParameter(value.data);
          if (nameWrapper) {
            Object.assign(value, nameWrapper);
          }
        });
      this.formulaParameters = formulaParameters;
    }
  }

  private _getNameWrapperParameter(id: string): NameWrapper<string> {
    const parameter = this.parameters.find(x => `$${x.id}` === id);
    return parameter ? {name: parameter.name, data: id} : void 0;
  }

}
