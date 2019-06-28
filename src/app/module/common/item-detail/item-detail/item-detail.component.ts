import {ChangeDetectionStrategy, Component, Input, Type} from '@angular/core';
import {BaseField} from '../model/base-field';
import {CarouselField} from '../model/carousel-field';
import {ChipsField} from '../model/chips-field';
import {ImageField} from '../model/image-field';
import {TextField} from '../model/text-field';
import {VideoField} from '../model/video-field';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemDetailComponent {

  @Input()
  public leftFields: BaseField[] = [];

  @Input()
  public rightFields: BaseField[] = [];

  public readonly carouselFieldClass = CarouselField;
  public readonly chipsFieldClass = ChipsField;
  public readonly imageFieldClass = ImageField;
  public readonly textFieldClass = TextField;
  public readonly videoFieldClass = VideoField;

  private isField<T extends BaseField>(data: T, type: Type<T>): boolean {
    return data instanceof type;
  }

}
