import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Direction } from '../../../../components/ngx-virtual-scroll/model/direction';
import { DialogResult } from '../../../../data/local/dialog-result';
import { PageContainer } from '../../../../data/remote/bean/page-container';
import { BaseUnit } from '../../../../data/remote/model/unit/base-unit';
import { UnitApiService } from '../../../../data/remote/rest-api/api/unit/unit-api.service';
import { PageQuery } from '../../../../data/remote/rest-api/page-query';
import { UnitQuery } from '../../../../data/remote/rest-api/query/unit/unit-query';
import { LibraryPermissionService } from '../../../../services/permissions/library/library-permission.service';
import { UnitWindowService } from '../../../../services/windows/unit-window/unit-window.service';
import { BaseItemList } from '../../../common/item-list/model/base-item-list';
import { ItemDisplay } from '../../../common/item-list/model/item-display';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss'],
  providers: [UnitApiService]
})
export class UnitListComponent extends BaseItemList<BaseUnit, PageQuery> implements OnInit, OnDestroy {

  @Output()
  public readonly clickItem = new EventEmitter<BaseUnit>();

  private _notDestroyed = true;

  constructor(private _libraryPermissionService: LibraryPermissionService,
              private _unitApiService: UnitApiService,
              private _unitWindowService: UnitWindowService) {
    super();
    this.translationTitle = 'units';
    this.query = new PageQuery();
    this.itemDisplay = ItemDisplay.LIST;
    this.fetchItems = async (direction: Direction, query: UnitQuery): Promise<PageContainer<BaseUnit>> => {
      return this._unitApiService.getUnits(query).toPromise();
    };
  }

  public ngOnInit(): void {
    this._libraryPermissionService.canAddLibraryItem().subscribe(value => {
      if (value) {
        this.addItem = async (): Promise<DialogResult<BaseUnit>> => this._unitWindowService.openEditUnit(new BaseUnit());
      }
    });
  }

  public ngOnDestroy(): void {
    delete this._notDestroyed;
  }

}
