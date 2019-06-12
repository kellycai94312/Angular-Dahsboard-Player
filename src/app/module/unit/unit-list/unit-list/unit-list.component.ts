import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgxInput} from '../../../ngx/ngx-input/model/ngx-input';
import {debounceTime, takeWhile} from 'rxjs/operators';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {UnitApiService} from '../../../../data/remote/rest-api/api/unit/unit-api.service';
import {Direction} from '../../../../components/ngx-virtual-scroll/model/direction';
import {UnitWindowService} from '../../../../services/windows/unit-window/unit-window.service';
import {BaseUnit} from '../../../../data/remote/model/unit/base-unit';
import {NgxVirtualScrollComponent} from '../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {UnitQuery} from '../../../../data/remote/rest-api/query/unit/unit-query';
import {AppHelper} from '../../../../utils/app-helper';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss'],
  providers: [UnitApiService]
})
export class UnitListComponent implements OnInit, OnDestroy {

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  public readonly searchNgxInput = new NgxInput();
  public canEdit = true;
  public query: UnitQuery;
  private _notDestroyed = true;

  constructor(private _unitApiService: UnitApiService,
              private _appHelper: AppHelper,
              private _unitWindowService: UnitWindowService) {
    this.query = new UnitQuery();
    this.searchNgxInput.labelTranslation = 'search';
    this.searchNgxInput.control.valueChanges
      .pipe(
        takeWhile(() => this._notDestroyed),
        debounceTime(PropertyConstant.searchDebounceTime)
      )
      .subscribe(async (value) => {
        this.query.name = value;
        await this._updateItems();
      });
  }

  async ngOnInit() {
    await this._updateItems();
  }

  ngOnDestroy(): void {
    this._notDestroyed = false;
  }

  public async onAddItem(): Promise<void> {
    const dialogResult = await this._unitWindowService.openEditUnit(new BaseUnit());
    if (dialogResult.result) {
      const itemIndex = this.ngxVirtualScrollComponent.items.findIndex(value => value.id == dialogResult.data.id);
      if (itemIndex > -1) {
        if (dialogResult.data.deleted) {
          this.ngxVirtualScrollComponent.items.splice(itemIndex, 1);
        } else {
          this.ngxVirtualScrollComponent.items[itemIndex] = dialogResult.data;
        }
      } else if (!dialogResult.data.deleted) {
        this.ngxVirtualScrollComponent.items.push(dialogResult.data);
      }
    }
  }

  public fetchItems = async (direction: Direction, query: UnitQuery) => {
    return await this._unitApiService.getUnits(query).toPromise();
  };

  private async _updateItems(): Promise<void> {
    await this._appHelper.delay();
    await this.ngxVirtualScrollComponent.reset();
  }

}
