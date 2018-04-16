import {DxTextBoxComponent} from 'devextreme-angular';
import {PageQuery} from '../../../remote/rest-api/page-query';
import {PropertyConstant} from '../../property-constant';
import {AfterViewInit, Input, OnDestroy, ViewChild} from '@angular/core';
import {AppHelper} from '../../../../utils/app-helper';

export class BaseSelection<T, TQuery extends PageQuery> implements AfterViewInit, OnDestroy {

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;

  @Input()
  public selectedItems: T[];

  @Input()
  public items: T[];

  @Input()
  public query: TQuery;

  @Input()
  public getItems: Function;

  private _total: number;

  constructor(protected _appHelper: AppHelper) {
    this.selectedItems = [];
    this.items = [];

    this.query = <TQuery>{};
    this.query.from = 0;
    this.query.count = PropertyConstant.pageSize;
    this.query.name = '';

    this._total = 0;
  }

  public ngAfterViewInit() {
    this.searchDxTextBoxComponent.textChange.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(async value => {
        this.query.name = value;
        await this.update(true);
      });
  }

  ngOnDestroy(): void {
    this.searchDxTextBoxComponent.textChange.unsubscribe();
  }

  public async initialize(selectedItems: T[]): Promise<void> {
    this.selectedItems = selectedItems;
    this.items = [];
    await this.update(true);
  }

  public async update(withReset: boolean = false) {
    if (withReset) {
      this._total = 0;
      this.query.from = 0;
    }

    const pageContainer = await this.getItems(this.query);
    if (pageContainer.total != null) {
      if (this._total != pageContainer.total || pageContainer.total < 1) {
        this.query.from = this.query.count;
        this.items = [];
      } else {
        this.query.from += this.query.count;
      }

      for (let i = 0; i < pageContainer.list.length; i++) {
        const item = pageContainer.list[i];
        let unique = true;
        for (let j = 0; j < this.selectedItems.length; j++) {
          const selectedItem = this.selectedItems[j];
          if (item === selectedItem) {
            unique = false;
            break;
          }
        }
        if (!unique) {
          continue;
        }
        this.items.push(item);
      }

      this._total = pageContainer.total;
    } else {
      this._total = 0;
      this.query.from = 0;
    }
  }

  public onSelected(item: T) {
    this._appHelper.removeItem(this.items, item);
    this.selectedItems.push(item);
  }

  public onUnselected(item: T) {
    this._appHelper.removeItem(this.selectedItems, item);
    this.items.push(item);
  }

}
