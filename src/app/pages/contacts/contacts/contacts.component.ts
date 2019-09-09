import {Component, OnInit} from '@angular/core';
import {NameWrapper} from '../../../data/local/name-wrapper';
import {ContactItem} from '../model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  public items: NameWrapper<string>[] = [];

  public ngOnInit() {
    this.items = Object.keys(ContactItem).map(value => new NameWrapper(this._getPathByContactItem(value as ContactItem), `contactItemEnum.${value}`));
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
