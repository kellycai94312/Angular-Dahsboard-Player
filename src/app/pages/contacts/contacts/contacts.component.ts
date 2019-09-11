import {Component, OnInit} from '@angular/core';
import {NameWrapper} from '../../../data/local/name-wrapper';
import {ContactItem} from '../model';
import {MenuItem} from '../../../module/common/item-line/model/menu-item';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  public items: NameWrapper<string>[] = [];
  public visibleMenu: boolean;
  public actions: MenuItem[];

  public ngOnInit() {
    this.items = Object.keys(ContactItem).map(value => new NameWrapper(this._getPathByContactItem(value as ContactItem), `contactItemEnum.${value}`));

    this.actions = [
      {
        iconName: 'menu',
        action: item => {
          this.visibleMenu = !this.visibleMenu;
        }
      }
    ];
  }

  private _getPathByContactItem(value: ContactItem) {
    switch (value) {
      case ContactItem.PERSONS:
        return 'person';
      case ContactItem.GROUPS:
        return 'group';
      case ContactItem.PLACES:
      // return 'place';
      case ContactItem.EVENTS:
      // return 'event';
    }
    return void 0;
  }

}
