import {Component, ContentChild, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgxVirtualScrollComponent} from '../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {AppHelper} from '../../../../utils/app-helper';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {IdentifiedObject} from '../../../../data/remote/base/identified-object';
import {BaseItemList} from '../model/base-item-list';
import {ItemDisplay} from '../model/item-display';
import {MenuItem} from '../../item-line/model/menu-item';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent<TModel extends IdentifiedObject, Q extends PageQuery> extends BaseItemList<TModel, Q> implements OnInit {

  @ContentChild('itemTemplate')
  public itemTemplate: TemplateRef<any>;

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  public readonly itemDisplayClass = ItemDisplay;
  public readonly actions: MenuItem[] = [];

  constructor(private _appHelper: AppHelper) {
    super();
  }

  async ngOnInit() {
    await this._updateItems();

    const viewListIconName = 'view_list';
    const viewModuleIconName = 'view_module';
    if (this.canEdit) {
      this.actions.push({
        iconName: 'add',
        action: async (item) => {
          await this.onAddItem();
        }
      });
    }
    this.actions.push({
      iconName: viewListIconName,
      action: (item) => {
        if (this.itemDisplay === ItemDisplay.LIST) {
          item.iconName = viewModuleIconName;
          this.itemDisplay = ItemDisplay.GRID;
        } else {
          item.iconName = viewListIconName;
          this.itemDisplay = ItemDisplay.LIST;
        }
      }
    });
  }

  public async onSearchTextChanged(value: string): Promise<void> {
    this.query.name = value;
    await this._updateItems();
  }

  public async onAddItem(): Promise<void> {
    const dialogResult = await this.addItem();
    if (dialogResult.result) {
      const itemIndex = this.ngxVirtualScrollComponent.items.findIndex(value => this.compare(value, dialogResult.data));
      if (itemIndex > -1) {
        if (dialogResult.data.deleted) {
          this.ngxVirtualScrollComponent.items.splice(itemIndex, 1);
        } else {
          this.ngxVirtualScrollComponent.items[itemIndex] = dialogResult.data;
        }
      } else if (!dialogResult.data.deleted) {
        this.ngxVirtualScrollComponent.items.push(dialogResult.data);
      }
    }
  }

  private async _updateItems(): Promise<void> {
    await this._appHelper.delay();
    await this.ngxVirtualScrollComponent.reset();
  }

}
