import {Component, EventEmitter, Output} from '@angular/core';
import {BaseItemList} from '../../../common/item-list/model/base-item-list';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {ItemDisplay} from '../../../common/item-list/model/item-display';
import {DialogResult} from '../../../../data/local/dialog-result';
import {Direction} from '../../../../components/ngx-virtual-scroll/model/direction';
import {PageContainer} from '../../../../data/remote/bean/page-container';
import {Poll} from '../../../../data/remote/model/poll/poll';
import {PollWindowService} from '../../../../services/windows/poll-window/poll-window.service';
import {PollApiService} from '../../../../data/remote/rest-api/api/poll/poll-api.service';
import {AppHelper} from '../../../../utils/app-helper';

@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.scss']
})
export class PollListComponent extends BaseItemList<Poll, PageQuery> {

  @Output()
  public readonly clickItem = new EventEmitter<Poll>();

  constructor(private _pollApiService: PollApiService,
              private _pollWindowService: PollWindowService,
              private _appHelper: AppHelper) {
    super();
    this.translationTitle = 'polls';
    this.query = new PageQuery();
    this.itemDisplay = ItemDisplay.LIST;
    this.addItem = async (): Promise<DialogResult<Poll>> => {
      return await this._pollWindowService.openEditPollWindow(new Poll());
    };
    this.fetchItems = async (direction: Direction, query: PageQuery): Promise<PageContainer<Poll>> => {
      return this._appHelper.arrayToPageContainer(await this._pollApiService.getPolls().toPromise());
    };
  }

}
