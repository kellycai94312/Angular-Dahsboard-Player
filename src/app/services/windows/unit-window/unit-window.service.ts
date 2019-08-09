import {ComponentFactoryResolver, Injectable} from '@angular/core';
import {NgxModalService} from '../../../components/ngx-modal/service/ngx-modal.service';
import {BaseUnit} from '../../../data/remote/model/unit/base-unit';
import {EditUnitComponent} from '../../../module/unit/edit-unit/edit-unit/edit-unit.component';
import {DialogResult} from '../../../data/local/dialog-result';
import {UtilService} from '../../util/util.service';
import {ItemDetailComponent} from '../../../module/common/item-detail/item-detail/item-detail.component';
import {TextField} from '../../../module/common/item-detail/model/text-field';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class UnitWindowService {

  constructor(private _ngxModalService: NgxModalService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _translateService: TranslateService,
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

  public async openUnitDetail(unit: BaseUnit): Promise<void> {
    const model = this._ngxModalService.open();
    model.componentInstance.title = `${unit.name}`;
    model.componentInstance.useContentPadding = false;

    await model.componentInstance.initializeBody(ItemDetailComponent, async component => {
      component.leftFields = [
        new TextField('shortName', unit.shortName),
        new TextField('description', unit.description),
        new TextField('libraryType', this._translateService.instant(`libraryTypeEnum.${unit.discriminator}`)),
        new TextField('unitType', this._translateService.instant(`unitTypeEnum.${unit.unitTypeEnum}`))
      ];
      await this._ngxModalService.awaitModalResult(model);
    });
  }

}
