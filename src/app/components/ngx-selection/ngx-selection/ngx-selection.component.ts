import {Component, Input, Type, ViewChild} from '@angular/core';
import {PageQuery} from '../../../data/remote/rest-api/page-query';
import {PageContainer} from '../../../data/remote/bean/page-container';
import {Direction} from '../../ngx-virtual-scroll/model/direction';
import {NgxVirtualScrollComponent} from '../../ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {AppHelper} from '../../../utils/app-helper';
import {PropertyConstant} from '../../../data/local/property-constant';

@Component({
  selector: 'app-ngx-selection',
  templateUrl: './ngx-selection.component.html',
  styleUrls: ['./ngx-selection.component.scss']
})
export class NgxSelectionComponent<TComponent extends any, TQuery extends PageQuery, TModel extends any> {

  public readonly propertyConstant = PropertyConstant;

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  @Input()
  public add: () => Promise<void>;

  @Input()
  public selectedItems: TModel[];

  @Input()
  public componentType: Type<TComponent>;

  @Input()
  public initializeComponent: (component: TComponent, data: TModel) => Promise<void>;

  @Input()
  public query: TQuery;

  @Input()
  public fetchItems: (query: TQuery) => Promise<PageContainer<TModel>>;

  @Input()
  public compare: (first: TModel, second: TModel) => boolean;

  constructor(private _appHelper: AppHelper) {
    this.query = <TQuery>{};
    this.compare = (first, second) => {
      return first.id == second.id;
    };
  }

  public async initialize(componentType: Type<TComponent>,
                          initializeComponent: (component: TComponent, data: TModel) => Promise<void>,
                          fetchItems: (query: TQuery) => Promise<PageContainer<TModel>>,
                          selectedItems: TModel[]): Promise<void> {
    this.componentType = componentType;
    this.initializeComponent = initializeComponent;
    this.fetchItems = fetchItems;
    this.selectedItems = selectedItems || [];

    await this.reset();
  }

  public async onSearchTextChanged(val: string): Promise<void> {
    this.query.name = val;
    await this.reset();
  }

  public getItems = async (direction: Direction, query: TQuery): Promise<PageContainer<TModel>> => {
    const pageContainer = await this.fetchItems(query);
    pageContainer.list = this._appHelper.except(pageContainer.list, this.selectedItems, this.compare);
    return pageContainer;
  };

  public async reset() {
    await this._appHelper.delay();
    await this.ngxVirtualScrollComponent.reset();
  }

  public onSelected(item: TModel) {
    this._appHelper.removeItem(this.ngxVirtualScrollComponent.items, item);
    this.selectedItems.push(item);
  }

  public onUnselected(item: TModel) {
    this._appHelper.removeItem(this.selectedItems, item);
    this.ngxVirtualScrollComponent.items.push(item);
  }

  public onAdd = async () => {
    if (this.add) {
      await this.add();
    }
  };

}
