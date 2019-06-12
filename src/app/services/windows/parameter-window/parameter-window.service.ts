import {ComponentFactoryResolver, Injectable} from '@angular/core';
import {NgxModalService} from '../../../components/ngx-modal/service/ngx-modal.service';
import {UtilService} from '../../util/util.service';
import {DialogResult} from '../../../data/local/dialog-result';
import {BaseParameter} from '../../../data/remote/model/parameter/base-parameter';
import {EditParameterComponent} from '../../../module/parameter/edit-parameter/edit-parameter/edit-parameter.component';

@Injectable()
export class ParameterWindowService {

  constructor(private _ngxModalService: NgxModalService,
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

}
