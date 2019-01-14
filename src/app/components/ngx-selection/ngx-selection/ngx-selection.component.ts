import {Component, ComponentFactoryResolver, Input, Type, ViewChild} from '@angular/core';
import {PageQuery} from '../../../data/remote/rest-api/page-query';
import {PageContainer} from '../../../data/remote/bean/page-container';
import {Direction} from '../../ngx-virtual-scroll/model/direction';
import {NgxVirtualScrollComponent} from '../../ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {AppHelper} from '../../../utils/app-helper';
import {PropertyConstant} from '../../../data/local/property-constant';

@Component({
  selector: 'ngx-selection',
  templateUrl: './ngx-selection.component.html',
  styleUrls: ['./ngx-selection.component.scss']
})
export class NgxSelectionComponent<TComponent extends any, TQuery extends PageQuery, TModel extends any> {

  public readonly propertyConstant = PropertyConstant;

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  @Input()
  public componentFactoryResolver: ComponentFactoryResolver;

  @Input()
  public class: string;

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

  @Input()
  public canEdit: boolean;

  @Input()
  public minCount: number;

  @Input()
  public maxCount: number;

  public minCountParam: { count: number };
  public maxCountParam: { count: number };

  constructor(private _appHelper: AppHelper) {
    this.class = '';
    this.canEdit = true;
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

    this.minCountParam = {count: this.minCount};
    this.maxCountParam = {count: this.maxCount};
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
    if (!this.canSelect()) {
      return;
    }
    this._appHelper.removeItem(this.ngxVirtualScrollComponent.items, item);
    this.selectedItems.push(item);
  }

  public onUnselected(item: TModel) {
    if (!this.canUnselect()) {
      return;
    }
    this._appHelper.removeItem(this.selectedItems, item);
    this.ngxVirtualScrollComponent.items.push(item);
  }

  public onAdd = async () => {
    if (this.add) {
      await this.add();
    }
  };

  public canSelect() {
    return (this.canEdit || this.canEdit === undefined) && this.includeMaxValue();
  }

  public canUnselect() {
    return (this.canEdit || this.canEdit === undefined);
  }

  public isValid() {
    return this.includeMinValue() && this.includeMaxValue();
  }

  private includeMinValue(): boolean {
    return !this.minCount || this.selectedItems.length >= this.minCount;
  }

  private includeMaxValue(): boolean {
    return !this.maxCount || this.selectedItems.length < this.maxCount;
  }

}
