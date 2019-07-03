import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {BaseComponent} from '../../../../data/local/component/base/base-component';
import {ImageType} from '../../../../data/remote/model/file/image/image-type';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {MenuItem} from '../model/menu-item';

@Component({
  selector: 'app-item-line',
  templateUrl: './item-line.component.html',
  styleUrls: ['./item-line.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemLineComponent<T extends object> extends BaseComponent<T> {

  @Input()
  public fileClass: FileClass;

  @Input()
  public actions: MenuItem[] = [];

  @Input()
  public infoAction: MenuItem;

  @Output()
  public readonly clickItem = new EventEmitter<Event>();

  public readonly imageTypeClass = ImageType;

}
