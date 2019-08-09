import {ComponentFactoryResolver, Injectable} from '@angular/core';
import {NgxModalService} from '../../../components/ngx-modal/service/ngx-modal.service';
import {UtilService} from '../../util/util.service';
import {DialogResult} from '../../../data/local/dialog-result';
import {BaseParameter} from '../../../data/remote/model/parameter/base-parameter';
import {EditParameterComponent} from '../../../module/parameter/edit-parameter/edit-parameter/edit-parameter.component';
import {BaseUnit} from '../../../data/remote/model/unit/base-unit';
import {ModalBuilderService} from '../../../service/modal-builder/modal-builder.service';
import {UnitApiService} from '../../../data/remote/rest-api/api/unit/unit-api.service';
import {UnitItemComponent} from '../../../module/unit/unit-item/unit-item/unit-item.component';
import {NgxSelectionConfig} from '../../../components/ngx-selection/model/ngx-selection-config';
import {UnitQuery} from '../../../data/remote/rest-api/query/unit/unit-query';
import {EditFormulaComponent} from '../../../module/parameter/edit-formula/edit-formula/edit-formula.component';
import {ParameterApiService} from '../../../data/remote/rest-api/api/parameter/parameter-api.service';
import {ParameterQuery} from '../../../data/remote/rest-api/query/parameter/parameter-query';
import {ParameterItemComponent} from '../../../module/parameter/parameter-item/parameter-item/parameter-item.component';
import {TranslateService} from '@ngx-translate/core';
import {ItemDetailComponent} from '../../../module/common/item-detail/item-detail/item-detail.component';
import {TextField} from '../../../module/common/item-detail/model/text-field';

@Injectable({
  providedIn: 'root'
})
export class ParameterWindowService {

  constructor(private _ngxModalService: NgxModalService,
              private _modalBuilderService: ModalBuilderService,
              private _unitApiService: UnitApiService,
              private _parameterApiService: ParameterApiService,
              private _translateService: TranslateService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _utilService: UtilService) {
  }

  public async openEditParameter<T extends BaseParameter>(parameter: T): Promise<DialogResult<T>> {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'parameter';
    let editParameterComponent: EditParameterComponent;
    await modal.componentInstance.initializeBody(EditParameterComponent, async component => {
      editParameterComponent = component;

      await component.initialize(this._utilService.clone(parameter));

      modal.componentInstance.splitButtonItems = [
        this._ngxModalService.saveSplitItemButton(async () => {
          await this._ngxModalService.save(modal, component);
        }),
        this._ngxModalService.removeSplitItemButton(async () => {
          await this._ngxModalService.remove(modal, component);
        })
      ];
    }, {componentFactoryResolver: this._componentFactoryResolver});

    const dialogResult = new DialogResult<T>();
    dialogResult.result = await this._ngxModalService.awaitModalResult(modal);
    dialogResult.data = editParameterComponent.data as T;
    return dialogResult;
  }

  public async openEditParameterFormula<T extends BaseParameter>(parameter: T): Promise<DialogResult<T>> {
    const modal = this._ngxModalService.open();
    const translationObj = this._translateService.instant(['formula', 'for']);
    modal.componentInstance.title = `${translationObj['formula']} ${(translationObj['for'] as string).toLowerCase()} ${parameter.name}`;
    let editFormulaComponent: EditFormulaComponent;
    await modal.componentInstance.initializeBody(EditFormulaComponent, async component => {
      editFormulaComponent = component;

      await component.initialize(this._utilService.clone(parameter));

      modal.componentInstance.splitButtonItems = [
        this._ngxModalService.saveSplitItemButton(async () => {
          await this._ngxModalService.save(modal, component);
        })
      ];
    }, {componentFactoryResolver: this._componentFactoryResolver});

    const dialogResult = new DialogResult<T>();
    dialogResult.result = await this._ngxModalService.awaitModalResult(modal);
    dialogResult.data = editFormulaComponent.data as T;
    return dialogResult;
  }

  public async openEditParameterUnits<T extends BaseUnit>(units: T[], config: NgxSelectionConfig<T>): Promise<DialogResult<T[]>> {
    return await this._modalBuilderService.showSelectionItemsModal(units, async (query: UnitQuery) => {
      return await this._unitApiService.getUnits(query).toPromise();
    }, UnitItemComponent, async (component, data) => {
      component.canEdit = false;
      await component.initialize(data);
    }, config) as DialogResult<T[]>;
  }

  public async openEditParameters<T extends BaseParameter>(parameters: T[], config: NgxSelectionConfig<T>): Promise<DialogResult<T[]>> {
    return await this._modalBuilderService.showSelectionItemsModal(parameters, async (query: ParameterQuery) => {
      return await this._parameterApiService.getParameters(query).toPromise();
    }, ParameterItemComponent, async (component, data) => {
      component.canEdit = false;
      await component.initialize(data);
    }, config) as DialogResult<T[]>;
  }

  public async openParameterDetail(parameter: BaseParameter): Promise<void> {
    const model = this._ngxModalService.open();
    model.componentInstance.title = `${parameter.name}`;
    model.componentInstance.useContentPadding = false;

    await model.componentInstance.initializeBody(ItemDetailComponent, async component => {
      component.leftFields = [
        new TextField('shortName', parameter.shortName),
        new TextField('specialName', parameter.specialName),
        new TextField('description', parameter.description),
        new TextField('parameterType', this._translateService.instant(`parameterTypeEnum.${parameter.parameterTypeEnum}`))
      ];
      await this._ngxModalService.awaitModalResult(model);
    });
  }

}
