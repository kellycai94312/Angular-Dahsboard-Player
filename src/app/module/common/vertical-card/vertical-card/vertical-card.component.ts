import {Component, Input} from '@angular/core';
import {BaseComponent} from '../../../../data/local/component/base/base-component';
import {ImageType} from '../../../../data/remote/model/file/image/image-type';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {MenuItem} from '../../item-line/model/menu-item';

@Component({
  selector: 'app-vertical-card',
  templateUrl: './vertical-card.component.html',
  styleUrls: ['./vertical-card.component.scss']
})
export class VerticalCardComponent<T extends any> extends BaseComponent<T> {

  @Input()
  public fileClass: FileClass;

  @Input()
  public title: string;

  @Input()
  public subtitle: string;

  @Input()
  public actions: MenuItem[];

  public readonly imageTypeClass = ImageType;

  public get backgroundColor(): string {
    if (this.fileClass === FileClass.PERSON) {
      return '#039be5';
    } else if (this.fileClass === FileClass.GROUP) {
      return '#e1e9ee';
    }
    return void 0;
  }

}
