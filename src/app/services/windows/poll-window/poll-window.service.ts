import {ComponentFactoryResolver, Injectable} from '@angular/core';
import {DialogResult} from '../../../data/local/dialog-result';
import {NgxModalService} from '../../../components/ngx-modal/service/ngx-modal.service';
import {Poll} from '../../../data/remote/model/poll/poll';
import {UtilService} from '../../util/util.service';
import {EditPollComponent} from '../../../module/poll/edit-poll/edit-poll/edit-poll.component';
import {ItemDetailComponent} from '../../../module/common/item-detail/item-detail/item-detail.component';
import {TextField} from '../../../module/common/item-detail/model/text-field';
import {TranslateService} from '@ngx-translate/core';
import {PollPerson} from '../../../data/remote/model/poll/poll-person';
import {PollItemComponent} from '../../../module/poll/poll-item/poll-item/poll-item.component';
import {PollApiService} from '../../../data/remote/rest-api/api/poll/poll-api.service';
import {ModalBuilderService} from '../../../service/modal-builder/modal-builder.service';
import {AppHelper} from '../../../utils/app-helper';
import {NgxSelectionConfig} from '../../../components/ngx-selection/model/ngx-selection-config';

@Injectable({
  providedIn: 'root'
})
export class PollWindowService {

  constructor(private _ngxModalService: NgxModalService,
              private _utilService: UtilService,
              private _pollApiService: PollApiService,
              private _translateService: TranslateService,
              private _appHelper: AppHelper,
              private _modalBuilderService: ModalBuilderService,
              private _componentFactoryResolver: ComponentFactoryResolver) {
  }

  public async openEditPollWindow(poll: Poll, pollPerson?: PollPerson): Promise<DialogResult<Poll>> {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'poll';
    let editPollComponent: EditPollComponent;
    await modal.componentInstance.initializeBody(EditPollComponent, async component => {
      editPollComponent = component;
      component.pollPerson = pollPerson;

      await component.initialize(this._utilService.clone(poll));

      if (component.canEdit) {
        modal.componentInstance.splitButtonItems = [
          this._ngxModalService.saveSplitItemButton(async () => {
            await this._ngxModalService.save(modal, component);
          }),
          this._ngxModalService.removeSplitItemButton(async () => {
            await this._ngxModalService.remove(modal, component);
          })
        ];
      }
    }, {componentFactoryResolver: this._componentFactoryResolver});

    return {result: await this._ngxModalService.awaitModalResult(modal), data: editPollComponent.data};
  }

  public async openPollDetailWindow(poll: Poll): Promise<void> {
    const model = this._ngxModalService.open();
    model.componentInstance.title = `${poll.name}`;
    model.componentInstance.useContentPadding = false;

    await model.componentInstance.initializeBody(ItemDetailComponent, async component => {
      component.leftFields = [
        new TextField('pollType', this._translateService.instant(`pollTypeEnum.${poll.pollTypeEnum}`)),
        new TextField('name', poll.name),
        new TextField('description', poll.description)
      ];
      await this._ngxModalService.awaitModalResult(model);
    });
  }

  public async openSelectionPollsWindow(polls: Poll[], config?: NgxSelectionConfig<Poll>): Promise<DialogResult<Poll[]>> {
    return await this._modalBuilderService.showSelectionItemsModal(polls, async query => {
      return this._appHelper.arrayToPageContainer(await this._pollApiService.getPolls().toPromise());
    }, PollItemComponent, async (component, data) => {
      await component.initialize(data);
    }, config);
  }

}
