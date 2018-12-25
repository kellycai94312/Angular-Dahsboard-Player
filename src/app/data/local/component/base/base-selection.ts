import {debounceTime} from 'rxjs/operators/debounceTime';
import {DxTextBoxComponent} from 'devextreme-angular';
import {PageQuery} from '../../../remote/rest-api/page-query';
import {PropertyConstant} from '../../property-constant';
import {Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppHelper} from '../../../../utils/app-helper';

export class BaseSelection<T, TQuery extends PageQuery> implements OnInit, OnDestroy {

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;

  @Input()
  public selectedItems: T[];

  @Input()
  public query: TQuery;

  private _total: number;

  constructor(protected _appHelper: AppHelper) {
    this.selectedItems = [];

    this.query = <TQuery>{};
    this.query.from = 0;
    this.query.count = PropertyConstant.pageSize;
    this.query.name = '';

    this._total = 0;
  }

  ngOnInit(): void {
    this.searchDxTextBoxComponent.textChange.pipe(debounceTime(PropertyConstant.searchDebounceTime))
      .subscribe(async value => {
        this.query.name = value;
        this.query.from = 0;
        await this.resetItems();
      });
  }

  ngOnDestroy(): void {
    this.searchDxTextBoxComponent.textChange.unsubscribe();
  }

  public async initialize(selectedItems: T[]): Promise<void> {
    this.selectedItems = selectedItems;
    await this.resetItems();
  }

  public getItems(): T[] {
    return [];
  }

  public resetItems() {
  }

  public onSelected(item: T) {
    this._appHelper.removeItem(this.getItems(), item);
    this.selectedItems.push(item);
  }

  public onUnselected(item: T) {
    this._appHelper.removeItem(this.selectedItems, item);
    this.getItems().push(item);
  }

}
