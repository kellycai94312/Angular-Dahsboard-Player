import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Direction} from '../../../../components/ngx-virtual-scroll/model/direction';
import {BaseParameter} from '../../../../data/remote/model/parameter/base-parameter';
import {ParameterApiService} from '../../../../data/remote/rest-api/api/parameter/parameter-api.service';
import {ParameterWindowService} from '../../../../services/windows/parameter-window/parameter-window.service';
import {ParameterQuery} from '../../../../data/remote/rest-api/query/parameter/parameter-query';
import {BaseItemList} from '../../../common/item-list/model/base-item-list';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {DialogResult} from '../../../../data/local/dialog-result';
import {PageContainer} from '../../../../data/remote/bean/page-container';
import {ItemListComponent} from '../../../common/item-list/item-list/item-list.component';

@Component({
  selector: 'app-parameter-list',
  templateUrl: './parameter-list.component.html',
  styleUrls: ['./parameter-list.component.scss'],
  providers: [ParameterApiService]
})
export class ParameterListComponent extends BaseItemList<BaseParameter, PageQuery> {

  @ViewChild(ItemListComponent)
  public itemListComponent: ItemListComponent<BaseParameter, ParameterQuery>;

  @Input()
  public filter: (values: BaseParameter[]) => BaseParameter[];

  @Output()
  public readonly clickItem = new EventEmitter<BaseParameter>();

  constructor(private _parameterApiService: ParameterApiService,
              private _parameterWindowService: ParameterWindowService) {
    super();
    this.translationTitle = 'parameters';
    this.query = new PageQuery();
    this.addItem = async (): Promise<DialogResult<BaseParameter>> => {
      return await this._parameterWindowService.openEditParameter(new BaseParameter());
    };
    this.fetchItems = async (direction: Direction, query: ParameterQuery): Promise<PageContainer<BaseParameter>> => {
      const pageContainer = await this._parameterApiService.getParameters(query).toPromise();
      if (this.filter) {
        pageContainer.list = this.filter(pageContainer.list);
      }
      return pageContainer;
    };
  }

}
