import {Component, EventEmitter, Output} from '@angular/core';
import {UnitApiService} from '../../../../data/remote/rest-api/api/unit/unit-api.service';
import {Direction} from '../../../../components/ngx-virtual-scroll/model/direction';
import {UnitWindowService} from '../../../../services/windows/unit-window/unit-window.service';
import {BaseUnit} from '../../../../data/remote/model/unit/base-unit';
import {UnitQuery} from '../../../../data/remote/rest-api/query/unit/unit-query';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {DialogResult} from '../../../../data/local/dialog-result';
import {PageContainer} from '../../../../data/remote/bean/page-container';
import {BaseItemList} from '../../../common/item-list/model/base-item-list';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss'],
  providers: [UnitApiService]
})
export class UnitListComponent extends BaseItemList<BaseUnit, PageQuery> {

  @Output()
  public readonly clickItem = new EventEmitter<BaseUnit>();

  constructor(private _unitApiService: UnitApiService,
              private _unitWindowService: UnitWindowService) {
    super();
    this.translationTitle = 'units';
    this.query = new PageQuery();
    this.addItem = async (): Promise<DialogResult<BaseUnit>> => {
      return await this._unitWindowService.openEditUnit(new BaseUnit());
    };
    this.fetchItems = async (direction: Direction, query: UnitQuery): Promise<PageContainer<BaseUnit>> => {
      return await this._unitApiService.getUnits(query).toPromise();
    };
  }

}
