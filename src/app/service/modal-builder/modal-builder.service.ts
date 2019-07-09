import {Injectable, Type} from '@angular/core';
import {PageQuery} from '../../data/remote/rest-api/page-query';
import {PageContainer} from '../../data/remote/bean/page-container';
import {DialogResult} from '../../data/local/dialog-result';
import {NgxSelectionComponent} from '../../components/ngx-selection/ngx-selection/ngx-selection.component';
import {NgxModalService} from '../../components/ngx-modal/service/ngx-modal.service';
import {AppHelper} from '../../utils/app-helper';
import {IdentifiedObject} from '../../data/remote/base/identified-object';
import {NgxModalRef} from '../../components/ngx-modal/bean/ngx-modal-ref';
import {TranslateObjectService} from '../../shared/translate-object.service';
import {NgxSelectionConfig} from '../../components/ngx-selection/model/ngx-selection-config';

@Injectable({
  providedIn: 'root'
})
export class ModalBuilderService {

  constructor(private _ngxModalService: NgxModalService,
              private _translateObjectService: TranslateObjectService,
              private _appHelper: AppHelper) {
  }

  public async showSelectionItemsModal<TComponent, TModel>(selectedItems: TModel[],
                                                           fetchItems: <Q extends PageQuery>(query: Q) => Promise<PageContainer<TModel>>,
                                                           componentType: Type<TComponent>,
                                                           initializeComponent: (component: TComponent, data: TModel) => Promise<void>,
                                                           config?: NgxSelectionConfig<TModel>,
                                                           initializeNgxSelectionComponent?: (component: NgxSelectionComponent<TComponent, PageQuery, TModel>) => void): Promise<DialogResult<TModel[]>> {
    const modal = this._ngxModalService.open();
    if (config) {
      if (config.title) {
        modal.componentInstance.title = config.title;
      } else {
        modal.componentInstance.titleKey = 'selection';
      }
    } else {
      modal.componentInstance.titleKey = 'selection';
    }
    let ngxSelectionComponent: NgxSelectionComponent<TComponent, any, TModel> = null;
    await modal.componentInstance.initializeBody(NgxSelectionComponent, async component => {
      ngxSelectionComponent = component;
      if (config) {
        component.canEdit = config.canEdit;
        component.minCount = config.minCount;
        component.maxCount = config.maxCount;
        if (config.compare) {
          component.compare = config.compare;
        }
        component.selected = config.selected;
        component.deselected = config.deselected;
        component.itemsNgxSelect = config.itemsNgxSelect;
        component.componentFactoryResolver = config.componentFactoryResolver;
      }

      await component.initialize(componentType, initializeComponent, fetchItems, this._appHelper.cloneObject(selectedItems));
      if (initializeNgxSelectionComponent) {
        initializeNgxSelectionComponent(component);
      }
      if (config && config.actions) {
        modal.componentInstance.splitButtonItems = config.actions(modal);
      } else {
        modal.componentInstance.splitButtonItems = [
          {
            nameKey: 'apply',
            callback: async () => {
              modal.close();
            },
            visible: () => {
              return component.isValid();
            }
          }
        ];
      }
    }, config);

    const dialogResult: DialogResult<TModel[]> = {result: await this._ngxModalService.awaitModalResult(modal)};
    if (dialogResult.result) {
      dialogResult.data = ngxSelectionComponent.selectedItems;
    }
    return dialogResult;
  }

  public updateTitleKeyModal<T extends IdentifiedObject>(modal: NgxModalRef, obj: T): void {
    const isNew = this._appHelper.isNewObject(obj);
    modal.componentInstance.titleKey = isNew ? 'add' : 'edit';
  }

  public async updateModalTitle<T extends IdentifiedObject>(modal: NgxModalRef, obj: T, text: string = ''): Promise<void> {
    const isNew = this._appHelper.isNewObject(obj);
    modal.componentInstance.title = `${text} | ${await this._translateObjectService.getTranslation(isNew ? 'add' : 'edit')}`;
  }

}
