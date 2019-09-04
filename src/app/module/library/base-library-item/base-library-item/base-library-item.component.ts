import {AfterContentInit, ChangeDetectionStrategy, Component, Input} from '@angular/core';
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
export class BaseLibraryItemComponent<T> extends BaseLibraryItem<T> implements AfterContentInit {

  @Input()
  public fileClass: FileClass;

  public readonly imageTypeClass = ImageType;
  public readonly itemDisplayClass = ItemDisplay;
  public readonly actions: MenuItem[];
  public readonly leftActions: MenuItem[];
  public rightActions: MenuItem[];

  constructor() {
    super();

    this.leftActions = [
      {
        iconName: 'info', action: async (item: MenuItem) => {
          await this.getInfo(this.data);
        }
      }
    ];
    this.actions = [...this.leftActions];
  }

  public ngAfterContentInit(): void {
    if (this.canEdit) {
      this.rightActions = [
        {
          iconName: 'edit', action: async (item: MenuItem) => {
            await this.onEdit();
          }
        }
      ];
      this.actions.push(...this.rightActions);
    }
  }

  public async onEdit(): Promise<void> {
    const dialogResult = await this.openEditItem(this.data);
    if (dialogResult) {
      this.data = dialogResult.data;
    }
  }

}
