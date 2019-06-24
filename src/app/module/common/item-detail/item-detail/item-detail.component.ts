import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FieldsGroup} from '../model/fields-group';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemDetailComponent {

  @Input()
  public leftFieldsGroups: FieldsGroup[] = [];

  @Input()
  public rightFieldsGroups: FieldsGroup[] = [];

}

