import {Component, Input} from '@angular/core';
import {ButtonGroupItem} from '../bean/button-group-item';

@Component({
  selector: 'ngx-button-group',
  templateUrl: './ngx-button-group.component.html',
  styleUrls: ['./ngx-button-group.component.scss']
})
export class NgxButtonGroupComponent {

  @Input()
  public items: ButtonGroupItem[];

  @Input()
  public selectedItem: ButtonGroupItem;

  public busy: boolean;

  constructor() {
    this.items = [];
  }

  public async onClick(item: ButtonGroupItem) {
    this.busy = true;
    // TODO: Add busy indication
    try {
      await item.callback(item.originalObject);
    } finally {
      this.busy = false;
    }
  }

}
