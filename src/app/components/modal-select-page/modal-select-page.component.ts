import {Component, Input, OnInit, Type, ViewChild} from '@angular/core';
import {PropertyConstant} from '../../data/local/property-constant';
import {DxTextBoxComponent} from 'devextreme-angular';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {IdentifiedObject} from '../../data/remote/base/identified-object';
import {PageQuery} from '../../data/remote/rest-api/page-query';
import {Direction} from '../ngx-virtual-scroll/model/direction';
import {PageContainer} from '../../data/remote/bean/page-container';
import {NgxVirtualScrollComponent} from '../ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {AppHelper} from '../../utils/app-helper';

@Component({
  selector: 'app-modal-select-page',
  templateUrl: './modal-select-page.component.html',
  styleUrls: ['./modal-select-page.component.scss']
})
export class ModalSelectPageComponent<T extends IdentifiedObject> implements OnInit {

  @ViewChild(NgxVirtualScrollComponent)
  public itemsNgxVirtualScrollComponent: NgxVirtualScrollComponent;

  @Input()
  public headerNameKey: string;

  @Input()
  public component: Type<any>;

  @Input()
  public getItems: (pageQuery: PageQuery) => Promise<PageContainer<T>>;

  @Input()
  public onSave: (items: T[]) => Promise<void>;

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;

  public selectedItems: T[];
  public active: any;
  public pageQuery: PageQuery;

  constructor(public modal: NgbActiveModal,
              private _appHelper: AppHelper) {
    this.pageQuery = new PageQuery();
    this.pageQuery.name = '';
    this.pageQuery.from = 0;
    this.pageQuery.count = PropertyConstant.pageSize;
  }

  public async initialize(selectedItems: T[]) {
    this.selectedItems = JSON.parse(JSON.stringify(selectedItems));
    await this.updateItems();
  }

  async ngOnInit() {
    this.searchDxTextBoxComponent.textChange.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(async value => {
        this.pageQuery.name = value;
        await this.updateItems();
      });
  }

  public onSelected(item: T) {
    this._appHelper.removeItem(this.itemsNgxVirtualScrollComponent.items, item);
    this.selectedItems.push(item);
  }

  public onUnselected(item: T) {
    this._appHelper.removeItem(this.selectedItems, item);
    this.itemsNgxVirtualScrollComponent.items.push(item);
  }

  async setActive(obj: any) {
    // TODO: Use this method
    this.active = obj;
  }

  public getItemsWithoutSelected: Function = async (direction: Direction, pageQuery: PageQuery) => {
    const pageContainer = await this.getItems(pageQuery);
    pageContainer.list = this._appHelper.except(pageContainer.list, this.selectedItems, (first, second) => {
      return first.id == second.id;
    });
    return pageContainer;
  };

  private async updateItems() {
    await this.itemsNgxVirtualScrollComponent.reset();
  }

}
