import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {BaseField} from '../model/base-field';

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

}

