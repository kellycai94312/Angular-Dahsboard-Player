import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Direction } from '../../../../components/ngx-virtual-scroll/model/direction';
import { DialogResult } from '../../../../data/local/dialog-result';
import { PageContainer } from '../../../../data/remote/bean/page-container';
import { Poll } from '../../../../data/remote/model/poll/poll';
import { PollApiService } from '../../../../data/remote/rest-api/api/poll/poll-api.service';
import { PageQuery } from '../../../../data/remote/rest-api/page-query';
import { LibraryPermissionService } from '../../../../services/permissions/library/library-permission.service';
import { PollWindowService } from '../../../../services/windows/poll-window/poll-window.service';
import { AppHelper } from '../../../../utils/app-helper';
import { BaseItemList } from '../../../common/item-list/model/base-item-list';
import { ItemDisplay } from '../../../common/item-list/model/item-display';

@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.scss']
})
export class PollListComponent extends BaseItemList<Poll, PageQuery> implements OnInit, OnDestroy {

  @Output()
  public readonly clickItem = new EventEmitter<Poll>();

  private _notDestroyed = true;

  constructor(private _libraryPermissionService: LibraryPermissionService,
              private _pollApiService: PollApiService,
              private _pollWindowService: PollWindowService,
              private _appHelper: AppHelper) {
    super();
    this.translationTitle = 'polls';
    this.query = new PageQuery();
    this.itemDisplay = ItemDisplay.LIST;
    this.fetchItems = async (direction: Direction, query: PageQuery): Promise<PageContainer<Poll>> => {
      return this._appHelper.arrayToPageContainer(await this._pollApiService.getPolls().toPromise());
    };
  }

  public ngOnInit(): void {
    this._libraryPermissionService.canAddLibraryItem().subscribe(value => {
      if (value) {
        this.addItem = async (): Promise<DialogResult<Poll>> => this._pollWindowService.openEditPollWindow(new Poll());
      }
    });
  }

  public ngOnDestroy(): void {
    delete this._notDestroyed;
  }

}
