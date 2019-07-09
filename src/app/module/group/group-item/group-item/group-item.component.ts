import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../../../data/local/component/base/base-component';
import {Group} from '../../../../data/remote/model/group/base/group';
import {ImageType} from '../../../../data/remote/model/file/image/image-type';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {ItemDisplay} from '../../../common/item-list/model/item-display';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.scss']
})
export class GroupItemComponent<T extends Group> extends BaseComponent<T> implements OnInit {

  @Input()
  public width: number;

  @Input()
  public height: number;

  @Input()
  public itemDisplay: ItemDisplay;

  public readonly imageTypeClass = ImageType;
  public readonly fileClassClass = FileClass;
  public readonly itemDisplayClass = ItemDisplay;

  constructor() {
    super();
  }

}
