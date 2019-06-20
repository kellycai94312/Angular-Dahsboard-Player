import {Component, ContentChild, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgxVirtualScrollComponent} from '../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {NgxInput} from '../../../ngx/ngx-input/model/ngx-input';
import {AppHelper} from '../../../../utils/app-helper';
import {debounceTime, takeWhile} from 'rxjs/operators';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {IdentifiedObject} from '../../../../data/remote/base/identified-object';
import {BaseItemList} from '../model/base-item-list';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent<TModel extends IdentifiedObject, Q extends PageQuery> extends BaseItemList<TModel, Q> implements OnInit, OnDestroy {

  @ContentChild('itemTemplate')
  public itemTemplate: TemplateRef<any>;

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  public readonly searchNgxInput = new NgxInput();
  private _notDestroyed = true;

  constructor(private _appHelper: AppHelper) {
    super();
    this.searchNgxInput.labelTranslation = 'search';
    this.searchNgxInput.control.valueChanges
      .pipe(
        takeWhile(() => this._notDestroyed),
        debounceTime(PropertyConstant.searchDebounceTime)
      )
      .subscribe(async (value) => {
        this.query.name = value;
        await this._updateItems();
      });
  }

  async ngOnInit() {
    await this._updateItems();
  }

  ngOnDestroy(): void {
    this._notDestroyed = false;
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
