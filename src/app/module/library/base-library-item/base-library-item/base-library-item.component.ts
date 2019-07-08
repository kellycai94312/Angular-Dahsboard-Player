import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ItemDisplay} from '../../../common/item-list/model/item-display';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {ImageType} from '../../../../data/remote/model/file/image/image-type';
import {MenuItem} from '../../../common/item-line/model/menu-item';
import {BaseLibraryItem} from '../model/base-library-item';

@Component({
  selector: 'app-base-library-item',
  templateUrl: './base-library-item.component.html',
  styleUrls: ['./base-library-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseLibraryItemComponent<T> extends BaseLibraryItem<T> {


  @Input()
  public fileClass: FileClass;

  public readonly imageTypeClass = ImageType;
  public readonly itemDisplayClass = ItemDisplay;
  public readonly actions: MenuItem[];

  constructor() {
    super();
    this.actions = [
      {
        iconName: 'info', action: async (item: MenuItem) => {
          await this.getInfo(this.data);
        }
      },
      {
        iconName: 'edit', action: async (item: MenuItem) => {
          await this.onEdit();
        }
      }
    ];
  }

  public async onEdit(): Promise<void> {
    const dialogResult = await this.openEditItem(this.data);
    if (dialogResult) {
      this.data = dialogResult.data;
    }
  }

}
