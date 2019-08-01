import {Injectable} from '@angular/core';
import {NgxModalService} from '../../../components/ngx-modal/service/ngx-modal.service';
import {EditNewsComponent} from '../../../module/news/edit-news/edit-news/edit-news.component';
import {BaseNews} from '../../../data/remote/model/group/news/base-news';
import {NgxModalConfiguration} from '../../../components/ngx-modal/bean/ngx-modal-configuration';
import {DialogResult} from '../../../data/local/dialog-result';
import {UtilService} from '../../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class NewsWindowService {

  constructor(private _ngxModalService: NgxModalService,
              private _utilService: UtilService) {
  }

  public async openEditNewsWindow<T extends BaseNews>(news: T, config?: NgxModalConfiguration): Promise<DialogResult<T>> {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'news';
    let editNewsComponent: EditNewsComponent;
    await modal.componentInstance.initializeBody(EditNewsComponent, async component => {
      editNewsComponent = component;
      await component.initialize(this._utilService.clone(news));

      modal.componentInstance.splitButtonItems = [
        this._ngxModalService.saveSplitItemButton(async () => {
          await this._ngxModalService.save(modal, component);
        }),
        this._ngxModalService.removeSplitItemButton(async () => {
          await this._ngxModalService.remove(modal, component);
        })
      ];
    }, config);

    const dialogResult = new DialogResult<T>();
    dialogResult.result = await this._ngxModalService.awaitModalResult(modal);
    dialogResult.data = editNewsComponent.data as T;
    return dialogResult;
  }

}
