import {ComponentFactoryResolver, Injectable} from '@angular/core';
import {NgxModalService} from '../../../components/ngx-modal/service/ngx-modal.service';
import {BaseUnit} from '../../../data/remote/model/unit/base-unit';
import {EditUnitComponent} from '../../../module/unit/edit-unit/edit-unit/edit-unit.component';
import {DialogResult} from '../../../data/local/dialog-result';
import {UtilService} from '../../util/util.service';

@Injectable()
export class UnitWindowService {

  constructor(private _ngxModalService: NgxModalService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _utilService: UtilService) {
  }

  public async openEditUnit<T extends BaseUnit>(unit: T): Promise<DialogResult<T>> {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'unit';
    let editUnitComponent: EditUnitComponent;
    await modal.componentInstance.initializeBody(EditUnitComponent, async component => {
      editUnitComponent = component;

      await component.initialize(this._utilService.clone(unit));

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
    dialogResult.data = editUnitComponent.data as T;
    return dialogResult;
  }

}
