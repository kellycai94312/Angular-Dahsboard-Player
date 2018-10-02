import {Component, ContentChildren, Input, OnInit, QueryList, ViewChild} from '@angular/core';
import {PageQuery} from '../../../data/remote/rest-api/page-query';
import {PageContainer} from '../../../data/remote/bean/page-container';
import {Direction} from '../../ngx-virtual-scroll/model/direction';
import {NgxVirtualScrollComponent} from '../../ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {NgxColumnComponent} from '../ngx-column/ngx-column.component';

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
  public fetchItems: (query: PageQuery) => Promise<PageContainer<any>>;

  constructor() {
    this.query = new PageQuery();
    this.query.from = 0;
    this.enabledAdd = true;
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

}
