import { Component, OnInit } from '@angular/core';
import { NameWrapper } from '../../../data/local/name-wrapper';
import { MenuItem } from '../../../module/common/item-line/model/menu-item';
import { ContactItem } from '../model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  public items: Array<NameWrapper<MenuData>> = [];
  public visibleMenu = true;
  public actions: Array<MenuItem>;

  public ngOnInit(): void {
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

  private _getPathByContactItem(value: ContactItem): MenuData {
    switch (value) {
      case ContactItem.PERSONS:
        return {link: 'person', iconName: 'person'};
      case ContactItem.GROUPS:
        return {link: 'group', iconName: 'group'};
      case ContactItem.PLACES:
        return {link: void 0, iconName: 'room'};
      // return {link: 'place', iconName: 'room'};
      case ContactItem.EVENTS:
        return {link: void 0, iconName: 'event'};
      // return {link: 'event', iconName: 'event'};
      default:
        return void 0;
    }
  }

}

class MenuData {
  public link: string;
  public iconName: string;
}
