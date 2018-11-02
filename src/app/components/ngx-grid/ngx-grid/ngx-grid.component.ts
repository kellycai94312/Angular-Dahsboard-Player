import {Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, ViewChild} from '@angular/core';
import {PageQuery} from '../../../data/remote/rest-api/page-query';
import {PageContainer} from '../../../data/remote/bean/page-container';
import {Direction} from '../../ngx-virtual-scroll/model/direction';
import {NgxVirtualScrollComponent} from '../../ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {NgxColumnComponent} from '../ngx-column/ngx-column.component';
import {SelectionType} from '../bean/selection-type';

@Component({
  selector: 'ngx-grid',
  templateUrl: './ngx-grid.component.html',
  styleUrls: ['./ngx-grid.component.scss']
})
export class NgxGridComponent implements OnInit {

  @ContentChildren(NgxColumnComponent)
  public ngxColumnComponents: QueryList<NgxColumnComponent>;

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  @Input()
  public class: string;

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
  public query: PageQuery;

  @Input()
  public windowScroll: boolean;

  @Input()
  public selectionType: SelectionType;

  @Input()
  public selectedItems: any[];

  @Output()
  public selectedItemsChange: EventEmitter<any[]>;

  @Input()
  public fetchItems: (query: PageQuery) => Promise<PageContainer<any>>;

  constructor() {
    this.query = new PageQuery();
    this.query.from = 0;
    this.enabledAdd = true;
    this.selectionType = SelectionType.SINGLE;
    this.selectedItems = [];
  }

  async ngOnInit() {
    await this.ngxVirtualScrollComponent.reset();
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

  public async reset(): Promise<void> {
    await this.ngxVirtualScrollComponent.reset();
  }

  public async onColumnClick(column: NgxColumnComponent): Promise<void> {
    if (column.click) {
      await column.click(column);
    }
  }

  public onSelectOrDeselectItem(item: any) {
    const selectedItemIndex = this.selectedItems.findIndex(x => x === item);
    if (selectedItemIndex >= 0) {
      this.selectedItems.splice(selectedItemIndex, 1);
    } else if (this.selectionType === SelectionType.MULTIPLE ||
      (this.selectionType === SelectionType.SINGLE && this.selectedItems.length < 1)) {
      this.selectedItems.push(item);
    }
  }

  public selectedItem(item: any): boolean {
    return this.selectedItems.findIndex(x => x === item) >= 0;
  }

}
