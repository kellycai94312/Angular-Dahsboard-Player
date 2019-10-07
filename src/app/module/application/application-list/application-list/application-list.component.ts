import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Direction } from '../../../../components/ngx-virtual-scroll/model/direction';
import { DialogResult } from '../../../../data/local/dialog-result';
import { PageContainer } from '../../../../data/remote/bean/page-container';
import { Application } from '../../../../data/remote/model/application/application';
import { ApplicationApiService } from '../../../../data/remote/rest-api/api/application/application-api.service';
import { PageQuery } from '../../../../data/remote/rest-api/page-query';
import { LibraryPermissionService } from '../../../../services/permissions/library/library-permission.service';
import { ApplicationWindowService } from '../../../../services/windows/application-window/application-window.service';
import { BaseItemList } from '../../../common/item-list/model/base-item-list';
import { ItemDisplay } from '../../../common/item-list/model/item-display';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss']
})
export class ApplicationListComponent extends BaseItemList<Application, PageQuery> implements OnInit, OnDestroy {

  @Output()
  public readonly clickItem = new EventEmitter<Application>();

  private _notDestroyed = true;

  constructor(private _libraryPermissionService: LibraryPermissionService,
              private _applicationApiService: ApplicationApiService,
              private _applicationWindowService: ApplicationWindowService) {
    super();
    this.translationTitle = 'applications';
    this.query = new PageQuery();
    this.itemDisplay = ItemDisplay.LIST;
    this.fetchItems = async (direction: Direction, query: PageQuery): Promise<PageContainer<Application>> => {
      return this._applicationApiService.getApplications(query).toPromise();
    };
  }

  public ngOnInit(): void {
    this._libraryPermissionService.canAddLibraryItem().subscribe(value => {
      if (value) {
        this.addItem = async (): Promise<DialogResult<Application>> => this._applicationWindowService.openEditApplication(new Application());
      }
    });
  }

  public ngOnDestroy(): void {
    delete this._notDestroyed;
  }

}
