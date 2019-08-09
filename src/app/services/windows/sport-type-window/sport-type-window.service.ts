import {Injectable} from '@angular/core';
import {NgxModalService} from '../../../components/ngx-modal/service/ngx-modal.service';
import {ItemDetailComponent} from '../../../module/common/item-detail/item-detail/item-detail.component';
import {TextField} from '../../../module/common/item-detail/model/text-field';
import {SportType} from '../../../data/remote/model/sport-type';

@Injectable({
  providedIn: 'root'
})
export class SportTypeWindowService {

  constructor(private _ngxModalService: NgxModalService) {
  }

  // TODO:
  // public async openEditUnit<T extends SportType>(sportType: T): Promise<DialogResult<T>> {
  //   const modal = this._ngxModalService.open();
  //   modal.componentInstance.titleKey = 'sportType';
  //   let editSportTypeComponent: EditSportTypeComponent;
  //   await modal.componentInstance.initializeBody(EditSportTypeComponent, async component => {
  //     editSportTypeComponent = component;
  //
  //     await component.initialize(this._utilService.clone(sportType));
  //
  //     modal.componentInstance.splitButtonItems = [
  //       this._ngxModalService.saveSplitItemButton(async () => {
  //         await this._ngxModalService.save(modal, component);
  //       }),
  //       this._ngxModalService.removeSplitItemButton(async () => {
  //         await this._ngxModalService.remove(modal, component);
  //       })
  //     ];
  //   }, {componentFactoryResolver: this._componentFactoryResolver});
  //
  //   const dialogResult = new DialogResult<T>();
  //   dialogResult.result = await this._ngxModalService.awaitModalResult(modal);
  //   dialogResult.data = editSportTypeComponent.data as T;
  //   return dialogResult;
  // }

  public async openSportTypeDetail(sportType: SportType): Promise<void> {
    const model = this._ngxModalService.open();
    model.componentInstance.title = `${sportType.name}`;
    model.componentInstance.useContentPadding = false;

    await model.componentInstance.initializeBody(ItemDetailComponent, async component => {
      component.leftFields = [
        new TextField('description', sportType.description)
      ];
      await this._ngxModalService.awaitModalResult(model);
    });
  }

}
