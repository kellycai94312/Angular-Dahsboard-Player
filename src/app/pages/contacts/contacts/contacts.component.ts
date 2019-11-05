import { Component, OnInit } from '@angular/core';
import { NameWrapper } from '../../../data/local/name-wrapper';
import { ContactItem } from '../model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  public items: Array<NameWrapper<MenuData>> = [];
  public menuSize = '20%';

  public ngOnInit(): void {
    this.items = Object.keys(ContactItem).map(value => new NameWrapper(this._getPathByContactItem(value as ContactItem), `contactItemEnum.${value}`));
  }

  public onToggleMenuVisibility(): void {
    if (this.menuSize === '46px') {
      this.menuSize = '20%';
    } else {
      this.menuSize = '46px';
    }
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
