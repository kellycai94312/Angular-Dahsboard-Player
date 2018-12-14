import {AfterViewInit, Component, ContentChildren, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, ViewEncapsulation} from '@angular/core';
import {PageQuery} from '../../../data/remote/rest-api/page-query';
import {PageContainer} from '../../../data/remote/bean/page-container';
import {Direction} from '../../ngx-virtual-scroll/model/direction';
import {NgxColumnComponent} from '../ngx-column/ngx-column.component';
import {SelectionType} from '../bean/selection-type';
import {NgxVirtualScroll} from '../../ngx-virtual-scroll/bean/ngx-virtual-scroll';
import {AppHelper} from '../../../utils/app-helper';
import {Sort} from '../../../data/remote/rest-api/sort';
import {Observable} from 'rxjs';
import {mergeAll} from 'rxjs/operators';
import {ISubscription} from 'rxjs-compat/Subscription';
import {NameWrapper} from '../../../data/local/name-wrapper';

@Component({
  selector: 'ngx-grid',
  templateUrl: './ngx-grid.component.html',
  styleUrls: ['./ngx-grid.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class NgxGridComponent extends NgxVirtualScroll implements OnInit, AfterViewInit, OnDestroy {

  public readonly selectionTypeClass = SelectionType;
  public readonly sortClass = Sort;

  @ContentChildren(NgxColumnComponent)
  public ngxColumnComponents: QueryList<NgxColumnComponent>;

  @Input()
  public canEdit: boolean;

  @Input()
  public enabledAdd: boolean;

  @Input()
  public add: () => Promise<boolean>;

  /*
   * @deprecated Use dblClickByItem
   */
  @Input()
  public edit: (obj: any) => Promise<boolean>;

  @Input()
  public dblClickByItem: (obj: any) => Promise<boolean>;

  @Input()
  public selectionType: SelectionType;

  @Output()
  public selectedItemsChange: EventEmitter<any[]>;

  @Output()
  public sortChange: EventEmitter<string>;

  @Input()
  public fetchItems: (query: PageQuery) => Promise<PageContainer<any>>;

  @Input()
  public autoInit: boolean;

  private readonly _sorts: NameWrapper<Sort>[];
  private _sortSubscription: ISubscription;

  constructor(private appHelper: AppHelper) {
    super(appHelper);
    this.enabledAdd = true;
    this.selectionType = SelectionType.SINGLE;
    this.selectedItemsChange = new EventEmitter<any[]>();
    this.sortChange = new EventEmitter<string>();
    this._sorts = [];
    this.autoInit = true;
  }


  async ngOnInit(): Promise<void> {
    this.getItems = (direction, pageQuery) => {
      return this.fetchItems(pageQuery);
    };
    // TODO: Turn off auto update items
    if (this.autoInit) {
      await this.reset();
    }
  }

  ngAfterViewInit(): void {
    this._sortSubscription = Observable.merge(this.ngxColumnComponents.toArray().map(x => x.sortSubject))
      .pipe(mergeAll())
      .subscribe((val: NameWrapper<Sort>) => {
        const itemIndex = this._sorts.findIndex(x => x.name === val.name);
        if (itemIndex > -1) {
          if (val.data) {
            this._sorts[itemIndex] = val;
          } else {
            this._sorts.splice(itemIndex, 1);
          }
        } else {
          this._sorts.push(val);
        }

        let sortQuery = '';
        for (const item of this._sorts) {
          sortQuery += item.data === Sort.ASC ? `%2B${item.name}` : `-${item.name}`;
        }
        this.sortChange.emit(sortQuery);
      });
  }

  ngOnDestroy(): void {
    this.appHelper.unsubscribe(this._sortSubscription);
  }

  public onAdd = async () => {
    if (this.canEdit && this.add) {
      await this.add();
    }
  };

  public onEdit = async (e: any, item: any) => {
    if (this.canEdit) {
      if (this.edit) {
        await this.edit(item);
      } else if (this.dblClickByItem) {
        await this.dblClickByItem(item);
      }
    }
  };

  public onFetchItems = async (direction: Direction, pageQuery: PageQuery): Promise<PageContainer<any>> => {
    if (this.fetchItems) {
      return await this.fetchItems(pageQuery);
    }
    return null;
  };

  public async onColumnClick(column: NgxColumnComponent): Promise<void> {
    if (column.sortName) {
      column.onSortChange();
    }
    if (column.click) {
      await column.click(column);
    }
  }

  public onSelectOrDeselectItem(item: any) {
    this.selectedItemsChange.emit(this.items.filter(x => x['selected']));
  }

}
