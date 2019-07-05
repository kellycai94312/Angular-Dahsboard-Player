import {BaseComponent} from '../../../../data/local/component/base/base-component';
import {Input} from '@angular/core';
import {ItemDisplay} from '../../../common/item-list/model/item-display';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {DialogResult} from '../../../../data/local/dialog-result';

export abstract class BaseLibraryItem<T> extends BaseComponent<T> {

  @Input()
  public canEdit: boolean;

  @Input()
  public itemDisplay: ItemDisplay = ItemDisplay.LIST;

  @Input()
  public getInfo: (item: T) => Promise<void>;

  @Input()
  public openEditItem: (item: T) => Promise<DialogResult<T>>;

  public readonly fileClassClass = FileClass;

}
